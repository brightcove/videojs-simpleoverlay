# Simple Overlay

A video.js plugin that will overlay some text on top of a video

This plugin is primarily intended as an example of how to write a video.js plugin.
Check out the [video.js plugin page](https://github.com/videojs/video.js/wiki/Plugins) for more full-featured alternatives.

## Getting Started
Download [videojs](http://www.videojs.com/)

In your web page:

```html
<video id="video" src="movie.mp4" controls></video>
<script src="video.js"></script>
<script src="dist/simpleoverlay.min.js"></script>
<script>
videojs('video', {}, function() {
  var player = this;
  // Create an overlay that will be shown starting at 1 second and removed after 7 seconds
  player.simplerverlay({
    'vjs-overlay': {
      start: 1,
      end: 7,
      textContent: 'This is the text that will be displayed'
    }
  });
});
</script>
```

## Documentation
_(Coming soon)_

## Examples
_(Coming soon)_

## Release History
_(Nothing yet)_
