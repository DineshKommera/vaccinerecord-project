import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MemberDetailComponent } from './member-detail/member-detail.component';
import { MembersComponent } from './members/members.component';
import { MemberSearchComponent } from './member-search/member-search.component';
import { MessagesComponent } from './messages/messages.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { FilterPipe } from 'filter.pipe';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { MemberService } from './member.service'
import { LogoutComponent } from './logout/logout.component'


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    MembersComponent,
    MemberDetailComponent,
    MessagesComponent,
    MemberSearchComponent,
    LoginpageComponent,
    FilterPipe,
    RegisterComponent,
    LogoutComponent
  ],
  providers: [AuthService,AuthGuard,MemberService],
  bootstrap: [ AppComponent ]
})
export class AppModule { }