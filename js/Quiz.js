class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //write code here to hide question elements
    question.hide();  
    //write code to change the background color here
    background("yellow");

    //write code to show a heading for showing the result of Quiz
    textSize(20);
    fill("black")
    text("RESULT OF THE QUIZ",350,50);
    //call getContestantInfo( ) here
    Contestant.static.getPlayerInfo();


    //write condition to check if contestantInfor is not undefined
if(allContestants !== undefined){
   //write code to add a note here
fill("black");
textSize(20);
text("*NOTE: Contestant who ansewered correct are highlighted in green color!",130,230);
  
}


    //write code to highlight contest who answered correctly
    for(var i in allContestants){
      var correctAns = "2";
      if(correctAns === allContestants[i].answer){
        fill("green");
      }
      else{
        fill("red");
      }
    }
  }

}
