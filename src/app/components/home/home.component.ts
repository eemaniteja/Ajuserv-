import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../hero/hero.component';
import { ServicesComponent } from '../services/services.component';
import { ProjectsComponent } from '../projects/projects.component';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';
import { AnimationService } from '../../services/animation.service';
import { ExpertTeamComponent } from '../expert-team/expert-team.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    ServicesComponent,
    ProjectsComponent,
    AboutComponent,
    ExpertTeamComponent,
    ContactComponent,
  ],
  template: `
    <div id="home" class="section-wrapper">
      <app-hero></app-hero>
    </div>
    <div id="services" class="section-wrapper section-transition">
      <app-services></app-services>
    </div>
    <div id="projects" class="section-wrapper section-transition">
      <app-projects></app-projects>
    </div>
    <div id="about" class="section-wrapper section-transition">
      <app-about></app-about>
    </div>
    <div id="expert-team" class="section-wrapper section-transition">
       <app-expert-team></app-expert-team>
    </div>
    <div id="contact" class="section-wrapper section-transition">
      <app-contact></app-contact>
    </div>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  constructor(private animationService: AnimationService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.animationService.observeElements();
    this.animationService.initParallax();
  }
}