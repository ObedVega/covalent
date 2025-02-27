import { Component, HostBinding } from '@angular/core';

import { slideInUpAnimation } from '../../../../app.animations';

@Component({
  standalone: false,
  selector: 'utility-styles',
  templateUrl: './utility-styles.component.html',
  styleUrls: ['./utility-styles.component.scss'],
  animations: [slideInUpAnimation],
})
export class UtilityStylesComponent {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('class.td-route-animation') classAnimation = true;
  generalCss = `
    .radius-none // no border radius
    .overflow-hidden // hide overflow
    .overflow-auto // normal overflow
    .block // display block
    .inline-block // display inline block
    .relative // relative positioning
    .fixed // fixed positioning
    .height-auto // 0 min height
    .z-3 // z index 3
    .z-2 // z index 2
    .z-1 // z index 1
  `;
  sizeCss = `
    /* Sizing avail in 12 16 24 32 50 64 72 100 128 256 */
    .size-256 // 256 height and width
    .size-height-256 // 256 height and auto width
    .size-width-256 // 256 width and auto height
  `;
  textCss = `
    .text-normal // normal font size
    .text-center // text align center
    .text-left // text align left
    .text-right // text align right
    .text-micro // font size 10px
    .text-xs // font size 50%
    .text-sm // font size 70%
    .text-md // font size 80%
    .text-lg // font size 110%
    .text-xl // font size 120%
    .text-xxl // font size 130%
    .text-30 // font size 30px
    .text-super // font size 60px
    .text-wrap // normal white space
    .text-break // word break
    .text-upper // uppercase
    .text-lower // lowercase
    .text-caps // all caps
    .text-truncate // single line of truncated text w/ ...
    .text-nodecoration // no underline
  `;
  padCss = `
    .pad             // 16px
    .pad-xxl         // 56px
    .pad-xl          // 48px
    .pad-lg          // 32px
    .pad-md          // 24px
    .pad-sm          // 8px
    .pad-xs          // 4px
    .pad-none        // 0px

    .pad-top         // 16px
    .pad-top-xxl     // 56px
    .pad-top-xl      // 48px
    .pad-top-lg      // 32px
    .pad-top-md      // 24px
    .pad-top-sm      // 8px
    .pad-top-xs      // 4px
    .pad-top-none    // 0px

    .pad-right       // 16px
    .pad-right-xxl   // 56px
    .pad-right-xl    // 48px
    .pad-right-lg    // 32px
    .pad-right-md    // 24px
    .pad-right-sm    // 8px
    .pad-right-xs    // 4px
    .pad-right-none  // 0px

    .pad-bottom      // 16px
    .pad-bottom-xxl  // 56px
    .pad-bottom-xl   // 48px
    .pad-bottom-lg   // 32px
    .pad-bottom-md   // 24px
    .pad-bottom-sm   // 8px
    .pad-bottom-xs   // 4px
    .pad-bottom-none // 0px

    .pad-left        // 16px
    .pad-left-xxl    // 56px
    .pad-left-xl     // 48px
    .pad-left-lg     // 32px
    .pad-left-md     // 24px
    .pad-left-sm     // 8px
    .pad-left-xs     // 4px
    .pad-left-none   // 0px
  `;
  pushCss = `
    .push             // 16px
    .push-xxl         // 56px
    .push-xl          // 48px
    .push-lg          // 32px
    .push-md          // 24px
    .push-sm          // 8px
    .push-xs          // 4px
    .push-none        // 0px

    .push-top         // 16px
    .push-top-xxl     // 56px
    .push-top-xl      // 48px
    .push-top-lg      // 32px
    .push-top-md      // 24px
    .push-top-sm      // 8px
    .push-top-xs      // 4px
    .push-top-none    // 0px

    .push-right       // 16px
    .push-right-xxl   // 56px
    .push-right-xl    // 48px
    .push-right-lg    // 32px
    .push-right-md    // 24px
    .push-right-sm    // 8px
    .push-right-xs    // 4px
    .push-right-none  // 0px

    .push-bottom      // 16px
    .push-bottom-xxl  // 56px
    .push-bottom-xl   // 48px
    .push-bottom-lg   // 32px
    .push-bottom-md   // 24px
    .push-bottom-sm   // 8px
    .push-bottom-xs   // 4px
    .push-bottom-none // 0px

    .push-left        // 16px
    .push-left-xxl    // 56px
    .push-left-xl     // 48px
    .push-left-lg     // 32px
    .push-left-md     // 24px
    .push-left-sm     // 8px
    .push-left-xs     // 4px
    .push-left-none   // 0px  
  `;
  pullCss = `
    .pull             // 16px
    .pull-xxl         // 56px
    .pull-xl          // 48px
    .pull-lg          // 32px
    .pull-md          // 24px
    .pull-sm          // 8px
    .pull-xs          // 4px
    .pull-none        // 0px

    .pull-top         // 16px
    .pull-top-xxl     // 56px
    .pull-top-xl      // 48px
    .pull-top-lg      // 32px
    .pull-top-md      // 24px
    .pull-top-sm      // 8px
    .pull-top-xs      // 4px
    .pull-top-none    // 0px

    .pull-right       // 16px
    .pull-right-xxl   // 56px
    .pull-right-xl    // 48px
    .pull-right-lg    // 32px
    .pull-right-md    // 24px
    .pull-right-sm    // 8px
    .pull-right-xs    // 4px
    .pull-right-none  // 0px

    .pull-bottom      // 16px
    .pull-bottom-xxl  // 56px
    .pull-bottom-xl   // 48px
    .pull-bottom-lg   // 32px
    .pull-bottom-md   // 24px
    .pull-bottom-sm   // 8px
    .pull-bottom-xs   // 4px
    .pull-bottom-none // 0px

    .pull-left        // 16px
    .pull-left-xxl    // 56px
    .pull-left-xl     // 48px
    .pull-left-lg     // 32px
    .pull-left-md     // 24px
    .pull-left-sm     // 8px
    .pull-left-xs     // 4px
    .pull-left-none   // 0px
  `;
}
