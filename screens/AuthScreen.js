import React from 'react';
import { StyleSheet, Text, View ,TextInput,TouchableOpacity, Alert,Modal,ScrollView,KeyboardAvoidingView} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export default class AuthScreen extends React.Component{
    constructor(){
        super();
        this.state={
            emailid:'',
            pass:'',
            fullname:'',
            phone:0,
            address:'',
            conpass:'',
            visibilty:false,
        }
    }

    login=async(email,pass)=>{
        if(email && pass){
             try{
        const data = await  firebase.auth().signInWithEmailAndPassword(email,pass).then((Response)=>{
            return this.props.navigation.navigate('HomeScreen');//Alert.alert( "logged in", "My Alert Msg", [ { text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" }, { text: "OK", onPress: () => console.log("OK Pressed") } ] );
        });
                
          if(data){
             this.props.navigation.navigate('HomeScreen');
          } 
       }catch(error){
         if(error.code=='auth/user-not-found'){
          console.log("User does'nt exist");//Alert.alert( "use doesnt exist", "My Alert Msg", [ { text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" }, { text: "OK", onPress: () => console.log("OK Pressed") } ] );
         }
         else if(error.code=='auth/invalid-email'){
  
          console.log("emailID invalid");//Alert.alert( "email id invalid", "eamilid envalid", [ { text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" }, { text: "OK", onPress: () => console.log("OK Pressed") } ] );
         }
       }
     }
     else{
       console.log("Please enter your email id and password");//Alert.alert( "Please enter your email id and password", "My Alert Msg", [ { text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" }, { text: "OK", onPress: () => console.log("OK Pressed") } ] );
     }
  }

    signup=async(email,pass,conpass)=>{
      if(pass!=conpass){
        console.log("password mismatched");
      }
      else{
        try{  
            firebase.auth().createUserWithEmailAndPassword(email,pass).then((response)=>{
              db.collection('UserDetails').add({
               // 'phone_no':this.state.phoneno,
                'address':this.state.address,
                'emailid':this.state.emailid,
                'fullname':this.state.fullname,
                'password':this.state.conpass,

              })
            return console.log("User added succedfully"); //Alert.alert("user created succesfully", "My Alert Msg", [ { text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" }, { text: "OK", onPress: () => console.log("OK Pressed") } ] );
        })
    }
      catch(error){
          return console.log(error.message+","+error.code);//Alert.alert( error.message+","+error.code, "My Alert Msg", [ { text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" }, { text: "OK", onPress: () => console.log("OK Pressed") } ] );
      }
    }
    }

    displayModal=()=>{
      <Modal
        visible={this.state.visibilty}
        animationType="slide"
        transparent={true}
      >
        <ScrollView>
          <KeyboardAvoidingView>
          <TextInput
        //style={styles.inputBox}
         placeholder="Enter yourfull name: "
         onChangeText={(text)=>{this.setState({fullname:text})}}/>

          <TextInput
        //style={styles.inputBox}
         placeholder="email ID"
         keyboardType="email-address"
         onChangeText={(text)=>{this.setState({emailid:text})}}/>

          <TextInput
        //style={styles.inputBox}
         placeholder="Your Phone no: "
         keyboardType="numeric"
         onChangeText={(text)=>{this.setState({phone:text})}}/>

          <TextInput
        //style={styles.inputBox}
         placeholder="Your Address: "
         onChangeText={(text)=>{this.setState({address:text})}}/>
         <TextInput
        //style={styles.inputBox}
         placeholder="password"
         secureTextEntry={true}
         onChangeText={(text)=>{this.setState({pass:text})}}/>
            <TextInput
        //style={styles.inputBox}
         placeholder="confirm password"
         secureTextEntry={true}
         onChangeText={(text)=>{this.setState({conpass:text})}}/>

      <TouchableOpacity
       onPress={()=>{
          this.signup(this.state.emailid,this.state.pass,this.state.conpass)
          this.setState({visibilty:false});
         }}>        
          <Text>Submit</Text>

      </TouchableOpacity>

          </KeyboardAvoidingView>
        </ScrollView>
      </Modal>
    }

    render(){
        return(
            <View style={styles.welcome}>
           
              <Text style={{marginBottom:100}}>see the console to see the status</Text> 

            {/* {this.displayModal()} */}
            <Modal
        visible={this.state.visibilty}
        animationType="slide"
        transparent={true}
      >
        <ScrollView>
          <KeyboardAvoidingView>
          <TextInput
        //style={styles.inputBox}
         placeholder="Enter yourfull name: "
         onChangeText={(text)=>{this.setState({fullname:text})}}/>

          <TextInput
        //style={styles.inputBox}
         placeholder="email ID"
         keyboardType="email-address"
         onChangeText={(text)=>{this.setState({emailid:text})}}/>

          <TextInput
        //style={styles.inputBox}
         placeholder="Your Phone no: "
         onChangeText={(text)=>{this.setState({phone:text})}}/>

          <TextInput
        //style={styles.inputBox}
         placeholder="Your Address: "
         onChangeText={(text)=>{this.setState({address:text})}}/>
         <TextInput
        //style={styles.inputBox}
         placeholder="password"
         secureTextEntry={true}
         onChangeText={(text)=>{this.setState({pass:text})}}/>
            <TextInput
        //style={styles.inputBox}
         placeholder="confirm password"
         secureTextEntry={true}
         onChangeText={(text)=>{this.setState({conpass:text})}}/>

      <TouchableOpacity
       onPress={()=>{
          this.signup(this.state.emailid,this.state.pass,this.state.conpass)
          this.setState({visibilty:false});
         }}>        
          <Text>Submit</Text>

      </TouchableOpacity>

          </KeyboardAvoidingView>
        </ScrollView>
      </Modal>


              <TextInput
          style={styles.instructions}
           placeholder="email ID"
           keyboardType="email-address"
           onChangeText={(text)=>{this.setState({emailid:text})}}/>

           <TextInput
           style={styles.instructions}
           placeholder="password"
           secureTextEntry={true}
           onChangeText={(text)=>{this.setState({pass:text})}}/>

        <TouchableOpacity
          style={{marginTop:10,backgroundColor:'green',alignItems:'center',width:100,alignSelf:'center',borderRadius:50,height:20}}
          onPress={()=>{
           this.login(this.state.emailid,this.state.pass)
          }}>
          <Text>Login</Text>
        </TouchableOpacity>
                
        <TouchableOpacity
         style={{marginTop:10,backgroundColor:'green',alignItems:'center',width:100,alignSelf:'center',borderRadius:50,height:20}}
         onPress={()=>{
           this.setState({visibilty:true});
            this.displayModal()
           }}>        
            <Text>SignUp</Text>
        </TouchableOpacity>
            </View>
        )
    }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    fontSize: RFValue(24, 580),
    textAlign: "center",
    margin: 10,
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
    width:RFValue(200),
    marginLeft:RFValue(232),
    fontSize: RFPercentage(1.5),
  },
});