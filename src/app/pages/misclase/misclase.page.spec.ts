import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MisclasePage } from './misclase.page';

describe('MisclasePage', () => {
  let component: MisclasePage;
  let fixture: ComponentFixture<MisclasePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MisclasePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
