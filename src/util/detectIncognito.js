/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * @param callback Anonymous function executed when the availability of the incognito mode has been checked.
 */
// Incognito check
export default function isIncognito(callback) {
  var fs = window.RequestFileSystem || window.webkitRequestFileSystem;

  if (!fs) {
    callback(false);
  } else {
    fs(window.TEMPORARY, 100, callback.bind(undefined, false), callback.bind(undefined, true));
  }
}
