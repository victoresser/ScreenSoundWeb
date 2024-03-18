import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
	selector: 'app-login-form',
	templateUrl: './login-form.component.html',
	styleUrl: './login-form.component.scss',
})
export class LoginFormComponent implements OnInit {
	appearance: MatFormFieldAppearance = 'outline';
	logo = '../../../../assets/ScreenSound/default_transparent.svg';
	public loginForm: FormGroup = this.fb.group({});

	constructor(private fb: FormBuilder, private loginService: LoginService) {}

	ngOnInit(): void {
		this.loginForm = this.fb.group({
			usuario: ['', [Validators.required]],
			senha: ['', [Validators.required]],
		});
	}

	Login(form: FormGroup) {
		this.loginForm.reset();
		this.loginService.postLogin(form.value);
	}
}
