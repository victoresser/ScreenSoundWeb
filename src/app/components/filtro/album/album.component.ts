import { NonNullAssert } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { Album } from 'src/app/interfaces';
import { AlbumService } from 'src/app/services/album/album.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css'],
})
export class AlbumComponent implements OnInit {
  @Input() albuns: Album[] = [];
  filtro: string = '';
  isHovered: number | null = null;

  constructor(private albumService: AlbumService) {}

  ngOnInit(): void {}

  carregarAlbuns() {
    this.albumService.listar(this.filtro).subscribe((album) => (this.albuns = album));
  }

  onMouseOver(index: number) {
    this.isHovered = index;
  }

  onMouseOut() {
    this.isHovered = null;
  }
}
