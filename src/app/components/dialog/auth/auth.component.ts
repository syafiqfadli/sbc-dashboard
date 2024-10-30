import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  authForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AuthComponent>
  ) { }

  ngOnInit(): void {
    this.authForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  logIn() {
    if (!this.authForm.valid) {
      alert('Enter required field.');
      return;
    }

    if (
      this.authForm.value['username'] !== 'root' ||
      this.authForm.value['password'] !== 'sbc123'
    ) {
      alert('Wrong credential');
      return;
    }

    this.dialogRef.close(true);
  }
}
