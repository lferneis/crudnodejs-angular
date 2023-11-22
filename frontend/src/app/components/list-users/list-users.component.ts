import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  listUsers: User[] = []
  loading: boolean = false;

  constructor(private _userService: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getListUsers();
  }

  getListUsers() {
    this.loading = true;

    this._userService.getListUsers().subscribe((data: User[]) => {
      this.listUsers = data;
      this.loading = false;
    })
  }

  deleteUser(id: number) {
    this.loading = true;
    this._userService.deleteUser(id).subscribe(() => {
      this.getListUsers();
      this.toastr.warning('El usuario fue eliminado con exito', 'Usuario eliminado');
    })
  }

}
