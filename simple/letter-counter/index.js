$(document).ready(function() {
    $('#letter_input').on('input', function() { 
        var lettersCount = $(this).val();
        $('#letter_counter').text(lettersCount.length);
    })
})