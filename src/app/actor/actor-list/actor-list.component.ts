import { Component, Input, OnInit } from '@angular/core';
import { Actor } from '../Actor';

@Component({
  selector: 'app-actor-list',
  standalone: false,
  templateUrl: './actor-list.component.html',
  styleUrls: ['./actor-list.component.css'],
})
export class ActorListComponent implements OnInit {
  @Input() actors: Actor[] = [];
  constructor() {}

  ngOnInit(): void {}
}
