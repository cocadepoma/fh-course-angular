import { Component } from '@angular/core';

@Component({
    selector: 'app-body',
    templateUrl: 'body.component.html'
})

export class BodyComponent {

    mostrar: boolean = false;
    phrase: any = {
        message: 'Un gran poder requiere una gran responsabilidad',
        author: 'Ben Parker'
    };

    personajes: string[] = ['Spiderman', 'Venom', 'Dr.Octopus'];
}