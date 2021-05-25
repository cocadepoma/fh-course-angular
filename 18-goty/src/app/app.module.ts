import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Custom Components
import { ComponentsModule } from './components/components.module';

// Pages
import { InicioComponent } from './pages/inicio/inicio.component';
import { GotyComponent } from './pages/goty/goty.component';

@NgModule({
  declarations: [AppComponent, InicioComponent, GotyComponent],
  imports: [BrowserModule, AppRoutingModule, ComponentsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
