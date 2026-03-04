import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.dogue.app",
  appName: "Dogue",
  webDir: "out",
  server: {
    // Point to production URL so the app always loads fresh content.
    // Update this with your actual domain before App Store submission.
    url: "https://dogue.app",
    cleartext: false,
  },
  ios: {
    contentInset: "automatic",
  },
};

export default config;
