var buttonColors = ["red","blue","green","yellow"]

var gamePattern = []
var userClickedPattern = []

var level = 0
var started = false;

//STEP-1: press any key to start and generate next sequence
$(document).keypress(function() {
    if(!started) {
        $("#level-title").text("Level "+level); //we are replacing the text with level
        started = true
        nextSequence()
    }
})

//STEP-2: update userClickedPattern to none during every nextSequence call
function nextSequence() {
    userClickedPattern = []
    level++
    $("#level-title").text("Level "+level)
    var randomNumber = Math.floor(Math.random()*4)
    var randomChosenColor = buttonColors[randomNumber]
    gamePattern.push(randomChosenColor)

    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor)
}

$(".btn").click(function() {
    var userChosenColor = $(this).attr("id")
    userClickedPattern.push(userChosenColor)

    playSound(userChosenColor)
    animatePress(userChosenColor)
    checkAnswer(userClickedPattern.length-1)
})

function animatePress(currentColor) {
    $("#"+currentColor).addClass("pressed")
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed")
    },100)
}

function playSound(name) {
    var audio = new Audio("sounds/"+name+".mp3")
    audio.play()
}

function checkAnswer(currentLevel) {
    //first check if the user has pressed all the colors in gamePattern array
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if(gamePattern.length === userClickedPattern.length) {
            setTimeout(function(){
                nextSequence()
            }, 1000)
        }
    }
    else {
        playSound("wrong")
        $("body").addClass("game-over")
        $("#level-title").text("Game over, press any key to Restart")

        setTimeout(function() {
            $("body").removeClass("game-over")
        }, 200)

        startOver()
    }
}

function startOver() {
    level = 0
    gamePattern = []
    started = false
}