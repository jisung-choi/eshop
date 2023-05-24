import { Component, OnInit } from "@angular/core";
import { UsersService } from "@eshop/users";

@Component({
  selector: "ngshop-root",
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit{
  title = "ngshop";

  constructor(private usersService: UsersService){

  }

  ngOnInit(): void {
      this.usersService.initAppSession();
  }
}
