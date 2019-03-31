import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

export interface RestEndPoints {

  updateState(data): Observable<any>;
  startGame(): Observable<any>;
  getGames(): Observable<any>;
  getGames(): Observable<any>;
  joinGame(key): Observable<any>;

}


@Injectable({
  providedIn: 'root'
})
export class GraphqlService implements RestEndPoints {

  constructor(private apollo: Apollo) {

  }
  key = 'ac4d5a2f-7e70-45f8-b359-a9833b68fef4';

  updateState(data: any, key: string = this.key): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`mutation($key: uuid, $data:String){
        update_ttt_state(where:{
          key: {
            _eq: $key
          }
        }, _set:{
          data: $data
        })
        {
          affected_rows
          returning{
            key
            data
        }
        }
      }`,
      variables: {
        key: key,
        data: data
      }
    },
    );
  }
  startGame(): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`mutation($data: String) {
        insert_ttt_state(objects: {data: $data}) {
          returning {
            data
            key
          }
          affected_rows
        }
      }
      `,
      variables: {
        data: undefined
      }
    },
    );
  }
  getGames(): Observable<any> {
    return this.apollo.subscribe({
      query: gql`subscription($key: uuid){
        ttt_state{
          data
          key
        }
      }`
    },
  );
  }

  joinGame(key): Observable<any> {
    return this.apollo.subscribe({
      query: gql`subscription($key: uuid){
        ttt_state(where:{key:{
          _eq: $key
        }}){
          data
          key
        }
      }`,
      variables: {
        key: this.key
      }
    },
    );
  }

}


