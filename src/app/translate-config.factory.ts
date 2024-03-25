import { HttpClient } from "@angular/common/http";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

export class TranslateModuleConfigFactory {
	public static createForRoot() {
		return TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: translateModuleLoaderFactory,
				deps: [HttpClient]
			}
		})
	}
}

export function translateModuleLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http, 'src/assets/i18n', 'json');
}
