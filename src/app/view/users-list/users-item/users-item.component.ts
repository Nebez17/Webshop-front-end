import {Component, OnInit} from '@angular/core';
import {User} from "../../../model/user.model";
import {UserService} from "../../../service/user.service";

@Component({
  selector: 'app-users-item',
  templateUrl: './users-item.component.html',
  styleUrl: './users-item.component.scss'
})
export class UsersItemComponent implements OnInit{
  public users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe(
      data => {
        this.users = data;
        console.log(data)
      });
  }

  public deleteUser(user: User) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(user.id).subscribe(
        () => {
          // The BehaviorSubject inside UserService will handle the user list update
        },
        (error) => {
          console.error('Error deleting user:', error);
        }
      );
    }
  }
}
