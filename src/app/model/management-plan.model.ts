export class ManagementPlan {

    planID?: number;

    activityName: string;

    responsibility: string;

    startDate: Date;

    endDate: Date;

    status?: string;

    statusID: number;

    comment: string;

}



export class Status {

statusID: number;

status: string;

}



export class Responsibility {

id: number;

roleId: string;

emisCode?: any;

districtCode?: any;

rolename: string;

position: string;

officelevel: string;

}
export class Activity {

    activityID: number;

    activityName: string;

}



export class ManagementPlanRequest {

    activityName: string;

    roleId: string;

    startDate: Date;

    endDate: Date;

    statusID: string;

    comment: string;

}



export class ManagementPlanResponse {

    planID?: number;

    activityName: string;

    responsibility: Responsibility[];

    startDate: Date;

    endDate: Date;

    status: Status;

    comment: string;

}