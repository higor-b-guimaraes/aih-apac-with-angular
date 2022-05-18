import { NgModule } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { FileInputConfig, MaterialFileInputModule, NGX_MAT_FILE_INPUT_CONFIG } from 'ngx-material-file-input';
import { NgxMaskModule } from 'ngx-mask';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSidenavModule} from '@angular/material/sidenav';


const config: FileInputConfig = {
  sizeUnit: 'Octet'
};

@NgModule({
  imports: [NgxMaskModule.forRoot({
    dropSpecialCharacters: false,
  })],
  exports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MaterialFileInputModule,
    MatDialogModule,
    MatSidenavModule,
    NgxMaskModule,
  ],
  providers: [{ provide: NGX_MAT_FILE_INPUT_CONFIG, useValue: config }]
})

export class AppMaterialModule { }

