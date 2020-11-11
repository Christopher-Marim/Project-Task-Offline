/**
 * @format
 */

import {AppRegistry} from 'react-native';
import taskList from './src/components/TaskList';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => taskList);
