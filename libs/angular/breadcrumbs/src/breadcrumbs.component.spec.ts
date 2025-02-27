import {
  TestBed,
  inject,
  ComponentFixture,
  waitForAsync,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Component, DebugElement } from '@angular/core';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { TdBreadcrumbsComponent } from './breadcrumbs.component';
import { NgFor } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TdBreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { MatToolbarModule } from '@angular/material/toolbar';

// Simulate window resize event
const resizeEvent = document.createEvent('Event');
resizeEvent.initEvent('resize', true, true);

global.window.resizeTo = (width) => {
  global.window.innerWidth = width || global.window.innerWidth;
  global.window.innerHeight = width || global.window.innerHeight;
  global.window.dispatchEvent(resizeEvent);
};

interface IBreadcrumbItem {
  route: string;
  text: string;
}
const sampleBreadcrumb: IBreadcrumbItem = { route: 'test', text: 'test' };

@Component({
  selector: 'td-fake',
  template: `
    <router-outlet></router-outlet>
    <div>fake</div>
  `,
  imports: [RouterOutlet],
})
export class FakeComponent {}

describe('Component: Breadcrumbs', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: '', component: FakeComponent },
          { path: 'layouts', component: FakeComponent },
          { path: 'layouts2', component: FakeComponent },
          { path: 'layouts3', component: FakeComponent },
        ]),
        TdBreadcrumbsTestComponent,
        TdBreadcrumbsToolbarTestComponent,
        TdBreadcrumbsSizeIconChangeTestComponent,
        FakeComponent,
      ],
      providers: [provideNoopAnimations()],
    });
    TestBed.compileComponents();
  }));

  it('should render 5 Breadcrumbs', waitForAsync(
    inject([], () => {
      const fixture = TestBed.createComponent(TdBreadcrumbsTestComponent);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const breadcrumbs: TdBreadcrumbsComponent = fixture.debugElement.query(
          By.directive(TdBreadcrumbsComponent)
        ).componentInstance;
        expect(breadcrumbs.count).toBe(5);
      });
    })
  ));

  it('should change the separatorIcon', waitForAsync(
    inject([], () => {
      const fixture = TestBed.createComponent(TdBreadcrumbsTestComponent);
      const component: TdBreadcrumbsTestComponent =
        fixture.debugElement.componentInstance;
      component.separatorIcon = 'flight_land';
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(
          fixture.debugElement
            .queryAll(By.css('.td-breadcrumb'))[1]
            .nativeElement.innerHTML.indexOf('flight_land')
        ).toBeGreaterThan(-1);
      });
    })
  ));

  //TODO find a better way to test breadcrumb resizing
  xit('should resize window and hide breadcrumbs', waitForAsync(
    inject([], () => {
      const fixture = TestBed.createComponent(TdBreadcrumbsTestComponent);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        document.body.style.width = '300px';
        window.dispatchEvent(new Event('resize'));
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          const breadcrumbs: TdBreadcrumbsComponent =
            fixture.debugElement.query(
              By.directive(TdBreadcrumbsComponent)
            ).componentInstance;
          expect(breadcrumbs.hiddenBreadcrumbs.length).toBe(2);
        });
      });
    })
  ));

  // TODO find a better way to test breadcrumb resizing
  xit('should resize window and hide breadcrumbs with breadcrumb in mat-toolbar with padding', waitForAsync(
    inject([], () => {
      const fixture: ComponentFixture<TdBreadcrumbsToolbarTestComponent> = TestBed.createComponent(
        TdBreadcrumbsToolbarTestComponent
      );

      // Trigger the window resize event.
      window.dispatchEvent(new Event('resize'));
      fixture.detectChanges();
      fixture.whenStable().then(() => {

        fixture.detectChanges();
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          const breadcrumbs: TdBreadcrumbsComponent =
            fixture.debugElement.query(
              By.directive(TdBreadcrumbsComponent)
            ).componentInstance;

          expect(breadcrumbs.hiddenBreadcrumbs.length).toBe(3);
        });
      });
    })
  ));

  it('should react to change of breadcrumbs size & separator icon', waitForAsync(
    inject([], async () => {
      const fixture = TestBed.createComponent(
        TdBreadcrumbsSizeIconChangeTestComponent
      );

      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
      await fixture.whenStable();

      let breadcrumbs: DebugElement = fixture.debugElement.query(
        By.directive(TdBreadcrumbsComponent)
      );
      expect(breadcrumbs.children.length).toBe(1);
      expect(breadcrumbs.children[0].query(By.css('mat-icon'))).toBeFalsy();
      const component: TdBreadcrumbsSizeIconChangeTestComponent =
        fixture.debugElement.componentInstance;
      component.breadcrumbItems = [
        ...component.breadcrumbItems,
        sampleBreadcrumb,
      ];

      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
      await fixture.whenStable();

      breadcrumbs = fixture.debugElement.query(
        By.directive(TdBreadcrumbsComponent)
      );
      expect(breadcrumbs.children.length).toBe(2);
      expect(breadcrumbs.children[0].query(By.css('mat-icon'))).toBeTruthy();
      expect(
        breadcrumbs.children[0].query(By.css('mat-icon')).nativeElement
          .textContent
      ).toContain('chevron_right');
      expect(breadcrumbs.children[1].query(By.css('mat-icon'))).toBeFalsy();
      component.separatorIcon = 'motorcycle';

      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
      await fixture.whenStable();

      breadcrumbs = fixture.debugElement.query(
        By.directive(TdBreadcrumbsComponent)
      );
      expect(breadcrumbs.children.length).toBe(2);
      expect(breadcrumbs.children[0].query(By.css('mat-icon'))).toBeTruthy();
      expect(
        breadcrumbs.children[0].query(By.css('mat-icon')).nativeElement
          .textContent
      ).toContain('motorcycle');
      expect(breadcrumbs.children[1].query(By.css('mat-icon'))).toBeFalsy();

      component.breadcrumbItems = [sampleBreadcrumb];

      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(breadcrumbs.children.length).toBe(1);
      expect(breadcrumbs.children[0].query(By.css('mat-icon'))).toBeFalsy();
    })
  ));
});

