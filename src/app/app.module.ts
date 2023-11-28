import { TopfiveComponent } from './components/home/topfive/topfive.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarrosselComponent } from './components/home/carrossel/carrossel.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { IgxCarouselModule, IgxSliderModule } from 'igniteui-angular';
import { HeaderLogoComponent } from './components/header-logo/header-logo.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { DownloadsComponent } from './components/home/downloads/downloads.component';
import { NovidadesComponent } from './components/home/novidades/novidades.component';
import { HttpClientModule } from '@angular/common/http';
import { MusicaComponent } from './components/filtro/musica/musica.component';
import { AlbumComponent } from './components/filtro/album/album.component';
import { BandaComponent } from './components/filtro/banda/banda.component';
import { FiltroComponent } from './components/filtro/filtro.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CarrosselComponent,
    HeaderLogoComponent,
    FooterComponent,
    DownloadsComponent,
    NovidadesComponent,
    TopfiveComponent,
    MusicaComponent,
    AlbumComponent,
    BandaComponent,
    FiltroComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    IgxCarouselModule,
    IgxSliderModule,
    InfiniteScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
