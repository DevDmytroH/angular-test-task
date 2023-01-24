import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

export const getElementByTestId = (fixture: ComponentFixture<any>, testId: string): HTMLElement => {
  return fixture.debugElement.query(By.css(`[data-testing="${testId}"]`)).nativeElement;
}
