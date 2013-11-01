/*
 *
 *	Description: 
 *		A jQuery SRT File Parser, for use with an HTML5 video 
 *		player.
 *	File: 
 *		srt.js
 *	Author: 
 *		Joseph Barrow
 *	Usage:
 *		$("video#video_id").srt( options );
 *
 */

 // checking for subtitle time v. video run time?

(function( $ ) {

	$.fn.srt = function( options ) {

		var settings = $.extend({
			srt_track: this.attr("srt-track"),
			default_url: "",
			poll_time: 100
			// id for srt area
			// html styling?
		}, options);

		subtitles = [];

		// Load the subtitles in a blocking manner
		$.ajax({
			url: settings.srt_track,
			success: function(data) {
				var sections = data.split("\n\n");
				console.log(sections.length)
				$.each(sections, function(index, value) {
					var lines = value.split("\n");
					var subtitle_data = { 
						"st": to_seconds(lines[1].split(" --> ")[0]), // start time
						"et": to_seconds(lines[1].split(" --> ")[1]), // end time
						"da": lines.slice(2)
					};

					subtitles.push(subtitle_data);
				});
			},
			async: false
		});

		// Bind the play and pause methods
		this.on('play', function() {
			$obj = $(this)

			play_subtitles = setInterval(function() {
				$.each(subtitles, function(index, subtitle) {
					if(subtitle.st > $obj[0].currentTime)
						return false;
					else if(subtitle.st < $obj[0].currentTime && subtitle.et >= $obj[0].currentTime) {
						// This needs to be cleaned up!
						$("#data").empty();
						$.each(subtitle.da, function(index, value) {
							$("#data").append(value + "<br />");
						});
					}
					// TODO: Make it disappear after end-time
				});

			}, 100);
		});

		this.on('pause', function() {
			clearInterval(play_subtitles);
		});

		// Allow for chaining
		return this;
	};

	// Private methods
	function to_seconds(time_string) {
		// Break the hh:mm:ss,ms string into an array
		var chunks = time_string.split(":");
		// Calculate the seconds
		var seconds = 
			3600 * parseInt(chunks[0]) // hours
			+ 60 * parseInt(chunks[1]) // minutes
			+ parseInt(chunks[2].split(",")[0]) // seconds
			+ parseInt(chunks[2].split(",")[1]) / 1000;
		return seconds;
	}

}( jQuery ));