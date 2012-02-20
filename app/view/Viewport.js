Ext.define('Test.view.Viewport', {
    extend: 'Ext.Panel',
    
    config: {
        fullscreen: true,
        layout: 'fit',
        scrollable: 'both',
        
        items: [
            {
                xtype: 'panel',
                id: 'mypanel',
                layout: 'card',
                styleHtmlContent: true,
                width: 250,
                height: 250,
                centered: true,
                plugins: [
                    {
                        xclass: 'Ext.plugin.Pinchemu',
                        helpers: true
                    }
                ],
                html: '<h2>Try pinch on me</h2> <div><strong>CRTL+ mouse TouchMove</strong> for zoom in,</div><div>and <strong>SHIFT+ mouse TouchMove</strong> for zoom out</div>'
            }
        ]
    }
});
