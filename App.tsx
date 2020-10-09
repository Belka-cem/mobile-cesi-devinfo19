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
import { StyleSheet, Text } from 'react-native';


import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Home from './src/components/home';
import Login from './src/components/login';
import SERVER from './src/url';

declare const global: {HermesInternal: null | {}};

class App extends React.Component {

  state = {
    hasUser: false,
    notUser: false,
    email: "",
    mdp: "", 
    id : 0
  }

  valEmail(val: string){
    this.setState({email :val })
  } 

  valMdp(val: string){
    this.setState({mdp :val })
  }




  async login(email:string, mdp:string){


    if(email && mdp ){
  
        const res = await fetch(`${SERVER}/signin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({email, mdp})
        })
        const user = await res.json()

        if(res.status === 200){
          console.log("user connected");
          console.log(user);
          
            this.setState(() => {
              return {hasUser: JSON.parse(user.hasUser)}
            })
            this.setState(()=> {
              return {id: JSON.parse(user.id)} 
            })
            this.setState(()=>{
              return {notUser: false}
            })
            console.log("state", this.state);
            
        }else{
          this.setState({notUser: true})
        }
    }  
  }

  render(){
    const {email, mdp} = this.state
    return(
      < >
      {this.state.hasUser === false && <Login valEmail={(t) => this.valEmail(t)}
                                       valMdp={(t) => this.valMdp(t)} 
                                       login={() => this.login(email, mdp)}
                                       email={this.state.email}
                                       mdp={this.state.mdp}>
                                      </Login>}

      {this.state.notUser === true && <Text style={styles.error}>Information incorrect</Text>}
      {this.state.hasUser === true && <Home id={this.state.id}></Home> }
      </>
    )
  }
};

const styles = StyleSheet.create({
  main:{
    flex: 1,
    backgroundColor: "#F8F8F8",

  },
  error: {
    flex: 1,
    color: "red",
    textAlign: "center",
    margin:40,
    fontSize: 20

  }
});

export default App;
