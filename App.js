import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StateProvider } from './src/Context/StateContext';
import AuthStack from './src/Navigators/AuthStack';

function App() {
  return(
    <StateProvider>
      <NavigationContainer>
        <AuthStack/>
      </NavigationContainer>
    </StateProvider>
  );
}

export default App;