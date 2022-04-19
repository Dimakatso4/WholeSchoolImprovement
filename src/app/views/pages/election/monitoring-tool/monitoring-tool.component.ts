import { Component, OnInit } from '@angular/core';
import { UsersService } from "../../users/users.service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ElectionService } from '../election.service';
import Swal from 'sweetalert2';
import { AppService } from 'src/app/app.service'
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-monitoring-tool',
  templateUrl: './monitoring-tool.component.html',
  styleUrls: ['./monitoring-tool.component.scss']
})
export class MonitoringToolComponent implements OnInit {

  constructor(private userservice: UsersService,
    private electionservice: ElectionService,
    public formBuilder: FormBuilder,
    private appservice: AppService,
    private router: Router,
    private route: ActivatedRoute) { }


  public allDistricts: any;
  public allschools: any;

  public districtCode: any;
  public school: any;
  public schoolElectoralOfficer: any;
  public dateOfElection: any;
  public districtElectoralOfficer: any;
  public timeOfElection: any;
  public provincialMonitor: any;
  public modeOfElection: any;
  public observer1: any;
  public observer2: any;
  public observer3: any;
  public TheElectionProcessStartedAtThePlannedTime: any;
  public TheElectionProcessStartedAtThePlannedTimeComment: any;
  public TheSchoolElectoralOfficerDistrictElectoralTeamMemberAreBothPresent: any;
  public TheSchoolElectoralOfficerDistrictElectoralTeamMemberAreBothPresentComment: any;
  public AnOfficialVotersRRollHasBeenPreparedSigned: any;
  public AnOfficialVotersRRollHasBeenPreparedSignedComment: any;
  public TheElectionProcessOnlyProceedsInThePresenceOfAQuorum: any;
  public TheElectionProcessOnlyProceedsInThePresenceOfAQuorumComment: any;
  // public ProvisionIsMadeForABallotBoxAndTheEmptyBoxWasShownToCandidatesBeforeSealing: any;
  // public ProvisionIsMadeForABallotBoxAndTheEmptyBoxWasShownToCandidatesBeforeSealingComment: any;
  public ProvisionIsMadeForVotingToTakePlaceInPrivacy: any; // XX
  public ProvisionIsMadeForVotingToTakePlaceInPrivacyComment: any;
  public BallotPapersAreValidatedUponIssue: any;
  public BallotPapersAreValidatedUponIssueComment: any;
  public AMechanismIsInPlaceToEnsureThatVotersArePreventedFromVotingMoreThanOnce: any;
  public AMechanismIsInPlaceToEnsureThatVotersArePreventedFromVotingMoreThanOnceComment: any;
  public ItIsPossibleToIdentifyTheElectoralStaffInstantly: any;
  public ItIsPossibleToIdentifyTheElectoralStaffInstantlyComment: any;
  public ProvisionIsMadeToAssistTheDisabledIlliterateInAnAppropriateManner: any;
  public ProvisionIsMadeToAssistTheDisabledIlliterateInAnAppropriateMannerComment: any;
  public VotingTakesPlaceInOrderlyManne: any;
  public VotingTakesPlaceInOrderlyManneComment: any;
  public CandidatesAreAllowedToBePresentDuringCounting: any;
  public CandidatesAreAllowedToBePresentDuringCountingComment: any;
  public TheBallotBoxIsOpenedInThePresenceOfCandidates: any; // XXX
  public TheBallotBoxIsOpenedInThePresenceOfCandidatesComment: any;
  public ARecountIsDoneWhereNecessary: any;
  public ARecountIsDoneWhereNecessaryComment: any;
  public TheResultIsAnnouncedAfterTheVoting: any;
  public TheResultIsAnnouncedAfterTheVotingComment: any;
  public RegulationsGuidingtheelectionprocessArefollowed: any;
  public RegulationsGuidingtheelectionprocessArefollowedComment: any;
  public COVIDProtocolsareobserved: any;
  public COVIDProtocolsareobservedComment: any;
  public actiontaken: any;
  public conduciveenvironment: any;
  public recommendation: any;
  public dateOfNextElection: any;
  public disputes: any;
  public resolved: any;
  public dulyElected: any;
  public PolicyCompliance: any;
  public BestPractice: any;
  public Irregularities: any;
  public directorate: any; //
  public districtMonitor: any; //
  public WereThereAnyIrregularities: any;
  public ProvisionIsMadeForABallotBox: any;
  public ProvisionIsMadeForABallotBoxComment: any;
  public TheEmptyBoxWasShownToCandidatesBeforeSealing: any;
  public TheEmptyBoxWasShownToCandidatesBeforeSealingComment: any;
  public dulyElectedComment: any;

  public DEOs;
  public SEOs;
  public schoolName;
  public districtName;
  public currentLocation;
  public Directorates;
  public currLat;
  public currLng;

  HandSanitising
  Masking
  Screening
  SocialDistancing
  Other

  public noDEOs = false;
  public noSEOs = false;


  validationForm: FormGroup;
  isFormSubmitted: Boolean;


  isEditForm;


