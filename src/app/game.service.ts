import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestService } from './rest.service';



@Injectable({
  providedIn: 'root'
})
class State {

  key: number;

  private data = {



    cells: [

      [' ', ' ', ' '],

      [' ', ' ', ' '],

      [' ', ' ', ' '],

    ],

    turn: 'X',

    winner: null,

  }


  timeout;


  newKey(){


    this.rest.startGame().subscribe((d: any ) =>{


      console.log(d)
      this.key = d.key;


    }, e=>{

      console.log("newKey",e);

      
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





  }

  updateState(){


    console.log("updating");
    

    this.rest.updateState({


       key : this.key,
       data : JSON.stringify(this.data)


     }).subscribe(d=>{


      this.mergeState(d);


  }, e=>{


 console.log("update error",e)
    });


  }


  constructor(private rest: RestService) {

this.newKey()



setInterval(()=>{


  if(this.key )
  this.rest.joinGame(this.key).subscribe((d:any)=>{




if(d.data)

    this.mergeState(d);

    console.log('merged',d)

  },e=>{


 console.log("join error",e)

  });


},2000);


  }

  stateUpdated() {


    this.updateState();

    console.log(this.data);



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






  setTurn(t) {


    this.state.turn = t;

  }

  constructor(private state: State) {



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



  getCells() {

    return this.state.cells;

  }
}
