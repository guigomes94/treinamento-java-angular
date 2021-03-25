import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Order } from 'src/app/shared/models/order.model';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {

  order: Order;

  orders: Order[];

  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    public dialogRef: MatDialogRef<CreateOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.order = data.data
  }

  ngOnInit(): void {

    this.form = this.fb.group({
      tableNumber: ['', [Validators.required]],
    })

  }

  createOrUpdate(){
    const order = this.form.value;

    if (order.id) {
      this.orderService.update(order).subscribe(res => {
        this.dialogRef.close(res);
      });
    } else {
      this.orderService.add(order).subscribe(res => {
        this.dialogRef.close(res);
      });
    }

    this.form.reset();
  }

  cancel(): void {
    this.dialogRef.close();
    this.form.reset();
  }

}
