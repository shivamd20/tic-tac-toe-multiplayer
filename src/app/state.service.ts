import { Injectable } from '@angular/core';
import { RestService } from './rest.service';



@Injectable({
  providedIn: 'root'
})
export class StateService {

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

