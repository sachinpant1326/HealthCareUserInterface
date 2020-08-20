import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { HomeComponent } from './home/home.component';
import { AdminGuard } from './guards/admin.guard';
import { PatientGuard } from './guards/patient.guard';
import { CenterGuard } from './guards/center.guard';


const routes: Routes = [
  { path : 'home', component : HomeComponent},
  { path : 'user', loadChildren : () => import('./user/user.module').then(module => module.UserModule)},
  { path : 'admin', loadChildren : () => import('./admin/admin.module').then(module => module.AdminModule), canLoad : [AdminGuard]},
  { path : 'patient', loadChildren : () => import('./patient/patient.module').then(module => module.PatientModule ), canLoad : [PatientGuard]},
  { path : 'center', loadChildren : () => import('./center/center.module').then(module => module.CenterModule), canLoad : [CenterGuard]},
  { path : 'not-found', component : NotFoundComponent },
  { path : 'error', component : ServerErrorComponent },
  { path : '', redirectTo : '/home', pathMatch : 'full'},
  { path : '**', redirectTo : '/not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
