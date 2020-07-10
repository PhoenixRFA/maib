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

    calendar.getEvents();

    $('#calendar').on('click', '.a-date.event', function(e) {
        e.preventDefault();
        var data = $(this).data('event');

        calendar.showEventDetails(data.id);
    });

    $(document).on('click', '.calendar-card', function(e) {
        var id = $(this).data('id');

        calendar.showEventDetails(id);
    });
});

var calendar = (function() {
    var res = {
        events: null,
        eventsData: null,
        getEvents: getEvents,
        showEventDetails: showEventDetails
    };

    function getEvents() {
        $.ajax({
            url: '/events.json',
            method: 'get',
            dataType: 'json',
            success: function(res) {
                parseEvents(res.events);
                initCalendar();
            },
            error: function(xhr, status, err) { console.error(err, xhr, status); }
        });
    }

    function parseEvents(data) {
        if (!data || !data.length || !Array.isArray(data)) return;

        var counter = 1;

        res.events = data.map(e => ({
            id: counter++,
            date: e.date * 1000, 
            name: e.name,
            address: e.address1,
            image: e.image
        }));

        counter = 1;

        res.eventsData = data.map(e => ({
            id: counter++,
            name: e.name,
            address1: e.address1,
            address2: e.address2,
            data: e.data,
            date: new Date(e.date * 1000),
            image: e.image
        }));
    }

    function initCalendar() {
        if (!res.events || !res.events.length) return;

        $('#calendar').MEC({
            events: res.events,
            from_monday: true
        });

        renderCards();
    }

    function renderCards() {
        var lastEvents = res.eventsData.slice(-4);
        var isRowOpen = false;

        var html = [];
        for (var i = 0; i < lastEvents.length; i++) {
            var e = lastEvents[i];

            if (i % 2 === 0) {
                if(isRowOpen) html.push('</div></div></div>');
                html.push('<div class="row"><div class="col-sm-12 col-lg-6 event_images_wrapper"><div class="row">');
                isRowOpen = true;
            }

            html.push('<div class="col-6 calendar-card" data-id="' + e.id + '">');

            html.push('<div class="small_box"></div>');
            html.push('<div class="image-title clearfix">');

            var dateTimeFormat = new Intl.DateTimeFormat('ru', { year: 'numeric', month: 'long', day: '2-digit' });
            var dateParts = dateTimeFormat.formatToParts(e.date);
            var dateString = dateParts[0].value + ' ' + dateParts[2].value + ' ' + dateParts[4].value;
            
            html.push('<span class="date">' + dateString + '</span>');
            html.push('<span class="place">' + e.address1 + '</span>');
            html.push('</div>');
            html.push('<img src="' + e.image + '" class="img-fluid">');
            html.push('<p class="font_smaller text-center">' + e.name + '</p>');
            html.push('</div>');
        }

        if (isRowOpen) html.push('</div></div></div>');

        $('.events-wrap').html(html.join(''));
    }

    function showEventDetails(id) {
        var event = res.eventsData.find(x => x.id == id);
        
        var dateTimeFormat = new Intl.DateTimeFormat('ru', { year: 'numeric', month: 'long', day: '2-digit' });
        var dateParts = dateTimeFormat.formatToParts(event.date);
        var dateString = dateParts[0].value + ' ' + dateParts[2].value + ' ' + dateParts[4].value;

        var $wrap = $('#event-details');

        $('.event-name', $wrap).text(event.name);
        $('.modal-body', $wrap).empty()
            .html('<p><strong>Дата:</strong> '+dateString+'</p><p><strong>Место:</strong> ' + event.address1 + (event.address2 ? ', ' + event.address2 : '') + '</p>');

        if(event.data) $('.modal-body', $wrap).append(event.data);

        $wrap.modal('show');
    }

    return res;
})();