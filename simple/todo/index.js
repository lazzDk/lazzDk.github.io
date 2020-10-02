$(document).ready(function() {
    var items = [];

    $('#todoAdd').click(function(){ 
        var inputField = $('#todo_input');
        var todoText = inputField.val();
        if(!todoText){
            console.warn('No text');
            return;
        }
        addItem(todoText);
        inputField.val('');
    });

    $(document).on('click','.btn_remove',function(){
        var id = $(this)[0].id;
        deleteItem(id);
    })

    function addItem(todoText) {
        items.push(todoText);
        var id = items.length - 1;
        var todoItem = $('<div class="todo-item" id="' + id + '"><input type="text" value="' + todoText + '"/><a href="#" class="btn btn_remove" id="' + id +'">Remove</a></div>');
        todoItem.appendTo('.todo-container');
    }

    function deleteItem(index) {
        var id = '#' + index;
        items.splice(index, 1);
        $(id).remove();
    }

})