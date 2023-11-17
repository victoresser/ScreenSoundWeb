import { Component, Input, OnInit } from '@angular/core';
import { Musica } from 'src/app/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  @Input() musicas: Musica[] = []

  constructor() {}

  ngOnInit() {}
}
