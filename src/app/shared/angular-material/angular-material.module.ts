import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
	declarations: [],
	imports: [CommonModule],
	exports: [
		MatFormFieldModule,
		MatDialogModule,
		MatButtonModule,
		MatInputModule
	],
})
export class AngularMaterialModule {}
