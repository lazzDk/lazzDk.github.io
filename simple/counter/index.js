$(document).ready(function() {

    var counter = 0;

    function setCounter() {
        $('#counter').text(counter);
    }

    setCounter();

    $('#decrease_btn').click(function(){
        console.log('Clicked de') ;
        counter--;
        setCounter();
    });

    $('#increase_btn').click(function(){
        counter++;
        setCounter();
    });

})