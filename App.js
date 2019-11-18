import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import QRScanner from './src/screens/QRScanner';
import Records from './src/screens/Records';

const RootStack = createStackNavigator({
      QRScanner: QRScanner,
      Records: Records,
    },

    {
        initialRouteName: 'QRScanner',
        headerMode: 'none',
        navigationOptions: {
          headerVisible: false,
        }
    }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}