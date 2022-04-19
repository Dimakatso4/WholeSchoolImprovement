import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import swal from 'sweetalert2'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: any;
  isShown: boolean = false ; // hidden by default


  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      // processing: true,
      // searching: true,
      // ordering: true,
      order: [0, 'desc']
    }
  }

  //Status update modal
  openEditModel4(content,i) {
  
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      console.log("Modal closed" + result);
      
    }).catch((res) => { });

  }

  //Mpumi deactivate method
  DeactivaStatus() {
    
    Swal.fire({


      title: 'Are you sure you want to deactivate the user?',
      text: 'A user will be deactived',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'




    }).then((result) => {
        if (result.value) {
           window.location.reload();        }
      });


  }

  //Mpumi activate method 
  ActivateStatus(UserId, firstName, surname, persal) {
    



    Swal.fire({
      title: 'Are you sure you want to  activate the user',
      text: 'A user will be activated',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'

    }).then((result) => {
        if (result.value) {
          window.location.reload()
        }
      });


  }

  //Show and hide comments 
  onOptionsSelected(value: string) {
   
    console.log("value", value)
    if (value === "Approve") {
      $("#comments").hide();
      this.isShown = false;


    }

    if (value === "Decline") {
      $("#comments").show();
      this.isShown = true;

    }
    if (value === "Request Update") {
      $("#comments").show();
      this.isShown = true;
      
    }

  }

  updateUserInfo(){
    swal.fire({ showConfirmButton: true, title:"Are you sure you want to update the record?",text: 'User data will be updated',
    icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
  }).then(result => {

      if (result.value || result.isDismissed) {
        window.location.reload();
      }
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
