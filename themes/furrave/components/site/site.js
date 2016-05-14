$(document).ready(function() {
  $('video,audio').mediaelementplayer({
    alwaysShowHours: true,
  });
  $(".toggle-tracklist").on('click', function(evt) {
    var id = $(this).data("id");
    $("#tracklist-"+id).toggleClass("expanded");
  });
});
