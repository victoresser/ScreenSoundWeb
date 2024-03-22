import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { IgxCarouselModule, IgxSliderModule } from 'igniteui-angular';
import { FooterComponent } from './components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TopfiveComponent } from './components/home/topfive/topfive.component';
import { CarrosselComponent } from './components/home/carrossel/carrossel.component';
import { HeaderLogoComponent } from './components/header-logo/header-logo.component';
import { DownloadsComponent } from './components/home/downloads/downloads.component';
import { NovidadesComponent } from './components/home/novidades/novidades.component';
import { BandaComponent } from './components/filtro/banda/banda.component';
import { MusicaComponent } from './components/filtro/musica/musica.component';
import { AlbumComponent } from './components/filtro/album/album.component';
import { AddComponent } from './components/filtro/add/add.component';
import { EditComponent } from './components/filtro/edit/edit.component';
import { SearchComponent } from './components/filtro/search/search.component';
import { FiltroComponent } from './components/filtro/filtro.component';
import { ExcluirModalComponent } from './components/filtro/modal/excluir-modal/excluir-modal.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { LoginComponent } from './components/login/login.component';
import { LoginFormComponent } from './components/login/login-form/login-form.component';
import {
	ErrorStateMatcher,
	ShowOnDirtyErrorStateMatcher,
} from '@angular/material/core';
import { CardMusicaComponent } from './components/filtro/musica/card-musica/card-musica.component';
import { CardBandaComponent } from './components/filtro/banda/card-banda/card-banda.component';
import { CardAlbumComponent } from './components/filtro/album/card-album/card-album.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http, 'src/assets/i18n', 'json');
}
import { SharedModule } from './shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
		BandaComponent,
		MusicaComponent,
		AlbumComponent,
		AddComponent,
		EditComponent,
		SearchComponent,
		FiltroComponent,
		ExcluirModalComponent,
		LoginComponent,
		LoginFormComponent,
		CardMusicaComponent,
		CardBandaComponent,
		CardAlbumComponent,
	],
	imports: [
		SharedModule,
		BrowserModule,
		HttpClientModule,
		AppRoutingModule,
		ReactiveFormsModule,
		BrowserAnimationsModule,
		FormsModule,
		IgxCarouselModule,
		IgxSliderModule,
		InfiniteScrollModule,
		ToastrModule.forRoot({}),
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient],
			},
		}),
	],
	providers: [
		{
			provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
			useValue: { appearance: 'outline', color: 'primary' },
		},
		{ provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
	],
	bootstrap: [AppComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
