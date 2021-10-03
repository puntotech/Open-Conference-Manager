import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacebookDeleteDataComponent } from './facebook-delete-data.component';

describe('FacebookDeleteDataComponent', () => {
  let component: FacebookDeleteDataComponent;
  let fixture: ComponentFixture<FacebookDeleteDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacebookDeleteDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacebookDeleteDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
