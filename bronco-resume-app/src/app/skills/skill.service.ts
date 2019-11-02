import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Skill } from './skill.model';

@Injectable({providedIn: 'root'})
export class SkillService {
    private skillList: Skill[] = [];
    private skillListUpdated = new Subject<Skill[]>();

  constructor( private http: HttpClient) {}

  getSkill() {
    this.http
      .get<{ message: string; skill: any }>(
        'http://localhost:3000/api/skills'
      )
      .pipe(map((skillData) => {
        return skillData.skill.map(skill => {
          return {
            description: skill.description,
            id: skill._id
          };
        });
      }))
      .subscribe(transformedSkills => {
        this.skillList = transformedSkills;
        this.skillListUpdated.next([...this.skillList]);
    });
  }
  addSkill(skill: Skill) {
    this.http
      .post<{ message: string, skillId: string }>('http://localhost:3000/api/skills', skill)
      .subscribe(responseData => {
        const id = responseData.skillId;
        skill.id = id;
        this.skillList.push(skill);
        this.skillListUpdated.next([...this.skillList]);
        console.log(responseData.message);
    });
  }
  deleteSkill(skillId: string) {
    this.http.delete('http://localhost:3000/api/skills/' + skillId)
      .subscribe(() => {
        const updatedSkillList = this.skillList.filter(skill => skill.id !== skillId);
        this.skillList = updatedSkillList;
        this.skillListUpdated.next([...this.skillList]);
    });
  }
  getSkillUpdateListener() {
    return this.skillListUpdated.asObservable();
  }
}
