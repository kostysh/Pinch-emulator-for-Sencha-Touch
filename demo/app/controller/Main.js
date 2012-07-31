Ext.define('Pinchemu.controller.Main', {
    extend: 'Ext.app.Controller',
    
    config: {
        refs: {
            'mypanel': '#mypanel'
        },
        
        control: {
            mypanel: {
                painted: 'onMyPanelPainted'
            }
        }
    },
    
    onMyPanelPainted: function(panel) {
        
        //Simple zoom-in-out
        panel.element.on({
            scope: panel,
            pinchstart: this.onPanelPinchStart,
            pinch: this.onPanelPinch,
            pinchend: this.onPanelPinchEnd
        });
        
        panel.maxWidth = Ext.Viewport.element.getWidth();
        panel.maxHeight = Ext.Viewport.element.getHeight();
        panel.minWidth = panel.element.getWidth();
        panel.minHeight = panel.element.getHeight();
    },
    
    onPanelPinchStart: function(ev) {
        console.log('PinchStart', ev);
        
        this.baseWidth = this.getWidth();
        this.baseHeight = this.getHeight();
    },
    
    onPanelPinch: function(ev) {
        console.log('Pinch', ev);
        
        var scale = ev.scale; 
        this.setWidth(Ext.Number.constrain(this.baseWidth * scale, 
                                           this.minWidth, 
                                           this.maxWidth));
                                           
        this.setHeight(Ext.Number.constrain(this.baseHeight * scale, 
                                            this.minHeight, 
                                            this.maxHeight));
    },
    
    onPanelPinchEnd: function(ev) {
        console.log('PinchEnd', ev);
    }
});
