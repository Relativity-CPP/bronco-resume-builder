import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Skill } from './skill.model';

@Injectable({providedIn: 'root'})
export class SkillsService {
    private skillList: Skill[] = [];
    private skillsUpdated = new Subject<Skill[]>();

    getSkills() {
        return [...this.skillList];
    }

    addSkill(skill: Skill) {
        this.skillList.push(skill);
        this.skillsUpdated.next([...this.skillList]);
    }

    getSkillUpdateListener() {
        return this.skillsUpdated.asObservable();
    }
}
