export interface UkisNgAddSchema {
  // The name of the angular project you want to add @dlr-eoc/core-ui.
  project?: string;
  addClr?: boolean;
  addFiles?: boolean;
  routing?: boolean;

  updateFiles?: boolean;
  addMap?: boolean;
  auth?: boolean;
}
