var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;

var bestScore = 0;


$(document).keydown(function(event) {
  if (!started && (event.key == "a" || event.key == "A" ) ){
    nextSequence();
    started = true;
  }
});



$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  //2. Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length - 1);
});




//1. Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {

  //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    if (bestScore < level) {
             bestScore = level;
             $("#best-score span").text(bestScore);
         }
    // console.log(userClickedPattern);
    // console.log(gamePattern);

    //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length) {
  console.log("full success");
      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function() {
        userClickedPattern=[];
        nextSequence();
      }, 1000);

    }

  } else {
$("#level-title").html("Game over !Press A to Restart!");
playSound("wrong");

$("body").addClass('game-over');

setTimeout(function(){
  $('body').removeClass('game-over');
},200);

startOver();
    // console.log(userClickedPattern);
    // console.log(gamePattern);

  }

}
function startOver(){
  level=0;
  gamePattern=[];
    userClickedPattern=[];
  started=false;
}


function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];
  $("#level-title").html("Level " + level);
  level++;
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}


function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}



function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");


  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);

}
