import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Item } from 'src/app/shared/models/item.model';
import { ItemDTO } from 'src/app/shared/models/itemDTO.model';
import { Order } from 'src/app/shared/models/order.model';
import { ItemService } from 'src/app/shared/services/item.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { MessagesService } from '../../../shared/services/messages.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  order: Order;
  items: Item[];

  public form: FormGroup;
  dataSourceOrder: MatTableDataSource<Order>;
  dataSource: MatTableDataSource<Item>;
  showColumns = ['id', 'name', 'price', 'quantity', 'subTotal'];

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private itemService: ItemService,
    private messagesService: MessagesService,
    public dialogRef: MatDialogRef<AddItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.order = data.data
  }

  ngOnInit(): void {
    this.listItemsPedido()
    this.listItems();

    this.form = this.fb.group({
      id: [this.order.id],
      item: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
    })

  }

  listItems() {
    this.itemService.listAll().subscribe(data => {
      this.items = data;
    })
  }

  listItemsPedido() {
      const list = this.order.items
      this.dataSource = new MatTableDataSource(list);
  }

  adicionarItensPedido() {
    const item = this.form.value;
    const itemDTO = new ItemDTO;
    itemDTO.orderId = item.id;
    itemDTO.itemId = item.item.id;
    itemDTO.quantity = item.quantity;

    this.orderService.addItems(itemDTO).subscribe( res => {
      this.messagesService.success("Adicionado novo item ao pedido!");
      this.dialogRef.close(res);
      }
    );

    this.form.reset();
  }

  cancel(): void {
    this.dialogRef.close();
    this.form.reset();
  }

}
