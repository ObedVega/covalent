import { TestBed, waitForAsync, ComponentFixture } from '@angular/core/testing';
import { Component, Output, EventEmitter } from '@angular/core';
import { CovalentFlavoredMarkdownModule } from './flavored-markdown.module';
import { ITdFlavoredMarkdownButtonClickEvent } from './flavored-markdown.component';

@Component({
  template: `
    <td-flavored-markdown (buttonClicked)="buttonClicked.emit($event)">{{
      markdown
    }}</td-flavored-markdown>
  `,
  imports: [CovalentFlavoredMarkdownModule],
})
class TdFlavoredMarkdownTestComponent {
  markdown = '';
  @Output()
  buttonClicked: EventEmitter<ITdFlavoredMarkdownButtonClickEvent> =
    new EventEmitter<ITdFlavoredMarkdownButtonClickEvent>();
}

describe('Component: TdFlavoredMarkdown should: ', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TdFlavoredMarkdownTestComponent],
    });
    TestBed.compileComponents();
  }));

  it('should render a special link as a button', waitForAsync(async () => {
    const fixture: ComponentFixture<TdFlavoredMarkdownTestComponent> =
      TestBed.createComponent(TdFlavoredMarkdownTestComponent);
    const element: HTMLElement = fixture.nativeElement;
    fixture.componentInstance.markdown = `
      [Open tour step 1](#data=step1)
      [Open tour step 2](#data=step2)
      `;

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(element.querySelector('.mat-mdc-button-base')).toBeTruthy();
  }));

  it('should be able to listen to click events and grab data', waitForAsync(async () => {
    const fixture: ComponentFixture<TdFlavoredMarkdownTestComponent> =
      TestBed.createComponent(TdFlavoredMarkdownTestComponent);
    const element: HTMLElement = fixture.nativeElement;
    const step1: ITdFlavoredMarkdownButtonClickEvent = {
      text: 'Open tour step 1',
      data: 'step1Data',
    };
    const step2: ITdFlavoredMarkdownButtonClickEvent = {
      text: 'Open tour step 2',
      data: 'step2Data',
    };
    fixture.componentInstance.markdown = `
      [${step1.text}](#data=${step1.data})
      [${step2.text}](#data=${step2.data})
      `;

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    await fixture.whenStable();

    const buttons: HTMLButtonElement[] = Array.from(
      element.querySelectorAll('button')
    );
    const receivedData =
      await fixture.componentInstance.buttonClicked.toPromise();

    buttons[0].click();

    fixture.detectChanges();
    await fixture.whenStable();

    expect(receivedData).toEqual(step1);

    buttons[1].click();

    fixture.detectChanges();
    await fixture.whenStable();

    expect(receivedData).toEqual(step2);
  }));
});
