import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';

const routes: Routes = [
  // {path: 'start', loadChildren: ()=>import('').then((m)=>m.)},
  { path: 'landing', component: LandingComponent },
  { path: '', pathMatch: 'full', redirectTo: 'landing' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
