/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {Provider} from 'react-redux';
import {store} from './src/store';
import {Routes} from './src/navigation';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <Provider store={store}>
      <>
        <Routes />
        <Toast />
      </>
    </Provider>
  );
};
export default App;
