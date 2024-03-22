import {
  MatDialogConfig
} from '@angular/material/dialog';

const configModal =
  (
   configuracao?: MatDialogConfig
   ): MatDialogConfig => {
    return {
      panelClass: 'modal-md',
      ...configuracao
    };
   };

   export default configModal;
