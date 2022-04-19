import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2'

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {

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
      this.isShown = false;
      console.log("Modal closed" + result);
      
    }).catch((res) => { });

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
