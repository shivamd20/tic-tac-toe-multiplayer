import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";


@Injectable({
    providedIn: 'root'
})



export class RestService {


    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
        })
      };

    readonly urlString: string = "http://127.0.0.1:7000/game/";

    constructor(private http: HttpClient) {
    }




    updateState(data) {



     return   this.http.put(this.urlString, data,this.httpOptions);


    }

    startGame() {


     return   this.http.post(this.urlString, {
    
    });
       





    }


    joinGame(key) {


        const params: HttpParams = new HttpParams();

        params.append("key", key);

        return this.http.request("GET", this.urlString + "?key=" + key, { responseType: "json", params });

    }

}