import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateAfspraakComponent } from './create-afspraak/create-afspraak.component';
import { ListAfspraakComponent } from './list-afspraak/list-afspraak.component';
import { KlantComponent } from './klant/klant.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'acceuil', component: HomeComponent },
  { path: 'create-afspraak', component: CreateAfspraakComponent },
  { path: 'list-afspraak', component: ListAfspraakComponent }, // New route for listing afspraken
  { path: 'clients', component: KlantComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
