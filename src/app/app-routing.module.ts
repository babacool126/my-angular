import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FormPageComponent } from './form-page/form-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'form', component: FormPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