@Component({
  selector: 'td-breadcrumbs-test',
  template: `
    <div [style.width]="width">
      <td-breadcrumbs
        #breadcrumbs
        class="pad-left"
        separatorIcon="{{ separatorIcon }}"
      >
        <a td-breadcrumb [routerLink]="'/'">Home</a>
        <a td-breadcrumb [routerLink]="'/layouts'">Layouts</a>
        <a td-breadcrumb [routerLink]="'/layouts2'">Layouts2</a>
        <a td-breadcrumb [routerLink]="'/layouts3'">Layouts3</a>
        <td-breadcrumb class="tc-td-secondary">Manage List</td-breadcrumb>
      </td-breadcrumbs>
    </div>
  `,
  imports: [TdBreadcrumbsComponent, TdBreadcrumbComponent, RouterLink],
})
class TdBreadcrumbsTestComponent {
  separatorIcon = 'motorcycle';
}

@Component({
  selector: 'td-breadcrumbs-test-toolbar',
  template: `
    <mat-toolbar
      class="dense-toolbar push-top"
      style="width: 300px;"
      color="primary"
    >
      <mat-toolbar-row>
        <td-breadcrumbs #breadcrumbsPadded class="pad-left">
          <a td-breadcrumb routerLink="/">Home</a>
          <a td-breadcrumb routerLink="/layouts">Layouts</a>
          <a td-breadcrumb routerLink="/layouts2">Layouts2</a>
          <a td-breadcrumb routerLink="/layouts3">Layouts3</a>
          <td-breadcrumb class="tc-grey-500">Manage List</td-breadcrumb>
        </td-breadcrumbs>
      </mat-toolbar-row>
    </mat-toolbar>
  `,
  imports: [TdBreadcrumbsComponent, TdBreadcrumbComponent, RouterLink, MatToolbarModule],
})
class TdBreadcrumbsToolbarTestComponent {
  separatorIcon = 'motorcycle';
}

@Component({
  selector: 'td-breadcrumbs-size-icon-change-test',
  template: `
    <div>
      <td-breadcrumbs #breadcrumbs [separatorIcon]="separatorIcon">
        <a
          *ngFor="let breadcrumb of breadcrumbItems"
          td-breadcrumb
          [routerLink]="breadcrumb.route"
        >
          {{ breadcrumb.text }}
        </a>
      </td-breadcrumbs>
    </div>
  `,
  imports: [TdBreadcrumbsComponent, TdBreadcrumbComponent, NgFor, RouterLink],
})
class TdBreadcrumbsSizeIconChangeTestComponent {
  breadcrumbItems: IBreadcrumbItem[] = [sampleBreadcrumb];
  separatorIcon = 'chevron_right';
}
