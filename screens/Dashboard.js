import React,{useState} from 'react';
import {Text , View,  ImageBackground,
  TouchableOpacity,StyleSheet,Image,
  Dimensions} from 'react-native';
import { DataTable } from "react-native-paper";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';

import Icon from 'react-native-vector-icons/Ionicons';
import { Ionicons } from '@expo/vector-icons';
import { Input } from 'react-native-elements';
import db from '../db/firebase'

import HomeScreen from './HomeScreen';




const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#fff"
    >
      <Tab.Screen
        name="Home"
        component={DisasterType}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: '#262927',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-home" color={color} size={26} />
          ),
        }}
      />
       <Tab.Screen
        name="Home4"
        component={DisasterType}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: '#731222',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-call" color={color} size={26} />
          ),
        }}
      />
       <Tab.Screen
        name="Home1"
        component={DisasterType}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: '#009387',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-podium" color={color} size={26} />
          ),
        }}
      />
       <Tab.Screen
        name="Home2"
        component={DisasterType}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: '#009387',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-heart" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={ViewDetails}
        options={{
          tabBarLabel: 'Updates',
          tabBarColor: '#1f65ff',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-notifications" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={DetailsStackScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarColor: '#694fad',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-person" color={color} size={26} />
          ),
        }}
      />
     
    </Tab.Navigator>
);



const HomeStackScreen = ({navigation}) =>{ 
  
  
    const [id, setID] = React.useState();
    const [name, setName] = React.useState();
    const [age, setAge] = React.useState();
   
    const [designation, setDesignation] = React.useState();
    const [link, setLink] = React.useState();
    return (
      <View style={styles.container}>
        
          <Text style = {{textAlign:'center', color: '#fff', marginBottom: 10, fontSize: 24}}>Add Employee</Text>
          <Text style = {{marginLeft: 10, color: '#fff', fontSize: 18}}>Employee Id</Text>
        <Input
          placeholder="Enter Employee ID"
          placeholderTextColor = "#fff"
          inputStyle = {{color: '#fff'}}
          onChangeText = {setID}
          leftIcon={
            <Icon
              name="id-card"
              type="font-awesome"
              color="#fff"
              iconStyle = {{marginRight: 10}}
            />
          }
        />
  
        <Text style = {{marginLeft: 10, color: '#fff', fontSize: 18}}>Employee Name</Text>
        <Input
          placeholder="Enter Employee Name"
          placeholderTextColor = "#fff"
          inputStyle = {{color: '#fff'}}
          onChangeText = {setName}
          leftIcon={
            <Icon
              name="user"
              type="font-awesome"
              color="#fff"
              iconStyle = {{marginRight: 10}}
            />
          }
        />
  
        <Text style = {{marginLeft: 10, color: '#fff', fontSize: 18}}>Age</Text>
        <Input
          placeholder="Enter Age"
          placeholderTextColor = "#fff"
          onChangeText = {setAge}
          inputStyle = {{color: '#fff'}}
          leftIcon={
            <Icon
              name="male"
              type="font-awesome"
              color="#fff"
              iconStyle = {{marginRight: 10}}
            />
          }
        />
  
      
  
       
            
         
  
        <Text style = {{marginLeft: 10, color: '#fff', fontSize: 18}}>Designation</Text>
        <Input
          placeholder="Enter Designation"
          placeholderTextColor = "#fff"
          inputStyle = {{color: '#fff'}}
          onChangeText = {setDesignation}
          leftIcon={
            <Icon
              name="id-badge"
              type="font-awesome"
              color="#fff"
              iconStyle = {{marginRight: 10}}
            />
          }
        />

        <Text style = {{marginLeft: 10, color: '#fff', fontSize: 18}}>Image Link</Text>
        <Input
          placeholder="Enter Link"
          placeholderTextColor = "#fff"
          inputStyle = {{color: '#fff'}}
          onChangeText = {setLink}
          leftIcon={
            <Icon
              name="link"
              type="font-awesome"
              color="#fff"
              iconStyle = {{marginRight: 10}}
            />
          }
        />
  
        <View style = {{justifyContent: 'center', alignItems: 'center', margin: 10}}>
          <TouchableOpacity onPress = {() => {
           db.collection('Employee').add({
             id: id,
            name: name,
            age: age,
           
            designation: designation,
            link: link
           }).then(result => navigation.navigate('ViewDetails'))
           .catch(err => console.log(err))
          }} style={{
                backgroundColor: 'green',
                padding: 10,
                borderRadius: 5,
                width: 150,
                flexDirection: 'row',
              }}><Text style = {{fontSize: 20, color: '#fff'}}>Add Employee</Text></TouchableOpacity>
        </View>
       
      </View>
)
}
const DetailsStackScreen = ({navigation}) => (
<View>
  <Text>Details</Text>
</View>
);
const ViewDetails = ({navigation}) => {
  const [task1, setTask] = React.useState([]);
  React.useEffect(() => {
    // db.collection('Employee')
    // .get()
    // .then(result => result.docs)
    // .then(docs => docs.map(doc => ({id: doc.id, name: doc.data().name, age: doc.data().age, cnic: doc.data().cnic, contact: doc.data().contact, designation: doc.data().designation})))
    // .then(task => {setTask(task), console.log(task1)})
    db.collection("Employee").onSnapshot({
      next: (querySnapshot) => {
        const tasks = querySnapshot.docs.map((docSnapshot) => ({
          id: docSnapshot.id,
          ID: docSnapshot.data().id,
          name: docSnapshot.data().name,
          age: docSnapshot.data().age,
          
          designation: docSnapshot.data().designation,
          link: docSnapshot.data().link
        }));
        setTask(tasks);
      },
      error: (err) => console.log(err),
    });
  }, []);
  return (
    <View style={{ marginTop: 30 }}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Image</DataTable.Title>
          <DataTable.Title numeric>Name</DataTable.Title>
          <DataTable.Title numeric>Update</DataTable.Title>
          <DataTable.Title numeric>Delete</DataTable.Title>
        </DataTable.Header>

        {task1.map((task) => (
          <TouchableOpacity onPress={() => {navigation.navigate('Employee Detail', {item: {id: task.ID, name: task.name, age: task.age, cnic: task.cnic, contact: task.contact, designation: task.designation, link: task.link}})}}>
            <DataTable.Row>
              <DataTable.Cell><Image
              source={{
                uri: task.link,
              }}
              style={{ width: 40, height: 40, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}
            /></DataTable.Cell>
              <DataTable.Cell numeric>{task.name}</DataTable.Cell>
              <DataTable.Cell numeric>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Update Employee", { item: task.id });
                  }}
                >
                  <Ionicons name="create-outline" size={24} color="black" />
                </TouchableOpacity>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <TouchableOpacity
                  onPress={() => {
                    deleteData(task.id);
                  }}
                >
                  <Ionicons name="trash" size={24} color="red" />
                </TouchableOpacity>
              </DataTable.Cell>
            </DataTable.Row>
          </TouchableOpacity>
        ))}
      </DataTable>
    </View>
  );
}

