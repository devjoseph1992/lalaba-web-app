// src/global.d.ts
/// <reference types="google.maps" />

// Tell TS that `window.google` definitely exists:
declare global {
    interface Window {
        google: typeof google;
    }
}
