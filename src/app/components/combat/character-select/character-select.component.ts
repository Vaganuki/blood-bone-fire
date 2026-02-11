import {Component, inject, OnDestroy} from '@angular/core';
import {NgForOf} from '@angular/common';
import {CharactersService} from '../../../services/characters.service';
import {Router, RouterLink} from '@angular/router';
import {randomInt} from 'toolzy';
import {CombatsService} from '../../../services/combats.service';
import {Subject, takeUntil} from 'rxjs';
import {GameMode} from '../../../models/combat-state.model';

@Component({
  selector: 'app-character-select',
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './character-select.component.html',
  styleUrl: './character-select.component.scss'
})
export class CharacterSelectComponent implements OnDestroy {

  private destroy$ = new Subject<void>();
  private _characterService = inject(CharactersService);
  private _combatService = inject(CombatsService);
  private _router = new Router();

  gameMode: GameMode = null;
  isIaOpponent = false;
  characters: { id: number, name: string }[] = [];
  selectedCharacters: number[] = [];
  isFirstPlayerChoosing = true;

  ngOnInit() {
    this._combatService.combatState$
      .pipe(takeUntil(this.destroy$))
      .subscribe(state => {
        this.gameMode = state.gameMode;
        this.isIaOpponent = state.isIaOpponent;
      });

    if (!this._combatService.canSelectCharacters()) {
      this._router.navigate(['/']).then();
      return;
    }

    this._characterService.getAllCharacters().subscribe(characters => {
      this.characters = characters;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  selectCharacter(id: number) {
    if (this.gameMode === 'solo') {
      this.selectedCharacters = [id];
    } else if (this.gameMode === 'versus') {

      const otherPlayerIndex = this.isFirstPlayerChoosing ? 1 : 0;
      if (this.selectedCharacters[otherPlayerIndex] === id) return;

      if (this.selectedCharacters.length < 2) {
        this.selectedCharacters.push(id);
        this.isFirstPlayerChoosing = !this.isFirstPlayerChoosing;
      } else {
        if (this.isFirstPlayerChoosing) {
          this.selectedCharacters[0] = id;
        } else {
          this.selectedCharacters[1] = id;
        }
        this.isFirstPlayerChoosing = !this.isFirstPlayerChoosing;
      }
    }
  }

  isSelected(id: number): boolean {
    return this.selectedCharacters.includes(id);
  }

  isChosenByPlayer1(id: number) {
    return id === this.selectedCharacters[0];
  }

  isChosenByPlayer2(id: number) {
    return id === this.selectedCharacters[1];
  }

  confirmSelection() {
    console.log(this.selectedCharacters);
    if (this.gameMode === 'solo') {
      if (this.selectedCharacters.length === 1) {
        let iaCharacterId: number;
        do {
          iaCharacterId = randomInt(1, this.characters.length);
          console.log(iaCharacterId);
        } while (iaCharacterId === this.selectedCharacters[0]);

        this.selectedCharacters[1] = iaCharacterId;

        console.log(this.selectedCharacters);
        this._combatService.setCharacters(this.selectedCharacters[0], this.selectedCharacters[1]);
        this._router.navigate(['/fight']).then();
      }
    } else if (this.gameMode === 'versus') {
      if (this.selectedCharacters.length === 2) {
        this._combatService.setCharacters(this.selectedCharacters[0], this.selectedCharacters[1]);
        this._router.navigate(['/fight']).then();
      }
    }
  }

  canConfirm(): boolean {
    if (this.gameMode === 'solo') {
      return this.selectedCharacters.length === 1;
    } else if (this.gameMode === 'versus') {
      return this.selectedCharacters.length === 2;
    }
    return false;
  }

  getSelectionMessage(): string {
    if (this.gameMode === 'solo') {
      return 'Choisissez votre héros';
    } else {
      if (this.selectedCharacters.length === 0) {
        return 'Joueur 1, choisissez votre héros';
      } else if (this.selectedCharacters.length === 1) {
        return 'Joueur 2, choisissez votre héros';
      } else {
        return `Joueur ${this.isFirstPlayerChoosing ? '1' : '2'}, changez de héros si vous le souhaitez`;
      }
    }
  }
}
