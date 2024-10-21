import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { useSetupTrackPlayer } from '@/hooks/useSetupTrackPlayer';
import { SplashScreen } from 'expo-router';
import React, { useCallback } from 'react';
import TrackPlayer from 'react-native-track-player';
import 'service.js';
import { useLogTrackPlayerState } from '@/hooks/useLogTrackPlayerState';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

TrackPlayer.registerPlaybackService(() => require('service.js'));

SplashScreen.preventAutoHideAsync();

const App = () => {

  const handleTrackPlayerLoaded = useCallback(() => {
    SplashScreen.hideAsync();
  },[])

  useSetupTrackPlayer({
    onLoad: handleTrackPlayerLoaded
  })

  useLogTrackPlayerState()

  return <SafeAreaProvider>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RootNavigation />

      <StatusBar style='auto'/>
    </GestureHandlerRootView>
  </SafeAreaProvider>
};

const RootNavigation = () => {
  return (
    <Stack>
      <Stack.Screen name='(tabs)' options={{ headerShown: false }}/>

      <Stack.Screen name='player' options={{
          // On android we can't enable gestures
          animation: 'slide_from_bottom', 
          headerShown: false,   
          animationTypeForReplace: 'push', 
        }} />
    </Stack>
  )
};

export default App