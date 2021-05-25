import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProvinciasService } from 'src/app/services/provincias.service';
import { ValidadoresService } from 'src/app/services/validadores.service';

@Component({
  selector: 'app-reactivee',
  templateUrl: './reactivee.component.html',
  styleUrls: ['./reactivee.component.css']
})
export class ReactiveeComponent implements OnInit {

  form: FormGroup;
  provincias: any[] = [];


  constructor( private fb: FormBuilder,
               private provinciasService: ProvinciasService,
               private validadores: ValidadoresService) {

    this.crearFormulario();
    this.cargarDatosFormulario();
    this.crearListeners();

  }

  ngOnInit(): void {
    this.provinciasService.getProvincias().subscribe( (provincias:any) => {
      
      for(let i in provincias.facet_groups[0].facets) {
        this.provincias.push(provincias.facet_groups[0].facets[i].name)                      
      }
      this.provincias.sort();
      this.form.get('direccion.provincia').setValue(null);
      
    });
    
  }

  get nombreNoValido() {
    return this.form.get('nombre').invalid && this.form.get('nombre').touched;
  }
  get apellidoNoValido() {
    return this.form.get('apellido').invalid && this.form.get('apellido').touched;
  }
  get emailNoValido() {
    return this.form.get('correo').invalid && this.form.get('correo').touched;
  }
  get usuarioNoValido () {
    return this.form.get('usuario').invalid && this.form.get('usuario').touched;
  }
  get provinciaNovalida() {
    if(this.form.get('direccion.provincia').touched && this.form.get('direccion.provincia').value == null) {
      return true;
    } else {
      return this.form.get('direccion.provincia').invalid && this.form.get('direccion.provincia').touched;
    }
  }
  get ciudadNoValida() {
    return this.form.get('direccion.ciudad').invalid && this.form.get('direccion.ciudad').touched;
  }

  get pasatiempos (){
    return this.form.get('pasatiempos') as FormArray;
  }

  get pass1NoValida() {
    return this.form.get('pass1').invalid && this.form.get('pass1').touched;
  }
  get pass2NoValida() {
    const pass1 = this.form.get('pass1').value;
    const pass2 = this.form.get('pass2').value;

    return (pass1 === pass2) ? false : true;
  }

  // nombre: ['valorPorDefecto', validadorSíncrono, validadorAsíncrono]
  crearFormulario() {
    this.form = this.fb.group({
      nombre  : ['', [Validators.required, Validators.minLength(3)] ],       
      apellido: ['', [Validators.required, Validators.minLength(3), this.validadores.noHerrera] ],
      usuario: ['', Validators.minLength(3) , this.validadores.existeUsuario],
      correo  : ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      pass1: ['', Validators.required],
      pass2: ['', Validators.required],
      direccion: this.fb.group({
        provincia: [null, Validators.required] ,
        ciudad   : ['', Validators.required]
      }),
      pasatiempos: this.fb.array([
      ])
    }, {
      validators: this.validadores.passwordsIguales('pass1', 'pass2')
    });
  }
  crearListeners() {
    this.form.valueChanges.subscribe (valor => {
      //console.log(valor);
    });

    this.form.statusChanges.subscribe (valor => {
      //console.log(valor);
    });
    this.form.get('nombre').valueChanges.subscribe(console.log);
  }
  cargarDatosFormulario(){

    this.form.reset({
      nombre: 'Paco',
      apellido: 'Rodriguez',
      correo: 'paco@paco.es',
      pass1: '123',
      pass2: '123',
      direccion: {
        provincia: '',
        ciudad: 'Vila-real'
      }
    });

    // ['Comer', 'Dormir'].forEach(valor => this.pasatiempos.push(this.fb.control(valor)));
    // this.form.get('nombre').setValue('pepe');
    // this.form.get('apellido').setValue('loco');
    // this.form.get('correo').setValue('pepe@loco.es');
    // this.form.get('direccion.ciudad').setValue('Valencia');
  
  }

  agregarPasatiempo() {
    this.pasatiempos.push( this.fb.control('Nuevo elemento'));
  }
  borrarPasatiempo(i:number) {
    this.pasatiempos.removeAt(i);
  }
  guardar() {

    if( this.form.invalid ) {

      return Object.values( this.form.controls).forEach(control => {
        control.markAllAsTouched();
        
      });

    }
    this.form.reset('');
  }

}