  ngOnInit(): void {

    // this.electionservice.getAllDirectorate().subscribe(res => {
    //   console.log(res);
    //   this.Directorates = res;
    // }, err => {
    //   console.log(err);
    // })

    $("input[type='date']").keydown(function (event) { event.preventDefault(); });
    this.provincialMonitor = this.appservice.getIsLoggedInUsername();

    this.validationForm = this.formBuilder.group({
      dulyElected: ['', Validators.required],
      districtCode: ['', Validators.required],
      districtElectoralOfficer: ['', Validators.required],
      school: ['', Validators.required],
      schoolElectoralOfficer: ['', Validators.required],
      dateOfElection: ['', Validators.required],
      timeOfElection: ['', Validators.required],
      districtMonitor: ['', Validators.required],
      provincialMonitor: ['', Validators.required],
      modeOfElection: ['', Validators.required],
      directorate: ['', Validators.required],
      observer1: ['', Validators.required],
      observer2: ['', Validators.required],
      observer3: ['', Validators.required],
      TheElectionProcessStartedAtThePlannedTime: [{ value: '', disabled: true }],
      TheSchoolElectoralOfficerDistrictElectoralTeamMemberAreBothPresent: [{ value: '', disabled: true }],
      AnOfficialVotersRRollHasBeenPreparedSigned: [{ value: '', disabled: true }],
      TheElectionProcessOnlyProceedsInThePresenceOfAQuorum: [{ value: '', disabled: true }],
      dateOfNextElection: [''],
      ProvisionIsMadeForABallotBox: [{ value: '', disabled: true }],
      TheEmptyBoxWasShownToCandidatesBeforeSealing: [{ value: '', disabled: true }],
      ProvisionIsMadeForVotingToTakePlaceInPrivacy: [{ value: '', disabled: true }],
      BallotPapersAreValidatedUponIssue: [{ value: '', disabled: true }],
      AMechanismIsInPlaceToEnsureThatVotersArePreventedFromVotingMoreThanOnce: [{ value: '', disabled: true }],
      ItIsPossibleToIdentifyTheElectoralStaffInstantly: [{ value: '', disabled: true }],
      ProvisionIsMadeToAssistTheDisabledIlliterateInAnAppropriateManner: [{ value: '', disabled: true }],
      VotingTakesPlaceInOrderlyManne: [{ value: '', disabled: true }],
      CandidatesAreAllowedToBePresentDuringCounting: [{ value: '', disabled: true }],
      TheBallotBoxIsOpenedInThePresenceOfCandidates: [{ value: '', disabled: true }],
      ARecountIsDoneWhereNecessary: [{ value: '', disabled: true }],
      TheResultIsAnnouncedAfterTheVoting: [{ value: '', disabled: true }],
      RegulationsGuidingtheelectionprocessArefollowed: [{ value: '', disabled: true }],
      WereThereAnyIrregularities: ['', Validators.required],
      disputes: ['', Validators.required],
      PolicyCompliance: ['', Validators.required],
      BestPractice: ['', Validators.required],
      actiontaken: ['', Validators.required],
      conduciveenvironment: [''],
      recommendation: ['', Validators.required],
      Screening: [''],
      HandSanitising: [''],
      Masking: [''],
      SocialDistancing: [''],
      Other: [''],
      resolved: [''],
      dulyElectedComment: [''],
      TheElectionProcessStartedAtThePlannedTimeComment: [{ value: '', disabled: true }],
      TheSchoolElectoralOfficerDistrictElectoralTeamMemberAreBothPresentComment: [{ value: '', disabled: true }],
      AnOfficialVotersRRollHasBeenPreparedSignedComment: [{ value: '', disabled: true }],
      TheElectionProcessOnlyProceedsInThePresenceOfAQuorumComment: [{ value: '', disabled: true }],
      ProvisionIsMadeForABallotBoxComment: [{ value: '', disabled: true }],
      TheEmptyBoxWasShownToCandidatesBeforeSealingComment: [{ value: '', disabled: true }],
      ProvisionIsMadeForVotingToTakePlaceInPrivacyComment: [{ value: '', disabled: true }],
      BallotPapersAreValidatedUponIssueComment: [{ value: '', disabled: true }],
      AMechanismIsInPlaceToEnsureThatVotersArePreventedFromVotingMoreThanOnceComment: [{ value: '', disabled: true }],
      ItIsPossibleToIdentifyTheElectoralStaffInstantlyComment: [{ value: '', disabled: true }],
      ProvisionIsMadeToAssistTheDisabledIlliterateInAnAppropriateMannerComment: [{ value: '', disabled: true }],
      VotingTakesPlaceInOrderlyManneComment: [{ value: '', disabled: true }],
      CandidatesAreAllowedToBePresentDuringCountingComment: [{ value: '', disabled: true }],
      TheBallotBoxIsOpenedInThePresenceOfCandidatesComment: [{ value: '', disabled: true }],
      ARecountIsDoneWhereNecessaryComment: [{ value: '', disabled: true }],
      TheResultIsAnnouncedAfterTheVotingComment: [{ value: '', disabled: true }],
      RegulationsGuidingtheelectionprocessArefollowedComment: [{ value: '', disabled: true }],
      COVIDProtocolsareobservedComment: ['']
    });



    this.route.queryParams.subscribe(params => {
      // login: 'monitor'
      if (params.id != "") {
        // create new form
        this.isEditForm = false
        this.userservice.getAllDistricts().subscribe((res: any) => {
          this.allDistricts = res;
          this.validationForm.controls["districtCode"].setValue('');
          // console.log(this.allDistricts)

        });

      } else {
        // view or update the form
        this.isEditForm = true

      }

    });
    
    this.validationForm.controls["school"].setValue('');
    this.validationForm.controls["schoolElectoralOfficer"].setValue('');
    this.validationForm.controls["districtElectoralOfficer"].setValue('');
    this.validationForm.controls["modeOfElection"].setValue('');
    this.validationForm.controls["directorate"].setValue('');
    this.school = "";
    this.schoolElectoralOfficer = "";
    this.districtElectoralOfficer = "";
    this.directorate = "";
    this.modeOfElection = "";

    this.isFormSubmitted = false;
  }

