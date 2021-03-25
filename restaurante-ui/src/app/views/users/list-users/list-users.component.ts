import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/shared/models/user.model';
import { CreateUserComponent } from '../create-user/create-user.component';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  users: User[];
  user: User;
  dataSource: MatTableDataSource<User>;
  showColumns = ['id', 'name', 'password', 'admin','actions'];

  constructor(
    private UserService: UserService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.listAll();
  }

  filter(texto: string): void {
    this.dataSource.filter = texto.trim().toLowerCase();
  }

  listAll() {
    this.UserService.listAll().subscribe( data => {
        this.dataSource = new MatTableDataSource(data);
      });
  }

  add(): void {
    const dialogRef = this.dialog.open(CreateUserComponent, {
      minWidth: '450px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource.data.push(result);
        this.dataSource = new MatTableDataSource(this.dataSource.data);
      }
    });
  }

  edit(obj: User): void {
    const dialogRef = this.dialog.open(CreateUserComponent, {
      minWidth: '450px',
      data: {
        data: obj,
      }
    });

    dialogRef.afterClosed().subscribe(
      res => {
        if (res) {
          const indiceAEditar = this.dataSource.data.findIndex(obj => obj.id === res.id);
          this.dataSource.data[indiceAEditar] = res
          this.dataSource = new MatTableDataSource(this.dataSource.data);
        }
      }
    );
  }

  remove(obj: User): void {
    this.UserService.remove(obj.id).subscribe(
      res => {
        const indiceARemover = this.dataSource.data.findIndex(item => item.id === obj.id);
        if (indiceARemover > -1) {
          this.dataSource.data.splice(indiceARemover, 1);
          this.dataSource = new MatTableDataSource<User>(this.dataSource.data);
        }
      }
    );
  }

}
