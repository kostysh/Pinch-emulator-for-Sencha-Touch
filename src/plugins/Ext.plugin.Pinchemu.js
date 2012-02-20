/**
 * @filename Ex.plugin.Pinchemu.js
 *
 * @name Pinch emulator plugin for Sencha Touch
 * @fileOverview Emulation of double touch pinch event for desktops
 *
 * @author Constantine V. Smirnov kostysh(at)gmail.com
 * @date 20120220
 * @version 0.1
 * @license Free
 *
 * @requires Sencha Touch 2.0
 * 
 * Usage:
 
 .....
 items: [
            {
                xtype: 'panel',
                id: 'mypinchitem',
                plugins: [
                    {
                        xclass: 'Ext.plugin.Pinchemu'
                    }
                ]
            }
        ]
 
 *
 */

Ext.define('Ext.plugin.Pinchemu', {
    alias: 'plugin.pinchemu',
  
    init: function(cmp) {
        var self = this;
        
        self.cmp = cmp;
        self.cmp.on({
            scope: self,
            painted: self.initPinchsim
        });
    },
    
    //Plugin initialisation
    initPinchsim: function() {
        var self = this;
        
        this.pinchStarted = false;
        
        var item = self.cmp;
        
        if (!item.pinchSimEnabled) {

            if (item.rendered) {
                self.initHandlers(item);
            } else {
                item.on({
                    painted: self.initHandlers
                });
            }
        }
    },
    
    initHandlers: function(item) {
        var self = this;
        
        //Setup touch handlers on enabled item
        item.element.on({
            scope: self,
            touchstart: function(ev) {
                if ((ev.event.ctrlKey || ev.event.shiftKey) && 
                    self.pinchStarted === false) {
                    self.pinchStarted = true;
                    
                    if (ev.event.ctrlKey) {
                        self.zoomStart = 100;
                        self.zoomDirection = 1;
                    } else if (ev.event.shiftKey) {
                        self.zoomStart = 340;
                        self.zoomDirection = -1;
                    }
                    
                    self.zoomFactor = 1;
                    
                    self.onTouchStart(item, ev);
                }
            },
            
            touchend: function(ev) {
                if (self.pinchStarted) {
                    self.pinchStarted = false;
                    self.onTouchEnd(item, ev);
                }
            },
            
            touchcancel: function(ev) {
                if (self.pinchStarted) {
                    self.pinchStarted = false;
                    self.onTouchEnd(item, ev);
                }
            },
            
            touchmove: function(ev) {
                if ((ev.event.ctrlKey || ev.event.shiftKey) && 
                    this.pinchStarted === true) {
                    self.onTouchMove(item, ev);
                } else if (self.pinchStarted) {
                    self.pinchStarted = false;
                    self.onTouchEnd(item, ev);
                }
            }
        });
        
        item.pinchSimEnabled = true;
    },
    
    //Converting of single touch event to double touch
    convertEvent: function(ev) {
        var self = this;
        
        //Clone of original touch object
        var touches = Array.prototype.slice.call(ev.touches);
        
        if (!touches) {
            touches = self.lastTouches;//at the pinchend only
        }
        
        ev.touches = touches;        
        
        if (touches.length > 0) {
            
            if (!self.touchStartPoint) {
                
                var startX = touches[0].point.x;
                var startY = touches[0].point.y;
                var startPageX = touches[0].pageX;
                var startPageY = touches[0].pageY;
                
                touches[0].point.x = touches[0].point.x + self.zoomStart / 2;
                touches[0].pageX = touches[0].pageX + self.zoomStart / 2;
                
                //Build new touch point
                touches[1] = {};
                touches[1].identifier = 2;
                touches[1].pageX = startPageX - self.zoomStart / 2;
                touches[1].pageY = startPageY;
                touches[1].point = touches[0].point.clone();
                touches[1].point.x = startX - self.zoomStart / 2;
                touches[1].point.y = touches[0].point.y;
                touches[1].target = touches[0].target;
                touches[1].targets = touches[0].targets;
                touches[1].timeStamp = touches[0].timeStamp;
                
                //Remember the current start point
                this.touchStartPoint = {
                    x: startX,
                    y: startY,
                    pageX: startPageX,
                    pageY: startPageY,
                    distance: touches[0].point.getDistanceTo(touches[1].point)
                };
                
            } else {
                
                touches[0].point = self.lastTouches[0].point.clone();//replace original by previous
                touches[0].point.x = Ext.Number.constrain(self.lastTouches[0].point.x + self.zoomFactor * self.zoomDirection, 
                                                          self.touchStartPoint.x + self.zoomFactor);
                touches[0].pageX = Ext.Number.constrain(self.lastTouches[0].pageX + self.zoomFactor * self.zoomDirection, 
                                                        self.touchStartPoint.x + self.zoomFactor);
                
                touches[1] = {};
                touches[1].point = self.lastTouches[1].point.clone();
                touches[1].point.x = Ext.Number.constrain(self.lastTouches[1].point.x - self.zoomFactor * self.zoomDirection, 
                                                          self.touchStartPoint.x + self.zoomFactor);
                touches[1].pageX = Ext.Number.constrain(self.lastTouches[1].pageX - self.zoomFactor * self.zoomDirection, 
                                                        self.touchStartPoint.x + self.zoomFactor);
                touches[1].pageY = self.lastTouches[1].pageY;
                touches[1].target = touches[0].target;
                touches[1].targets = touches[0].targets;
                touches[1].timeStamp = touches[0].timeStamp;
                
            }
            
            self.lastTouches = touches;
        }
        
        ev.scale = self.getNewScale(ev);
        return ev;
    },
    
    getNewScale: function(ev) {
        var self = this;
        
        if (ev.touches.length > 0) {
            var newDistance = ev.touches[0].point.getDistanceTo(ev.touches[1].point);
            self.lastScale = newDistance / self.touchStartPoint.distance;            
            return self.lastScale;
        } else {
            return self.lastScale;
        }        
    },
    
    onTouchStart: function() {
        this.lastScale = 1;
        var ev = this.convertEvent(arguments[1]);
    },
    
    onTouchMove: function() {
        var ev = this.convertEvent(arguments[1]);
        this.lastTouches = Array.prototype.slice.call(ev.touches);
    },
    
    onTouchEnd: function() {
        var ev = this.convertEvent(arguments[1]);
        this.touchStartPoint = null;
        this.lastTouches = null;
        this.lastScale = null;
    }
});