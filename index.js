var colors = ["red", "blue", "green", "yellow"];

var sequence = [];
var userPattern = [];
var gameStarted = false;
var level = 0;

function nextSequence() {
    userPattern = [];
    level = level + 1;
    $("h1").text("Level " + level);
    var number = Math.floor(Math.random() * 4);
    var chosenColor = colors[number];
    sequence.push(chosenColor);
    buttonAnimation(chosenColor);

}

$(".btn").click(function (event) {
    var userClickedColor = event.target.id;
    userPattern.push(userClickedColor);
    buttonAnimation(userClickedColor);
    $(event.target).addClass("pressed");
    setTimeout(function () {
        $(event.target).removeClass("pressed");
    }, 100);
    checkAnswer(userPattern.length - 1);
});

function buttonAnimation(chosenColor) {
    $("#" + chosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    var sound = new Audio("sounds/" + chosenColor + ".mp3");
    sound.play();
}

function checkAnswer(currentLevel) {

    if (sequence[currentLevel] === userPattern[currentLevel]) {

        if (userPattern.length === sequence.length) {

            setTimeout(function () {
                nextSequence();
            }, 1000);

        }

    } else {

        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        wrongAudio = new Audio("sounds/wrong.mp3");
        wrongAudio.play();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        startOver();

    }

}

function startOver() {
    level = 0;
    sequence = [];
    gameStarted = false;
}

$(document).keydown(function (event) {
    if (! gameStarted) {
        $("h1").text("Level " + level);
        nextSequence(level);
        gameStarted = true;
    }
});
