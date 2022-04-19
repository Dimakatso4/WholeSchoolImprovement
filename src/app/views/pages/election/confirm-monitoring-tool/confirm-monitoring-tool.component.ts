import { Component, OnInit } from '@angular/core';
import { UsersService } from "../../users/users.service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ElectionService } from '../election.service';
import Swal from 'sweetalert2';
import { AppService } from 'src/app/app.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-confirm-monitoring-tool',
  templateUrl: './confirm-monitoring-tool.component.html',
  styleUrls: ['./confirm-monitoring-tool.component.scss']
})
export class ConfirmMonitoringToolComponent implements OnInit {

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
  public COVIDProtocolsareobserved: String;
  public COVIDProtocolsareobservedComment: any;
  public actiontaken: any;
  public conduciveenvironment: any;
  public recommendation: any;
  public dulyElectedComment: any;

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

  public DEOs;
  public SEOs;
  public schoolName;
  public districtName;
  public pemId;
  public dateOfNextElection;
  public disputes;
  public resolved;
  public dulyElected;

  HandSanitising
  Masking
  Screening
  SocialDistancing
  Other

  public noDEOs = false;
  public noSEOs = false;


  validationForm: FormGroup;

  isEditForm;
  assignedTo
  currentRole
  public status;
  public seocomment
  public peocomment
  public response;

  currLat;
  currLng;

  ngOnInit(): void {
    this.currentRole = this.appservice.getLoggedInUserRole()
    this.isEditForm = false

    // this.route.queryParams.subscribe(params => {
    //   // login: 'monitor'
    //   if (params.id != "") {
    //     // create new form


    //   } else {
    //     // view or update the form
    //     this.isEditForm = true
    //     // params.id;
    //   }

    // });

    $("input[type='date']").keydown(function (event) { event.preventDefault(); });

    this.userservice.getAllDistricts().subscribe((res: any) => {
      this.allDistricts = res;
    });


    this.electionservice.getMonitoringToolById(sessionStorage.getItem('monitorId')).subscribe((res: any) => {
      console.log(res)
      this.response = res;

      this.modeOfElection = res.mode;
      this.observer1 = res.observer1;
      this.observer2 = res.observer2;
      this.observer3 = res.observer3
      this.dateOfElection = moment(res.dateOfElection).format('YYYY-MM-DD');
      this.timeOfElection = res.timeOfElection
      this.TheElectionProcessStartedAtThePlannedTime = res.electionProcessStartedPlannedTime;
      this.TheElectionProcessStartedAtThePlannedTimeComment = res.electionProcessStartedPlannedTimeComment;
      this.TheSchoolElectoralOfficerDistrictElectoralTeamMemberAreBothPresent = res.deoseoPresent.trim();
      this.TheSchoolElectoralOfficerDistrictElectoralTeamMemberAreBothPresentComment = res.deoseoPresentComment;
      this.AnOfficialVotersRRollHasBeenPreparedSigned = res.officialVotersRollPreparedSigned;
      this.AnOfficialVotersRRollHasBeenPreparedSignedComment = res.officialVotersRollPreparedSignedComment
      this.TheElectionProcessOnlyProceedsInThePresenceOfAQuorum = res.quoromReached
      this.TheElectionProcessOnlyProceedsInThePresenceOfAQuorumComment = res.quoromReachedComment
      this.ProvisionIsMadeForABallotBox = res.provisionMade
      this.ProvisionIsMadeForABallotBoxComment = res.provisionMadeComment
      this.ProvisionIsMadeForVotingToTakePlaceInPrivacy = res.votingInPrivacy
      this.ProvisionIsMadeForVotingToTakePlaceInPrivacyComment = res.votingInPrivacyComment
      this.BallotPapersAreValidatedUponIssue = res.ballotPapersValid
      this.BallotPapersAreValidatedUponIssueComment = res.ballotPapersValidComment
      this.AMechanismIsInPlaceToEnsureThatVotersArePreventedFromVotingMoreThanOnce = res.mechanismInPlace
      this.AMechanismIsInPlaceToEnsureThatVotersArePreventedFromVotingMoreThanOnceComment = res.mechanismInPlaceComment
      this.ItIsPossibleToIdentifyTheElectoralStaffInstantly = res.electoralStaffIdentifiable
      this.ItIsPossibleToIdentifyTheElectoralStaffInstantlyComment = res.electoralStaffIdentifiableComment
      this.ProvisionIsMadeToAssistTheDisabledIlliterateInAnAppropriateManner = res.provisionForDisabledIlliterate
      this.ProvisionIsMadeToAssistTheDisabledIlliterateInAnAppropriateMannerComment = res.provisionForDisabledIlliterateComment
      this.VotingTakesPlaceInOrderlyManne = res.votingOrderly
      this.VotingTakesPlaceInOrderlyManneComment = res.votingOrderlyComment
      this.CandidatesAreAllowedToBePresentDuringCounting = res.candidateAllowedPresent
      this.CandidatesAreAllowedToBePresentDuringCountingComment = res.candidateAllowedPresentComment
      this.TheBallotBoxIsOpenedInThePresenceOfCandidates = res.ballotOpen
      this.TheBallotBoxIsOpenedInThePresenceOfCandidatesComment = res.ballotOpenComment
      this.ARecountIsDoneWhereNecessary = res.recount
      this.ARecountIsDoneWhereNecessaryComment = res.recountComment
      this.TheResultIsAnnouncedAfterTheVoting = res.resultAnnounce
      this.TheResultIsAnnouncedAfterTheVotingComment = res.resultAnnounceComment
      this.RegulationsGuidingtheelectionprocessArefollowed = res.regulationsFollowed
      this.RegulationsGuidingtheelectionprocessArefollowedComment = res.regulationsFollowedComment
      this.COVIDProtocolsareobserved = res.covidProtocolsObserved
      this.COVIDProtocolsareobservedComment = res.covidProtocolsObservedComment
      this.PolicyCompliance = res.policyCompliance
      this.BestPractice = res.bestPractise
      this.WereThereAnyIrregularities = res.irregularities
      this.actiontaken = res.actionTaken
      this.conduciveenvironment = res.conduciveEnvironment
      this.recommendation = res.recommendation
      this.districtCode = res.districtCode
      this.assignedTo = res.assignTo;
      this.seocomment = res.seoFeedback;
      this.peocomment = res.peoFeedback;
      this.districtName = res.districtName;
      this.schoolName = res.schoolName;
      this.pemId = res.pemId;
      this.dateOfNextElection = moment(res.dateOfNextElection).format('YYYY-MM-DD');
      this.disputes = res.disputes
      this.resolved = res.resolved
      this.dulyElected = res.dulyElected;

      this.directorate = res.directorate;
      this.districtMonitor = res.districtMonitor;
      // this.WereThereAnyIrregularities = res.WereThereAnyIrregularities;
      this.TheEmptyBoxWasShownToCandidatesBeforeSealing = res.emptyBallotShownBeforeSealing;
      this.TheEmptyBoxWasShownToCandidatesBeforeSealingComment = res.emptyBallotShownBeforeSealingComment;

      let stringArray = this.COVIDProtocolsareobserved.split(',');

      if (stringArray[0] == "Screening") {
        this.Screening = true;
      } else {
        this.Screening = false;
      }

      if (stringArray[1] == "Hand Sanitising") {
        this.HandSanitising = true;
      } else {
        this.HandSanitising = false;
      }

      if (stringArray[2] == "Masking") {
        this.Masking = true;
      } else {
        this.Masking = false;
      }

      if (stringArray[3] == "Social Distancing") {
        this.SocialDistancing = true;
      } else {
        this.SocialDistancing = false;
      }

      if (stringArray[4] == "Other") {
        this.Other = true
      } else {
        this.Other = false;
      }


      this.userservice.getSchoolsByDistrict(this.districtCode).subscribe((schools: any) => {
        this.allschools = schools;
        this.school = res.emisNumber;


        this.electionservice.getSEOBySchool(this.school).subscribe(seo => {
          this.SEOs = seo;
          this.schoolElectoralOfficer = res.seoId

        }, err => {
          console.log(err);
        })


      }, err => {
        console.log(err)
      });


      this.electionservice.getDEOByDitrict(this.districtCode).subscribe(deo => {
        this.DEOs = deo;
        this.districtElectoralOfficer = res.deoId

      }, err => {
        console.log(err);
      });


    }, err => {
      console.log(err);
      this.router.navigate(['/election/monitor-view'])
    })


  }


