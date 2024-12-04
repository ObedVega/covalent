/**
 * patternId: "icon-lockup" templateId: "web-components-RPcggDLyDK"
 * This file was automatically generated by Knapsack.
 * DO NOT MODIFY IT BY HAND.
 * Instead, adjust it's spec, by either:
 * 1) go to "/patterns/icon-lockup/web-components-RPcggDLyDK" and use the UI to edit the spec
 * 2) OR edit the "knapsack.pattern.icon-lockup.json" file's "spec.props".
 * Run Knapsack again to regenerate this file.
 */

export interface IconLockup {
  /**
   * Whether the icon is a covalent icon.
   */
  covalentIcon?: boolean;
  /**
   * Whether the icon is filled.
   */
  filledIcon?: boolean;
  /**
   * The icon to display.
   */
  icon?: string;
  /**
   * Scale of the component, controlling font-size and icon size. Default is "body1", but it can be set to other typography values to scale the component.
   */
  scale?:
    | 'body1'
    | 'body2'
    | 'button'
    | 'caption'
    | 'headline1'
    | 'headline2'
    | 'headline3'
    | 'headline4'
    | 'headline5'
    | 'headline6'
    | 'overline'
    | 'subtitle1'
    | 'subtitle2';
  /**
   * If true, the icon is displayed after the text (trailing).
   */
  trailingIcon?: boolean;
  /**
   * State of the component, used to apply different styles based on status.
   */
  state?: 'caution' | 'negative' | 'positive' | 'primary';
}
