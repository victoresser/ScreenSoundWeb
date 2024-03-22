import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputFormFieldComponent } from './input-form-field/input-form-field.component';



@NgModule({
  declarations: [
		InputFormFieldComponent
	],
  imports: [
    CommonModule,
		SharedModule
  ],
	exports: [

	]
})
export class SharedModule { }
