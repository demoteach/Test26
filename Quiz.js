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
    fill("black")
    textSize(30);
    text("RESULT",400,60);
    //call getContestantInfo( ) here
    Contestant.getPlayerInfo();
    //write condition to check if contestantInfor is not undefined
    if(allContestants!==undefined){
      var display_position=220;

      for(var plr in allContestants){
          display_position = display_position+40;
          textSize(30);
          text(allContestants[plr].name,220,display_position);

        var correctAns = "2";
        if(correctAns === allContestants[plr].answer)
           fill("Green")
          else
           fill("Red")
      }     
     fill("Blue");
     textSize(20);
     text("*NOTE: Contestant who answered correct are highlighted in green color!",160,450);
    }
  }

}
