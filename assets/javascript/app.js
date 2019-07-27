$(document).ready(function() {
    // question & answer array
   var questions = [
     {
      question: "What was the first video game coding language?",
      choices: ["Bandai - Code", "Konami - Code", "God - Code", "Comodore - Code"],
      correctAnswer: "Konami - Code",
      image: "picture"
    }, 
    {
      question: "Who is the villian in the Legend of Zelda Series?",
      choices: ["Bowser", "Wario", "Ganon", "Boo"],
      correctAnswer: "Ganon",
      image: "picture"
    }, 
    {
      question: "What year was the NES released in the US?",
      choices: ["1982", "1983", "1984", "1985"],
      correctAnswer: "1983",
      image: "picture"
    },
    {
      question: "How many Ninja Gaiden games are there currently?",
      choices: ["1", "2", "4", "5"],
      correctAnswer: "5",
      image: "picture"
    }, 
    {
      question: "Which Mario Bro. game was the first to use 'save place' format in the game?",
      choices: ["Super Mario Bros", "1", "2", "3"],
      correctAnswer: "3",
      image: "picture"
    },
    {
      question: "How many worlds are in the Origional Mario Bros.?",
      choices: ["5", "8", "10", "15"],
      correctAnswer: "8",
      image: "picture"
    }, 
    {
      question: "Which Nintendo system first released MarioTennis?",
      choices: ["NES", "SNES", "N64", "Nintendo Switch"],
      correctAnswer: "N64",
      image: "picture"
    },
    {
      question: "What year was the first Kirby game released ?",
      choices: ["1990", "1992", "1993", "1995"],
      correctAnswer: "1992",
      image: "picture"
    },
    {
      question: "which Legend of Zelda game has sold the most copies of all time world wide?",
      choices: ["Links Awakening", "A Link to the Past", "Ocharania of Time", "Majora's Mask"],
      correctAnswer: "Ocharania of Time",
      image: "picture"
    },
    {
      question: "When did the Nintendo corporation start?",
      choices: ["1979", "1980", "1886", "1982"],
      correctAnswer: "1886",
      image: "picture"
    }
    
  ];
    
var questionCounter = 0; // the question we're on
var time = 15;     // initial time for questions
var correctGuesses = 0; // keep tally of right guesses 
var incorrectGuesses = 0; // keep tally of wrong guesses 
  
function displayQuestion() {
	var question='', choice='', choices='', i=0;
	question = questions[questionCounter].question;
	choiceArray = questions[questionCounter].choices;
	 
	for (var i in choiceArray){
		  choice = questions[questionCounter].choices[i];
		  choices += "<p class='choices'>" + choice + "</p>";
	}
  $("#QuizArea").append("<p><strong>" +  question + "</strong></p>" + choices );
}
  // user guessed correctly
function userWin() {
    $("#QuizArea").html("<p>HUZZAH! </p>");
    correctGuesses++;
    var correctAnswer = questions[questionCounter].correctAnswer;
    $("#QuizArea").append("<p>Correct Answer: <span class='answer'>" + correctAnswer + "</span></p>" + questions[questionCounter].image);
    setTimeout(nextQuestion, 3000);
    questionCounter++;
}

  // user guessed incorrectly
function userLoss() {
    $("#QuizArea").html("<p>NERP!</p>");
    incorrectGuesses++;
    var correctAnswer = questions[questionCounter].correctAnswer;
    $("#QuizArea").append("<p>Correct Answer: <span class='answer'>" + correctAnswer + "</span></p>" + questions[questionCounter].image);
    setTimeout(nextQuestion, 3000);
    questionCounter++;
}

  // user ran out of time
function userTimeout() {
    if (time === 0) {
      $("#QuizArea").html("<p>Times Up!</p>");
      incorrectGuesses++;
      var correctAnswer = questions[questionCounter].correctAnswer;
      $("#QuizArea").append("<p>Correct Answer: <span class='answer'>" + correctAnswer + "</span></p>" + questions[questionCounter].image);
      setTimeout(nextQuestion, 3000);
      questionCounter++;
    }
}
  // screen that shows final score and nice message :)
function gameOverDisplay() {
    if (correctGuesses === questions.length) {
      var endMessage = "Perfection! Might want to go outside more tho";
      var bottomText = "#nerdalert!";
    }
    else if (correctGuesses > incorrectGuesses) {
      var endMessage = "Good work! But do better you can...";
      var bottomText = "all your base are belong to us";
    }
    else {
      var endMessage = "You seem to have taken an arrow to the knee";
      var bottomText = "#scrub";
    }
    $("#QuizArea").html("<p>" + endMessage + "</p>" + "<p><strong>Your Score: " + correctGuesses + " / " + incorrectGuesses + "</strong> </p>");
    $("#QuizArea").append("<h1 id='start'>Play Again?</h1>");
    $("#bottomText").html(bottomText);
    gameReset();
    $("#start").click(nextQuestion);
  }

 
  function timer() {
    clock = setInterval(countDown, 1000);
    function countDown() {
      if (time < 1) {
        clearInterval(clock);
        userTimeout();
      }
      if (time > 0) {
        time--;
      }
      $("#timer").html("<strong>" + time + "</strong>");
    }
  }

  // moves question counter forward to show next question
 function nextQuestion() {
    if (questionCounter < questions.length) {
      time = 15;
      $("#QuizArea").html("<p>Timer: <span id='timer'>" + time + "</span> ");
      displayQuestion();
      timer();
      userTimeout();
    }
    else {
      gameOverDisplay();
    }
  // console.log(questionCounter);
  // console.log(questions[questionCounter].correctAnswer);
 }
// reset score and counter parameters on restart
  function gameReset() {
    questionCounter = 0;
    correctGuesses = 0;
    incorrectGuesses = 0;
  }

function startGame() {
      $("#QuizArea").html("<p>Timer: <span id='timer'>" + time + "</span> ");
      $("#start").hide();
      // $("#QuizArea").append("<div id='question'>");
      // var nextQuestion = displayQuestion(questionCounter);
      // $("#QuizArea").append(nextQuestion);
    // $("#QuizArea").append("<p>" + questions[questionCounter].question + "</p><p>" + questions[questionCounter].choices[0] + "</p><p>" + questions[questionCounter].choices[1] + "</p><p>" + questions[questionCounter].choices[2] + "</p><p>" + questions[questionCounter].choices[3] + "</p>");
    // questionCounter++;
    displayQuestion();
    timer();
    userTimeout();
}

// this starts the game
$("#start").click(nextQuestion);

    // click function to trigger right or wrong screen
$("#QuizArea").on("click", ".choices", (function() {
    var userGuess = $(this).text();
    if (userGuess === questions[questionCounter].correctAnswer) {
      clearInterval(clock);
      userWin();
    }
    else {
      clearInterval(clock);
      userLoss();
    }
  }));
});