const DisasterType = ()=>{
  const data = [
    {label: 'Item 1', value: '1'},
    {label: 'Item 2', value: '2'},
    {label: 'Item 3', value: '3'},
    {label: 'Item 4', value: '4'},
    {label: 'Item 5', value: '5'},
    {label: 'Item 6', value: '6'},
    {label: 'Item 7', value: '7'},
    {label: 'Item 8', value: '8'},
];
const [dropdown, setDropdown] = useState(null);
const [selected, setSelected] = useState([]);
const _renderItem = item => {
  return (
  <View style={styles.item}>
      <Text style={styles.textItem}>{item.label}</Text>
       
  </View>
  );
};
  return(
    <View style={styles.bigone}>
  
  

      
<View style={styles.box}>
 
<Image
  source={require("../assets/ligo.jpg")}
  style={styles.imagelogo}
/>   

<Dropdown
                    style={styles.dropdown}
                    containerStyle={styles.shadow}
                    data={data}
                    search
                    name="Drop down"
                    searchPlaceholder="Search"
                    labelField="label"
                    valueField="value"
                    label="Dropdown"
                    placeholder="Select item"
                    value={dropdown}
                    onChange={item => {
                    setDropdown(item.value);
                        console.log('selected', item);
                    }}
                    renderItem={item => _renderItem(item)}
                    textError="Error"
                />
                <MultiSelect
                    style={styles.dropdown}
                    data={data}
                    labelField="label"
                    valueField="value"
                    label="Multi Select"
                    placeholder="Select item"
                    search
                    searchPlaceholder="Search"
                    value={selected}
                    onChange={item => {
                    setSelected(item);
                        console.log('selected', item);
                    }}
                    renderItem={item => _renderItem(item)}
                />

</View>


</View>
  );
}
  
const styles = StyleSheet.create({
  
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 24,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
  box:{
    backgroundColor: '#fff',
     width: '95%',
     height:'100%',
     borderRadius: 30,
     alignItems: 'center',
     margin: 8,
     padding: 10,
    alignItems:'center',
    justifyContent:'center',
    marginLeft:'5%',
    
   
     shadowColor: "#0000",
     shadowOffset: {
          width: 1,
         height: 4,
          },
     shadowOpacity: 1,
     shadowRadius: 4.84,

      elevation: 5,
},bigone: {
  flex: 1,
  justifyContent: 'center',
  alignItems:'center',
  backgroundColor: '#262927',
  width: '100%',
  height:'20%',
  shadowColor: "#ffff",
  shadowOffset: {
       width: 1,
      height: 4,
       },
  shadowOpacity: 1,
  shadowRadius: 10.84,

   elevation: 5,
  padding: 8,
},

imagelogo:{
          width:330, 
            height: 200,
            justifyContent:'center',
            alignSelf:'center',
            marginBottom:410,
            borderRadius:10,
            borderColor:'black',
            borderWidth:1,
},dropdown: {
  backgroundColor: 'gray',
  borderBottomColor: 'gray',
  borderBottomWidth: 0.5,
  padding:20,
  marginBottom:50,
  color:'white',
  width:'100%',
  marginTop: 20,
},
icon: {
  marginRight: 5,
  width: 18,
  height: 18,
},
item: {
  paddingVertical: 17,
  paddingHorizontal: 4,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},
textItem: {
  flex: 1,
  fontSize: 16,
},
shadow: {
  shadowColor: '#000',
  shadowOffset: {
  width: 0,
  height: 1,
  },
  shadowOpacity: 0.2,
  shadowRadius: 1.41,
  elevation: 2,
}
});

export  default MainTabScreen;