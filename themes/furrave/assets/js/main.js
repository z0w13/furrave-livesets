import $ from 'jquery'

$(document).ready(function() {
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
