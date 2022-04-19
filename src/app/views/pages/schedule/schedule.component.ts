import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { SseService } from '../sse/sse.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  validationForm: FormGroup;  
  isCreateFormSubmitted: Boolean;
  public isNameSelected:boolean;
  
  public areaOfevaluationdata:any;
  public BUData:any;
  public companentData:any;
  public areaOfevaluationID:any;
  public componentID:any;
  public buID:any;
  public question:any;
  public kpiInfo:any;
  public listData:string[];
  public Components:any;
  public CompID: any;
  public LegislationData
  
  
  public dtOptions: DataTables.Settings = {};

  dtTrigger: Subject<any> = new Subject<any>();
  localStorageChanges$ = this.sseService.changes$;

  constructor(private modalService: NgbModal, 
    private formBuilder: FormBuilder,
    private router: Router, 
    private route: ActivatedRoute,
    private http: HttpClient, 
    private sseService: SseService,
    private appservice:AppService, 
    ) { }
  ngOnInit(): void {

    this.validationForm = this.formBuilder.group({
      areaOfEvaluationValue: ['', Validators.required],
      componentName: ['', Validators.required],
      question: ['', Validators.required],
      compulsory: ['', Validators.required],
      legislation: ['', Validators.required],
      description: ['', Validators.required],
      venue: ['', Validators.required],
      BUValue: ['', Validators.required],
      resource: ['', Validators.required],
      rating: ['', Validators.required],
    })

    this.isCreateFormSubmitted = false;

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      searching: true,
      ordering:  true,
      order: ['0','desc']
    }
      //GET All Evaluation
      this.sseService.getAllAreaOfEvaluation().subscribe((res: any) => {
        this.areaOfevaluationdata = res;
        });

      this.sseService.getAllBusinessUnit().subscribe((res: any) => {
      this.BUData = res;
     
      });

      this.sseService.GetSSEComponentAll().subscribe((res: any) => {
        this.Components = res;
       
        });

        this.sseService.GetAllKPIQuestion().subscribe((res: any) => {
          this.kpiInfo = res;
          alert(this.kpiInfo)
          this.dtTrigger.next()
          });

          this.sseService.GetAllLegislations().subscribe((res: any) => {
            this.LegislationData = res;
            
            });
  }
  
}
