$(document).ready(function() {

    function toggleLoader() {
        $('#quote').toggleClass('hide');
        $('#spinner').toggleClass('hide');
    }

    function getJoke() {
        toggleLoader();

        $.getJSON('https://geek-jokes.sameerkumar.website/api?format=json', function(result) {
            if(result != void(0) && result.joke != void(0)) {
                $('#quote').text(result.joke);
                toggleLoader();
            }
        });
    }

    getJoke();

    $('#quoteBtn').click(function(){
        getJoke();
    });
})
  