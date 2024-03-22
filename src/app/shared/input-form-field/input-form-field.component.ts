/* eslint-disable @angular-eslint/no-input-rename */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/component-selector */
import {
	AfterViewInit,
	Component,
	EventEmitter,
	Input,
	OnChanges,
	OnInit,
	Optional,
	Output,
	Self,
	SimpleChanges,
} from '@angular/core';
import {
	AbstractControl,
	ControlValueAccessor,
	FormBuilder,
	FormControl,
	FormGroup,
	NgControl,
} from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import {
	TipoInputMode,
	TipoInputModeEnum,
} from '../model/tipo-input-mode.enum';

@Component({
	selector: 'input-form-field',
	templateUrl: './input-form-field.component.html',
	styleUrl: './input-form-field.component.scss',
})
export class InputFormFieldComponent
	implements OnInit, OnChanges, AfterViewInit, ControlValueAccessor
{
	/**
	 * @param appearance => Define a aparência do input, por padrão é 'outline';
	 * @param required => Define se o input é obrigatório;
	 * @param disabled => Define se o input ficará desabilitado;
	 * @param mask => Define se o input tem uma máscara;
	 * @param type => Define o tipo do input, por padrão o tipo é 'text';
	 * @param iconInput => Define se deverá apresentar um ícone para o input, por padrão é 'false';
	 */

	label!: string;
	internalForm!: FormGroup;
	hide = true;
	hideValue = false;

	pattern: string = '';
	inputMode: string = '';

	private _required: boolean = false;
	@Input() labelChanged: any;
	@Input() labelDefault: any;
	@Input() appearance: MatFormFieldAppearance = 'outline';
	@Input() disabled = false;
	@Input() mask: string = '';
	@Input() type: string = 'text';
	@Input() maxLength: string = '';
	@Input('inputMode') inputModeEnum: TipoInputModeEnum | TipoInputMode | null =
		null;

	@Output() actionBlur: EventEmitter<any> = new EventEmitter();
	@Output() actionKeyUp: EventEmitter<any> = new EventEmitter();
	@Output() actionFocus: EventEmitter<any> = new EventEmitter();
	@Output() actionKeypress: EventEmitter<any> = new EventEmitter();
	@Output() actionKeyDown: EventEmitter<any> = new EventEmitter();

	get value(): any {
		return this.typeableField?.value;
	}

	@Input() set value(newValue: any) {
		this.typeableField.setValue(newValue);
	}

	private get typeableField(): AbstractControl<any, any> {
		return this.internalForm.get('typeableInput')!;
	}

	private _onChange: (value: any) => void = () => {};
	private _onTouched: () => void = () => {};

	constructor(
		private formBuilder: FormBuilder,
		@Optional() @Self() public ngControl: NgControl
	) {
		if (this.ngControl != null) {
			this.ngControl.valueAccessor = this;
		}
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (
			changes?.['labelDefault']?.previousValue !==
			changes?.['labelDefault']?.currentValue
		) {
			this.label = this.labelDefault;
			this.labelChanged = this.labelChanged
				? this.labelChanged
				: this.labelDefault;
		}
	}

	ngOnInit(): void {
		this.label = this.labelDefault;
		this.createForm();
		if (this.inputModeEnum) {
			const { type, inputMode, pattern } =
				TipoInputModeEnum.obterConfiguracaoDoInput(this.inputModeEnum!);
			this.inputMode = inputMode;
			this.type = type;
			this.pattern = pattern ?? '';
		}
		this.hideValue = this.type === 'password' ? true : false;
		this.labelChanged = this.labelChanged
			? this.labelChanged
			: this.labelDefault;
	}
	ngAfterViewInit(): void {
		throw new Error('Method not implemented.');
	}
	writeValue(obj: any): void {
		this.typeableField?.setValue(obj);
	}
	registerOnChange(fn: any): void {
		this._onChange = fn;
	}
	registerOnTouched(fn: any): void {
		this._onTouched = fn;
	}
	setDisabledState?(isDisabled: boolean): void {
		if (isDisabled) {
			this.typeableField?.disable();
			return;
		}

		this.typeableField?.enable();
	}

	hasInputSuccess() {
		throw new Error('Not implemented method');
	}

	hasInputError() {
		throw new Error('Method not implemented.');
	}

	createForm() {
		this.internalForm = this.formBuilder.group({
			typeableInput: new FormControl(
				{
					value: this.ngControl?.control?.value,
					disabled: this.ngControl?.control?.disabled,
				},
				this.ngControl?.control?.validator
			),
		});

		this.internalForm.get('typeableInput')?.valueChanges.subscribe((valor) => {
			this._onChange(valor);
			if (this.typeableField?.touched) {
				this._onTouched();
			}

			this.tryPropagateMaskError();
		});
	}

	private tryPropagateMaskError(): void {
		if (!this.ngControl?.control) {
			return;
		}

		if (this.typeableField!.hasError('mask')) {
			this.ngControl?.control.setErrors({
				mask: this.typeableField!.errors!['mask'],
				...this.ngControl?.control.errors,
			});
		}
	}

	onKeyDown(event: KeyboardEvent) {
		let tipoInput = this.inputModeEnum;

		if (tipoInput && typeof tipoInput === 'string') {
			tipoInput = TipoInputMode.obterEnum(tipoInput);
		}

		if (tipoInput === TipoInputModeEnum.number) {
			const regex = /^\d+$/;
			const key = event.key;
			const allowedKeys = [
				'Backspace',
				'ArrowLeft',
				'ArrowRight',
				'Delete',
				'Tab',
				'Enter',
			];
			if (!(allowedKeys.includes(key) || regex.test(key))) {
				event.preventDefault();
				return;
			}

			if (!allowedKeys.includes(key) && this.value?.length >= +this.maxLength) {
				event.preventDefault();
				return;
			}
		}

		this.actionKeyDown.emit(event);
	}
}
