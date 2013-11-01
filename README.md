jQuery SRT Player
===

The jQuery SRT player extends the capabilities of the HTML5 video player to be able to play SRT files in the browser. It's usage is meant to be as simple as possible. -- I will add a demo from the Accentivize site as soon as it is up.

Usage
---

In order to load SRT files on your HTML5 video, there are three steps.

__Step 1__: Include the jquery srt plugin
```
<script type="text/javascript" src="jquery.srt.js"></script>
```

__Step 2__: Call SRT on the video page and specify the options (discussed later on).
```
<script type="text/javascript">
  $("video").srt();
</script>
```

__Step 3__: Specify an SRT file track from within the video attribute
```
<video ... srt-track="{your file}.srt">
```
Actually, this third step is optional, as you can simply specify the SRT file from the options that you pass into the .srt() call.


Options
---

### srt_track

Instead of specifying the file as a track as an HTML attribute on your video element, you can instead specify it through an option passed into the jquery call.

__default__: Whatever you specify as the default


### default_url

In order to specify a path or URL from which to load the SRT track (it's loaded with a jQuery AJAX get call).

__default__: ""

### poll_time

The time interval (_in milliseconds_) which you wish to use as an interval to refresh the subtitles.

__default__: 100 -- I've found that for most SRT files this is sufficient. Feel free to specify anything smaller, but be warned the current subtitle is checked repeatedly after this amount of time, which could slow the user's browser.

### srt_elem

The id on the page in which to place the subtitles. If this id doesn't exist, it is appended after the video element. Use this if you wish to build a custom video player.

__default__: subtitles -- _Note_: There is no leading "#" on this element!

Contributing
---
Feel free to make pull requests, submit issues, and give feedback from which this can be refined.


Authors
---
[Joseph Barrow](http://accentivize.com "Accentivize") through Accentivize
