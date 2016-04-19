window.onload = function() {
  var allQuestions = [
      {statement: "Who is often given credit for inventing cubism?", choices: ["Georges Braque", "Frida Kahlo", "Francis Picabia", "Marcel Duchamp"], correctAnswer:0},
      {statement: "Matisse died in 1954 leaving his ceiling covered with drawings. How come?", choices: ["After 60 years of paint fumes he wasn\'t \'all there\' towards the end.","He was doing preliminary sketches for a ceiling fresco.","He was bedridden and drew using a long stick.","He ran out of walls to draw on."], correctAnswer:2},
      {statement: "Q 3", choices: ["Q 3 A","Q 3 B","Q 3 C","Q 3 D"], correctAnswer:2},
      {statement: "Q 4", choices: ["Q 4 A","Q 4 B","Q 4 C","Q 4 D"], correctAnswer:3},
      {statement: "Q 5", choices: ["Q 5 A","Q 5 B","Q 5 C","Q 5 D"], correctAnswer:1},
      {statement: "Q 6", choices: ["Q 6 A","Q 6 B","Q 6 C","Q 6 D"], correctAnswer:0}
    ];

  var artQuiz = new Quiz(allQuestions);

  function Quiz(questions) {
    this.questions = questions;
    this.currentQuestion = questions[0];
    this.score = 0;
  }

  Quiz.prototype.nextQuestion = function(){
    var current = this.currentQuestion;
    var currentIndex = this.questions.indexOf(current);
    this.currentQuestion = this.questions[currentIndex + 1];
    questionUI.innerHTML = this.currentQuestion.statement;
  }

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

  // Next answer
  var nextButton = document.getElementById('nextBtn');
  nextButton.addEventListener('click', function() { artQuiz.nextQuestion() }, false);
};


/*Quiz.prototype.checkAnswer = function(){
if(document.getElementById(this.currentQuestion.correctAnswer).checked) {
this.score ++;
}
}*/
