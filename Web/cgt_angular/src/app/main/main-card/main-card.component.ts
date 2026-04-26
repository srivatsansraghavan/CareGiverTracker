import { Component } from "@angular/core";
import CVDetails from "../../../assets/cv_srivatsan.json";
import { Actions, ofType } from "@ngrx/effects";
import { showWorkExperienceDetail } from "src/app/store/care-taken-details/care-taken-details.actions";

@Component({
    selector: 'app-main-card',
    templateUrl: './main-card.component.html',
    styleUrls: ['./main-card.component.css'],
    standalone: false,
})
export class MainCardComponent {
    name: string = CVDetails.name;
    title: string = CVDetails.title;
    email: string = CVDetails.email;
    mobile: string = CVDetails.mobile;
    summary: string = CVDetails.summary;
    technicalSkills: any = CVDetails.technical_skills;
    workExperience: { employer: string; designation: string; dateEmployed: string; details: string[] }[] = CVDetails.work_experience;
    workExperienceDetail: string[];
    workEmployer: string;
    showExperienceDetail: boolean = false;
    constructor(private actions$: Actions) {
    }

    ngOnInit() {
        this.actions$.pipe(ofType(showWorkExperienceDetail)).subscribe((employer) => {
            this.workExperienceDetail = this.workExperience.find((experience) => experience.employer === employer.employer)?.details;
            this.workEmployer = employer.employer;
            this.showExperienceDetail = true;
        });
    }

    hideDetail() {
        this.showExperienceDetail = false;
    }
}