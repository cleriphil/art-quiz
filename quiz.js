window.onload = function() {

  //Quiz constructor
  function Quiz(questions) {
    this.questions = questions;
    //this.currentQ = questions[0];
    //this.score = 0;
  }

  Quiz.prototype.nextQuestion = function(){
    this.checkAnswer();
    var questions = this.questions;
    var index = questions.indexOf(this.currentQ);
    if(index < questions.length - 1){
      this.currentQ = questions[index + 1];
    } else {
      document.getElementById('scoreContainer').innerHTML = '<span class="score">Score: ' + this.score + ' out of ' + questions.length + '</span>';
      document.getElementById('scoreContainer').style.display = 'block';
      document.getElementById('quizContainer').style.display = 'none';
      startBtn.style.display = 'block';
      startBtn.innerHTML = 'Try Again';

    }

    //populate next question
    populateQuestion(this.currentQ.statement);
    var currentChoices = this.currentQ.choices;
    populateChoices(currentChoices);

    //uncheck all radio buttons
    var radioBtns = document.getElementsByTagName('input');
    for(i=0;i<4;i++){
      radioBtns[i].checked = false;
    }
  }

  Quiz.prototype.checkAnswer = function(){
    var correctA = "choice" + this.currentQ.correctAnswer;
    if(document.getElementById(correctA).checked) {
    this.score ++;
    }
  }

  var initiateQuiz = function(){

    //set currentQ and score to default
    artQuiz.currentQ = artQuiz.questions[0];
    artQuiz.score = 0;
    document.getElementById('scoreContainer').style.display = 'none';

    var firstQ = artQuiz.currentQ;
    var firstChoices = firstQ.choices;
    populateQuestion(firstQ.statement);
    populateChoices(firstChoices);
  }

  var populateQuestion = function(statement){
    questionUI.innerHTML = statement;
  };

  var populateChoices = function(choices){
    choice0.textContent = choices[0];
    choice1.textContent = choices[1];
    choice2.textContent = choices[2];
    choice3.textContent = choices[3];
  };

  //create artQuiz object
  var allQuestions = [
    {statement: "Who is often given credit for inventing cubism?", choices: ["Georges Braque", "Frida Kahlo", "Francis Picabia", "Marcel Duchamp"], correctAnswer:0},
    {statement: "Matisse died in 1954 leaving his ceiling covered with drawings. How come?", choices: ["After 60 years of paint fumes he wasn\'t \'all there\' towards the end.","He was doing preliminary sketches for a ceiling fresco.","He was bedridden and drew using a long stick.","He ran out of walls to draw on."], correctAnswer:2},
    {statement: "Q 3", choices: ["Q 3 A","Q 3 B","Q 3 C","Q 3 D"], correctAnswer:2},
    {statement: "Q 4", choices: ["Q 4 A","Q 4 B","Q 4 C","Q 4 D"], correctAnswer:3},
    {statement: "Q 5", choices: ["Q 5 A","Q 5 B","Q 5 C","Q 5 D"], correctAnswer:1},
    {statement: "Q 6", choices: ["Q 6 A","Q 6 B","Q 6 C","Q 6 D"], correctAnswer:0}
  ];
  var artQuiz = new Quiz(allQuestions);

  //UI variables
  var questionUI = document.getElementById('question');
  var choice0 = document.getElementById('choice0').nextSibling;
  var choice1 = document.getElementById('choice1').nextSibling;
  var choice2 = document.getElementById('choice2').nextSibling;
  var choice3 = document.getElementById('choice3').nextSibling;

  //populate first question
  //initiateQuiz();

  //start quiz
  startQuiz = function(){
    document.getElementById('quizContainer').style.display = 'block';
    startBtn.style.display = 'none';
    initiateQuiz();
  };


  // Next question
  var nextButton = document.getElementById('nextBtn');
  nextButton.addEventListener('click', function() { artQuiz.nextQuestion() }, false);

  //start quiz
  var startBtn = document.getElementById('startQuiz');
  startBtn.addEventListener('click', startQuiz, false);


};
