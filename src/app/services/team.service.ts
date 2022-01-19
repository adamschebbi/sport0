import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  teamURL: string = "http://localhost:3000/api/teams";
  constructor(private httpClient: HttpClient) { }

  sendReqToAddTeam(teamObj) {
    return this.httpClient.post<{ result: any }>(this.teamURL, teamObj);
  }

  sendReqToGetAllTeams() {
    return this.httpClient.get<({ result: any })>(this.teamURL);
  }

  sendReqToGetTeamById(id) {
    return this.httpClient.get<{ result: any }>(`${this.teamURL}/${id}`);
  }

  sendReqToDeleteTeamById(id) {
    return this.httpClient.delete<{ result: any }>(`${this.teamURL}/${id}`);
  }

  sendReqToEditTeam(obj) {
    return this.httpClient.put<{ result: any }>(`${this.teamURL}/${obj._id}`, obj);
  }
}
