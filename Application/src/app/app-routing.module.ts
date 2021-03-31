import { LoginComponent } from './login/login.component';
import { OverviewComponent } from './overview/overview.component';


import { NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: OverviewComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  


  // otherwise redirect to login page 
  { path: '**', redirectTo: 'login' }
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents =[LoginComponent, OverviewComponent]
