import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { CellComponent } from './cell/cell.component';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import { StartGameComponent } from './start-game/start-game.component';
import { FormsModule } from '@angular/forms';

import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink, HttpLinkHandler } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { TestGraphComponent } from './test-graph/test-graph.component';
import {WebSocketLink} from 'apollo-link-ws';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { SubscriptionClient } from 'subscriptions-transport-ws';


const routes: Routes = [
  {
    path: '',
    component:StartGameComponent
  },
  {
    path: 'game',
    component: BoardComponent
  },
  {
    path: 'graphql',
    component : TestGraphComponent
  }
];


@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    CellComponent,
    StartGameComponent,
    TestGraphComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ApolloModule,
    HttpLinkModule

  ],
  providers: [{
    provide: APOLLO_OPTIONS,
    useFactory: (httpLink: HttpLink) => {
      const handler: HttpLinkHandler = httpLink.create({
        uri: 'https://ramu420.herokuapp.com/v1alpha1/graphql',
        headers: new HttpHeaders({'x-hasura-admin-secret': 'ramu'})
      });

      // const wsLink = new WebSocketLink({
      //   uri: `wss://ramu420.herokuapp.com/v1alpha1/graphql`,
      //   options: {
      //     lazy: true,
      //     reconnect: true,
      //     connectionParams: async () => {
      //       return {
      //         headers: {
      //           'x-hasura-admin-secret': 'ramu',
      //         },
      //       }
      //     },
      //   },
      // })

      const WS_URL = `wss://ramu420.herokuapp.com/v1alpha1/graphql`;

      const wsLink = new WebSocketLink(
        new SubscriptionClient(WS_URL, {
          reconnect: true,
          timeout: 9000,
          connectionParams: {
            headers: {
              'x-hasura-admin-secret': 'ramu',
            }
          }
        })
      );

      const link = split(
        // split based on operation type
        ({ query }) => {
          const { kind, operation } = getMainDefinition(query);
          console.log(kind, operation, query)
          return kind === 'OperationDefinition' && operation === 'subscription';
        },
       wsLink,
        handler,
      );
      return {
        cache: new InMemoryCache(),
        link: link,
      };
    },
    deps: [HttpLink]
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
