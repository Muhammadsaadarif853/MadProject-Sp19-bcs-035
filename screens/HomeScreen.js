import React from 'react'
import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as firebase from "firebase";


const HomeScreen = () => {
//     const addtodatabase = () =>{
//         setcounter(counter+1)
//         key={counter}
//         firebase

//   .database()
//   .ref('userdetails/user/')
//   .push().key
//   .set({
//     name: 'Muhammad Saad Arif',
//     age: 21,
//   })
//   .then(() => console.log('Data set.'));
//     }
//     const [counter,setcounter] = React.useState(0);

const [Id, setId] = React.useState();
const [Name, setName] = React.useState('');
const [Position, setPosition] = React.useState('');
const [users, setUsers] = React.useState([]);

const saveUsers = () => {
  submitUser(Id, Name, Position)
    .then((result) => {
      setId(null);
      setName('');
      setPosition('');
    })
    .catch((error) => {
      console.log(error);
    });
};

const deleteAllUsers = () => {
  firebase
    .database()
    .ref('users')
    .remove()
    .then(() => {
      setUsers([]);
    });
};

const deleteUser = (Item) => {
  database()
    .ref('users/' + Item.Id)
    .remove()
    .then(() => {})
    .catch((err) => {
      console.log(err);
    });
};

const editUser = (Item) => {
  setId(Item.Id);
  setName(Item.Name);
  setPosition(Item.Position);
};
return( 
 
        <View>
       
        <Text>Hello</Text>
    
        </View>
    
)}

export default HomeScreen

const styles = StyleSheet.create({})
