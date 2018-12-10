import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  turn = 'X';

cells :Array<Array<String>>;

winner;

  constructor(public gameService:GameService) { 

    this.cells=gameService.getCells();

  }


isPart(x,y){

  if(!this.winner) return false

  var a = this.winner[1], b = this.winner[2], c = this.winner[3], d = this.winner[4], e = this.winner[5], f = this.winner[6];



  if((x == a && y==b )  ||  (x == c && y==d )  ||  (x == e && y==f ) ) return true;
  


}


  ngOnInit() {
  }

  valueChange(a,b,c){

    if(this.winner) { return} 
    if(c==' ')
    {


      a[b] = this.turn;

    this.turn =  this.turn === 'X' ? 'O': 'X';

    this.gameService.setTurn(this.turn);

    if(this.gameService.checkForWinner() != undefined)
   this.winner = ( this.gameService.checkForWinner() );


  
  }

  }

}
