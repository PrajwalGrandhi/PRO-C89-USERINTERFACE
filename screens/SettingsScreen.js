import React from 'react';
import { StyleSheet, Text, View ,TextInput,TouchableOpacity, Alert,Modal, ScrollView, KeyboardAvoidingView} from 'react-native';
import firebase from 'firebase';
import db from '../config';

export default class SettingScreen extends React.Component{
    constructor(){
        super();
        this.state={
            emailid:'',
            pass:'',
            name:'',
            phoneno:0,
            address:'',
            userid:'',

        };
    }

    componentDidMount(){
        this.getData();
    }

    getData=async()=>{
        db.collection('UserDetails').where('emailid','==',firebase.auth().currentUser.email).get().then(
            snapshot=>{snapshot.forEach(doc=>{
            var data=doc.data()
            this.setState({
                emailid:data.emailid,
                name:data.name,
                //phoneno:data.phoneno,
                pass:data.password,
                address:data.address,
                userid:doc.id,

            });
        })});
    }

    updataData=async()=>{
        db.collection('UserDetails').doc(this.state.userid).update({
                "emailid":this.state.emailid,
                "name":this.state.name,
                //"phone_no":this.state.phoneno,
                "password":this.state.pass,
                "address":this.state.address,
                
        });
        Alert.alert("changes saved");
    }

    render(){
        return(
            <View>
                {console.log(this.state.userid)}
                <Text>
                    settings
                </Text>
                <TextInput
          //style={styles.inputBox}
           placeholder={this.state.name}
           onChangeText={(text)=>{this.setState({name:text})}}/>

            <TextInput
          //style={styles.inputBox}
           placeholder={this.state.emailid}
           keyboardType={"email-address"}
           onChangeText={(text)=>{this.setState({emailid:text})}}/>

            <TextInput
          //style={styles.inputBox}
           placeholder={this.state.phoneno}
           keyboardType={"numeric"}
           onChangeText={(text)=>{this.setState({phoneno:text})}}/>

            <TextInput
          //style={styles.inputBox}
           placeholder={this.state.address}
           multiline={true}
           onChangeText={(text)=>{this.setState({address:text})}}/>
           <TextInput
          //style={styles.inputBox}
           placeholder={this.state.pass}
           secureTextEntry={true}
           onChangeText={(text)=>{this.setState({pass:text})}}/>

           <TouchableOpacity onPress={()=>{
               this.updataData()
           }}>
               <Text>
                   Save Changes
               </Text>
           </TouchableOpacity>
            </View>
        );
    }
}