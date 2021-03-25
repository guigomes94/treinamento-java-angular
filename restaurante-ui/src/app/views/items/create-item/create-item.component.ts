import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item } from 'src/app/shared/models/item.model';
import { ItemService } from 'src/app/shared/services/item.service';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.css']
})
export class CreateItemComponent implements OnInit {

  item: Item;

  items: Item[];

  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private itemService: ItemService,
    public dialogRef: MatDialogRef<CreateItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.item = data.data
  }

  ngOnInit(): void {

    if (this.item) {
      this.form = this.fb.group({
        id: [this.item.id],
        name: [this.item.name, [Validators.required]],
        price: [this.item.price, [Validators.required]],
      })
    } else {
      this.form = this.fb.group({
        name: ['', [Validators.required]],
        price: ['', [Validators.required]],
      })
    }
  }

  createOrUpdate(){
    const item = this.form.value;

    if (item.id) {
      this.itemService.update(item).subscribe(res => {
        this.dialogRef.close(res);
      });
    } else {
      this.itemService.add(item).subscribe(res => {
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
