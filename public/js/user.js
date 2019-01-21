$(document).ready(function() {
    // Getting a reference to the input field where user adds a new todo
    // var $newItemInput = $("input.new-item");
    // Our new user will go inside the todoContainer
    // var $AnimalContainer = $("#favorite-animal");
    // Adding event listeners for deleting, editing, and adding user
    // $(document).on("click", "button.delete", deleteTodo);
    // $(document).on("click", "button.complete", toggleComplete);
    // $(document).on("click", ".todo-item", editTodo);
    // $(document).on("keyup", ".todo-item", finishEdit);
    // $(document).on("blur", ".todo-item", cancelEdit);
    // $(document).on("submit", "#todo-form", insertTodo);
  
    // Our initial user array
    var animal ;
  
    // Getting user from database when page loads
    getUser();
  
    // This function resets the user displayed with new user from the database
    // function initializeRows () {
    //     $AnimalContainer.empty()
    //     var rowsToAdd = []
    //     for (var i = 0; i < animals.length; i++) {
    //       rowsToAdd.push(createNewRow(animals[i]))
    //     }
    //     $AnimalContainer.prepend(rowsToAdd)
    // }
    // function createNewRow (Animal) {
    //     var $newInputRow = $(
    //       [
    //         "<li class='list-group-item Animal-item'>",
    //         '<span>',
    //         Animal.faviorite_animals,
    //         '</span>',
    //         "<input type='text' class='edit' style='display: none;'>",
    //         // "<button class='delete btn btn-danger'>x</button>",
    //         // "<button class='complete btn btn-primary'>✓</button>",
    //         '</li>'
    //       ].join('')
    //     )
    
    //     $newInputRow.find('button.delete').data('id', Animal.id)
    //     $newInputRow.find('input.edit').css('display', 'none')
    //     $newInputRow.data('Animal', Animal)
    //     if (Animal.complete) {
    //       $newInputRow.find('span').css('text-decoration', 'line-through')
    //     }
    //     return $newInputRow
    // }
    // This function grabs user from the database and updates the view
    function getUser() {
      $.get("/api/addUser", function(data) {
        animal = data;
        console.log("data: " + JSON.stringify(animal));
        $("#favorite-animal").val(data.favorite_animals);
        // initializeRows();
      });
    }
})