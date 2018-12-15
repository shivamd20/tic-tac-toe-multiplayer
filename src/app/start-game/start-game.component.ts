import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-start-game',
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.css']
})
export class StartGameComponent implements OnInit {


  key:string ;

  constructor(private gameService:GameService) { }


  

  startGame(key){


    this.gameService.startGame(key);


  }

  ngOnInit() {
  }




}
