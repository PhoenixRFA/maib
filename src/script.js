$(document).ready(function () {

  $('.first-button').on('click', function () {

    $('.animated-icon1').toggleClass('open');
  });
});



var sampleEvents = [
    {
      title: "forum",
      date:  Date.parse( new Date(2019, 10, 2)),
      link: "#"
    },
	 {
      title: "forum",
      date:  new Date(2019, 10, 14), // last week
      link: "#"
    },
	 {
      title: "forum",
      date:  new Date(2019, 10, 19), // last week
      link: "#"
    },
	 {
      title: "forum",
      date: new Date(2019, 10, 29), // last week
      link: "#"
    }
];

$("#calendar").MEC({
  events: sampleEvents
});

$("#calendar").MEC({
  events: sampleEvents,
  from_monday: true
});

