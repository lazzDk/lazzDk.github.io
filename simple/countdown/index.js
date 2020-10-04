$(document).ready(function() {

    var today = new Date();
    var birthdayDate = new Date(2019, 9, 29, 6, 0, 0);
    birthdayDate.setFullYear(today.getFullYear());
    if(birthdayDate.getTime() < today.getTime()){
        birthdayDate.setFullYear(today.getFullYear() + 1);
    }

    var dayInterval  = 1000 * 60 * 60 * 24;
    var hourInterval = 1000 * 60 * 60;
    var minuteInterval = 1000 * 60;

    function setCountdown() {
        today = new Date();
        var distance = birthdayDate.getTime() -  today.getTime();
        
        var days = Math.floor(distance / dayInterval);
        var hours = Math.floor((distance % dayInterval) / hourInterval);
        var minutes = Math.floor((distance % hourInterval) / minuteInterval);
        var seconds = Math.floor((distance % minuteInterval) / 1000);

        setText(days, hours, minutes, seconds);
    }

    setCountdown();

    function setText(days, hours, minutes, seconds) {
        $('#days').text(days);
        $('#hours').text(hours);
        $('#minutes').text(minutes);
        $('#seconds').text(seconds);
    }

    setInterval(() => {
        setCountdown();
    }, 1000);
     
})