import React from 'react';
import { Provider } from 'react-redux';
import MainStack from './src/Navigators/MainStack';
import Store from './src/store'
import { NavigationContainer } from '@react-navigation/native';

function App() {
  return(
    <Provider store={Store}>
      <NavigationContainer>
        <MainStack/>
      </NavigationContainer>
    </Provider>
  );
}

export default App;