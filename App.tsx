/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

declare const global: {HermesInternal: null | {}};

class App extends React.Component {

  render(){
    return(
      < >
        <View style={styles.main}>
          <Text>Connexion</Text>
        </View>
      </>
    )
  }
};

const styles = StyleSheet.create({
  main:{
    flex: 1,
    backgroundColor: "#F8F8F8",

  }
});

export default App;
