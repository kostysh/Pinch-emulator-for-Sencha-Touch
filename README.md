Pinch emulator plugin for Sencha Touch
======================================  

Emulation of double touch pinch event for desktops. 
Can be useful for testing of pinch enabled components on desktop.

Author: Constantine V. Smirnov, kostysh(at)gmail.com, http://mindsaur.com    
License: GNU GPL v3.0    
Current version: 1.0    
ST2 version: 2.1.0 Beta1    
ST2 SDK Tools: 2.0.0 Beta 3 

Requires:
=========
- Sencha Touch 2.0

Versions:
=========
- 1.0: New namespace, GPL license, demo app
- 0.2: Added visualization helpers for touches
- 0.1: Initial release  

Features:
=========
- Enable pinch events on desktop

Install:
======== 
- Place src to your app folder;
- Configure custom path for custom components:

<!-- language: lang-js -->
            
        Ext.Loader.setPath({
            'Ext.ux': '../src/ux'
        });

- Just add this plugin to configuration of components on which you want to test the pinch:
        
        plugins: [
            {
                xclass: 'Ext.ux.plugin.Pinchemu'
            }
        ],

Usage: 
======
- Place your ST2 build in touch/ folder  
- CRTL + mouse TouchMove for zoom-in  
- SHIFT + mouse TouchMove for zoom-out  

Live demo: 
==========
http://mindsaur.com/demo/pinchemu