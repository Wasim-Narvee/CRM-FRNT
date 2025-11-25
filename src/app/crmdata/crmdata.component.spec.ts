import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmdataComponent } from './crmdata.component';

describe('CrmdataComponent', () => {
  let component: CrmdataComponent;
  let fixture: ComponentFixture<CrmdataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrmdataComponent]
    });
    fixture = TestBed.createComponent(CrmdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
