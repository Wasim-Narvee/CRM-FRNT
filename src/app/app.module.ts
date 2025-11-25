import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CrmComponent } from './crmdata/crmdata.component';
import { AddCustomerDialogComponent } from './add-customer-dialog/add-customer-dialog.component';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// HTTP
import { HttpClientModule } from '@angular/common/http';

// Angular Material Modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    CrmComponent,
    AddCustomerDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    // 🔥 Must have for API calls
    HttpClientModule,

    FormsModule,
    ReactiveFormsModule,

    // Material
    MatToolbarModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatSnackBarModule,

    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
