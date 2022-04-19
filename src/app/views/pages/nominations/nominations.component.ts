import { Component, OnInit } from '@angular/core';
import { NominationsService } from './nominations.service';
import { Router } from '@angular/router';
import { AppService } from '../../../app.service';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Component({
  selector: 'app-nominations',
  templateUrl: './nominations.component.html',
  styleUrls: ['./nominations.component.scss']
})
export class NominationsComponent implements OnInit {


  constructor(
    private router: Router,
    private nominationservice: NominationsService,
    private appservice: AppService
  ) { }

  ngOnInit(): void {

  }

}
