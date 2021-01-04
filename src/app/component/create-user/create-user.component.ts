import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { Perfil } from 'src/app/models/Perfil';
import { PeriodicElement } from 'src/app/models/PeriodicElement';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/service/user.service';
import swal from 'sweetalert2'
import { UpdateUserComponent } from '../update-user/update-user.component';
import { validarQueSeanIguales } from './app.validator';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  registrarAuto: FormGroup;
  detalleCita: any;
  events: string[] = [];
  date: any;
  fecha: any;
  datos: PeriodicElement = {};

  minDate: Date;
  maxDate: Date;

  servicios:any = [];
  ciudades: any = [];
  tipoDocumento: any = {};
  tipoUsuario: any = {};
  idCiudad: any = {};
  idDepartment: any = {};
  confPassword: any = {};
  department:any = [];

  dataTypeUser: User[];


  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<UpdateUserComponent>,
              public dialog: MatDialog,
              public service: UserService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              ) {
                const currentYear = new Date().getFullYear();
                this.minDate = new Date(currentYear - 20, 0, 1);
                this.maxDate = new Date(currentYear + 1, 11, 31);
                this.numeroSubject.subscribe(numero =>
                  console.log(numero)

                )
              }



  ngOnInit(): void {

    this.setFormRegistra();
    this.detalleCita = this.data.datoCita;

    this.service.allTypeDocuments().subscribe(
      (data: any) => {
        console.log(data);

      this.servicios = data;

      this.dataTypeUser = this.service.getTypeUser();


      }, (error: HttpErrorResponse) => {

        swal.fire({
          title: 'Error',
          text: 'Error al consultar los datos, comuniquese con el administrador.',
          icon: 'error',
        });
    });

    this.service.allDepartment().subscribe(
      (data: any) => {
        console.log(data);
        this.department = data;


      }, (error: HttpErrorResponse) => {

        swal.fire({
          title: 'Error',
          text: 'Error al consultar los datos, comuniquese con el administrador.',
          icon: 'error',
        });

    });

  }

    checarSiSonIguales(): boolean {
      return this.registrarAuto.hasError('noSonIguales') &&
        this.registrarAuto.get('password').dirty &&
        this.registrarAuto.get('confPassword').dirty;
    }



  selectConfPassword(confPassword){

    console.log(confPassword);

  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confPassword').value
       ? null : {'mismatch': true};
 }

  selectTypeDocument(tipoDocumento){

    console.log(tipoDocumento);

  }

  selectTypeUser(tipoUsuario) {

    console.log(tipoUsuario);

  }

  selectDepartment(department){

    console.log(department);
    this.service.allCiudad(department.id_departamento).subscribe(
      (data: any) => {
        this.ciudades = data;

      }, (error: HttpErrorResponse) => {

        swal.fire({
          title: 'Error',
          text: 'Error al consultar los datos, comuniquese con el administrador.',
          icon: 'error',
        });

    });

  }

  selectCiudad(ciudad){

    console.log(ciudad);


  }

  modelChanged(date) {
    var theDate = new Date(Date.parse(date));
    const localDate = (`${theDate.getFullYear()}-${theDate.getMonth() + 1}-${theDate.getDate()}`);
    console.log(localDate);
    this.fecha = localDate;
  }

  setFormRegistra() {
    this.registrarAuto = this.fb.group({
      username:['', [Validators.required]],
      fecha_nacimiento:['', [Validators.required]],
      first_name:['', [Validators.required], ],
      last_name: ['', [Validators.required]],
      email:['', [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      password:['', [Validators.required ]],
      confPassword:['', [Validators.required ]],
      direccion:['', [Validators.required]],
      tipo_documento:['', [Validators.required]],
      tipo_usuario:['', [Validators.required]],
      id_departamento:['', [Validators.required ]],
      id_ciudad:['', [Validators.required]],
      bio:['', [Validators.required]],
    }, {
      validators: validarQueSeanIguales
    });
  }



  close() {

    this.dialogRef.close();

  }

  onSubmit() {

    console.log(this.registrarAuto.value['bio']);

    const caGestionAutorizacion: Perfil = Object.assign(new Perfil());
    // this.datos.perfil.biografia = this.registrarAuto.value['bio'];

    this.datos.username= this.registrarAuto.value['username'];
    this.datos.first_name= this.registrarAuto.value['first_name'].replace(/\b[a-z]/g, c=>c.toUpperCase());
    this.datos.last_name= this.registrarAuto.value['last_name'].replace(/\b[a-z]/g,c=>c.toUpperCase());
    this.datos.email= this.registrarAuto.value['email'];
    this.datos.password= this.registrarAuto.value['password'];
    this.datos.perfil = caGestionAutorizacion;
    this.datos.perfil.direccion= this.registrarAuto.value['direccion'];
    this.datos.perfil.fecha_nacimiento = this.fecha;
    this.datos.perfil.bio = this.registrarAuto.value['bio'];
    this.datos.perfil.tipo_documento = this.tipoDocumento.id_tipo_doc;
    this.datos.perfil.tipo_usuario = this.tipoUsuario.id;
    this.datos.perfil.id_ciudad = this.idCiudad.id_ciudad;


    if ( this.registrarAuto.valid ) {


      this.service.updateUser(this.datos).subscribe(
        (data: any) => {

          swal.fire({
            title: '',
            text: 'Registro de usuario creado correctamente.',
            icon: 'success',
          });

          setTimeout(function(){
            this.dialogRef.close();
          }, 5000);


        }, (error: HttpErrorResponse) => {
          // this.spinnerService.hide();
          console.log(error);

            swal.fire({
               title: 'Evaluación',
               text: 'Registro de evaluación creada correctamente.',
               icon: 'error',
             });
        });

    } else {

      swal.fire({
        title: 'Error',
        text: 'El formulario debe estar diligenciado correctamente',
        icon: 'error',
    });
    }
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${(event.value)}`);
    console.log(event.value);

  }

  private numeroSubject: Subject<any> = new Subject<any>();

  typeUser(){

    const ELEMENT_DATA: any[] = [
      {id: 1, descripcion: 'Administrador'},
      {id: 2, descripcion: 'Usuario'},
      {id: 3, descripcion: 'Instructor'},
    ];

    this.numeroSubject.next(ELEMENT_DATA);

    return ELEMENT_DATA;
  }

}
