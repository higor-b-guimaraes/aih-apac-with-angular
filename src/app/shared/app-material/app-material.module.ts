import { NgModule } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { NgxMaskModule } from 'ngx-mask';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import { FileInputConfig, MaterialFileInputModule, NGX_MAT_FILE_INPUT_CONFIG } from 'ngx-material-file-input';
import {MatSelectModule} from '@angular/material/select';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

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
    MatListModule,
    MatToolbarModule,
    MatTableModule,
    MatSelectModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    NgxMaskModule,
  ],
  providers: [{ provide: NGX_MAT_FILE_INPUT_CONFIG, useValue: config }]
})

export class AppMaterialModule { }

