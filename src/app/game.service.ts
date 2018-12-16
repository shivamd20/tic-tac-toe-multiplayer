import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestService } from './rest.service';
import { Router } from '@angular/router';
import { StateService } from './state.service';





@Injectable({
  providedIn: 'root'
})

export class GameService {


  checkForDraw(){


    for(let i=0;i<3;i++)
    for(let j=0;j<3;j++){

     if( this.getCells()[i][j] == ' '){


      return false;

     }
      

    }

    return true;


  }
  

  public me = 'X';

  constructor(private state: StateService, private router: Router) {



    this.state.fetchGames();
  
  
      this.state.onUpdate = ()=>{
  
        if(!this.state.winner)
        this.checkForWinner();
  
      }
  
    }

  get key(){

    return this.state.key;

  }


  startPolling(){


    return this.state.startPolling();

  }

  get secondPlayerJoined(){

    return this.state.secondPlayerJoined;
  }


startGame(key){

  this.state.initialize();

  if(key) { 
    

    //join game
    
    this.state.key = key; 

    this.state.secondPlayerJoined = true;
  

    this.state.joinGame(key, (d:any)=>{

    console.log(key, d);

    this.state.updateState(()=>{


    this.router.navigateByUrl('/game');

    this.me = 'O';


    });


    });


    return;
  
  }else{

  this.state.newKey((d)=>{ 


    this.router.navigateByUrl('/game');


   this.me = 'X';


   });
  
  
  
  }


}


get games(){


  return this.state.games;
}

get turn(){

  return this.state.turn;
}

  set turn(t) {


    this.state.turn = t;

    console.log('turn',t);
    

  }



  arrCheck(a, b, c, d) {



    if (this.state.cells[a][b] === ' ') return false;


    if (this.state.cells[c][d] === ' ') return false;

    if (this.state.cells[a][b] === this.state.cells[c][d]) return true;

    else return false;

  }

  getWinner() {

    return this.checkForWinner();
  }



  check(a) {



    if (this.arrCheck(0, 0, 0, 1) && this.arrCheck(0, 0, 0, 2) && this.state.cells[0][0] == a)
      return [a, 0, 0, 0, 1, 0, 2];

    if (this.arrCheck(1, 0, 1, 1) && this.arrCheck(1, 0, 1, 2) && this.state.cells[1][0] == a)
      return [a, 1, 0, 1, 1, 1, 2];

    if (this.arrCheck(2, 0, 2, 1) && this.arrCheck(2, 0, 2, 2) && this.state.cells[2][0] == a)
      return [a, 2, 0, 2, 1, 2, 2];


    if (this.arrCheck(0, 0, 1, 0) && this.arrCheck(0, 0, 2, 0) && this.state.cells[0][0] == a)
      return [a, 0, 0, 1, 0, 2, 0];

    if (this.arrCheck(0, 1, 1, 1) && this.arrCheck(0, 1, 2, 1) && this.state.cells[0][1] == a)
      return [a, 0, 1, 1, 1, 2, 1];


    if (this.arrCheck(0, 2, 1, 2) && this.arrCheck(0, 2, 2, 2) && this.state.cells[0][2] == a)
      return [a, 0, 2, 1, 2, 2, 2];

    if (this.arrCheck(0, 0, 1, 1) && this.arrCheck(1, 1, 2, 2) && this.state.cells[0][0] == a)
      return [a, 0, 0, 1, 1, 2, 2];

    if (this.arrCheck(2, 0, 1, 1) && this.arrCheck(1, 1, 0, 2) && this.state.cells[2][0] == a)
      return [a, 2, 0, 1, 1, 0, 2];

  }

  

reset(draw){



  if(draw){


  var turn = this.state.turn;
  
      this.state.initialize();
  
      this.state.secondPlayerJoined = true;
  
      this.state.turn = turn;
  
      this.state.stateUpdated();
    
    }
else
  setTimeout(()=>{


var turn = this.state.turn;

    this.state.initialize();

    this.state.secondPlayerJoined = true;

    this.state.turn = turn;

    this.state.stateUpdated();
  },
  
  
  4000);
}

  checkForWinner() {


    var x = this.check('X');
    if (x instanceof Array) this.state.winner = x;



    var y = this.check('O');
    if (y instanceof Array) this.state.winner = y;

    var draw :boolean;

    if(this.state.winner == null)  { 
      
      draw =this.checkForDraw();

      if(draw)
      {
        
        console.log('draw');
      
        this.reset(true);
      

      }

      
    
    }else {


      console.log('won');
      this.reset(false);

    } 





    return this.state.winner;


  }

  get winner(){

    return this.state.winner;

  }



  getCells() {

    return this.state.cells;

  }
}
