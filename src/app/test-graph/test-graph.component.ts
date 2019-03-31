import { Component, OnInit } from '@angular/core';
import { GraphqlService } from '../graphql.service';

@Component({
  selector: 'app-test-graph',
  templateUrl: './test-graph.component.html',
  styleUrls: ['./test-graph.component.css']
})
export class TestGraphComponent implements OnInit {
  games: [] = [];

  constructor(private graphql: GraphqlService) {
    this.graphql.fetchGame().subscribe(d => {
      this.games = d.data.ttt_state;
    }, e => {
      console.log(e);
    });

    this.graphql.updateState('rrr').subscribe(d => console.log(
      d
    ), e => console.log(e)
    );
  }

  ngOnInit() {
  }

}
