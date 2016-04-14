
/*Quiz.prototype.checkAnswer = function(){
  if(document.getElementById(this.currentQuestion.correctAnswer).checked) {
    this.score ++;
  }
}*/

window.onload = function() {

  function Quiz(questions) {
    this.questions = questions;
    this.currentQuestion = questions[0];
    this.score = 0;
  }

  Quiz.prototype.nextQuestion = function(){
    var current = this.currentQuestion;
    var currentIndex = this.questions.indexOf(current);
    this.currentQuestion = this.questions[currentIndex + 1];
    return this.currentQuestion;
  }

  var allQuestions = [{statement: "Who is often given credit for inventing cubism?", choices: ["Georges Braque", "Frida Kahlo", "Francis Picabia", "Marcel Duchamp"], correctAnswer:0},{statement: "Matisse died in 1954 leaving his ceiling covered with drawings. How come?", choices: ["After 60 years of paint fumes he wasn\'t \'all there\' towards the end.","He was doing preliminary sketches for a ceiling fresco.","He was bedridden and drew using a long stick.","He ran out of walls to draw on."], correctAnswer:2}];
  artQuiz = new Quiz(allQuestions);

  var currentQ = artQuiz.currentQuestion;
  var allChoices = currentQ.choices;
  var questionUI = document.getElementById('question');
  var choicesUI = document.getElementById('choices');

  questionUI.innerHTML = currentQ.statement;

  // Cycle through choices and add radio button for each
  for(i=0; i<4; i++) {
    var choice = allChoices[i];
    var choiceLi = document.createElement('li');
    choiceLi.setAttribute('id', 'choice' + i);
    choicesUI.appendChild(choiceLi);
    choiceLi.innerHTML = "<input type=\'radio\' id=\'" + i + "\'name=\'action\' value=\'" + i + "\'>" + choice + "<br/>";
  }

  var nextButton = document.getElementById('nextBtn');
  nextButton.addEventListener('click', function() { artQuiz.nextQuestion() }, false);
  //nextButton.addEventListener('click', function() { artQuiz.nextQuestion.bind(artQuiz) }, false);
};

//After submitting answer
//artQuiz.checkAnswer();

//http://stackoverflow.com/questions/14285748/using-addeventlistener-on-prototype
