import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Firebase from "./config/firebase";
import {Container,Content,Header,Form,Input,Item,Button,Label} from "native-base"
import Main from '../PDMBoost/src/pages/Main'

function LogIN({navigation}) {

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

 

  
  

  return (
    
    <Container style={styles.container}>
      <Form>
        <Item floatingLabel>
          <Label>Email</Label>
          <Input
          autoCorrect={false}
          autoCapitalize = "none"
          onChangeText = {setEmail}
          value = {email}
          />
        
        </Item>

        <Item floatingLabel>
          <Label>Contraseña</Label>
          <Input
          secureTextEntry ={true}
          autoCorrect={false}
          autoCapitalize = "none"
          onChangeText = {setPassword}
          value = {password}
          />
        
        </Item>

        <Button style={styles.buttons}
        full rounded 
        onPress={()=>{
          try{
            Firebase.auth().signInWithEmailAndPassword(email,password).then(function(user){
              console.log(user)
              
            }).catch((error)=>{
              alert(error)
              // alert("Contraseña o Correo Incorrectos")
            })
            navigation.navigate('Main')
          }
          catch(error){
            console.log(error.toString())
          }
        }}
        >

          <Text style={styles.text}>
            Login
          </Text>
        </Button>

        <Button style={styles.buttons}
        full rounded 
        onPress={()=>{
          try{
            
            if(password.length<6){
              alert("Contraseña Menor a 6 Caracteres")
              return
            }

            Firebase.auth().createUserWithEmailAndPassword(email,password)
          }
          catch(error){
            console.log(error.toString())
          }
        }}
        >

          <Text  style={styles.text}>
            Registro
          </Text>
        </Button>
      </Form>
    </Container>
   
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LogIn" component={LogIN} />
        <Stack.Screen name="Main" component={Main} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
    justifyContent: 'center',
  },
  buttons:{
    marginTop:50,
    
  },
  text:{
    color: 'white',
  }
});
