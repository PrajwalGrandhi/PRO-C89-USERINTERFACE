import React from 'react';
import { StyleSheet, Text, View ,TextInput,TouchableOpacity, Alert,Modal,ScrollView,KeyboardAvoidingView} from 'react-native';
import firebase from 'firebase';
import db from '../config';

export default class ExchangeScreen extends React.Component{
    constructor(){
        super();
        this.state={
            itemname:'',
            itemdesc:'',
            emailid:'',

        };
    }

    additem=async(name,desc,email)=>{
        db.collection('Exchanges').add({
            'itemname':name,
            'itemdescription':desc,
            'emailid':email,
            'exchangeid':Math.random().toString(36).substring(10),
        });

        console.log('item added to exchange');

        this.setState({
           itemname:'',
           itemdesc:'',
           emailid:'',

        });
    }

    render(){
        return(
            <View>
        <TextInput
        style={styles.input}
        placeholder="Item Name"
        onChangeText = {(text)=>{this.setState({itemname: text})}}
      />

        <TextInput
        style={styles.input}
        keyboardType='email-address'
        placeholder="EmailID"
        onChangeText = {(text)=>{this.setState({emailid: text})}}
      />

        <TextInput
        style={{alignSelf:'center',width:300,height:100,marginTop:50,borderWidth:2,}}
        multiline={true}
        placeholder="Item Description"
        onChangeText = {(text)=>{this.setState({itemdesc: text})}}
      />
       
      <TouchableOpacity style={styles.button} onPress={()=>{
          this.additem(this.state.itemname,this.state.itemdesc,this.state.emailid)
          }}>
          <Text>
              AddItem
          </Text>
      </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    head:{
        textAlign: 'center', 
        fontSize: 50, 
        backgroundColor: '#FFC0CB', 
        padding: 20,
      },
      input: {
        alignSelf:'center',
        width: 300,
        height: 40,
        borderWidth: 2,
        fontSize: 20,
        paddingLeft:15,
        marginTop:50,

      },
    button:{
        backgroundColor:'green',
        alignItems:'center',
        borderWidth:2,
        borderRadius:20,
        alignSelf:'center',
        padding:10,
        marginTop:10
    },

  });