
// 1. display question
//User interface
//create element node
//create text node
//add text node to element node
//then, append to #question

// 2. check answer and calculate score
// artQuiz.guess(____);

// 3.  click next to go through quiz
//artQuiz.nextQuestion();

var allQuestions = [{question: "Who is often given credit for inventing cubism?", choices: ["Georges Braque", "Frida Kahlo", "Francis Picabia", "Marcel Duchamp"], correctAnswer:0},{question: "Matisse died in 1954 leaving his ceiling covered with drawings. How come?", choices: ["After 60 years of paint fumes he wasn\'t \'all there\' towards the end.","He was doing preliminary sketches for a ceiling fresco.","He was bedridden and drew using a long stick.","He ran out of walls to draw on."], correctAnswer:2}];

function Quiz(questions) {
  this.questions = questions;
  this.currentQuestion = questions[0];
  this.score = 0;
}

Quiz.prototype.nextQuestion = function(){
  var current = this.currentQuestion;
  var currentIndex = this.questions.indexOf(current);
  this.currentQuestion = this.questions[currentIndex + 1]
}

Quiz.prototype.guess = function(choice) {
  if (this.questions.indexOf(choice) === this.currentQ.correctAnswer) {
    this.score++;
  }
}

artQuiz = new Quiz(allQuestions);
