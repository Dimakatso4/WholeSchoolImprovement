import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { DropzoneDirective, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApexAxisChartSeries, ApexNonAxisChartSeries, ApexGrid, ApexChart, ApexXAxis, ApexYAxis, ApexMarkers, ApexStroke, ApexLegend, ApexResponsive, ApexTooltip, ApexFill, ApexDataLabels, ApexPlotOptions, ApexTitleSubtitle, ChartComponent } from 'ng-apexcharts';
import { AppService } from 'src/app/app.service';
import Swal from 'sweetalert2';
import { ElectionService } from '../election.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  nonAxisSeries: ApexNonAxisChartSeries;
  colors: string[];
  grid: ApexGrid;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  markers: ApexMarkers,
  stroke: ApexStroke,
  legend: ApexLegend,
  responsive: ApexResponsive[],
  tooltip: ApexTooltip,
  fill: ApexFill
  dataLabels: ApexDataLabels,
  plotOptions: ApexPlotOptions,
  labels: string[],
  title: ApexTitleSubtitle
};



@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  public config: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 10,
    addRemoveLinks: true,
    autoReset: null,
    errorReset: null,
    cancelReset: null
  };

  validationForm: FormGroup;
  isFormSubmitted: Boolean;

  @ViewChild("chart") chart: ChartComponent;
  @ViewChild(DropzoneDirective, { static: false }) directiveRef?: DropzoneDirective;


  public firstName: any;
  public lastName: any;
  public idNumber: any;
  public mobileNo: any;
  public emailAddress: any;
  public voteCount: any;
  public shortlisted: boolean;
  public pieChartOptions: Partial<ChartOptions>;
  public basicModalCloseResult: string = '';

  public newcandidate: any = {};
  public candidateList: any = [];
  public documentList: any = [];
  public message: any;
  public document: any;

  public userId: any;
  public newTime: any;
  public data: any;
  public emisNumber: any;
  public districtCode: any;
  public userinfo: any;
  public role: any;

  totalVotesNeeded: any = 0;
  totalVotesCast: any = 0;

  noRecordsElection = true;
  noRecords = true;
  confirmed = false;
  results;
  electionId: any = 0;

  newDocs: any = {};
  docsTitle: any;
  docPath: any;

  constructor(private router: Router, public formBuilder: FormBuilder, private electionService: ElectionService, private modalService: NgbModal, private appService: AppService) { }

  ngOnInit(): void {


    this.validationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      idNumber: ['', Validators.required],
      mobileNo: ['', Validators.required],
      emailAddress: ['', Validators.required],
      voteCount: ['', Validators.required],
      shortlisted: [false]
    });

    this.isFormSubmitted = false;

    this.electionId = sessionStorage.getItem('electionId');
    this.userId = this.electionId;

    if (this.appService.getLoggedInUserRole() === "HO" || this.appService.getLoggedInUserRole() === "PEO" || this.appService.getLoggedInUserRole() === "ADMIN") {

      this.electionService.getElectionResultsByIdForHO(this.electionId).subscribe((res: any) => {
        console.log(res);
        //this.data.push(res);

        this.totalVotesNeeded = res.totalVotesNeeded;
        this.totalVotesCast = res.totalVotesCast;

        this.pieChartOptions = {
          nonAxisSeries: [this.totalVotesNeeded, this.totalVotesCast],
          colors: ["#f77eb9", "#7ee5e5"],
          chart: {
            height: 300,
            type: "pie"
          },
          stroke: {
            colors: ['rgba(0,0,0,0)']
          },
          legend: {
            position: 'top',
            horizontalAlign: 'center'
          },
          xaxis: {
            categories: [
              "Tsheko",
              "Mashego"
            ]
          },
          yaxis: {
            labels: {
              show: false
            }
          },
          dataLabels: {
            enabled: true
          }
        };

      });
    } else {

      this.electionService.getElectionResultsById(this.electionId, this.appService.getLoggedInUserId()).subscribe((res: any) => {
        this.data = [];
        console.log(JSON.stringify(res));

        this.totalVotesNeeded = res.totalVotesNeeded;
        this.totalVotesCast = res.totalVotesCast;

        if (res) {
          /**
     * Pie chart options
     */
          this.pieChartOptions = {
            nonAxisSeries: [this.totalVotesNeeded, this.totalVotesCast],
            colors: ["#f77eb9", "#7ee5e5"],
            chart: {
              height: 300,
              type: "donut"
            },
            stroke: {
              colors: ['rgba(0,0,0,0)']
            },
            legend: {
              position: 'top',
              horizontalAlign: 'center'
            },
            xaxis: {
              categories: [
                "Tsheko",
                "Mashego"
              ]
            },
            yaxis: {
              labels: {
                show: false
              }
            },
            dataLabels: {
              enabled: true
            }
          };
        }

        this.data.push(res);

      });
    }

    this.getCandidates();

    this.electionService.getElectionDocs(this.electionId).subscribe((res: any) => {
      this.documentList = res;
    });

  }

  get Form() {
    return this.validationForm.controls;
  }


  openSaveCandidateModal(content) {
    this.modalService.open(content, {}).result.then((result) => {
      this.basicModalCloseResult = "Modal closed" + result
    }).catch((res) => {});
  }

  openBasicModal(content) {
    this.modalService.open(content, {}).result.then((result) => {
      this.basicModalCloseResult = "Modal closed" + result
    }).catch((res) => {});
  }
  

  sendNotification() {
    Swal.fire({
      title: 'Are you sure you want to send notification to all the candidates?',
      text: 'This will send email/sms to all the candidate including the unsuccessful ones',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes!',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {

        Swal.fire(
          'Confirmation!',
          'Email/SMS sent',
          'success'
        )

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'No email/SMS sent',
          'error'
        )
      }
    })
  }

  closeForm(closeForm) {
    if(this.confirmed && closeForm) {
      console.log(closeForm)
    }
  }

  saveCandidate() {

    this.confirmed = false;

    if (this.validationForm.valid) {
      Swal.fire({
        title: 'Are you sure you want to save this candidate?',
        text: 'Only candidate from the ballot paper should be added here! An Sms and email will be sent to the candidate ',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes!',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.value) {

          this.newcandidate.firstName = this.firstName;
          this.newcandidate.lastName = this.lastName;
          this.newcandidate.emailAddress = this.emailAddress;
          this.newcandidate.mobileNo = this.mobileNo;
          this.newcandidate.idNumber = this.idNumber;
          this.newcandidate.voteCount = this.voteCount;
          this.newcandidate.shortlisted = this.shortlisted;
          this.newcandidate.emiscode = this.appService.getLoggedInEmisCode();

          if (localStorage.getItem('list') != null) {
            this.candidateList = JSON.parse(localStorage.getItem('list'));
            this.candidateList.push(this.newcandidate);
            localStorage.setItem('list', JSON.stringify(this.candidateList));
            this.noRecords = false;
          } else {
            this.candidateList.push(this.newcandidate);
            localStorage.setItem('list', JSON.stringify(this.candidateList));
            this.noRecords = true;
          }

          //////////////////////Save Candidate////////////////////////////
          this.electionService.saveCandidate(this.newcandidate).subscribe(res => {
            console.log(res)
            if (this.shortlisted) {
              this.message = "You been successful. Please Create profile http://localhost:4200/createprofile";
            } else {

              this.message = "You have been unsuccessful on governing body election.";
            }
            console.log(this.message);

            this.electionService.sendSMS(this.mobileNo, this.message).subscribe((res: any) => {
              //  console.log(res);
              Swal.fire(
                'Confirmation!',
                'Candidate saved.',
                'success'
              ).then((result) => {
                if(result || result.isDismissed) {
                  this.confirmed = true
                }

              })
            });
          }, err => {
            console.log(err)
            Swal.fire(
              'Unsuccessful!',
              'Unable to save candidate, please try again',
              'error'
            )
          });
          ///////////////////////////Send SMS as soon as you save candidate and results



          this.clearValues();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'Your entry was not save',
            'error'
          )
        }
      })

    }
    this.isFormSubmitted = true;

  }

  getCandidates() {
    if (localStorage.getItem('list') != null) {

      this.candidateList = JSON.parse(localStorage.getItem('list'));
    }
  }

  clearValues() {
    this.firstName = '';
    this.lastName = '';
    this.emailAddress = '';
    this.mobileNo = '';
    this.idNumber = '';
    this.voteCount = '0';
    this.shortlisted = false;
  }

  isShortlisted(e) {

    if (e.target.checked) {
      this.shortlisted = true;
    } else {
      this.shortlisted = false;
    }
  }
  onUploadError(event: any): void {
    console.log('onUploadError:', event);
  }

  onUploadSuccess(event: any): void {
    // let output = event;
    console.log('onUploadSuccess:', event);
    this.docPath = event[1].path;
    console.log(this.docPath);
    var index = this.docPath.lastIndexOf("/");
    var rawTitle = this.docPath.substr(index + 1)
    var re = /%20/gi;
    var newTitle = rawTitle.replace(re, " ");
    this.docsTitle = newTitle;

    this.newDocs = {

      "title": this.docsTitle,
      "documentTypeId": 1,
      "documentPath": this.docPath,
      "uploadedBy": this.userId
    }

    this.electionService.saveElectionDocs(this.newDocs).subscribe(res => {
      console.log(res)
      console.log(JSON.stringify(this.newDocs));
      Swal.fire(
        'Confirmation!',
        'Handover saved.',
        'success'
      )


    }, err => {
      console.log(err)
    })
  }

  resetDropzoneUploads(): void {
    if (this.directiveRef) {
      this.directiveRef.reset();
    }
  }

}
