import { StyleSheet, Text, View,Image,TextInput } from 'react-native'
import React from 'react'
import Logo from '../Assets/srch.png'
import { useRecoilState } from 'recoil'
import { textWallpaperInput } from '../Atoms/WallpaperTextInput'

const SearchBar = () => {
    const [searchValue,setSearchValue]= useRecoilState(textWallpaperInput)

    const onChangeText=(text)=>{
        // console.log(text)
        setSearchValue(text)
        // console.log(searchValue)
        }


  return (
    <View style={styles.container}>
       <View style={styles.searchContaienr}>
     <Image source={Logo} style={styles.icon}/>
     <TextInput onChangeText={onChangeText}
     style={styles.searchInput} 
     placeholder='search Anything...' placeholderTextColor={"gray"}/>

     </View>
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
         alignItems:"center",
       width:'100%',
    //    marginTop:20,s
    backgroundColor:'white',
    paddingVertical:10
    },
    icon:{
        height:20,
        width:20,
        borderRadius:20,
       },
       searchContaienr:{
       flexDirection:"row",
    //    justifyContent:"center",
       alignItems:"center",
       backgroundColor:'white',
       elevation:10,
       borderRadius:20,
      width:'89%',
      padding:5,
      paddingHorizontal:10

       },
       searchInput:{
        width:"80%",
        fontSize:20,
        marginBottom:5,
        paddingLeft:10,
        color:'black'
       }
})
export default SearchBar

