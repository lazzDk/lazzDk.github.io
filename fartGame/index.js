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
    var imageAngle = 0;
    $('#butt').click(function(e) { 
        score++;
        $('#score').text(score);
        newPosition = makeNewPosition();
        buttObject = $(this);
        
        var currentPosition = buttObject.position();
        var angle = getAngle(currentPosition.left, currentPosition.top, newPosition[1], newPosition[0])
        imageAngle = angle;

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
                    handleEffects(currentPosition, false);
                    audioFart.play();
                },
                done: function() { 
                    handleEffects(currentPosition, true);
                }
        }); 
    });
    
    function toggleButtImage(done){
        $('#butt-image').attr('src', done ? 'assets/butt.png': 'assets/butt_white.gif'); 
    };

    function handleEffects(currentPosition, done){
        toggleButtImage(done);
        handleFlameEffect();
        handleFartMarks(currentPosition, done);
    };

    function handleFartMarks(currentPosition, done){
        var setPattern = $('#patternCheckbox').is(':checked');
        if(setPattern && !done) {
            addFartPattern(currentPosition.top, currentPosition.left);
        }
    }

    function handleFlameEffect(){
        var setFlame = $('#flameCheckbox').is(':checked');
        if(setFlame) {
            $('.flame').toggle();
        }
    }


    function getAngle(x1, y1, x2, y2) {
        var dy = y2 - y1;
        var dx = x2 - x1;
        
        var theta = Math.atan2(dy, dx);
        theta *= 180 / Math.PI; 
        return theta;
    };

    function addFartPattern(currentTop, currentLeft) {
        var centerTop = currentTop + 100;
        var centerLeft = currentLeft + 90;

        var adjustedHypLength = 120;
        console.log(imageAngle);

        var adjustedAngle = Math.abs(imageAngle);
        adjustedAngle = adjustedAngle > 90 ?  180 - adjustedAngle : adjustedAngle;
        var xLength = Math.abs(Math.cos(adjustedAngle) * adjustedHypLength);
        var yLength = Math.abs(Math.sqrt(Math.pow(adjustedHypLength, 2)-Math.pow(xLength, 2)));
        if(imageAngle >= 90 && imageAngle < 180) {
            logEvent(90, 180, xLength, yLength);
            centerTop -= yLength;
            centerLeft += xLength;
        } else if(imageAngle >= 0 && imageAngle < 90 ) {
            logEvent(0, 90, xLength, yLength);
            centerTop += yLength;
            centerLeft -= xLength;
        } else if(imageAngle >= -90 && imageAngle < 0) {
            logEvent(-90, 0, xLength, yLength);
            centerTop += yLength;
            centerLeft -= xLength;
        } else if(imageAngle >= -180 && imageAngle < -90) {
            logEvent(-180, -90, xLength, yLength);
            centerTop -= yLength;
            centerLeft += xLength;
        } 
        var img = $('<img class="fart-pattern">');
        img.attr('src', 'assets/splat.svg');
        img.css({top: centerTop, left: centerLeft});
        img.appendTo('.container');
    }

    function logEvent(angle1, angle2, xLength, yLength) {
        return;
        console.log(">= " + angle1 + " - < " + angle2 + " - x: " + xLength.toFixed(2) + " y: " +yLength.toFixed(2))
    }

});