import React from 'react';
import {Text,View,ScrollView,FlatList,TouchableOpacity,Dimensions} from 'react-native'
import {SwipeListView} from 'react-native-swipe-list-view';
import firebase from 'firebase'
import db from '../config'

const windowWidth = Dimensions.get('window').width;

export default class SwipeNotification extends React.Component{
    constructor(props){
        super(props);
        this.state={
            allNotification:[this.props.allNotification]
        }
    }
    changeStatus=(notifications)=>{
        db.collection('Notifications').doc(notifications.docid).update({
            readstatus:'read',
        })
        }
        
            onSwipe=(swipeData)=>{
        const {key,value}=swipeData
        if (value<windowWidth){
            this.changeStatus(this.state.allNotifications[key]);
        }
            }
        
    render(){
        return(
            <View>
            <SwipeListView
          useFlatList
          disableRightSwipe
          data={this.state.allNotifications}
          renderItem={({item,index})=>(
              <View key={index} style={{backgroundColor:'red',borderWidth:2,marginTop:10,width:800,alignSelf:'center',alignItems:'center'}}>
                  <Text>{"Reciever: "+item.userid}</Text>
                  <Text>{"Donor: "+item.donorid}</Text>
                  <Text>{"Item Name: "+item.item}</Text>
                  <Text>{"Date: "+item.date}</Text>
             </View>
          )}
          leftOpenValue={75}
          rightOpenValue={-75}
          onSwipeValueChange={this.onSwipe()}
      />
          </View>
        )
    }
}