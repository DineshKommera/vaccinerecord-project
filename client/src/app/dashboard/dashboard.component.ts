import { Component, OnInit } from '@angular/core';
import { Member } from '../member';
import { MemberService } from '../member.service';
import { MEMBERS } from '../mock-members';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  members: Member[] = [];
  email = ""
 

  constructor(private memberService: MemberService, private router: Router) { }

  ngOnInit() {
    this.getMembers();
    this.memberService.getData().subscribe(data => {
      if(data.status) {
        this.email = data.email
      
      } else {
        this.router.navigate(['logout'])
      }
    })
  }
  
  getMembers(): void {
      
      this.memberService.getMembers()
      .subscribe(members => this.members = members.filter(Object=>Object.status==0));
          
  }
}

