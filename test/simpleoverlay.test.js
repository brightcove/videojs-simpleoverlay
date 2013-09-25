(function(vjs) {
  /*
    ======== A Handy Little QUnit Reference ========
    http://api.qunitjs.com/

    Test methods:
      module(name, {[setup][ ,teardown]})
      test(name, callback)
      expect(numberOfAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      throws(block, [expected], [message])
  */

  module('videojs.prototype.simpleoverlay', {
    // This will run before each test in this module.
    setup: function() {
      this.player = vjs(document.querySelector('#qunit-fixture video'));
    }
  });

  test('displays an overlay at the correct time', function() {
    var overlay;
    expect(3);
    this.player.simpleoverlay({
      'vjs-test-overlay': {
        start: 6,
        end: 9,
        textContent: 'I am a test'
      }
    });
    this.player.currentTime = function() {
      return 7;
    };
    this.player.trigger('timeupdate');

    overlay = this.player.el().querySelector('.vjs-test-overlay');
    ok(overlay, 'the overlay is present');
    ok(!(/vjs-hidden/).test(overlay.className), 'the overlay is showing');
    strictEqual(overlay.textContent, 'I am a test', 'the content is set');
  });

  test('hides overlays when they\'re not active', function() {
    expect(1);
    this.player.simpleoverlay({
      'vjs-test-overlay': {
        start: 6,
        end: 9,
        textContent: 'I am a test'
      }
    });

    // show the overlay
    this.player.currentTime = function() {
      return 7;
    };
    this.player.trigger('timeupdate');

    // hide the overlay
    this.player.currentTime = function() {
      return 9.1;
    };
    this.player.trigger('timeupdate');

    ok(this.player.el().querySelector('.vjs-test-overlay.vjs-hidden'));
  });

}(window.videojs));
