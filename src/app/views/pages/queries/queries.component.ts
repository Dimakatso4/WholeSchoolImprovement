import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-queries',
  templateUrl: './queries.component.html',
  styleUrls: ['./queries.component.scss']
})
export class QueriesComponent implements OnInit {

  constructor(private modalService: NgbModal, private router:Router,) { }

  ngOnInit(): void {
  }

  openBasicModal(content) {
    this.modalService.open(content, {}).result.then((result) => {
      //this.basicModalCloseResult = "Modal closed" + result
    }).catch((res) => {});
  }


  
  saveQuery()
  {
    Swal.fire({
      title: 'Are you sure you want to save this Query?',
      text: 'Your Query will be processed',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes!',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {

        Swal.fire(
          'Confirmation!',
          'Election saved.',
          'success'
        )
        this.router.navigate(['/dashboard']);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your entry was not save',
          'error'
        )
      }
    })
  }

}
