import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestService } from './rest.service';


class State {

  key : String;



  stateUpdated(){

    console.log(this);//TODO 

  }


  private data = {



    cells: [

      [' ', ' ', ' '],

      [' ', ' ', ' '],

      [' ', ' ', ' '],

    ],

    turn: 'X',

    winner: undefined,

  }



  get turn() {


    return this.data.turn;


  }

  get cells() {


    return this.data.cells;


  }

  get winner(){

    return this.data.winner;

  }

  set turn(turn) {

    this.data.turn = turn;
    this.stateUpdated();

  }

  set winner(w){


    this.stateUpdated();
    this.data.winner = w;


  }

  set cells(cells) {


    this.stateUpdated();
    this.data.cells = cells;


  }


}



@Injectable({
  providedIn: 'root'
})


export class GameService {


  state: State = new State();



  setTurn(t) {


    this.state.turn = t;

  }

  constructor() {



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


    console.log(x, y)

    return this.state.winner;


  }



  getCells() {

    return this.state.cells;

  }
}
