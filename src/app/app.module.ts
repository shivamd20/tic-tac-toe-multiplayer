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
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { TestGraphComponent } from './test-graph/test-graph.component';

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
    FormsModule

  ],
  providers: [{
    provide: APOLLO_OPTIONS,
    useFactory: (httpLink: HttpLink) => {

    const  headers = new HttpHeaders();

    headers.append('x-hasura-admin-secret', 'ramu');

      return {
        cache: new InMemoryCache(),
        link: httpLink.create({
          uri: 'https://ramu420.herokuapp.com/v1alpha1/graphql',
          headers
        })
      }
    },
    deps: [HttpLink]
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
