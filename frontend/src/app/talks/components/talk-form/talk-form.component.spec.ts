import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalkFormComponent } from './talk-form.component';

describe('TalkFormComponent', () => {
  let component: TalkFormComponent;
  let fixture: ComponentFixture<TalkFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalkFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TalkFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
