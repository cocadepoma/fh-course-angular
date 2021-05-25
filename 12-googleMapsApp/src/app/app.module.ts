import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { MaterialModule } from "./material.module";

import { MapaComponent } from "./components/mapa/mapa.component";
import { MapaEditarComponent } from "./components/mapa/mapa-editar.component";

import { AgmCoreModule } from "@agm/core";

import { ReactiveFormsModule, FormsModule } from "@angular/forms";

@NgModule({

    declarations: [
        AppComponent,
        MapaComponent,
        MapaEditarComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
        AgmCoreModule.forRoot({
            apiKey: "AIzaSyAG--PB-378EucgiEhprXRmLCs1WKanXPA",
        }),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule { }
