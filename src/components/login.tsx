import React from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native';


interface PropsLogin {

  valEmail:(text: string)=> void
  valMdp:(text: string)=>  void
  login:(email:string, mdp:string)=> void
  email: string
  mdp: string
}

export default class Login extends React.Component<PropsLogin>{
  

    render(){
      const {email, mdp} = this.props
        return (
            < >
            <View style={styles.main}>
              <Text>Connexion</Text>
              <TextInput style={styles.field} 
                         placeholder="Email" 
                         onChangeText={(email)=>{this.props.valEmail(email)}} 
                         value={email} 
                         autoCompleteType="email">
               </TextInput>
              <TextInput style={styles.field} 
                         placeholder="Password" 
                         onChangeText={(mdp)=>{this.props.valMdp(mdp)}} 
                         value={mdp} 
                         autoCompleteType="password">
               </TextInput>
              <TouchableHighlight style={styles.button}  onPress={(email: string, mdp: string)=>{this.props.login(email, mdp)}} >
                  <Text style={styles.textBtn}>Connexion</Text>
              </TouchableHighlight>
            </View>
          </>
        )
    }
}

const styles = StyleSheet.create({
    main:{
      flex: 1,
 
      justifyContent: "center"
    },
    field: { 
        height: 40,
        borderColor: 'gray', 
        borderWidth: 1,
        margin: 10 
    },
    button: {
      backgroundColor: "blue", 
      padding: 15,
      borderRadius: 5,
      width: "96%",
      alignSelf: "center",
      marginTop: 20

    },
  
    textBtn: {
      color: "#FFFF",
      fontSize: 20,
      textAlign: "center"
    }


  });