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
    this.currentQ = questions[0];
    this.score = 0;
  }

  Quiz.prototype.nextQuestion = function(){
    var questions = this.questions;
    var index = questions.indexOf(this.currentQ);
    this.currentQ = questions[index + 1];
    populateQuestion(this.currentQ.statement);
    var currentChoices = this.currentQ.choices;
    populateChoices(currentChoices);

  }

  var firstQ = artQuiz.currentQ;
  var firstChoices = firstQ.choices;

  var questionUI = document.getElementById('question');

  var choice0 = document.getElementById('choice0');
  var choice1 = document.getElementById('choice1');
  var choice2 = document.getElementById('choice2');
  var choice3 = document.getElementById('choice3');

  var populateQuestion = function(statement){
    questionUI.innerHTML = statement;
  };

  var populateChoices = function(choices){
    choice0.nextSibling.textContent = choices[0];
    choice1.nextSibling.textContent = choices[1];
    choice2.nextSibling.textContent = choices[2];
    choice3.nextSibling.textContent = choices[3];
  };

  populateQuestion(firstQ.statement);
  populateChoices(firstChoices);

  //var choicesUI = document.getElementById('choices');
  // Cycle through choices and add radio button for each
  /*for(i=0; i<4; i++) {
    var choice = allChoices[i];
    var choiceLi = document.createElement('li');
    choiceLi.setAttribute('id', 'choice' + i);
    choicesUI.appendChild(choiceLi);
    choiceLi.innerHTML = "<input type=\'radio\' id=\'" + i + "\'name=\'action\' value=\'" + i + "\'><label for=\'" + i + "\'>" + choice + "</label><br/>";

  }*/

  // Next answer
  var nextButton = document.getElementById('nextBtn');
  nextButton.addEventListener('click', function() { artQuiz.nextQuestion() }, false);
};


/*Quiz.prototype.checkAnswer = function(){
if(document.getElementById(this.currentQ.correctAnswer).checked) {
this.score ++;
}
}*/
