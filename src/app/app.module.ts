import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HomeModule } from './home/home.module';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { SecurityModule} from  './security/security/security.module'
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SecurityInterceptor } from './security/security.interceptor';
import { DashboardModule } from './dashboard/dashboard.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RegisterComponent } from './register/register.component';
import { NieuweLijstComponent } from './nieuwe-lijst/nieuwe-lijst.component';
import { AlleLijstenComponent } from './alle-lijsten/alle-lijsten.component';
import { LijstDetailComponent } from './lijst-detail/lijst-detail.component';
import { LijstZoekComponent } from './lijst-zoek/lijst-zoek.component';
import { ResultaatLijstComponent } from './resultaat-lijst/resultaat-lijst.component';
import { EditLijstComponent } from './edit-lijst/edit-lijst.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorage } from 'angularfire2/storage';
import { environment } from 'src/environments/environment';

const appRoutes: Routes = [
{ path: '', component: HomeComponent},
{ path: 'login', component: LoginComponent},
{ path: 'dashboard', component: DashboardComponent},
{ path: 'register', component: RegisterComponent},
{ path: 'nieuwelijst', component: NieuweLijstComponent},
{ path: 'alleLijsten', component: AlleLijstenComponent},
{ path: 'lijstDetail', component: LijstDetailComponent},
{ path: 'lijstZoek', component: LijstZoekComponent},
{ path: 'resultaatLijst', component: ResultaatLijstComponent},
{ path: 'editLijst', component: EditLijstComponent}
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { enableTracing: false, onSameUrlNavigation: 'reload'}),
    SecurityModule,
    DashboardModule,
    FontAwesomeModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: SecurityInterceptor,
    multi: true
    },
    AngularFireStorage
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
