window.onload = function() {

  //Quiz constructor
  function Quiz(questions) {
    this.questions = questions;
  }

  Quiz.prototype.nextQuestion = function(){
//go through each choice and makes sure one is checked?

  var inputs = document.getElementsByTagName('input');
    if(inputs[0].checked === true || inputs[1].checked === true || inputs[2].checked === true || inputs[3].checked === true){

      warningMsg.innerHTML = '';

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
    } else {
      warningMsg.innerHTML = 'Please select an answer';
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
    questionUI.innerHTML = '<img src=' + statement + ' width="500">';
  };

  var populateChoices = function(choices){
    choice0.textContent = choices[0];
    choice1.textContent = choices[1];
    choice2.textContent = choices[2];
    choice3.textContent = choices[3];
  };

  //create artQuiz object
  var allQuestions = [
    {statement: "images/question_1.jpg", choices: ["Gustave Courbet", "Paul Gauguin", "Jean-François Millet", "Édouard Manet"], correctAnswer:3, description:""},
    {statement: "images/question_2.jpg", choices: ["Hendrick Goltzius","Giovanni Battista Piranesi","Albrecht Durer","Odilon Redon"], correctAnswer:1, description:""},
    {statement: "images/question_3.jpg", choices: ["Matthias Grünewald","Rogier van der Weyden","Jan Gossart","Jan van Eyck"], correctAnswer:3, description:"Portrait of Margareta van Eyck<br/>  1439<br/>  Oil on wood, 32,6 x 25,8 cm<br/> Groeninge Museum, Bruges"},
    {statement: "images/question_4.jpg", choices: ["Masaccio","Sandro Botticelli","Giovanni Bellini","Giorgione"], correctAnswer:1, description:"Virgin and Child with Young St John the Baptist<br/> 1470-75<br/>  Wood, 90 x 67 cm<br/>  Musée du Louvre, Paris"},
    {statement: "images/question_5.jpg", choices: ["Pieter Bruegel the Elder","Lucas Cranach the Elder","Hieronymus Bosch","Jan Gossart"], correctAnswer:0, description:"The Tower of Babel<br/> 1563<br/> Oil on oak panel, 114 x 155 cm<br/> Kunsthistorisches Museum, Vienna"},
    {statement: "images/question_6.jpg", choices: ["Pierre-Auguste Renoir","Mary Cassatt","Edgar Degas","Berthe Morisot"], correctAnswer:3, description:"The Cheval-Glass<br/> 1877-79<br/> Oil on canvas, 65 x 54 cm<br/> Museo Thyssen-Bornemisza, Madrid"}
  ];
  var artQuiz = new Quiz(allQuestions);

  //UI variables
  var questionUI = document.getElementById('question');
  var choice0 = document.getElementById('choice0').nextSibling;
  var choice1 = document.getElementById('choice1').nextSibling;
  var choice2 = document.getElementById('choice2').nextSibling;
  var choice3 = document.getElementById('choice3').nextSibling;
  var warningMsg = document.getElementById('warningMsg');

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

//disable next button if nothing is checked -complete-
//refactor everything
//resize images/add images
//Styling
//Change next button to font awesome
