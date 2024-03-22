/* eslint-disable @typescript-eslint/no-namespace */
export enum TipoInputModeEnum {
	text,
	decimal,
	numeric,
	tel,
	search,
	email,
	url,
	password,
	number,
	letterNumberOnly,
}

export type TipoInputMode =
	| 'text'
	| 'decimal'
	| 'numeric'
	| 'tel'
	| 'search'
	| 'email'
	| 'url'
	| 'password'
	| 'number'
	| 'letterNumberOnly';

export namespace TipoInputMode {
	export function obterEnum(tipo: TipoInputMode): TipoInputModeEnum {
		switch (tipo) {
			case 'text':
				return TipoInputModeEnum.text;
			case 'decimal':
				return TipoInputModeEnum.decimal;
			case 'numeric':
				return TipoInputModeEnum.numeric;
			case 'tel':
				return TipoInputModeEnum.tel;
			case 'search':
				return TipoInputModeEnum.search;
			case 'email':
				return TipoInputModeEnum.email;
			case 'url':
				return TipoInputModeEnum.url;
			case 'password':
				return TipoInputModeEnum.password;
			case 	'number':
				return TipoInputModeEnum.number;
			case 'letterNumberOnly':
				return TipoInputModeEnum.letterNumberOnly;
			default:
				return TipoInputModeEnum.text;
		}
	}
}

export namespace TipoInputModeEnum {
  export function obterConfiguracaoDoInput(tipoInput: TipoInputModeEnum | TipoInputMode): { type: string; inputMode: string; pattern?: string } {
    if (tipoInput && typeof tipoInput === 'string') {
      tipoInput = TipoInputMode.obterEnum(tipoInput);
    }
    switch (tipoInput) {
      case TipoInputModeEnum.text:
        return {
          type: 'text',
          inputMode: 'text'
        };
      case TipoInputModeEnum.decimal:
        return {
          type: 'text',
          inputMode: 'decimal'
        };
      case TipoInputModeEnum.numeric:
        return {
          type: 'text',
          inputMode: 'numeric',
          pattern: "[0-9]*"
        };
      case TipoInputModeEnum.tel:
        return {
          type: 'tel',
          inputMode: 'tel'
        };
      case TipoInputModeEnum.search:
        return {
          type: 'search',
          inputMode: 'search'
        };
      case TipoInputModeEnum.email:
        return {
          type: 'email',
          inputMode: 'email'
        };
      case TipoInputModeEnum.url:
        return {
          type: 'url',
          inputMode: 'url'
        };
      case TipoInputModeEnum.password:
        return {
          type: 'password',
          inputMode: 'text'
        };
      case TipoInputModeEnum.number:
        return {
          type: 'text',
          inputMode: 'numeric',
          pattern: "[0-9]*"
        };
      case TipoInputModeEnum.letterNumberOnly:
        return {
          type: 'text',
          inputMode: 'text',
          pattern: "[a-zA-Z0-9]*"
        };
    }
  }
}
