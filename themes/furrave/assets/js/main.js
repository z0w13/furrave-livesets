import $ from 'jquery'

window.jQuery = window.$ = $
require('mediaelement/build/mediaelement-and-player')

$(document).ready(function() {
  $('video,audio').mediaelementplayer({
    alwaysShowHours: true,
    pluginPath: '/assets/mediaelement/',
  })

  $('.toggle-tracklist').on('click', function(evt) {
    let tracklistId = $(this).attr('href')
    let $tracklist = $(tracklistId)
    let $anchor = $("[name='" + tracklistId.substring(1) + "']")
    let expanded = $tracklist.hasClass('expanded')

    $('.tracklist').removeClass('expanded')
    if (!expanded) {
      $tracklist.addClass('expanded')
      $(window).scrollTop($anchor.offset().top - 10)
    }
    return false
  })
})
