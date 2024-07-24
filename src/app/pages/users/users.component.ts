import { Component, OnInit, inject } from '@angular/core';
import { User } from './user.interface';
import { UsersService } from './users.service';
import { map, tap } from 'rxjs';
import { countryCodes } from 'src/app/shared/mock_data/country-codes';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users!: User[];

  private usersSvc = inject(UsersService);

  constructor() {
    this.usersSvc.getUsers$()
      .pipe(
        tap((users: User[]) => console.log(users)),
        map( users => {
          return users.map( (user: User) => ({
            ...user,
            countryName : countryCodes[user.location.country] || "Unknown"
          }));
        }),
        tap( (users : User[]) => this.users = users ) 
      )
      .subscribe()
  }

  ngOnInit(): void {
  }

}
