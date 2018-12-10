import { Injectable } from "@angular/core";
import { HttpClient,HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
  })

  export class GameState{





  }
  
export class RestService{



    readonly urlString:string = "http://127.0.0.1:8080";

    constructor(private http: HttpClient) {
    }
  

 

    updateState(){




    }

    startGame(){




    }


    joinGame() :Observable<GameState>{


        const params : HttpParams = new HttpParams();

        params.append("key","1006");

        return this.http.request("GET",this.urlString,{responseType:"json",params});

    }

}