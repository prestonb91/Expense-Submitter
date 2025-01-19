import { Text, View , StyleSheet, Button, Image, Alert} from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

export default function ReceiptCapture() {

  const [photo, setPhoto] = useState<any>(null);
  const [hasPermission, setHasPermission] = useState<any>(false);
  const [formData, setFormData] = useState<any>({

  });
  // const [extractedText, setExtractedText] = useState<any>("");

  // Request camera permission.
  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Camera permission is required.');
    } else {
      setHasPermission(status === 'granted');
    }
  };

  // Open the camera after asking for permission.
  const takePhoto = async () => {

    requestPermissions();

    if (hasPermission) {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: 'images',
        aspect: [4, 3],
      });
  
      console.log("Photo select: ", result);
  
      if (!result.canceled) {
        setPhoto(result.assets[0].uri);
      }
    };
  };

  // Open image gallery.
  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      aspect: [4, 3],
    });

    console.log("Gallery select: ", result);

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

    // Upload selected receipt to freee会計.
  // const uploadReceipt = () => {
  //   if (!photo) return Alert.alert('Error', 'Please take a photo first')

  //   const formData = new FormData();
  //   formData.append('receipt', {
  //     uri: photo,
  //     type: 'image/jpeg',
  //     name: 'receipt.jpg',
  //   });

  //   try {
  //     Alert.alert('Upload Success', 'Photo Data');
  //   } catch (err) {
  //     Alert.alert('Upload Failed', 'Please try again.');
  //   }
  // }

  // FUTURE FEATURE: Have google OCR analyze photo and store parsed data.
  // const performOCR = (file) => {
  //   let myHeaders = new Headers();
  //   myHeaders.append(
  //     // "apikey", INSERT APIKEY
  //   );
  //   myHeaders.append(
  //     "Content-Type", "multipart/form-data"
  //   );

  //   let raw = file;
  //   let requestOptions = {
  //     method: "POST",
  //     redirect: "follow",
  //     headers: myHeaders,
  //     body: raw,
  //   };
  // }

  return (
    <View style={styles.container}>
      <Button title="Take Receipt Photo" onPress={takePhoto} />
      <Button title="Select Receipt from Gallery" onPress={openGallery} />
      {photo && <Image source={{ uri : photo}} style={{ width: 200, height: 200}} />}
      {/* Add button below that appears below selected photo to analyze by google OCR */}
      {/* <Button title="Anaylze receipt" onPress={performOCR} /> */}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#25292e",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
  }
})
