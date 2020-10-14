$(document).ready(function() {
    const hourHand = $('.hand-hour');
    const minuteHand = $('.hand-minute');
    const secondHand = $('.hand-second');

    function setClock() {
        const now = new Date();

        const seconds = now.getSeconds();
        const minutes = now.getMinutes();
        const hours = now.getHours();

        // Fraction for minutes is added to make the hour hand move more smoothly, 
        // else the hand would skip from 1 to 2
        const secondsFraction = seconds / 60;
        const minutesFraction = (secondsFraction + minutes) / 60;
        const hoursFraction = (minutesFraction + hours) / 12;

        const secondsDegree = secondsFraction * 360;
        const minutesDegree = minutesFraction * 360;
        const hoursDegree = hoursFraction * 360;

        secondHand.css({transform: `rotate(${secondsDegree}deg)`});
        minuteHand.css({transform: `rotate(${minutesDegree}deg)`});
        hourHand.css({transform: `rotate(${hoursDegree}deg)`});
    }

    setInterval(setClock, 1000);
 
})
  