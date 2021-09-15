import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoSpeakerFormComponent } from './co-speaker-form.component';

describe('CoSpeakerFormComponent', () => {
  let component: CoSpeakerFormComponent;
  let fixture: ComponentFixture<CoSpeakerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoSpeakerFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoSpeakerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
