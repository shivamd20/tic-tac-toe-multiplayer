import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GameService } from '../game.service';



@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit {

  constructor() { }

  @Input()
  isPart:boolean;

  @Input()
  readonly value : String;

  @Input()
  winner : String;

      @Output() valueChange  = new EventEmitter();

      click(){

        if(this.winner) return 


        this.valueChange.emit(this.value);



      }

  ngOnInit() {


  }


 get getClass(){


if(this.winner){
  if(this.isPart  && this.value == 'O') return "cell clickedY       slideanim";
  else if (this.isPart ) return " cell clickedX       slideanim";

}



  if(this.value == 'O') return "cell clickedY";
  else if (this.value == 'X') return " cell clickedX";


    return "cell"
  }

}