  get Form() {
    return this.validationForm.controls;
  }

  getSchools(code) {
    this.noDEOs = false;
    this.validationForm.controls["school"].setValue('');
    this.validationForm.controls["schoolElectoralOfficer"].setValue('');
    this.validationForm.controls["districtElectoralOfficer"].setValue('');

    this.userservice.getSchoolsByDistrict(code).subscribe((res: any) => {
      this.allschools = res;      
      this.validationForm.controls["school"].setValue('');
    });


    this.electionservice.getDEOByDitrict(code).subscribe(res => {

      this.DEOs = res;

      if (this.DEOs.length == 0) {
        this.noDEOs = true;
      } else {
        this.noDEOs = false
      }

    }, err => {
      console.log(err);
      this.noSEOs = false
    });

    this.electionservice.getDistrictByCode(code).subscribe((res: any) => {
      console.log(res);
      this.districtName = res.districtName;

    }, err => {
      console.log(err);
      this.districtName = null;
    })

    
    this.validationForm.controls["school"].setValue('');
    this.validationForm.controls["schoolElectoralOfficer"].setValue('');
    this.validationForm.controls["districtElectoralOfficer"].setValue('');
    this.school = "";
    this.schoolElectoralOfficer = "";
    this.districtElectoralOfficer = "";

  }

  getSEO(emis) {
    this.noSEOs = false;
    this.electionservice.getSEOBySchool(emis).subscribe(res => {
      console.log(res);
      this.SEOs = res;

      if (this.SEOs.length == 0) {
        this.noSEOs = true;
      } else {
        this.noSEOs = false
      }
    }, err => {
      console.log(err);
      this.noSEOs = false
    })

    this.electionservice.getSchoolByEmisNumber(emis).subscribe((res: any) => {
      console.log(res)
      this.schoolName = res[0].institutionName
    }, err => {
      console.log(err);
      this.schoolName = null
    })

  }

  disableField() {
    //   this.validationForm.controls["persal"].clearValidators();
    //   this.validationForm.controls["persal"].updateValueAndValidity();
    // } else {
    //   this.validationForm.controls["persal"].setValidators([Validators.required]);
    //   this.validationForm.controls["persal"].updateValueAndValidity();

    if (this.TheElectionProcessOnlyProceedsInThePresenceOfAQuorum == "No") {
      this.validationForm.controls["ProvisionIsMadeForABallotBox"].disable();
      this.validationForm.controls["ProvisionIsMadeForABallotBoxComment"].disable();
      this.validationForm.controls["ProvisionIsMadeForABallotBox"].clearValidators();
      this.validationForm.controls["ProvisionIsMadeForABallotBox"].updateValueAndValidity();
      this.validationForm.controls["ProvisionIsMadeForABallotBox"].setValue('');
      this.validationForm.controls["ProvisionIsMadeForABallotBoxComment"].setValue('');
      this.validationForm.controls["dateOfNextElection"].setValidators([Validators.required]);
      this.validationForm.controls["dateOfNextElection"].updateValueAndValidity();

    } else if (this.TheElectionProcessOnlyProceedsInThePresenceOfAQuorum == "Not applicable" || this.TheElectionProcessOnlyProceedsInThePresenceOfAQuorum == "Yes") {
      this.validationForm.controls["ProvisionIsMadeForABallotBox"].enable();
      this.validationForm.controls["ProvisionIsMadeForABallotBoxComment"].enable();
      this.validationForm.controls["ProvisionIsMadeForABallotBox"].setValidators([Validators.required]);
      this.validationForm.controls["ProvisionIsMadeForABallotBox"].updateValueAndValidity();
      this.validationForm.controls["dateOfNextElection"].setValue('');
      this.validationForm.controls["dateOfNextElection"].clearValidators();
      this.validationForm.controls["dateOfNextElection"].updateValueAndValidity();
    } else {
      this.validationForm.controls["ProvisionIsMadeForABallotBox"].disable();
      this.validationForm.controls["ProvisionIsMadeForABallotBoxComment"].disable();
      this.validationForm.controls["ProvisionIsMadeForABallotBox"].setValue('');
      this.validationForm.controls["ProvisionIsMadeForABallotBox"].clearValidators();
      this.validationForm.controls["ProvisionIsMadeForABallotBox"].updateValueAndValidity();
      this.validationForm.controls["ProvisionIsMadeForABallotBoxComment"].setValue('');
      this.validationForm.controls["dateOfNextElection"].setValue('');
      this.validationForm.controls["dateOfNextElection"].clearValidators();
      this.validationForm.controls["dateOfNextElection"].updateValueAndValidity();

    }
  }

