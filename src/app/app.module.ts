import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { IgxCarouselModule, IgxSliderModule } from 'igniteui-angular';
import { FooterComponent } from './components/footer/footer.component';
import { FiltroComponent } from './components/filtro/filtro.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TopfiveComponent } from './components/home/topfive/topfive.component';
import { CarrosselComponent } from './components/home/carrossel/carrossel.component';
import { HeaderLogoComponent } from './components/header-logo/header-logo.component';
import { DownloadsComponent } from './components/home/downloads/downloads.component';
import { NovidadesComponent } from './components/home/novidades/novidades.component';
import { MusicaComponent } from './components/filtro/musica/musica.component';
import { AlbumComponent } from './components/filtro/album/album.component';
import { BandaComponent } from './components/filtro/banda/banda.component';
import { AddComponent } from './components/filtro/add/add.component';
import { SearchComponent } from './components/filtro/search/search.component';
import { EditComponent } from './components/filtro/edit/edit.component';

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
		FiltroComponent,
		MusicaComponent,
		AlbumComponent,
		BandaComponent,
		AddComponent,
		SearchComponent,
		EditComponent,
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		FormsModule,
		IgxCarouselModule,
		IgxSliderModule,
		InfiniteScrollModule,
		ToastrModule.forRoot(),
	],
	providers: [],
	bootstrap: [AppComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
