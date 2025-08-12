import { Stack } from 'expo-router';
import { AppProvider } from '../contexts/AppContext';
import Head from 'expo-router/head';
import { useEffect } from 'react';
import '../global.css';

export default function RootLayout() {
  useEffect(() => {
    // Register service worker for PWA functionality
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration);
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }
  }, []);

  return (
    <>
      <Head>
        {/* PWA Meta Tags */}
        <meta name="application-name" content="UPT Binary Game" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="UPT Game" />
        <meta name="description" content="Sophisticated binary word-guessing system disguised as ChatGPT" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />

        {/* PWA Icons */}
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icon-192x192.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/icon-192x192.png" color="#000000" />
        <link rel="shortcut icon" href="/icon-192x192.png" />

        {/* PWA Splash Screen */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="UPT Game" />
        <link rel="apple-touch-startup-image" href="/splash.png" />
      </Head>
      
      <AppProvider>
        <Stack>
          <Stack.Screen 
            name="index" 
            options={{ 
              title: 'UPT Binary Game',
              headerShown: false 
            }} 
          />
          <Stack.Screen 
            name="settings" 
            options={{ 
              title: 'Settings',
              headerShown: false 
            }} 
          />
          <Stack.Screen 
            name="read-minds" 
            options={{ 
              title: 'Read Minds',
              headerShown: false 
            }} 
          />
        </Stack>
      </AppProvider>
    </>
  );
}
