$(document).ready(function () {

  $('#enter_btn, .fill-profile-btn').click((e)=>{
    e.preventDefault();
    $('#form-modal').modal('show');
  })

  $(document).on('click', '#sendForm', function(e){
    e.preventDefault();
    var formData = new FormData($('#main-form')[0]);
    var object = {};
    formData.forEach((value, key) => {object[key] = value});
    $.ajax({
      url: 'https://c-rb.com/home/HandleMIABForm',
      dataType: 'jsonp',
      data: object,
      method: 'get',
      success: function(res){
        $('#form-modal').modal('hide');
      }
    })
  });

  $(document).on('click', '#send-form-short', function(e){
    e.preventDefault();
    var formData = new FormData($('#form-short')[0]);
    var object = {};
    formData.forEach((value, key) => {object[key] = value});
    $.ajax({
      url: 'https://c-rb.com/home/HandleMIABForm',
      dataType: 'jsonp',
      data: object,
      method: 'get',
      success: function(res){}
    })
  });

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

