$(document).ready(function() {
  $('video,audio').mediaelementplayer({
    alwaysShowHours: true,
  });

  $(".toggle-tracklist").on('click', function(evt) {
    var tracklistId = $(this).attr("href"),
        $tracklist = $(tracklistId),
        $anchor = $("[name='" + tracklistId.substring(1) + "']");
        expanded = $tracklist.hasClass("expanded");

    $(".tracklist").removeClass("expanded");
    if (!expanded) {
      $tracklist.addClass("expanded");
      $(window).scrollTop($anchor.offset().top);
    }
    return false;
  });
});
