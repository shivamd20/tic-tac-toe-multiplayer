import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestService } from './rest.service';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
class State {

  key: number;

  games:Array<any>=[];

  onUpdate= () => {};

  fetchGames(){

    this.rest.getGames().subscribe((d:any)=>{

      this.games = d;


    }, e =>{


      console.log(e);
      



    });

    return 


  }

  initialize(){


    this.data = {

      secondPlayerJoined : false,


      cells: [
  
        [' ', ' ', ' '],
  
        [' ', ' ', ' '],
  
        [' ', ' ', ' '],
  
      ],
  
      turn: 'X',
  
      winner: null,
  
    }
  



  }

  private data;

  timeout;





  joinGame(key, fn){


  if(key )
  this.rest.joinGame(key).subscribe((d:any)=>{

if(d.data)
{

  console.log('ramu');
  

  this.key = key;

    this.mergeState(d);
  
    this.onUpdate();
  }
  else{

  fn(d.data);  

  }


  },e=>{



  });



  }


  newKey(fn){


    this.rest.startGame().subscribe((d: any ) =>{


      this.key = d.key;


      fn(d)


    }, e=>{

      fn();

      
    })


  }  

  mergeState(d){



    var data = JSON.parse(d.data);
 
   
    for(let i=0; i<3 ;i++)
    for(let j=0;j<3;j++){


      if( this.data.cells[i][j] != data.cells[i][j])

      this.data.cells[i][j] = data.cells[i][j];

    }


   this.data.turn = data.turn;

   this.data.secondPlayerJoined = data.secondPlayerJoined;


  }

  updateState(fn){

    


    this.onUpdate();
    

    this.rest.updateState({


       key : this.key,
       data : JSON.stringify(this.data)


     }).subscribe(d=>{


      this.mergeState(d);

      fn();


  }, e=>{


 console.log("update error",e)
    });


  }

  startPolling(){






return setInterval(()=>{

  this.joinGame(this.key, ()=>{

    
  })




},800);



  }


  constructor(private rest: RestService) {

    this.initialize();

  }

  stateUpdated() {


    this.updateState(()=>{});

    console.log(this.data);



  }


  get secondPlayerJoined(){


    return this.data.secondPlayerJoined;

  }

  set secondPlayerJoined(j){

    this.data.secondPlayerJoined =j;

  }

  get turn() {


    return this.data.turn;


  }

  get cells() {


    return this.data.cells;


  }

  get winner() {

    return this.data.winner;

  }

  set turn(turn) {

    this.data.turn = turn;
    this.stateUpdated();

  }

  set winner(w) {


    this.data.winner = w;

    this.stateUpdated();


  }

  set cells(cells) {


    this.data.cells = cells;

    this.stateUpdated();


  }


}




@Injectable({
  providedIn: 'root'
})

export class GameService {


  public me = 'X';



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

  constructor(private state: State, private router: Router) {



  this.state.fetchGames();


    this.state.onUpdate = ()=>{

      if(!this.state.winner)
      this.checkForWinner();

    }

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


  checkForWinner() {


    var x = this.check('X');
    if (x instanceof Array) this.state.winner = x;



    var y = this.check('O');
    if (y instanceof Array) this.state.winner = y;


    return this.state.winner;


  }

  get winner(){

    return this.state.winner;

  }



  getCells() {

    return this.state.cells;

  }
}
