import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from "../../users.service";
import { AppService } from '../../../../../app.service'

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {


  constructor(private modalService: NgbModal, private router: Router, private http: HttpClient, private userservice: UsersService, private appservice: AppService) { }
  public newUser: any = {};
  public data: any;
  public output: any;
  public firstname: any = "";
  public surname: any = "";
  public cellNumber: any = "";
  public emailAddress: any = "";
  public idNumber: any = "";
  public schoolName: any = "";
  public district: any = "";
  public disputeOfficialName: any;
  public emisNumber: any = "";
  public districtCode: any = "";
  public provinceID: any;
  public createdBy: any;
  public creationDate: any;
  public title: any;
  public persal: any;
  public persalNumberBoolean: boolean = false;
  public nationality: any = "South African";
  public gender: any;
  public informalsettlement = false;
  public house: any = "";
  public complex: any = "";
  public street: any = "";
  public section: any = "";
  public city: any = "";
  public userType: any;
  public representative: any;
  public isEmployee: boolean;
  public isNominated: boolean;
  public roleId: any;
  public credentials: any;
  public electionScore: any;
  public isSeconded: any;
  public provinceId: any;
  public status: any;
  public createdDate: any;
  public updatedDate: any;
  public updatedBy: any;
  public aboutMe: any;
  public designation: any = "";
  public id: any;
  public qualification: any = "";
  public experience: any = "";
  public passport: any;


  userId;
  roles: any;
  userRole: any;
  districts: any;
  schools: any;
  userID: any;

  ngOnInit(): void {

    this.userID = this.appservice.getLoggedInUserId();

console.log(this.userID);

  this.userservice.getUserId(this.userID).subscribe((data:any) => {
      console.log(data)
      //this.data=data;
      console.log(this.data)
      this.userId = this.userID;
      console.log( this.userId);
      this.persal = data.persal;
      console.log( this.persal);
     
      this.firstname = data.firstName;
      this.surname = data.surname;
      this.nationality= data.nationality;
      this.idNumber = data.idNumber;
      this.passport = data.passport;
      this.gender = data.gender;
   this.city = data.city;
  this.complex = data.complexName;
 
      this.emailAddress = data.email;
      this.house = data.houseNumber;
   
      this.nationality = data.citizenship;
   
    
      this.cellNumber = data.cell;
   
  
     // this.roleSelected = data.position;
      this.section = data.section;
      this.street = data.streetName;
     
   });
  }

  cancel() {

    this.router.navigate(['/dashboard']);
  }

  saveElection() {
    Swal.fire({
      title: 'Are you sure you want to save User',
      text: 'A user will be edit',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes!',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        
        this.userservice.updateUserProfileEmployee(this.userID,
          this.firstname, this.surname, this.cellNumber, this.emailAddress,
          this.house, this.complex, this.street, this.section, this.city,
          this.experience, this.qualification, this.gender, this.designation, this.userType, this.persal
        ).subscribe(res => {
          console.log(res);
        });


        Swal.fire(
          'Confirmation!',
          'Election saved.',
          'success'
        ).then
        this.router.navigate(['/users/edit-profile']);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your entry was not save',
          'error'
        )
      }
    })
  }
  updateUserInfo(){
    let loginUser = {   
      citizenship:this.nationality,
      persal:this.persal,      
      idNumber:this.idNumber,       
      firstName:this.firstname, 
      surname :this.surname, 
      gender :this.gender,
      houseNumber: this.house,
      complexName : this.complex ,
      streetName : this.street,
      suburb : "Suburb", 
      section :this.section, 
      city :this.city,
      cell:this.cellNumber,
      email:this.emailAddress,
   
      
    };  
    console.log(loginUser);
    Swal.fire({
      title: 'Are you sure you want to updated user',
      text: 'A user Info will be updated',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
  
    }).
    then((result) => {
      if (result.value) {     
      //nompumeleo
    
      this.userservice.updateUser(loginUser).subscribe(res=>{
        console.log(res);
        console.log("sucess");
      });
    ///Nompumelelo
   

            Swal.fire({
              timer: 5000,
              confirmButtonText: 'Yes',
              cancelButtonText: 'No',
              title: "Successful",
              text: 'User has been successfully Updated',
              
              icon: 'success'
            }).then(result => {
              this.modalService.dismissAll();
              if (result.value || result.isDismissed  ) {
                window.location.reload()
              }
            });
        
  
     
       
        }
    })

  }

  getSchools(e) {
    this.userservice.getSchoolsByDistrict(e).subscribe((res: any) => {
      this.schools = res;
    });

    // this.provinceID ="GP"
  }

  getEmisCode(e) {
    this.emisNumber = e;
  }

  showpersal(e) {

    if (e.target.checked) {
      this.persalNumberBoolean = true;
    } else {
      this.persalNumberBoolean = false;
    }
  }

}

