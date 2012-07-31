Ext.define('Pinchemu.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar',
        'Ext.Video'
    ],
    config: {
        tabBarPosition: 'bottom',

        items: [
            {
                title: 'Welcome',
                iconCls: 'home',
                scrollable: true,

                items: [
                    {
                        docked: 'top',
                        xtype: 'titlebar',
                        title: 'Pinch emulator for Sencha Touch'
                    },
                    
                    {
                        xtype: 'panel',
                        id: 'mypanel',
                        layout: 'card',
                        styleHtmlContent: true,
                        width: 300,
                        height: 300,
                        centered: true,
                        style: 'overflow: hidden;',
                        
                        plugins: [
                            {
                                xclass: 'Ext.ux.plugin.Pinchemu'
                            }
                        ],
                        
                        html: '<div><h2>Try pinch on me with mouse and buttons</h2> ' + 
                              '<div><strong>CRTL+ mouse TouchMove</strong> ' + 
                              'for zoom in,</div><div>and ' + 
                              '<strong>SHIFT+ mouse TouchMove</strong> ' + 
                              'for zoom out</div></div>'
                    }
                ]
            },
            
            {
                title: 'About',
                iconCls: 'info',
                layout: 'fit',
                styleHtmlContent: true,
                html: '<p><strong>Pinch-emulator-for-Sencha-Touch demo</strong></p>' +
                      '<p>Version: 1.0</p>' +
                      '<p>Author: Constantine Smirnov, ' + 
                      '<a href="http://mindsaur.com">http://mindsaur.com</a></p>' +
                      '<p>License: GNU GPL v3.0</p>' +
                      '<p>GitHub: <a href="https://github.com/kostysh/Pinch-emulator-for-Sencha-Touch">Pinch-emulator-for-Sencha-Touch</a></p>',
                scrollable: 'vertical'
            }
        ]
    }
});
