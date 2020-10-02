$(document).ready(function() {

    function changeColor () {
        var colorR = Math.floor(Math.random()  * 255);
        var colorG = Math.floor(Math.random()  * 255);
        var colorB = Math.floor(Math.random()  * 255);

        $('.container').css({'background-color': 'rgb(' + colorR + ',' + colorG + ',' + colorB+ ')'});
    }

    $('#color_changer').click(function(){
        changeColor();
    });

    var timerActivated = false;
    var timerInterval = null;

    $('#color_timer').click(function(){
        if(!!timerActivated) {
            clearInterval(timerInterval);
            changeTimerText('Timer off - click to toggle');
        }
        else {
            timerInterval = setInterval(changeColor, 2000);
            changeTimerText('Timer on - click to toggle');
        }
        timerActivated = !timerActivated;
    });

    function changeTimerText(btnText) {
        $('#color_timer').text(btnText);
    }

})