  itemSelected() {

    let screen;
    let sanitize;
    let mask;
    let distance;
    let other;
    this.COVIDProtocolsareobserved = "";

    if (this.Screening) {
      screen = "Screening"
    } else {
      screen = null;
    }


    if (this.HandSanitising) {
      sanitize = "Hand Sanitising"
    } else {
      sanitize = null;
    }


    if (this.Masking) {
      mask = "Masking"
    } else {
      mask = null;
    }


    if (this.SocialDistancing) {
      distance = "Social Distancing"
    } else {
      distance = null;
    }


    if (this.Other) {
      other = "Other"
    } else {
      other = null;
    }

    this.COVIDProtocolsareobserved = screen + "," + sanitize + "," + mask + "," + distance + "," + other;
    let test: String = screen + "," + sanitize + "," + mask + "," + distance + "," + other;


    console.log(test.length);
  }

  submitForm() {

    console.log(this.validationForm)

    if (this.validationForm.valid) {

      navigator.geolocation.getCurrentPosition(position => {
        console.log("https://www.google.co.za/maps/@" + position.coords.latitude + "," + position.coords.longitude + ",18z");
        this.currLat = position.coords.latitude;
        this.currLng = position.coords.longitude;
      }),
        Swal.fire({
          title: 'Are you sure you want to continue?',
          text: 'Your information will be processed',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Yes!',
          cancelButtonText: 'No'
        }).then((result) => {

          if (result.value) {

            let data = {
              emisNumber: this.school,
              mode: this.modeOfElection,
              observer1: this.observer1,
              observer2: this.observer2,
              observer3: this.observer3,
              dateOfElection: this.dateOfElection,
              timeOfElection: this.timeOfElection,
              electionProcessStartedPlannedTime: this.TheElectionProcessStartedAtThePlannedTime,
              electionProcessStartedPlannedTimeComment: this.TheElectionProcessStartedAtThePlannedTimeComment,
              deoseoPresent: this.TheSchoolElectoralOfficerDistrictElectoralTeamMemberAreBothPresent,
              deoseoPresentComment: this.TheSchoolElectoralOfficerDistrictElectoralTeamMemberAreBothPresentComment,
              officialVotersRollPreparedSigned: this.AnOfficialVotersRRollHasBeenPreparedSigned,
              officialVotersRollPreparedSignedComment: this.AnOfficialVotersRRollHasBeenPreparedSignedComment,
              quoromReached: this.TheElectionProcessOnlyProceedsInThePresenceOfAQuorum,
              quoromReachedComment: this.TheElectionProcessOnlyProceedsInThePresenceOfAQuorumComment,
              provisionMade: this.ProvisionIsMadeForABallotBox,
              provisionMadeComment: this.ProvisionIsMadeForABallotBoxComment,
              votinginprivacy: this.ProvisionIsMadeForVotingToTakePlaceInPrivacy,
              votinginprivacyComment: this.ProvisionIsMadeForVotingToTakePlaceInPrivacyComment,
              ballotPapersValid: this.BallotPapersAreValidatedUponIssue,
              ballotPapersValidComment: this.BallotPapersAreValidatedUponIssueComment,
              mechanismInPlace: this.AMechanismIsInPlaceToEnsureThatVotersArePreventedFromVotingMoreThanOnce,
              mechanismInPlaceComment: this.AMechanismIsInPlaceToEnsureThatVotersArePreventedFromVotingMoreThanOnceComment,
              electoralStaffIdentifiable: this.ItIsPossibleToIdentifyTheElectoralStaffInstantly,
              electoralStaffIdentifiableComment: this.ItIsPossibleToIdentifyTheElectoralStaffInstantlyComment,
              provisionForDisabledIlliterate: this.ProvisionIsMadeToAssistTheDisabledIlliterateInAnAppropriateManner,
              provisionForDisabledIlliterateComment: this.ProvisionIsMadeToAssistTheDisabledIlliterateInAnAppropriateMannerComment,
              votingOrderly: this.VotingTakesPlaceInOrderlyManne,
              votingOrderlyComment: this.VotingTakesPlaceInOrderlyManneComment,
              candidateAllowedPresent: this.CandidatesAreAllowedToBePresentDuringCounting,
              candidateAllowedPresentComment: this.CandidatesAreAllowedToBePresentDuringCountingComment,
              ballotopen: this.TheBallotBoxIsOpenedInThePresenceOfCandidates,
              ballotopenComment: this.TheBallotBoxIsOpenedInThePresenceOfCandidatesComment,
              recount: this.ARecountIsDoneWhereNecessary,
              recountComment: this.ARecountIsDoneWhereNecessaryComment,
              resultAnnounce: this.TheResultIsAnnouncedAfterTheVoting,
              resultAnnounceComment: this.TheResultIsAnnouncedAfterTheVotingComment,
              regulationsFollowed: this.RegulationsGuidingtheelectionprocessArefollowed,
              regulationsFollowedComment: this.RegulationsGuidingtheelectionprocessArefollowedComment,
              covidProtocolsObserved: this.COVIDProtocolsareobserved,
              covidProtocolsObservedComment: this.COVIDProtocolsareobservedComment,
              policyCompliance: this.PolicyCompliance,
              bestPractise: this.BestPractice,
              irregularities: this.WereThereAnyIrregularities,
              actionTaken: this.actiontaken,
              conduciveEnvironment: this.conduciveenvironment,
              recommendation: this.recommendation,
              seoId: this.schoolElectoralOfficer,
              deoId: this.districtElectoralOfficer,
              districtCode: this.districtCode,
              districtName: this.districtName,
              schoolName: this.schoolName,
              pemId: this.appservice.getLoggedInUserId(),
              CurrentLocation: "https://www.google.co.za/maps/@" + this.currLat + "," + this.currLng + ",18z",
              AssignTo: "SEO",
              // PEOFeedback: "",
              // SEOFeedback: "",
              // WereThereAnyIrregularities: this.WereThereAnyIrregularities, 
              dateOfNextElection: this.dateOfNextElection,
              disputes: this.disputes,
              resolved: this.resolved,
              dulyElected: this.dulyElected,
              directorate: this.directorate,
              districtMonitor: this.districtMonitor,
              emptyBallotShownBeforeSealing: this.TheEmptyBoxWasShownToCandidatesBeforeSealing,
              emptyBallotShownBeforeSealingComment: this.TheEmptyBoxWasShownToCandidatesBeforeSealingComment
            }

            console.log(data);
            this.electionservice.createMonitoringTool(data).subscribe(res => {
              console.log(res)
              Swal.fire(
                'Successful',
                'Your entry successsfully saved',
                'success'
              ).then((result) => {
                if (result.value || result.isDismissed) {
                  this.router.navigate(['/election/monitor-view'])
                  // this.router.navigate(['/dashboard'])
                }
              })
            }, err => {
              console.log(err)
              Swal.fire(
                'Unsuccessful',
                'Your entry was unsuccessful, please try again',
                'error'
              )
            })
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

  clearResolution() {
    this.resolved = "";

  }

  disableForm() {
    if (this.validationForm.controls["dulyElected"].value == "No") {


      this.validationForm.controls["BallotPapersAreValidatedUponIssueComment"].enable();
      this.validationForm.controls["ProvisionIsMadeForVotingToTakePlaceInPrivacyComment"].enable();
      this.validationForm.controls["ProvisionIsMadeForABallotBoxComment"].enable();
      this.validationForm.controls["TheEmptyBoxWasShownToCandidatesBeforeSealingComment"].enable();
      this.validationForm.controls["ItIsPossibleToIdentifyTheElectoralStaffInstantlyComment"].enable();
      this.validationForm.controls["RegulationsGuidingtheelectionprocessArefollowedComment"].enable();
      this.validationForm.controls["TheResultIsAnnouncedAfterTheVotingComment"].enable();
      this.validationForm.controls["TheElectionProcessStartedAtThePlannedTimeComment"].enable();
      this.validationForm.controls["ARecountIsDoneWhereNecessaryComment"].enable();
      this.validationForm.controls["TheBallotBoxIsOpenedInThePresenceOfCandidatesComment"].enable();
      this.validationForm.controls["CandidatesAreAllowedToBePresentDuringCountingComment"].enable();
      this.validationForm.controls["ProvisionIsMadeToAssistTheDisabledIlliterateInAnAppropriateMannerComment"].enable();
      this.validationForm.controls["VotingTakesPlaceInOrderlyManneComment"].enable();
      this.validationForm.controls["ProvisionIsMadeForABallotBox"].enable();
      this.validationForm.controls["ProvisionIsMadeForABallotBox"].setValidators([Validators.required]);
      this.validationForm.controls["ProvisionIsMadeForABallotBox"].updateValueAndValidity();
      this.validationForm.controls["AnOfficialVotersRRollHasBeenPreparedSignedComment"].enable();
      this.validationForm.controls["TheSchoolElectoralOfficerDistrictElectoralTeamMemberAreBothPresentComment"].enable();
      this.validationForm.controls["TheBallotBoxIsOpenedInThePresenceOfCandidates"].enable();
      this.validationForm.controls["TheBallotBoxIsOpenedInThePresenceOfCandidates"].setValidators([Validators.required]);
      this.validationForm.controls["TheBallotBoxIsOpenedInThePresenceOfCandidates"].updateValueAndValidity();
      this.validationForm.controls["CandidatesAreAllowedToBePresentDuringCounting"].enable();
      this.validationForm.controls["CandidatesAreAllowedToBePresentDuringCounting"].setValidators([Validators.required]);
      this.validationForm.controls["CandidatesAreAllowedToBePresentDuringCounting"].updateValueAndValidity();
      this.validationForm.controls["TheResultIsAnnouncedAfterTheVoting"].enable();
      this.validationForm.controls["TheResultIsAnnouncedAfterTheVoting"].setValidators([Validators.required]);
      this.validationForm.controls["TheResultIsAnnouncedAfterTheVoting"].updateValueAndValidity();
      this.validationForm.controls["ARecountIsDoneWhereNecessary"].enable();
      this.validationForm.controls["ARecountIsDoneWhereNecessary"].setValidators([Validators.required]);
      this.validationForm.controls["ARecountIsDoneWhereNecessary"].updateValueAndValidity();
      this.validationForm.controls["RegulationsGuidingtheelectionprocessArefollowed"].enable();
      this.validationForm.controls["RegulationsGuidingtheelectionprocessArefollowed"].setValidators([Validators.required]);
      this.validationForm.controls["RegulationsGuidingtheelectionprocessArefollowed"].updateValueAndValidity();
      this.validationForm.controls["ItIsPossibleToIdentifyTheElectoralStaffInstantly"].enable();
      this.validationForm.controls["ItIsPossibleToIdentifyTheElectoralStaffInstantly"].setValidators([Validators.required]);
      this.validationForm.controls["ItIsPossibleToIdentifyTheElectoralStaffInstantly"].updateValueAndValidity();
      this.validationForm.controls["VotingTakesPlaceInOrderlyManne"].enable();
      this.validationForm.controls["VotingTakesPlaceInOrderlyManne"].setValidators([Validators.required]);
      this.validationForm.controls["VotingTakesPlaceInOrderlyManne"].updateValueAndValidity();
      this.validationForm.controls["ProvisionIsMadeToAssistTheDisabledIlliterateInAnAppropriateManner"].enable();
      this.validationForm.controls["ProvisionIsMadeToAssistTheDisabledIlliterateInAnAppropriateManner"].setValidators([Validators.required]);
      this.validationForm.controls["ProvisionIsMadeToAssistTheDisabledIlliterateInAnAppropriateManner"].updateValueAndValidity();
      this.validationForm.controls["AMechanismIsInPlaceToEnsureThatVotersArePreventedFromVotingMoreThanOnce"].enable();
      this.validationForm.controls["AMechanismIsInPlaceToEnsureThatVotersArePreventedFromVotingMoreThanOnce"].setValidators([Validators.required]);
      this.validationForm.controls["AMechanismIsInPlaceToEnsureThatVotersArePreventedFromVotingMoreThanOnce"].updateValueAndValidity();
      this.validationForm.controls["BallotPapersAreValidatedUponIssue"].enable();
      this.validationForm.controls["BallotPapersAreValidatedUponIssue"].setValidators([Validators.required]);
      this.validationForm.controls["BallotPapersAreValidatedUponIssue"].updateValueAndValidity();
      this.validationForm.controls["ProvisionIsMadeForVotingToTakePlaceInPrivacy"].enable();
      this.validationForm.controls["ProvisionIsMadeForVotingToTakePlaceInPrivacy"].setValidators([Validators.required]);
      this.validationForm.controls["ProvisionIsMadeForVotingToTakePlaceInPrivacy"].updateValueAndValidity();
      this.validationForm.controls["TheEmptyBoxWasShownToCandidatesBeforeSealing"].enable();
      this.validationForm.controls["TheEmptyBoxWasShownToCandidatesBeforeSealing"].setValidators([Validators.required]);
      this.validationForm.controls["TheEmptyBoxWasShownToCandidatesBeforeSealing"].updateValueAndValidity();
      this.validationForm.controls["TheElectionProcessOnlyProceedsInThePresenceOfAQuorum"].enable();
      this.validationForm.controls["TheElectionProcessOnlyProceedsInThePresenceOfAQuorum"].setValidators([Validators.required]);
      this.validationForm.controls["TheElectionProcessOnlyProceedsInThePresenceOfAQuorum"].updateValueAndValidity();
      this.validationForm.controls["AnOfficialVotersRRollHasBeenPreparedSigned"].enable();
      this.validationForm.controls["AnOfficialVotersRRollHasBeenPreparedSigned"].setValidators([Validators.required]);
      this.validationForm.controls["AnOfficialVotersRRollHasBeenPreparedSigned"].updateValueAndValidity();
      this.validationForm.controls["TheSchoolElectoralOfficerDistrictElectoralTeamMemberAreBothPresent"].enable();
      this.validationForm.controls["TheSchoolElectoralOfficerDistrictElectoralTeamMemberAreBothPresent"].setValidators([Validators.required]);
      this.validationForm.controls["TheSchoolElectoralOfficerDistrictElectoralTeamMemberAreBothPresent"].updateValueAndValidity();
      this.validationForm.controls["TheElectionProcessStartedAtThePlannedTime"].enable();
      this.validationForm.controls["TheElectionProcessStartedAtThePlannedTime"].setValidators([Validators.required]);
      this.validationForm.controls["TheElectionProcessStartedAtThePlannedTime"].updateValueAndValidity();
      this.validationForm.controls["TheElectionProcessOnlyProceedsInThePresenceOfAQuorumComment"].enable();
      this.validationForm.controls["AMechanismIsInPlaceToEnsureThatVotersArePreventedFromVotingMoreThanOnceComment"].enable();


    } else {

      this.validationForm.controls["ProvisionIsMadeForABallotBox"].disable();
      this.validationForm.controls["BallotPapersAreValidatedUponIssueComment"].disable();
      this.validationForm.controls["ProvisionIsMadeForVotingToTakePlaceInPrivacyComment"].disable();
      this.validationForm.controls["ProvisionIsMadeForABallotBoxComment"].disable();
      this.validationForm.controls["TheEmptyBoxWasShownToCandidatesBeforeSealingComment"].disable();
      this.validationForm.controls["ItIsPossibleToIdentifyTheElectoralStaffInstantlyComment"].disable();
      this.validationForm.controls["RegulationsGuidingtheelectionprocessArefollowedComment"].disable();
      this.validationForm.controls["TheResultIsAnnouncedAfterTheVotingComment"].disable();
      this.validationForm.controls["TheElectionProcessStartedAtThePlannedTimeComment"].disable();
      this.validationForm.controls["ARecountIsDoneWhereNecessaryComment"].disable();
      this.validationForm.controls["TheBallotBoxIsOpenedInThePresenceOfCandidatesComment"].disable();
      this.validationForm.controls["CandidatesAreAllowedToBePresentDuringCountingComment"].disable();
      this.validationForm.controls["ProvisionIsMadeToAssistTheDisabledIlliterateInAnAppropriateMannerComment"].disable();
      this.validationForm.controls["VotingTakesPlaceInOrderlyManneComment"].disable();
      this.validationForm.controls["ProvisionIsMadeForABallotBox"].disable();
      this.validationForm.controls["ProvisionIsMadeForABallotBox"].clearValidators();
      this.validationForm.controls["ProvisionIsMadeForABallotBox"].updateValueAndValidity();
      this.validationForm.controls["AnOfficialVotersRRollHasBeenPreparedSignedComment"].disable();
      this.validationForm.controls["TheSchoolElectoralOfficerDistrictElectoralTeamMemberAreBothPresentComment"].disable();
      this.validationForm.controls["TheBallotBoxIsOpenedInThePresenceOfCandidates"].disable();
      this.validationForm.controls["TheBallotBoxIsOpenedInThePresenceOfCandidates"].clearValidators();
      this.validationForm.controls["TheBallotBoxIsOpenedInThePresenceOfCandidates"].updateValueAndValidity();
      this.validationForm.controls["CandidatesAreAllowedToBePresentDuringCounting"].disable();
      this.validationForm.controls["CandidatesAreAllowedToBePresentDuringCounting"].clearValidators();
      this.validationForm.controls["CandidatesAreAllowedToBePresentDuringCounting"].updateValueAndValidity();
      this.validationForm.controls["TheResultIsAnnouncedAfterTheVoting"].disable();
      this.validationForm.controls["TheResultIsAnnouncedAfterTheVoting"].clearValidators();
      this.validationForm.controls["TheResultIsAnnouncedAfterTheVoting"].updateValueAndValidity();
      this.validationForm.controls["ARecountIsDoneWhereNecessary"].disable();
      this.validationForm.controls["ARecountIsDoneWhereNecessary"].clearValidators();
      this.validationForm.controls["ARecountIsDoneWhereNecessary"].updateValueAndValidity();
      this.validationForm.controls["RegulationsGuidingtheelectionprocessArefollowed"].disable();
      this.validationForm.controls["RegulationsGuidingtheelectionprocessArefollowed"].clearValidators();
      this.validationForm.controls["RegulationsGuidingtheelectionprocessArefollowed"].updateValueAndValidity();
      this.validationForm.controls["ItIsPossibleToIdentifyTheElectoralStaffInstantly"].disable();
      this.validationForm.controls["ItIsPossibleToIdentifyTheElectoralStaffInstantly"].clearValidators();
      this.validationForm.controls["ItIsPossibleToIdentifyTheElectoralStaffInstantly"].updateValueAndValidity();
      this.validationForm.controls["VotingTakesPlaceInOrderlyManne"].disable();
      this.validationForm.controls["VotingTakesPlaceInOrderlyManne"].clearValidators();
      this.validationForm.controls["VotingTakesPlaceInOrderlyManne"].updateValueAndValidity();
      this.validationForm.controls["ProvisionIsMadeToAssistTheDisabledIlliterateInAnAppropriateManner"].disable();
      this.validationForm.controls["ProvisionIsMadeToAssistTheDisabledIlliterateInAnAppropriateManner"].clearValidators();
      this.validationForm.controls["ProvisionIsMadeToAssistTheDisabledIlliterateInAnAppropriateManner"].updateValueAndValidity();
      this.validationForm.controls["AMechanismIsInPlaceToEnsureThatVotersArePreventedFromVotingMoreThanOnce"].disable();
      this.validationForm.controls["AMechanismIsInPlaceToEnsureThatVotersArePreventedFromVotingMoreThanOnce"].clearValidators();
      this.validationForm.controls["AMechanismIsInPlaceToEnsureThatVotersArePreventedFromVotingMoreThanOnce"].updateValueAndValidity();
      this.validationForm.controls["BallotPapersAreValidatedUponIssue"].disable();
      this.validationForm.controls["BallotPapersAreValidatedUponIssue"].clearValidators();
      this.validationForm.controls["BallotPapersAreValidatedUponIssue"].updateValueAndValidity();
      this.validationForm.controls["ProvisionIsMadeForVotingToTakePlaceInPrivacy"].disable();
      this.validationForm.controls["ProvisionIsMadeForVotingToTakePlaceInPrivacy"].clearValidators();
      this.validationForm.controls["ProvisionIsMadeForVotingToTakePlaceInPrivacy"].updateValueAndValidity();
      this.validationForm.controls["TheEmptyBoxWasShownToCandidatesBeforeSealing"].disable();
      this.validationForm.controls["TheEmptyBoxWasShownToCandidatesBeforeSealing"].clearValidators();
      this.validationForm.controls["TheEmptyBoxWasShownToCandidatesBeforeSealing"].updateValueAndValidity();
      this.validationForm.controls["TheElectionProcessOnlyProceedsInThePresenceOfAQuorum"].disable();
      this.validationForm.controls["TheElectionProcessOnlyProceedsInThePresenceOfAQuorum"].clearValidators();
      this.validationForm.controls["TheElectionProcessOnlyProceedsInThePresenceOfAQuorum"].updateValueAndValidity();
      this.validationForm.controls["AnOfficialVotersRRollHasBeenPreparedSigned"].disable();
      this.validationForm.controls["AnOfficialVotersRRollHasBeenPreparedSigned"].clearValidators();
      this.validationForm.controls["AnOfficialVotersRRollHasBeenPreparedSigned"].updateValueAndValidity();
      this.validationForm.controls["TheSchoolElectoralOfficerDistrictElectoralTeamMemberAreBothPresent"].disable();
      this.validationForm.controls["TheSchoolElectoralOfficerDistrictElectoralTeamMemberAreBothPresent"].clearValidators();
      this.validationForm.controls["TheSchoolElectoralOfficerDistrictElectoralTeamMemberAreBothPresent"].updateValueAndValidity();
      this.validationForm.controls["TheElectionProcessStartedAtThePlannedTime"].disable();
      this.validationForm.controls["TheElectionProcessStartedAtThePlannedTime"].clearValidators();
      this.validationForm.controls["TheElectionProcessStartedAtThePlannedTime"].updateValueAndValidity();
      this.validationForm.controls["TheElectionProcessOnlyProceedsInThePresenceOfAQuorumComment"].disable();
      this.validationForm.controls["AMechanismIsInPlaceToEnsureThatVotersArePreventedFromVotingMoreThanOnceComment"].disable();

      this.validationForm.controls["ProvisionIsMadeForABallotBox"].setValue('');
      this.validationForm.controls["BallotPapersAreValidatedUponIssueComment"].setValue('');
      this.validationForm.controls["ProvisionIsMadeForVotingToTakePlaceInPrivacyComment"].setValue('');
      this.validationForm.controls["ProvisionIsMadeForABallotBoxComment"].setValue('');
      this.validationForm.controls["TheEmptyBoxWasShownToCandidatesBeforeSealingComment"].setValue('');
      this.validationForm.controls["ItIsPossibleToIdentifyTheElectoralStaffInstantlyComment"].setValue('');
      this.validationForm.controls["RegulationsGuidingtheelectionprocessArefollowedComment"].setValue('');
      this.validationForm.controls["TheResultIsAnnouncedAfterTheVotingComment"].setValue('');
      this.validationForm.controls["TheElectionProcessStartedAtThePlannedTimeComment"].setValue('');
      this.validationForm.controls["ARecountIsDoneWhereNecessaryComment"].setValue('');
      this.validationForm.controls["TheBallotBoxIsOpenedInThePresenceOfCandidatesComment"].setValue('');
      this.validationForm.controls["CandidatesAreAllowedToBePresentDuringCountingComment"].setValue('');
      this.validationForm.controls["ProvisionIsMadeToAssistTheDisabledIlliterateInAnAppropriateMannerComment"].setValue('');
      this.validationForm.controls["VotingTakesPlaceInOrderlyManneComment"].setValue('');
      this.validationForm.controls["ProvisionIsMadeForABallotBox"].setValue('');
      this.validationForm.controls["AnOfficialVotersRRollHasBeenPreparedSignedComment"].setValue('');
      this.validationForm.controls["TheSchoolElectoralOfficerDistrictElectoralTeamMemberAreBothPresentComment"].setValue('');
      this.validationForm.controls["TheBallotBoxIsOpenedInThePresenceOfCandidates"].setValue('');
      this.validationForm.controls["CandidatesAreAllowedToBePresentDuringCounting"].setValue('');
      this.validationForm.controls["TheResultIsAnnouncedAfterTheVoting"].setValue('');
      this.validationForm.controls["ARecountIsDoneWhereNecessary"].setValue('');
      this.validationForm.controls["RegulationsGuidingtheelectionprocessArefollowed"].setValue('');
      this.validationForm.controls["ItIsPossibleToIdentifyTheElectoralStaffInstantly"].setValue('');
      this.validationForm.controls["VotingTakesPlaceInOrderlyManne"].setValue('');
      this.validationForm.controls["ProvisionIsMadeToAssistTheDisabledIlliterateInAnAppropriateManner"].setValue('');
      this.validationForm.controls["AMechanismIsInPlaceToEnsureThatVotersArePreventedFromVotingMoreThanOnce"].setValue('');
      this.validationForm.controls["BallotPapersAreValidatedUponIssue"].setValue('');
      this.validationForm.controls["ProvisionIsMadeForVotingToTakePlaceInPrivacy"].setValue('');
      this.validationForm.controls["TheEmptyBoxWasShownToCandidatesBeforeSealing"].setValue('');
      this.validationForm.controls["TheElectionProcessOnlyProceedsInThePresenceOfAQuorum"].setValue('');
      this.validationForm.controls["AnOfficialVotersRRollHasBeenPreparedSigned"].setValue('');
      this.validationForm.controls["TheSchoolElectoralOfficerDistrictElectoralTeamMemberAreBothPresent"].setValue('');
      this.validationForm.controls["TheElectionProcessStartedAtThePlannedTime"].setValue('');
      this.validationForm.controls["TheElectionProcessOnlyProceedsInThePresenceOfAQuorumComment"].setValue('');
      this.validationForm.controls["AMechanismIsInPlaceToEnsureThatVotersArePreventedFromVotingMoreThanOnceComment"].setValue('');
    }

  }


}
