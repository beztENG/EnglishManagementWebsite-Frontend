import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfileService } from '../../../../services/profile.service';
import { CommonModule } from '@angular/common';
import { Profile } from '../../../interfaces/profile.model';

@Component({
  selector: 'app-profile-detail',
  imports: [CommonModule],
  templateUrl: './profile-detail.component.html',
  styleUrl: './profile-detail.component.css'
})
export class ProfileDetailComponent implements OnInit {
  profile!: Profile;

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const code = this.route.snapshot.paramMap.get('code'); // Fetch 'code' from route
    if (code) {
      this.getProfile(code);
    }
  }


  getProfile(code: string): void {
    this.profileService.getProfileByCode(code).subscribe(
      (data: Profile) => {
        console.log(code);
        this.profile = data;
      },
      (error) => {
        console.error('Error fetching profile:', error);
      }
    );
  }
}