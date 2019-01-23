$(document).ready(function() {

    $("#myForm").on("submit", function(event) {
      event.preventDefault();
     var animalInput= $("#textInput").val();
      $("#textInput").val('');
        // console.log("animal js" + animalInput);
      
        window.location.href = '/animalsearch/' + animalInput ;
        
    });
  });