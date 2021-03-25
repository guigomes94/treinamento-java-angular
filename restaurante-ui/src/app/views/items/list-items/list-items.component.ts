import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Item } from 'src/app/shared/models/item.model';
import { CreateItemComponent } from '../create-item/create-item.component';
import { ItemService } from 'src/app/shared/services/item.service';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.css']
})
export class ListItemsComponent implements OnInit {

  items: Item[];
  item: Item;
  dataSource: MatTableDataSource<Item>;
  showColumns = ['id', 'name', 'price', 'actions'];

  constructor(
    private ItemService: ItemService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.listAll();
  }

  filter(texto: string): void {
    this.dataSource.filter = texto.trim().toLowerCase();
  }

  listAll() {
    this.ItemService.listAll().subscribe( data => {
        this.dataSource = new MatTableDataSource(data);
      });
  }

  add(): void {
    const dialogRef = this.dialog.open(CreateItemComponent, {
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

  edit(obj: Item): void {
    const dialogRef = this.dialog.open(CreateItemComponent, {
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

  remove(obj: Item): void {
    this.ItemService.remove(obj.id).subscribe(
      res => {
        const indiceARemover = this.dataSource.data.findIndex(item => item.id === obj.id);
        if (indiceARemover > -1) {
          this.dataSource.data.splice(indiceARemover, 1);
          this.dataSource = new MatTableDataSource<Item>(this.dataSource.data);
        }
      }
    );
  }

}
