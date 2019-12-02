$(document).ready(function () {

  $(document).on('click', '#sendForm', function(e){
    e.preventDefault();
    var formData = new FormData($('#main-form')[0]);
    var object = {};
    formData.forEach((value, key) => {object[key] = value});
    console.log(object);
    $.ajax({
      url: 'https://dev.c-rb.com/home/HandleMIABForm',
      dataType: 'jsonp',
      data: object,
      method: 'get',
      success: function(res){
        $('#form-modal').modal('hide');
      }
    })
  });

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


$('#enter_btn').click((e)=>{
  e.preventDefault();
  $('#form-modal').modal('show');
})