var $questionInput = $("#question-input");

// HELPER FUNCTIONS
function errorHandler(error) {
  //just to show you how to error catch
  console.error(error);
}

//GET list of Qs
function getQuestions() {
  //  $carsList.addClass("loading").html($spinner);
  $.ajax({
    url: "/questions"
  })
    .done(function(response) {
      $("#questions-list").html("");
      for (var i = 0; i < response.length; i++) {
        var q = response[i].text;
        $("#questions-list").append("<li>" + q + "</li>");
      }
    })
    .fail(errorHandler);
}

getQuestions();

// CREATE add a new Q
function addQuestion(questionText) {
  console.log("adding a new question", questionText);
  $.ajax({
    method: "POST",
    url: "/questions",
    contentType: "application/json",
    data: JSON.stringify({
      text: questionText
    })
  })
    .done(function(response) {
      getQuestions();
    })
    .fail(errorHandler);
}

// Event Bindings
$("#add-question-form").on("submit", function(e) {
  e.preventDefault();
  var questionText = $questionInput.val();
  addQuestion(questionText);
  $questionInput.val("");
});
