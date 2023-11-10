import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarrosselComponent } from './components/carrossel/carrossel.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { IgxCarouselModule, IgxSliderModule } from 'igniteui-angular';
import { HeaderLogoComponent } from './components/header-logo/header-logo.component';
import { FooterComponent } from './components/footer/footer.component';
import { DownloadsComponent } from './components/downloads/downloads.component';

@NgModule({
  declarations: [
    AppComponent,
    CarrosselComponent,
    HeaderLogoComponent,
    FooterComponent,
    DownloadsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    IgxCarouselModule,
    IgxSliderModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
