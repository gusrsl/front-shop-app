import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Darmacio',
  webDir: 'www',
  server: {
    androidScheme: 'https',
    cleartext: true, // Allow HTTP content
  },
};

export default config;
