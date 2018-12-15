import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameService } from '../game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit, OnDestroy {

cells :Array<Array<String>>;



polling ;


ngOnDestroy(): void {

  clearInterval(this.polling);

}

  constructor(public gameService:GameService , public router: Router) { 

    if(!gameService.key) router.navigateByUrl('/');

    this.cells=gameService.getCells();

 

  }


isPart(x,y){

  if(!this.gameService.winner) return false

  var a = this.gameService.winner[1], b = this.gameService.winner[2], c = this.gameService.winner[3], d = this.gameService.winner[4], e = this.gameService.winner[5], f = this.gameService.winner[6];



  if((x == a && y==b )  ||  (x == c && y==d )  ||  (x == e && y==f ) ) return true;
  


}


  ngOnInit() {


  this.polling = this.gameService.startPolling();


  }

  myTurn(){


    return this.gameService.turn === this.gameService.me;
  }

  valueChange(a,b,c){

    if(!this.gameService.secondPlayerJoined) return;

    if(this.gameService.me != this.gameService.turn){


      return;

    }

    if(this.gameService.winner) { return} 
    if(c==' ')
    {


      a[b] = this.gameService.turn;

    this.gameService.turn =  this.gameService.turn === 'X' ? 'O': 'X';

  

    if(this.gameService.checkForWinner() != undefined)
   this.gameService.checkForWinner() ;


  
  }

  }

}
