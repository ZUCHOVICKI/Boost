import React, { useState , Component} from 'react';
import Firebase from "../../config/firebase";
import {View,Text} from 'react-native'
export default function NextPage(navigation) {

    const[email,setEmail] = useState("")

    Firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          setEmail(user.email)
        } else {
          // No user is signed in.
        }
      });
      
return (

    <View>
        <Text>
           Hello User = {email}
        </Text>
    </View>
)


}