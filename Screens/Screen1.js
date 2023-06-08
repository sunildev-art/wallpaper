import { FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View,SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { textWallpaperInput } from '../Atoms/WallpaperTextInput'
import SearchBar from './SearchBar'


const Screen1 = ({navigation}) => {
    const [searchValue, setSearchValue] = useRecoilState(textWallpaperInput)
    const [imageCollection, setImageCollection] = useState([])


    const access_key = 'YE0kxHITcrxUOWR0jRW5ta505BGnep4CbDQ9R3NIv9s'

    useEffect(() => {
        const getImageCollection = async () => {
            let data = await fetch(`https://api.unsplash.com/search/collections?page=1&per_page=30&query=${searchValue}&client_id=${access_key}
   
   `)
            let jsonData = await data.json()
            console.log(jsonData)
            setImageCollection(jsonData)
        }
        getImageCollection()

    }, [searchValue])

    imageCollection.total == 0 && setSearchValue('all')

    const showWallpaper=(item)=>{
    //  console.log(item)
    navigation.navigate('S2' , {clickImage:`${JSON.stringify(item)}`})
    }


    return (
        <SafeAreaView>
        <View style={styles.container}>
            <SearchBar />
            <FlatList showsVerticalScrollIndicator={false} numColumns={2} data={imageCollection.results}
                renderItem={({ item }) =>
                    <TouchableOpacity onPress={() =>showWallpaper(item)}>
                        <View style={styles.imageContainer}>

                            <Image source={{ uri: item.cover_photo.urls.regular }} style={styles.image} />

                        </View>
                    </TouchableOpacity>

                }
            />
        </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        width: '100%',
        //    marginTop:20,
        //   backgroundColor:"yellow",
        //   paddingVertical:10,
       
        height: '100%'
    },
    imageContainer: {
        width: 200,
        height: 400,
        backgroundColor: 'white'
    },
    image: {
        height: '100%',
        width: '100%',
        margin: 5,

    }


})
export default Screen1

