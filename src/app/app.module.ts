import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateAfspraakComponent } from './create-afspraak/create-afspraak.component';
import { ListAfspraakComponent } from './list-afspraak/list-afspraak.component';
import { ClientsComponent } from './clients/clients.component';
import { KlantComponent } from './klant/klant.component';
import { ListKlantComponent } from './list-klant/list-klant.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CreateAfspraakComponent,
    ListAfspraakComponent,
    ClientsComponent,
    KlantComponent,
    ListKlantComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
