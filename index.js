var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function () {
    // console.log(event);
    // $("h1").text("Level 1");
    if (!started) {
        $("#level-title").text("level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function () {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    // $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    // var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    // audio.play();
    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }
    else {
        console.log("wrong");

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

function nextSequence() {

    userClickedPattern = [];
    level++;

    $("#level-title").text("level " + level);

    var randomNumber = Math.floor(Math.random() * 4);           // console.log(randomNumber);
    var randomChosenColour = buttonColours[randomNumber];       // console.log(randomChosenColour);
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

// nextSequence();

function playSound(name) {

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}















// function randomsoundgenerator(key){
//     switch (key) {
//         case blue:
//             var blue = new Audio("sounds/blue.mp3");
//             blue.play();
//             break;
//         case yellow:
//             var yellow = new Audio("sounds/yellow.mp3");
//             yellow.play();
//             break;
//         case green:
//             var green = new Audio("sounds/green.mp3");
//             green.play();
//             break;
//         case red:
//             var red = new Audio("sounds/red.mp3");
//             red.play();
//             break;
//         default:
//             console.log(randomChosenColour);
//             break;
//     }
// }
