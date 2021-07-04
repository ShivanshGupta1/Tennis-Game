class Player {
    constructor() {
        this.index = null;
        this.name = null;
        this.score = 0;
        this.x = 0;
        this.y = 0;
    }
    getCount(){
        database.ref("playerCount").on("value",(data)=>{
            playerCount = data.val();
        })
    }
    getPlayerInfo(){
        database.ref("players").on("value",(data)=>{
            allPlayers = data.val()
        })
        
  
    }

    updateBall(x,y){
        database.ref("ball").set({"x":x,"y":y})
    }
    readBall(){
        database.ref("ball").on("value",(data)=>{
            ballinfo = data.val();
        })
    }
    updateCount(count){
        database.ref("/").update({"playerCount":count})
    }
    update(){
        database.ref("players/player"+player.index).set({"name":this.name,"score":this.score,"x":this.x,"y":this.y})
    }


}