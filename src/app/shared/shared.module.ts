import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { InputFormFieldComponent } from './common/input-form-field/input-form-field.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
	declarations: [
		InputFormFieldComponent
	],
	imports: [MatFormFieldModule, CommonModule, BrowserAnimationsModule],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {}
