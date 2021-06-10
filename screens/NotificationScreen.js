import React from 'react';
import {Text,View,FlatList,ScrollView} from 'react-native'
import db from '../config'
import firebase from 'firebase'
import SwipeNotification from '../components/SwipeNotification'

export default class NotificationScreen extends React.Component{
    constructor(){
        super();
this.state={
    allNotifications:[],
}
    }

    componentDidMount(){
        this.getNotification()
    }
    getNotification=()=>{
        db.collection('Notifications').where('userid','==',firebase.auth().currentUser.email).get().then(
            snapshot=>{snapshot.forEach(doc=>{
                this.setState({
                    allNotifications:[...this.state.allNotifications,doc.data()]
                })
                
            })}
        )
        
    }

    render(){
        return(
            <View>
            {
                    (this.state.allNotifications.length!=0)?(
                    <SwipeNotification allNotification={this.state.allNotification}/>
                    )
                :(
                    <View>
                    <Text>No Notifications</Text>
                    </View>
                 )
            }
                    </View>
        )
    }
}