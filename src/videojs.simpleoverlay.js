/*
 * simpleoverlay
 * https://github.com/brightcove/videojs-simpleoverlay
 *
 * Copyright (c) 2013 Brightcove
 * Licensed under the Apache 2 license.
 */

(function(vjs) {

  var
    /**
     * Copies properties from one or more objects onto an original.
     */
    extend = function(obj /*, arg1, arg2, ... */) {
      var arg, i, k;
      for (i = 1; i < arguments.length; i++) {
        arg = arguments[i];
        for (k in arg) {
          if (arg.hasOwnProperty(k)) {
            obj[k] = arg[k];
          }
        }
      }
      return obj;
    },

    // define some reasonable defaults
    defaults = {
      // don't show any overlays by default
    },

    // plugin initializer
    simpleOverlay = function(options) {
      var
        // save a reference to the player instance
        player = this,

        // merge options and defaults
        settings = extend({}, defaults, options || {}),
        
        i,
        overlay;

      // insert the overlays into the player but keep them hidden initially
      for (i in settings) {
        overlay = settings[i];
        overlay.el = document.createElement('div');
        overlay.el.className = i + ' vjs-hidden';
        overlay.el.textContent = overlay.textContent;
        player.el().appendChild(overlay.el);
      }
      
      // show and hide the overlays for this time period
      player.on('timeupdate', function() {
        var
          currentTime = player.currentTime(),
          i,
          overlay;
        

        // iterate over all the defined overlays
        for (i in settings) {
          overlay = settings[i];
          if (overlay.start <= currentTime && overlay.end > currentTime) {
            
            // if the overlay isn't already showing, show it
            if (/vjs-hidden/.test(overlay.el.className)) {
              overlay.el.className = overlay.el.className.replace(/\s?vjs-hidden/, '');
            }

          // if the overlay isn't already hidden, hide it
          } else if (!(/vjs-hidden/).test(overlay.el.className)) {
            overlay.el.className += ' vjs-hidden';
          }
        }
      });
    };
  
  // register the plugin with video.js
  vjs.plugin('simpleoverlay', simpleOverlay);

}(window.videojs));
