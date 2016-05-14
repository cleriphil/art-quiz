window.onload = function() {


  //Quiz constructor
  function Quiz(questions) {
    this.questions = questions;
  }


  Quiz.prototype.nextQuestion = function(){

    var noAnswer;
    var inputs = document.getElementsByTagName('input');
    for(x=0; x<inputs.length; x++){ //make sure there is a checked answer
       if (inputs[x].checked) {
         noAnswer = false;
         this.checkAnswer();
         inputs[x].checked = false;
         break;
       } else {
         noAnswer = true;
       }
     }

     if(noAnswer){
       warningMsg.innerHTML = 'Please select an answer';
     } else {
       warningMsg.innerHTML = '';
       var questions = this.questions;
       var index = questions.indexOf(this.currentQ);

       if (this.currentQ !== questions[questions.length-1]) {
           this.currentQ = questions[index + 1];
           populateQuestion(this.currentQ.statement);  //populate next question
           var currentChoices = this.currentQ.choices;
           populateChoices(currentChoices);
       } else {
         document.getElementById('quizContainer').style.display = 'none';
         scoreBox.innerHTML = '<span class="score">Score: ' + this.score + ' out of ' + questions.length + '</span>';
         scoreBox.style.display = 'block';
         startBtn.innerHTML = 'Try Again';
         startBtn.style.display = 'block';
       }
     }
  }

  Quiz.prototype.checkAnswer = function(){
    var correctA = "choice" + this.currentQ.correctAnswer;
    if(document.getElementById(correctA).checked) {
      this.score ++;
    }
  }

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
    //set currentQ and score to default
    artQuiz.currentQ = artQuiz.questions[0];
    artQuiz.score = 0;
    scoreBox.style.display = 'none';

    var firstQ = artQuiz.currentQ;
    var firstChoices = firstQ.choices;
    populateQuestion(firstQ.statement);
    populateChoices(firstChoices);
  }

  var populateQuestion = function(statement){
    questionUI.innerHTML = '<img src=' + statement + '>';
  };

  var populateChoices = function(choices){
    choice0.textContent = choices[0];
    choice1.textContent = choices[1];
    choice2.textContent = choices[2];
    choice3.textContent = choices[3];
  };


  //UI variables
  var questionUI = document.getElementById('question');
  var choice0 = document.getElementById('choice0').nextSibling;
  var choice1 = document.getElementById('choice1').nextSibling;
  var choice2 = document.getElementById('choice2').nextSibling;
  var choice3 = document.getElementById('choice3').nextSibling;
  var warningMsg = document.getElementById('warningMsg');
  var scoreBox = document.getElementById('scoreBox');

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

//refactor
//resize images/add images

//Show correct answers with descriptions
//Add lightbox to view image larger

//on hover add magnifying glass icon: <i class="fa fa-search-plus" aria-hidden="true"></i>
//make enter key work for next question

//user experience with input elements/make it select when clicking the label?
//hint
