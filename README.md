# NutriTrack

NutriTrack is a mobile-first nutrition and hydration diary. The same HTML/CSS/JavaScript app can be installed from a mobile browser as a PWA or packaged as a native Android app with Capacitor.

## Install on a phone as a PWA

The PWA must be hosted over HTTPS; opening `index.html` from a local `file://` path is only a preview and cannot install or register a service worker.

1. A ready-to-deploy `dist/` folder is included. Upload it to an HTTPS static host such as [Netlify Drop](https://app.netlify.com/drop).
2. To rebuild after changing the app, install Node.js 22+ and run `npm run build`. For automatic deploys from a connected Git repository, run `npm install` and use the included `netlify.toml` (`npm run build`, publish `dist/`).
3. Open the resulting HTTPS URL on the phone. On Android Chrome, use **Install app** / **Add to Home screen**. On iPhone, use Safari's **Share → Add to Home Screen**.

After the first successful load, the service worker caches the app shell for offline launches. Meals, hydration, and targets use the phone browser's site storage. That data is separate from the app-file cache; use **Profile → Download backup** before clearing site data or changing devices. Restore a NutriTrack JSON backup from the same screen.

## Build a native Android app

Capacitor packages the same app files inside an Android WebView. The package keeps diary data in the app's private device storage and can open without a network connection.

Requirements: Node.js 22+, Android Studio 2025.2.1 or later, and an Android SDK (API 24+).

```powershell
npm install
npm run android:add
npm run android:open
```

Run the app on a connected phone or emulator from Android Studio. For later web changes, run `npm run android:sync` before opening/building again. To distribute it, use Android Studio's **Build → Generate Signed Bundle / APK** and sign it with your own release key. Never commit that key.

PWA browser storage and native app storage are separate. Use the built-in backup/restore feature to move a diary between them. The Android application ID is `app.nutritrack.mobile`; choose a unique ID before publishing.

### Build an APK without Android Studio on your computer

The included `.github/workflows/android-apk.yml` builds a **debug APK** on GitHub's hosted Android runner:

1. Put this project in a GitHub repository and push it to the `main` or `master` branch.
2. On GitHub, open **Actions → Build Android APK → Run workflow** (a push to `main`/`master` also starts a build).
3. When the run finishes, download **NutriTrack-debug-apk** from the run's **Artifacts** section, extract it, and install `app-debug.apk` on your Android phone. Android may ask you to allow installs from that download source.

This debug APK is for installing/testing, not Play Store publishing. A Play Store release needs a signed release build and a Play developer account.

## Data and health note

There are no accounts or cloud sync. Data stays in the current browser or native app on that device. The app is for personal tracking and does not provide medical advice.
