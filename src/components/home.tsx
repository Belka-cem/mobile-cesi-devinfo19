import React from 'react';
import { Button, Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import SERVER from '../url';



interface PropsPictures {
   // getPictures: (id:number)=> void
    note: number
    newNote: number
    id: number 
    url: string
    user_id: number
}

class Pictures extends React.Component<PropsPictures>{

    state = {
        newNote: "",
        show: false
    }

    async setNote(newNote:string){
        console.log("setnote");
        let nbNote = Number(newNote)

     if(nbNote > 0 ){
        console.log("newnote", newNote );
        const res = await fetch(`${SERVER}/user/${this.props.user_id}/pictures/${this.props.id}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({newNote: nbNote})
          })

          if (res.status === 200){
              console.log("ok");
              this.setState({show: true})
              
              
          }
     }
          
    }

    changeNote(newNote:string){
        this.setState({newNote})
    }

    message(mess: string){
        
        return String
    }

    render(){
        const image = { uri: this.props.url };
        const {newNote} = this.state

        
        
        return (
            <>
                
                <View style={styles.container}>

                    <ImageBackground  source={image} style={styles.image}/>
                </View>
                <View>
                    <Text style={styles.text}>{this.props.note}/5</Text>
                </View>
                <View style={styles.second}>
                        
                        <TextInput  
                         placeholder="Votre note sur 5" 
                         onChangeText={(val)=>{this.changeNote(val)}} 
                         value={newNote} 
                         autoCompleteType="cc-number">
               </TextInput>
               <TouchableHighlight onPress={()=>{this.setNote(newNote)}} style={styles.btn} >
                   <Text style={styles.btntext}>ok</Text>
               </TouchableHighlight>
               {this.state.show === true && <Text> {()=> {this.message("note ajouté")}}</Text>}
                </View>
               
                
            </>
        )
    }
}


interface PropsHome{
    id: number
}


export default class Home extends React.Component<PropsHome>{

    state = {
        pictures: [],
        id: this.props.id
    }

    
    componentDidUpdate(prevProps: { id: number; }) {

        
        if(prevProps.id !== this.props.id) {
            
        console.log("different ",prevProps.id, this.props.id ); 
          this.setState({id: this.props.id});
          this.getPictures(this.props.id)

        }
        
      }

    async getPictures(id:number){


        const res = await fetch(`${SERVER}/user/${id}/pictures`)
        const pictures = await res.json()


        
        if(res.status === 200){
            this.setState({pictures}) 
        }
    } 

     componentDidMount(){
        this.getPictures(this.props.id)
    }

    render(){
        
        
        
        return (
            <>
                <Text> Bienvenue </Text>
                <ScrollView>
                {this.state.pictures.length != 0 && 
                    this.state.pictures.map((pic:any)=>{
                        return (   
                            <Pictures url={pic.url} note={pic.note} newNote={pic.newNote} key={pic.id} id={pic.id} user_id={this.props.id} ></Pictures>
                        )
                    })
                }
                </ScrollView>
            </>
        )
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      height: 200
    },
    second: {
        flex: 1,
        flexDirection: "row"
    },
    image: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center",
      height : "100%"
    },
    text: {
        
      color: "black",
      fontSize: 30,
      fontWeight: "bold"
    },
    btn: {
        backgroundColor: "blue",
        width: 30,
        borderRadius: 5,
        height: 30
    },
    btntext: {
        color: "white",
        textAlign: "center"
    }
  });
  