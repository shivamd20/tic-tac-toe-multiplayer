import { Injectable } from "@angular/core";
import { GraphqlService } from "./graphql.service";
import { map } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})
export class RestService {

    constructor(private graphql: GraphqlService) { }
    updateState({key, data}) {

        console.log('updateState called');
     return   this.graphql.updateState(data,key).pipe(map(x=>{
        console.log('updateState called',x);
        return x.data.update_ttt_state.returning[0];

     }))
    }

    startGame() {
       return this.graphql.startGame().pipe(map(x=>{
        console.log('startGame called',x);
     return x.data.insert_ttt_state.returning[0];
       }));
    }

    getGames() {

        
        return this.graphql.getGames().pipe(map(x=>{
            console.log('get Games called',x);
         return  x.data.ttt_state;
        }));
    }


    joinGame(key) {
        return this.graphql.joinGame(key).pipe(map(x=>{
            console.log(key,"joining",JSON.stringify(x));
        return  x.data.ttt_state[0];
        }));
    }

}