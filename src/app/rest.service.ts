import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";


//   "outputPath": "/Users/shivamdwivedi/Documents/workspace-sts-3.9.5.RELEASE/multiplayer/src/main/resources/static/",
        

@Injectable({
    providedIn: 'root'
})



export class RestService {


    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
        })
      };

    readonly urlString: string = "https://multiii.herokuapp.com/game/";

    constructor(private http: HttpClient) {
    }


    



    updateState(data) {



     return   this.http.put(this.urlString, data,this.httpOptions);


    }

    startGame() {


     return   this.http.post(this.urlString, {
    
    });
    
    }

    getGames() {


        const params: HttpParams = new HttpParams();

        

        return this.http.request("GET", this.urlString , { responseType: "json" });

    }


    joinGame(key) {


        const params: HttpParams = new HttpParams();

        params.append("key", key);

        return this.http.request("GET", this.urlString + "" + key, { responseType: "json", params });

    }

}