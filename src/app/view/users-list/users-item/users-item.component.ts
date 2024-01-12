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
  public editingUser: User | null = null;

  constructor(private userService: UserService) {}
  public startEditUser(user: User) {
    // Create a deep copy of the user object
    this.editingUser = {
      ...user,
      // Set isAdmin based on the user's role
      isAdmin: user.role === 'ADMIN'
    };
  }


  ngOnInit() {
    this.userService.users$.subscribe(
      data => {
        this.users = data;
        console.log(data);
      }
    );

    this.userService.fetchUsers();
  }

  public deleteUser(user: User) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(user.id).subscribe(
        () => {
          // User list will automatically update via the BehaviorSubject
        },
        (error) => {
          console.error('Error deleting user:', error);
        }
      );
    }
  }
  public submitEdit() {
    if (this.editingUser) {
      this.userService.updateProduct(this.editingUser.email, this.editingUser).subscribe(
        updatedUser => {
          this.userService.fetchUsers(); // Refresh the list
          this.editingUser = null; // Reset the editing user
        },
        error => {
          console.error('Error updating user:', error);
        }
      );
    }
  }
}
