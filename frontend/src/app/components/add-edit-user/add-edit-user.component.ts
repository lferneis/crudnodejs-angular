import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/user';
import { ErrorService } from 'src/app/services/error.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit {

  form: FormGroup;
  loading: boolean = false;
  id: number;
  operacion: string = 'Agregar ';


  constructor(private fb: FormBuilder,
    private _userService: UserService,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute,
    private _errorService: ErrorService) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required],
      active: ['', Validators.required],
    })
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    if (this.id != 0) {
      // Es editar
      this.operacion = 'Editar ';
      this.getUser(this.id);
    }
  }

  getUser(id: number) {
    this.loading = true;
    this._userService.getUser(id).subscribe((data: User) => {
      this.loading = false;
      this.form.setValue({
        username: data.username,
        password: data.password,
        role: data.role,
        active: data.active

      })
    })
  }

  addUser() {
    const user: User = {
      username: this.form.value.username,
      password: this.form.value.password,
      role: this.form.value.role,
      active: this.form.value.active
    }
    this.loading = true;

    if (this.id !== 0) {
      // Es editar
      user.id = this.id;
      this._userService.updateUser(this.id, user).subscribe(() => {
        this.toastr.info(`El usuario ${user.username} fue actualizado con exito`, 'Usuario actualizado');
        this.loading = false;
        this.router.navigate(['/list-users']);
      })

    } else {
      // Es agregagar
      this._userService.saveUser(user).subscribe({
        next: (v) => {
          this.loading = false;
          this.toastr.success(`El usuario ${user.username} fue registrado con exito`, 'Usuario registrado');
          this.router.navigate(['/list-users']);
        },
        error: (e: HttpErrorResponse) => {
          this.loading = false;
          this._errorService.msjError(e);
        }
      })
    }
  }

}
