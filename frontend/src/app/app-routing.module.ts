import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componentes
import { ListProductsComponent } from './components/list-products/list-products.component';
import { AddEditProductComponent } from './components/add-edit-product/add-edit-product.component';
import { LoginComponent } from './components/login/login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { AuthGuard } from './utils/auth.guard';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { AddEditUserComponent } from './components/add-edit-user/add-edit-user.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signIn', component: SignInComponent },
  { path: 'list-products', component: ListProductsComponent, canActivate: [AuthGuard] },
  { path: 'add', component: AddEditProductComponent, canActivate: [AuthGuard] },
  { path: 'edit/:id', component: AddEditProductComponent },
  { path: 'list-users', component: ListUsersComponent, canActivate: [AuthGuard] },
  { path: 'add-user', component: AddEditUserComponent, canActivate: [AuthGuard] },
  { path: 'edit-user/:id', component: AddEditUserComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
