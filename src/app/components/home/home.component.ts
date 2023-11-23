import { Component, Input, OnInit } from '@angular/core';
import { Album, Banda, Musica } from 'src/app/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @Input() musicas: Musica[] = [];
  @Input() albuns: Album[] = [];
  @Input() bandas: Banda[] = [];

  constructor() {}

  ngOnInit() {}
}
