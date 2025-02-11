/**
 * Indicates when you would like to check for (and install) updates from the CodePush server.
 */
export enum CheckFrequency {
  /**
   * When the app is fully initialized (or more specifically, when the root component is mounted).
   */
  ON_APP_START,

  /**
   * When the app re-enters the foreground after being "backgrounded" (user pressed the home button, app launches a separate payment process, etc.)
   */
  ON_APP_RESUME,

  /**
   * Don't automatically check for updates, but only do it when `sync()` is manually called in app code.
   */
  MANUAL,
}
