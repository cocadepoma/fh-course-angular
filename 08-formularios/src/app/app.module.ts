import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Importar cuando necesitemos que angular tome el control de los formularios FormsModule: template, Reactive: reactivos
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemplateComponent } from './pages/template/template.component';
import { ReactiveeComponent } from './pages/reactivee/reactivee.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    TemplateComponent,
    ReactiveeComponent,
    HomeComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
