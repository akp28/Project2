$(document).ready(function () {
  // Getting a reference to the input field where user adds a new Animal
  var $newItemInput = $('input.new-item')
  // Our new animals will go inside the AnimalContainer
  var $AnimalContainer = $('.Animal-container')
  // Adding event listeners for deleting, editing, and adding animals
  $(document).on('click', 'button.delete', deleteAnimal)
  $(document).on('click', 'button.complete', toggleComplete)
  $(document).on('click', '.Animal-item', editAnimal)
  $(document).on('keyup', '.Animal-item', finishEdit)
  $(document).on('blur', '.Animal-item', cancelEdit)
  $(document).on('submit', '#Animal-form', insertAnimal)

  // Our initial animals array
  var animals = []

  // Getting animals from database when page loads
  getAnimals()

  // This function resets the animals displayed with new animals from the database
  function initializeRows () {
    $AnimalContainer.empty()
    var rowsToAdd = []
    for (var i = 0; i < animals.length; i++) {
      rowsToAdd.push(createNewRow(animals[i]))
    }
    $AnimalContainer.prepend(rowsToAdd)
  }

  // This function grabs animals from the database and updates the view
  function getAnimals () {
    $.get('/api/animals', function (data) {
      animals = data
      initializeRows()
    })
  }

  // This function deletes a Animal when the user clicks the delete button
  function deleteAnimal (event) {
    event.stopPropagation()
    var id = $(this).data('id')
    $.ajax({
      method: 'DELETE',
      url: '/api/animals/' + id
    }).then(getAnimals)
  }

  // This function handles showing the input box for a user to edit a Animal
  function editAnimal () {
    var currentAnimal = $(this).data('Animal')
    $(this).children().hide()
    $(this).children('input.edit').val(currentAnimal.text)
    $(this).children('input.edit').show()
    $(this).children('input.edit').focus()
  }

  // Toggles complete status
  function toggleComplete (event) {
    event.stopPropagation()
    var Animal = $(this).parent().data('Animal')
    Animal.complete = !Animal.complete
    updateAnimal(Animal)
  }

  // This function starts updating a Animal in the database if a user hits the "Enter Key"
  // While in edit mode
  function finishEdit (event) {
    var updatedAnimal = $(this).data('Animal')
    if (event.which === 13) {
      updatedAnimal.text = $(this).children('input').val().trim()
      $(this).blur()
      updateAnimal(updatedAnimal)
    }
  }

  // This function updates a Animal in our database
  function updateAnimal (Animal) {
    $.ajax({
      method: 'PUT',
      url: '/api/animals',
      data: Animal
    }).then(getAnimals)
  }

  // This function is called whenever a Animal item is in edit mode and loses focus
  // This cancels any edits being made
  function cancelEdit () {
    var currentAnimal = $(this).data('Animal')
    if (currentAnimal) {
      $(this).children().hide()
      $(this).children('input.edit').val(currentAnimal.text)
      $(this).children('span').show()
      $(this).children('button').show()
    }
  }

  // This function constructs a Animal-item row
  function createNewRow (Animal) {
    var $newInputRow = $(
      [
        "<li class='list-group-item Animal-item'>",
        '<span>',
        Animal.animal_name_common,
        '</span>',
        "<input type='text' class='edit' style='display: none;'>",
        // "<button class='delete btn btn-danger'>x</button>",
        // "<button class='complete btn btn-primary'>✓</button>",
        '</li>'
      ].join('')
    )

    $newInputRow.find('button.delete').data('id', Animal.id)
    $newInputRow.find('input.edit').css('display', 'none')
    $newInputRow.data('Animal', Animal)
    if (Animal.complete) {
      $newInputRow.find('span').css('text-decoration', 'line-through')
    }
    return $newInputRow
  }

  // This function inserts a new Animal into our database and then updates the view
  function insertAnimal (event) {
    event.preventDefault()
    var Animal = {
      text: $newItemInput.val().trim(),
      complete: false
    }

    $.post('/api/animals', Animal, getAnimals)
    $newItemInput.val('')
  }
})
