Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    name: 'Test',
    
    views: ['Viewport'],
	
    controllers : ['Main'],
	
    launch: function(){
        Ext.create('Test.view.Viewport');
    }
});