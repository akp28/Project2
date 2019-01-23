$(document).ready(function() {

    $("#myForm").on("submit", function(event) {
      event.preventDefault();
     var animalInput= $("#textInput").val();
    //   var burgerInfo = {
    //     burger_id: $(this).children(".burger_id").val(),
    //     customer: $(this).children(".custom-input").val()
    //   };
      $("#textInput").val('');
      
      // $.ajax({
      //   method: "GET",
      //   url: "/animalsearch/" + animalInput,
      // }).then(function(data) {

        console.log("animal js" + animalInput);
        // reload page to display devoured burger in proper column
        // location.reload();
        window.location.href = '/animalsearch/' + animalInput ;
        // window.location.href = 'homepage';
        // return false
        // "/cms?post_id=" + currentPost.id;
        // animalInput= $("#textInput").val('');
      // });
      // animalInput= $("#textInput").val('');
        // return false
    });
  });