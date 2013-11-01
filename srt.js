/*
 *
 *	Description: 	A jQuery SRT File Parser, for use with an
 *					HTML5 video player.
 *	File: 			srt.js
 *	Author: 		Joseph Barrow
 *
 *	This file parser will parse only simple SRT files of the
 *	following nature:
 *	
 *		1
 *		00:03:10,500 --> 00:00:13,000
 *		Elephant's Dream
 *
 *		[numeric marker]
 *		[appearance time - h:m:s,ms] --> [disappearance time]
 *		[subtitle]
 *
 */

// TODO: turn this into a jQuery plugin
// TODO: load the subtitles on initialization, and never again
// TODO: efficiency updates
// TODO: remove old subtitles when none are present

$(document).ready(function() {
	// When we turn this into a jQuery package/library, we are
	// going to check for an srt-track element.
	$('#html5_video').on('play', function() {
		load_and_play_srt($(this));
	});

	// TODO: take in srt file name from the video track
	// TODO: Find a way to unnest this
	function load_and_play_srt($obj) {
		var subtitles = [];
		$.get("test6.srt", function(data) {

			var sections = data.split("\n\n");

			$.each(sections, function(index, value) {
				var lines = value.split("\n");
				var subtitle_data = { 
					"st": to_seconds(lines[1].split(" --> ")[0]), // start time
					"et": to_seconds(lines[1].split(" --> ")[1]), // end time
					"da": lines.slice(2)
				};

				console.log(subtitle_data.st)

				subtitles.push(subtitle_data);
			});

			play_srt($obj, subtitles);
		});

	}

	function to_seconds(time_string) {
		// Break the 00:03:10,500 string into an array
		var chunks = time_string.split(":");
		// Calculate the seconds from said array
		var seconds = 
			3600 * parseInt(chunks[0]) // hours
			+ 60 * parseInt(chunks[1]) // minutes
			+ parseInt(chunks[2].split(",")[0]) // seconds
			+ parseInt(chunks[2].split(",")[1]) / 1000;
		return seconds;
	}

	function play_srt($obj, subtitles) {
		var play_subtitles = setInterval(function() {
			$.each(subtitles, function(index, subtitle) {
				if(subtitle.st > $obj[0].currentTime)
					return false;
				else if(subtitle.st < $obj[0].currentTime && subtitle.et >= $obj[0].currentTime) {
					$("#data").empty();
					$.each(subtitle.da, function(index, value) {
						$("#data").append(value + "<br />");
					});
				}
				// TODO: Make it disappear after end-time
			});


			// We need to clear the interval after the video stops
			// playing (check that currentTime is 0)
		}, 100);
	}

});