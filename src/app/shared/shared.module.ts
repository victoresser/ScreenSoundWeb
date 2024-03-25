import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputFormFieldComponent } from './input-form-field/input-form-field.component';
import { HeaderLogoComponent } from './header-logo/header-logo.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
	declarations: [InputFormFieldComponent, HeaderLogoComponent, FooterComponent],
	imports: [CommonModule],
	exports: [InputFormFieldComponent, HeaderLogoComponent, FooterComponent],
})
export class SharedModule {}
