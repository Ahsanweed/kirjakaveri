import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'fi.kirjakaveri.app',
  appName: 'Kirjakaveri',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    cleartext: true
  },
  android: {
    backgroundColor: '#003DA5',
    allowMixedContent: true
  }
};

export default config;
