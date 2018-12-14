import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { CellComponent } from './cell/cell.component';
import { HttpClientModule } from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import { StartGameComponent } from './start-game/start-game.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component:StartGameComponent
  },
  {
    path: 'game',
    component: BoardComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    CellComponent,
    StartGameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
