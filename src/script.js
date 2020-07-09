$(document).ready(function () {

    $('#enter_btn, .fill-profile-btn').click((e) => {
        e.preventDefault();
        $('#form-info').modal('show');
    });

    $('.open-main-form').click((e) => {
        e.preventDefault();
        $('#form-info').modal('hide')
            .on('hidden.bs.modal', function() {
                $('#form-modal').modal('show');
            });
    });

    $(document).on('click', '#sendForm', function (e) {
        e.preventDefault();
        $('#fmain-form').submit();
    });

    $(document).on('click', '#send-form-short', function (e) {
        e.preventDefault();
        var formData = new FormData($('#form-short')[0]);
        var object = {};
        formData.forEach((value, key) => { object[key] = value });
        $.ajax({
            url: 'https://c-rb.com/home/HandleMIABForm',
            dataType: 'jsonp',
            data: object,
            method: 'get',
            success: function (res) { }
        })
    });

    $(document).on('click', '.file-dropdown', function(e) {
        var $btn = $(e.target);
        var fileType = $btn.data('file');

        var $file = $('#file-' + fileType);
        if ($file.length) $file.click();
    });

    $('.first-button').on('click', function () {

        $('.animated-icon1').toggleClass('open');
    });
});



var sampleEvents = [
    {
        title: "forum",
        date: new Date(2020, 6, 2).getTime(),
        link: "#"
    },
    {
        title: "forum",
        date: new Date(2020, 6, 14).getTime(),
        link: "#"
    },
    {
        title: "forum",
        date: new Date(2020, 6, 19).getTime(),
        link: "#"
    },
    {
        title: "forum",
        date: new Date(2020, 6, 29).getTime(),
        link: "#"
    }
];

$("#calendar").MEC({
    events: sampleEvents,
    from_monday: true
});

