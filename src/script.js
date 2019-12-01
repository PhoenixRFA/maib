$(document).ready(function () {

  $('.first-button').on('click', function () {

    $('.animated-icon1').toggleClass('open');
  });
});



var sampleEvents = [
    {
      title: "Soulful sundays bay area",
      date: new Date().setDate(new Date().getDate() - 7), // last week
      link: "#"
    },
    {
      title: "London Comicon",
      date: new Date().getTime(), // today
      link: "#"
    },
    {
      title: "Youth Athletic Camp",
      date: new Date().setDate(new Date().getDate() + 31), // next month
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