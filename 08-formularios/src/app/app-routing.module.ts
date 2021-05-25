import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ReactiveeComponent } from './pages/reactivee/reactivee.component';
import { TemplateComponent } from './pages/template/template.component';

const routes: Routes = [

  {path:'home', component: HomeComponent },
  {path:'template', component: TemplateComponent },
  {path:'reactive', component: ReactiveeComponent },
  {path:'**', pathMatch: 'full', redirectTo: 'home' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
