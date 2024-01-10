import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
	providedIn: 'root',
})
export class NotificationService {
	constructor(private toastr: ToastrService) {
		this.toastr.toastrConfig.preventDuplicates = true;
		this.toastr.toastrConfig.progressBar = true;
		this.toastr.toastrConfig.progressAnimation = 'decreasing';
	}
}
