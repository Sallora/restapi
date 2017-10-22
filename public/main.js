//Variables
var $questionInput = $("#question-input");
var $answerInput = $("#answer-input");
var source = $("#question-template").html();
var qTemplate = Handlebars.compile(source);

// HELPER FUNCTIONS
function errorHandler(error) {
  //just to show you how to error catch
  console.error(error);
}

//GET list of Qs

function getQuestions() {
  $.ajax({
    url: "/questions"
  })
    .done(function(response) {
      $("#questions-list").html("");
      for (var i = 0; i < response.length; i++) {
        var q = response[i];
        $("#questions-list").append(qTemplate(q));
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

//Add a new answer to a question
/*function addAnswer(answerText) {
  console.log("adding a new answer", answerText);
  $.ajax({
    method: "POST",
    url: "/questions/:qID/answers"
    contentType: "application/json",
    data: JSON.stringify({
      text: questionText
  })
}*/

// Event Bindisngs
$("#add-question-form").on("submit", function(e) {
  e.preventDefault();
  var questionText = $questionInput.val();
  addQuestion(questionText);
  $questionInput.val("");
});

$(".add-answer-form").on("submit", function(e) {
  e.preventDefault();
  var answerText = $answerInput.val();
  addAnswer(answerText);
  $answerInput.val("");
});
