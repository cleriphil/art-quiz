window.onload = function() {

  var quizModule = (function() {
    'use strict';

    //Quiz constructor
    function Quiz(questions) {
      this.questions = questions;
    }

    Quiz.prototype.nextQuestion = function(){
         var questions = this.questions;
         var index = questions.indexOf(this.currentQ);
         if (this.currentQ !== questions[questions.length-1]) {
             this.currentQ = questions[index + 1];
             var question = this.currentQ;
             populateQuestion(question.image, question.choices);  //populate next question
         } else {
           this.showScore();
         }
    };

    Quiz.prototype.validateChoice = function(){
      var inputs = document.getElementsByTagName('input');
      for(var x=0; x<inputs.length; x++){
         if (inputs[x].checked) {
           this.checkAnswer();
           inputs[x].checked = false;
           this.nextQuestion();
           warningMsg.textContent = '';
           return true;
         }
       }
      warningMsg.textContent = 'Please select an answer';
    };

    Quiz.prototype.checkAnswer = function(){
      var correctA = "choice" + this.currentQ.correctAnswer;
      if(document.getElementById(correctA).checked) {
        this.score ++;
      }
    };

    Quiz.prototype.calculateScore = function(){
      var correctAnswers = this.score;
      var numQuestions = this.questions.length;
      return Math.ceil((correctAnswers/numQuestions) * 100);
    };

    Quiz.prototype.showScore = function(){
      quizContainer.style.display = 'none';
      scoreBox.innerHTML = '<span class="score">Score: ' + this.calculateScore() + '% </span>';
      scoreBox.style.display = 'block';
      startBtn.textContent = 'Try Again';
      startBtn.style.display = 'block';
    };

    var artQuiz;
    function fetchJSONFile(path, callback) {
        var httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = function() {
            if (httpRequest.readyState === 4 || httpRequest.readyState === 0) {
                if (httpRequest.status === 200 || httpRequest.status === 0) {
                    var data = JSON.parse(httpRequest.responseText);
                    if (callback) callback(data);
                }
            }
        };
        httpRequest.open('GET', path);
        httpRequest.send();
    }

    fetchJSONFile('quizdata.json', function(data){
      artQuiz = new Quiz(data.quizdata.allQuestions);
    });

    var initiateQuiz = function(){
      artQuiz.currentQ = artQuiz.questions[0];
      artQuiz.score = 0;
      scoreBox.style.display = 'none';
      var firstQ = artQuiz.currentQ;
      populateQuestion(firstQ.image, firstQ.choices);
    };

    var populateQuestion = function(image, choices){
      questionUI.innerHTML = '<img src=' + image + '>';
      choice0.textContent = choices[0];
      choice1.textContent = choices[1];
      choice2.textContent = choices[2];
      choice3.textContent = choices[3];
    };

    var getId = function(id) {
      return document.getElementById(id);
    };

    // UI variables
    var questionUI = document.getElementById('question');
    var quizContainer = document.getElementById('quizContainer');
    var choice0 = document.getElementById('choice0').nextSibling;
    var choice1 = document.getElementById('choice1').nextSibling;
    var choice2 = document.getElementById('choice2').nextSibling;
    var choice3 = document.getElementById('choice3').nextSibling;
    var warningMsg = document.getElementById('warningMsg');
    var scoreBox = document.getElementById('scoreBox');

    // Start quiz
    var startQuiz = function(){
      quizContainer.style.display = 'block';
      startBtn.style.display = 'none';
      initiateQuiz();
    };

    //When clicking on label, check its closest input

    // Next question
    var nextButton = document.getElementById('nextBtn');
    nextButton.addEventListener('click', function() { artQuiz.validateChoice(); }, false);

    window.addEventListener("keydown", submitOnEnter, false);

    function submitOnEnter(e) {
        if (e.keyCode == "13") {
            artQuiz.validateChoice();
        }
    }

    var inputChoices = document.getElementsByTagName('input');
    inputChoices[0].addEventListener('keydown', function() { artQuiz.validateChoice(); }, false);
    //also on enter key

    // Start quiz
    var startBtn = document.getElementById('startQuiz');
    startBtn.addEventListener('click', startQuiz, false);

  }());
};

//python -m SimpleHTTPServer 8000
