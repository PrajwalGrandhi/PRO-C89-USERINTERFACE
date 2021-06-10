import React from 'react'
import {Text,View,ScrollView,FlatList,TouchableOpacity} from 'react-native'
import firebase from 'firebase'
import db from '../config'
import {Header,Badge,/*Icon*/} from 'react-native-elements';
import { SafeAreaView, SafeAreaProvider, SafeAreaInsetsContext, useSafeAreaInsets, initialWindowMetrics} from "react-native-safe-area-context";
import { Icon } from 'react-native-elements/dist/icons/Icon';

export default class AppHeader extends React.Component{
    constructor(props){
        super(props);
this.state={
    UnreadNotification:""
}
      }

      componentDidMount(){
          this.getUnreadNotification()
      }

      getUnreadNotification=()=>{
db.collection('Notifications').where('readstatus','==',"unread").where('userid','==',firebase.auth().currentUser.email).onSnapshot((snapshot)=>{
var dt=snapshot.docs.map((doc)=>{doc.data()})
this.setState({
    UnreadNotification:dt.length,
})
})
      }
    render(){
        return(
            <SafeAreaProvider>
                
            <View>
      <Header
        leftComponent={<Icon name='rowing' onPress={()=>{
 //           console.log("left component clicked")
          this.props.navigation.toggleDrawer()
        }}/>}
        centerComponent={{ text: 'BookSanta', style: { color: '#fff',fontSize:20 } }}
        rightComponent={ 
        <View>
        <Icon name="home" onPress={()=>{
           this.props.navigation.navigate('NotificationScreen')
          }}/>

        <Badge
         value={this.state.UnreadNotification}
        containerStyle={{ position: 'absolute', top: -4, right: -4 }}
        />
        </View>
        }
      />
            </View>
            </SafeAreaProvider>
      
        )
    }
}