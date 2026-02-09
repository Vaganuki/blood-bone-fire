import {Component, inject, Input, SimpleChanges} from '@angular/core';
import {Character} from '../../../models/characters.model';
import {CommonModule} from '@angular/common';
import {Skill} from '../../../models/skills.model';
import {SkillsService} from '../../../services/skills.service';

@Component({
  selector: 'app-character-card',
  imports: [CommonModule],
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.scss'
})
export class CharacterCardComponent {
  @Input() character!: Character;
  private _skillService = inject(SkillsService);


  skills: Skill[] = [];
  selectedSkill: Skill | null = null;


  ngOnChanges(changes: SimpleChanges) {
    this.skills = this._skillService.getCharacterSkills(this.character.id);
    this.selectedSkill = null;
  }

  selectSkill(skill: Skill) {
    this.selectedSkill = skill;
  }
}