  Confirm() {

    Swal.fire({
      title: 'Are you sure you want to submit?',
      text: 'Your confirmation will be processed',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes!',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {

        navigator.geolocation.getCurrentPosition(position => {
          console.log("https://www.google.co.za/maps/@" + position.coords.latitude + "," + position.coords.longitude + ",18z");
          this.currLat = position.coords.latitude;
          this.currLng = position.coords.longitude;
        });

        if (this.assignedTo == "SEO" && this.currentRole == "SEO") {
          this.status = "PEO"
        } else if (this.assignedTo == "SEO" && this.currentRole == "PEO") {
          this.status = "SEO."
        } else if (this.assignedTo == "PEO" && this.currentRole == "PEO" || this.assignedTo == "SEO." && this.currentRole == "SEO") {
          this.status = "Confirmed"
        }


        let data = {
          id: sessionStorage.getItem('monitorId'),
          emisNumber: this.school,
          mode: this.modeOfElection,
          observer1: this.observer1,
          observer2: this.observer2,
          observer3: this.observer3,
          dateOfElection: this.response.dateOfElection,
          timeOfElection: this.response.timeOfElection,
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
          pemId: this.pemId,
          CurrentLocation: "https://www.google.co.za/maps/@" + this.currLat + "," + this.currLng + ",18z",
          PEOFeedback: this.peocomment,
          SEOFeedback: this.seocomment,
          AssignTo: this.status,
          dateOfNextElection: this.response.dateOfNextElection,
          disputes: this.disputes,
          resolved: this.resolved,
          dulyElected: this.dulyElected,
          directorate: this.directorate,
          districtMonitor: this.districtMonitor,
          // WereThereAnyIrregularities: this.WereThereAnyIrregularities, 
          emptyBallotShownBeforeSealing: this.TheEmptyBoxWasShownToCandidatesBeforeSealing,
          emptyBallotShownBeforeSealingComment: this.TheEmptyBoxWasShownToCandidatesBeforeSealingComment

        }

        
        this.electionservice.updateMonitoringTool(data).subscribe(res => {
          console.log(res)
          Swal.fire(
            'Successful',
            'The entry is now confirmed, thank you',
            'success'
          ).then((output) => {
            if (output.value || output.isDismissed) {
              this.router.navigate(['/election/monitor-view'])
            }
          });

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

}