import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {
  bannerDetails: any;
  addTeamForm: FormGroup;
  team: any = {};
  teamId: string;
  constructor(
    private formBuilder: FormBuilder,
    private teamService: TeamService,
    private activeRouter: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.teamId = this.activeRouter.snapshot.paramMap.get('id');
    this.addTeamForm = this.formBuilder.group({
      name: [""],
      foundation: [""],
      country: [""],
      stadium: [""],
      logo: [""]
    })
    if (this.teamId != null) {
      this.bannerDetails = { title: "Edit Team" };
      this.teamService.sendReqToGetTeamById(this.teamId).subscribe((data) => {
        this.team = data.result
      })
    } else {
      this.bannerDetails = { title: "Add Team" };
    }
  }

  addOrEditTeam() {
    if (this.teamId != null) {
      this.teamService.sendReqToEditTeam(this.team).subscribe((data) => {
        alert(data.result);
        this.router.navigate(['admin'])
      })
    } else {
      this.teamService.sendReqToAddTeam(this.team).subscribe((data) => {
        alert(data.result);
        this.router.navigate(['admin'])
      });
    }
  }
}
