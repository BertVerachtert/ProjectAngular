import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { NieuweLijstComponent } from '../nieuwe-lijst/nieuwe-lijst.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ResultaatLijstComponent } from '../resultaat-lijst/resultaat-lijst.component';
import { EditLijstComponent } from '../edit-lijst/edit-lijst.component';



@NgModule({
  declarations: [DashboardComponent, NieuweLijstComponent, ResultaatLijstComponent, EditLijstComponent],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [DashboardComponent, NieuweLijstComponent, ResultaatLijstComponent, EditLijstComponent]
})
export class DashboardModule { }
