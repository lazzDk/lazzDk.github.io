$(document).ready(function() {
    
    function makeNewPosition() {
        var padding = 200;
        var height = $(window).height() - padding;
        var width = $(window).width()- padding;
        var newHeight = Math.floor(Math.random() * height);
        var newWidth = Math.floor(Math.random() * width);

        return [newHeight, newWidth];
    }

    var buttObject;
    var score = 0;

    $('#butt').click(function(e) { 
        score++;
        $('#score').text(score);
        newPosition = makeNewPosition();
        buttObject = $(this);
        
        var currentPosition = buttObject.position();
        var angle = getAngle(currentPosition.left, currentPosition.top, newPosition[1], newPosition[0])
        
        buttObject.animate(
            { deg: angle },
            {
              duration: 300,
              step: function(now) {
                $(this).css({ transform: 'rotate(' + now + 'deg)' });
              }
            } 
        );

        var randomSound = Math.round(Math.random() * 3) + 1; 
        var audioFart = $('audio#fart' + randomSound)[0];
        buttObject.animate(
            {
                top: newPosition[0],
                left: newPosition[1]
            }, 
            {
                duration: audioFart.duration * 1000 ,
                start: function(){
                    toggleButtImage(false);
                    handleFartEffect(currentPosition);
                    audioFart.play();
                },
                done: function() { 
                    toggleButtImage(true);
                    handleFartEffect(currentPosition, true);
                }
        });
    });
    
    function toggleButtImage(done){
        $('#butt-image').attr('src', done ? 'assets/butt.png': 'assets/butt_white.gif'); 
    };

    function handleFartEffect(currentPosition, done){
        var setPattern = $('#patternCheckbox').is(':checked');
        if(setPattern && !done) {
            addFartPattern(currentPosition.top, currentPosition.left);
        }

        var setFlame = $('#flameCheckbox').is(':checked');
        if(setFlame) {
            $('.flame').toggle();
        }
    };

    function getAngle(x1, y1, x2, y2) {
        var dy = y2 - y1;
        var dx = x2 - x1;
        
        var theta = Math.atan2(dy, dx);
        theta *= 180 / Math.PI; 
        return theta;
    };

    function addFartPattern(currentTop, currentLeft) {

        var img = $('<img class="fart-pattern">');
        img.attr('src', 'assets/splat.svg');
        img.css({top: currentTop + 100, left: currentLeft});
        img.after('#butt');

    }
});