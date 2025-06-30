// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { ExpertTeamComponent } from './expert-team.component';

// describe('ExpertTeamComponent', () => {
//   let component: ExpertTeamComponent;
//   let fixture: ComponentFixture<ExpertTeamComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ ExpertTeamComponent ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(ExpertTeamComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should render team members', () => {
//     expect(component.teamMembers.length).toBe(3);
//   });

//   it('should handle social link clicks', () => {
//     spyOn(window, 'open');
//     component.onSocialLinkClick('https://example.com');
//     expect(window.open).toHaveBeenCalledWith('https://example.com', '_blank', 'noopener,noreferrer');
//   });
// });