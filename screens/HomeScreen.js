import React from 'react';
import { StyleSheet, Text, View ,TextInput,TouchableOpacity, Alert,Modal,ScrollView,KeyboardAvoidingView,FlatList, TouchableHighlight} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import AppHeader from '../components/AppHeader'

export default class HomeScreen extends React.Component{
    constructor(){
        super();
        this.state={
            allExchanges:[],
        };
    }

    componentDidMount=async()=>{
        const data=await db.collection('Exchanges').get();

        data.docs.map((doc)=>{
          this.setState({allExchanges:[...this.state.allExchanges,doc.data()]})
        })
    }

    render(){
        return(
            <ScrollView>
                <AppHeader navigation={this.props.navigation}/>
    <FlatList  data={this.state.allExchanges}
         renderItem={({item,i})=>(
            <View key={i} style={{backgroundColor:'red',borderWidth:2,marginTop:10,width:800,alignSelf:'center',alignItems:'center'}}>
                  <Text>{"Item Name: "+item.itemname}</Text>
                  <Text>{"EmailID: "+item.emailid}</Text>
                  <Text>{"Item Description: "+item.itemdescription} </Text>
                  <TouchableOpacity style={{backgroundColor:'white',borderRadius:20,width:100,alignItems:'center',alignContent:'center'}} onPress={()=>{
                      this.props.navigation.navigate('RequestDetailsScreen',{'details':item})
                  }}>
                      <Text>Exchange</Text>
                  </TouchableOpacity>
             </View>
         )} keyExtractor={(item,index)=>{
           index.toString();
         }} 
         //onEndReached={this.loadMore()}
         onEndReachedThreshold={0.6}/>
            </ScrollView>
        )
    }
}