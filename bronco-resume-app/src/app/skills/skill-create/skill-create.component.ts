import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";

import { Skill } from "../skill.model";
import { SkillService } from "../skill.service";

@Component({
  selector: "app-skill-create",
  templateUrl: "./skill-create.component.html",
  styleUrls: ["./skill-create.component.css"]
})
export class SkillCreateComponent {
  constructor(public skillService: SkillService) {}

  onAddSkill(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const skill: Skill = {
      id: "",
      description: form.value.description
    };
    this.skillService.addSkill(skill);
    form.resetForm();
  }
  onAddSkillCS1400() {
    const skill: Skill = {
      id: "",
      description: "Java"
    };
    this.skillService.addSkill(skill);
  }
  onAddSkillCS2400() {
    const skill: Skill = {
      id: "",
      description: "Data Structures"
    };
    this.skillService.addSkill(skill);
  }
  onAddSkillCS3310() {
    const skill: Skill = {
      id: "",
      description: "Algorithm design"
    };
    this.skillService.addSkill(skill);
  }
  onAddSkillCS4800() {
    const skill: Skill = {
      id: "",
      description: "Fullstack Knowledge"
    };
    this.skillService.addSkill(skill);
  }
  onAddSkillCS3560() {
    const skill: Skill = {
      id: "",
      description: "Object Oriented Programming"
    };
    this.skillService.addSkill(skill);
  }
  onAddSkillCS4200() {
    const skill: Skill = {
      id: "",
      description: "A.I"
    };
    this.skillService.addSkill(skill);
  }
  onAddSkillCS4350() {
    const skill: Skill = {
      id: "",
      description: "SQL"
    };
    this.skillService.addSkill(skill);
  }
  onAddSkillCS650() {
    const skill: Skill = {
      id: "",
      description: "Big Data"
    };
    this.skillService.addSkill(skill);
  }
  onAddSkillCS4700() {
    const skill: Skill = {
      id: "",
      description: "Game Development"
    };
    this.skillService.addSkill(skill);
  }
  onAddSkillCS2450() {
    const skill: Skill = {
      id: "",
      description: "GUI Design"
    };
    this.skillService.addSkill(skill);
  }
  onAddSkillCS2520() {
    const skill: Skill = {
      id: "",
      description: "Python"
    };
    this.skillService.addSkill(skill);
  }
  onAddSkillCS2560() {
    const skill: Skill = {
      id: "",
      description: "C++"
    };
    this.skillService.addSkill(skill);
  }
}
