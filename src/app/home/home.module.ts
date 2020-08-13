import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { LijstService } from '../services/lijst.service';
import { HeaderComponent } from '../header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from '../register/register.component';
import { AlleLijstenComponent } from '../alle-lijsten/alle-lijsten.component';
import { LijstDetailComponent } from '../lijst-detail/lijst-detail.component';
import { LijstZoekComponent } from '../lijst-zoek/lijst-zoek.component';

@NgModule({
  declarations: [HomeComponent, HeaderComponent, LoginComponent, RegisterComponent, AlleLijstenComponent, LijstDetailComponent, LijstZoekComponent],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers:[LijstService],
  exports: [HomeComponent, HeaderComponent, LoginComponent, RegisterComponent, AlleLijstenComponent, LijstDetailComponent, LijstZoekComponent]
})
export class HomeModule { }
