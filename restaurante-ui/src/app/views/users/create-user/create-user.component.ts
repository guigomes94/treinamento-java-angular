import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  user: User;

  users: User[];

  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public dialogRef: MatDialogRef<CreateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.user = data.data
  }

  ngOnInit(): void {

    if (this.user) {
      this.form = this.fb.group({
        id: [this.user.id],
        name: [this.user.name, [Validators.required]],
        password: [this.user.password, [Validators.required]],
        admin: [this.user.admin.toString(), [Validators.required]],
      })
    } else {
      this.form = this.fb.group({
        name: ['', [Validators.required]],
        password: ['', [Validators.required]],
        admin: ['', [Validators.required]],
      })
    }
  }

  createOrUpdate(){
    const user = this.form.value;

    if (user.admin === 'true') {
      user.admin = true;
    } else {
      user.admin = false;
    }

    if (user.id) {
      this.userService.update(user).subscribe(res => {
        this.dialogRef.close(res);
      });
    } else {
      this.userService.add(user).subscribe(res => {
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

