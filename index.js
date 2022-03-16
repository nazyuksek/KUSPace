/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);

//import Amplify from 'aws-amplify';
//import awsconfig from './aws-exports';
//
//Amplify.configure({
//  ...awsconfig,
//  Analytics: {
//    disabled: true,
//  },
//});