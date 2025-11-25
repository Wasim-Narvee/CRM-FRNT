import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CrmComponent } from './crmdata/crmdata.component';
// import { UsersComponent } from './users/users.component';
// import { VendorsComponent } from './vendors/vendors.component';

const routes: Routes = [
  { path: 'customers', component: CrmComponent },
  // { path: 'users', component: UsersComponent },
  // { path: 'vendors', component: VendorsComponent },

  // Default route → customers page
  { path: '', redirectTo: 'customers', pathMatch: 'full' },

  // Wildcard route (optional)
  { path: '**', redirectTo: 'customers' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
