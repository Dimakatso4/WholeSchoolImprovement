import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';

@Component({
  selector: 'app-communique',
  templateUrl: './communique.component.html',
  styleUrls: ['./communique.component.scss']
})
export class CommuniqueComponent implements OnInit {

  public username:any
  public Name:any
  public role:any


  constructor(private appservice: AppService) { }

  ngOnInit(): void {
    this.username = this.appservice.getLoggedInUserId();
    this.role=this.appservice.getLoggedInUserRole()
    this.Name = this.appservice.getIsLoggedInUsername();
    console.log(this.Name);
    console.log(this.username);
  }
}
