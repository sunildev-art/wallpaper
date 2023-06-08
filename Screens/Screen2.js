import { StyleSheet, Text, View, Image, TouchableOpacity,Platform,PermissionsAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { textWallpaperInput } from '../Atoms/WallpaperTextInput'
import RNFetchBlob from 'rn-fetch-blob';

const Screen2 = ({ route }) => {
    const { clickImage } = route.params
    const [searchValue, setSearchValue] = useRecoilState(textWallpaperInput)
    const [imageData, setImageData] = useState()

    useEffect(() => {
        setImageData(JSON.parse(clickImage)?.cover_photo.urls.regular)
    }, [])
    // console.log(imageData)

   const showNextImage=async()=>{
     const data = await fetch(`https://source.unsplash.com/900x1600/?${searchValue}`)
    //  console.log(data.url)
    setImageData(data.url)
   }


   const REMOTE_IMAGE_PATH = imageData;

   const checkPermission = async () => {
    
    // Function to check the platform
    // If iOS then start downloading
    // If Android then ask for permission

    if (Platform.OS === 'ios') {
      downloadImage();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message:
              'App needs access to your storage to download Photos',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Once user grant the permission start downloading
          console.log('Storage Permission Granted.');
          downloadImage();
        } else {
          // If permission denied then show alert
          alert('Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.warn(err);
      }
    }
  };

  const downloadImage = () => {
    // Main function to download the image
    
    // To add the time suffix in filename
    let date = new Date();
    // Image URL which we want to download
    let image_URL = REMOTE_IMAGE_PATH;    
    // Getting the extention of the file
    let ext = getExtention(image_URL);
    ext = '.' + ext[0];
    // Get config and fs from RNFetchBlob
    // config: To pass the downloading related options
    // fs: Directory path where we want our image to download
    const { config, fs } = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        // Related to the Android only
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/image_' + 
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: 'Image',
      },
    };
    config(options)
      .fetch('GET', image_URL)
      .then(res => {
        // Showing alert after successful downloading
        console.log('res -> ', JSON.stringify(res));
        alert('Image Downloaded Successfully.');
      });
  };

  const getExtention = filename => {
    // To get the file extension
    return /[.]/.exec(filename) ?
             /[^.]+$/.exec(filename) : undefined;
  };


    return (
        <View style={styles.imageContainer}>
            
                <Image source={{ uri: imageData }}
                    style={styles.image}  />
             
               <TouchableOpacity style={styles.downloadbtnStyle} onPress={checkPermission}>
                    <Text style={styles.btnText1}>Download</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.nextbtnStyle} onPress={showNextImage}>
                    <Text style={styles.btnText2}>Next</Text>
                </TouchableOpacity>
              
              
        </View>
    )
}
const styles = StyleSheet.create({
    imageContainer: {
        height: '100%',
        width: '100%',
        backgroundColor: 'white'
    },
    image: {
        height: '100%',
        width: '100%',
        margin: 5,

    },
    downloadbtnStyle:{
    position:'absolute',
    bottom:10,
    left:80,
    backgroundColor:'black',
    paddingHorizontal:20,
    paddingVertical:10,
    borderRadius:15,
    elevation:20
    
    },
    nextbtnStyle:{
       position:'absolute',
            bottom:10,
            right:80,
            backgroundColor:'white',
            paddingHorizontal:20,
            paddingVertical:10,
            borderRadius:15,
            elevation:20
    },
    btnText1:{
        fontSize:20,
        fontWeight:'bold',
        color:"white"

    },
    btnText2:{
        fontSize:20,
        fontWeight:'bold',
        color:'black'
    }
 
   
})
export default Screen2

