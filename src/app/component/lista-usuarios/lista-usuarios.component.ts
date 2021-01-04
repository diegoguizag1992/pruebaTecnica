import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/service/user.service';
import { CreateUserComponent } from '../create-user/create-user.component';
import { UpdateUserComponent } from '../update-user/update-user.component';
import swal from 'sweetalert2'


@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {


  displayedColumns: string[] = ['id', 'username', 'first_name', 'last_name', 'userProviderEmail', 'symbol'];
  dataUsuarios: any[];
  dataSource: MatTableDataSource<any>;
  pageSizeOptions: number[] = [5, 10, 20];
  length = 800;
  pageSize = 5;


  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog,
              public service: UserService,
              private changeDetectorRefs: ChangeDetectorRef) {}


    ngOnInit() {


    this.service.allUser().subscribe(
      (data: any) => {

        if (data) {
          console.log(data);
          this.dataUsuarios = data;
          this.dataSource = new MatTableDataSource<any>(this.dataUsuarios);
          this.dataSource.paginator = this.paginator;


          console.log(this.dataUsuarios);
        } else {

        }
      }, err => {
        console.log(err);
        swal.fire({
          title: 'Error',
          text: 'Error comuniquese con el administrador',
          icon: 'warning',
        });
      });

  }

  openDialogUdataUser(datoCita){

    console.log("Test2", datoCita);

    const dialogRef = this.dialog.open(UpdateUserComponent, {
      data: { datoCita },
      height: '500px',
      disableClose: true
    });

  }

  createUser(){

    const dialogRef = this.dialog.open(CreateUserComponent, {
      data: { },
      height: '500px',
      disableClose: true
    });
  }

}



