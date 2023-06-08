import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import SearchBar from './Screens/SearchBar'
import Screen1 from './Screens/Screen1'
import { StatusBar } from 'react-native'
import { RecoilRoot } from 'recoil'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Screen2 from './Screens/Screen2'

const height = Dimensions.get("screen").height
const width = Dimensions.get("screen").width

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='S1' screenOptions={{headerTitleAlign:"center"}}>
          <Stack.Screen name='S1' component={Screen1} options={{
            title:'Home',
            headerStyle:{
              backgroundColor:'#42f5b0',
            
            },
            headerTintColor:'#fff',
            headerTitleStyle:{
              fontSize:20,
              fontWeight:"800"
            }
          }} />
          <Stack.Screen name='S2' component={Screen2} options={{headerStyle:{
            backgroundColor:'#000000'
          },
          headerTintColor:'white',
          headerTitleStyle:{
            fontWeight:"bold",

          },
          title:'Back'
          }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  )
}
const styles = StyleSheet.create({
  container: {
    // flex:1,
    // justifyContent:"center",
    alignItems: "center",
    backgroundColor: "white",
    // marginTop:20,
    width: width,
    height: height,
    // height:'100%',
    // width:'100%'
  }

})

export default App

