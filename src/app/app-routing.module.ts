import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FiltroComponent } from './components/filtro/filtro.component';
import { AlbumComponent } from './components/filtro/album/album.component';
import { BandaComponent } from './components/filtro/banda/banda.component';
import { MusicaComponent } from './components/filtro/musica/musica.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'home',
	},
	{ path: 'home', component: HomeComponent },
	{ path: 'login', component: LoginComponent },
	{
		path: 'filtro',
		component: FiltroComponent,
		children: [
			{ path: 'musicas', component: MusicaComponent },
			{ path: 'albuns', component: AlbumComponent },
			{ path: 'bandas', component: BandaComponent },
		],
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes), RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
