import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalsMentionsComponent } from './legals-mentions.component';

describe('LegalsMentionsComponent', () => {
  let component: LegalsMentionsComponent;
  let fixture: ComponentFixture<LegalsMentionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LegalsMentionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LegalsMentionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
