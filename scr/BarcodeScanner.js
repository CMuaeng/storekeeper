import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';

const BarcodeScanner = () => {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedBarcode, setScannedBarcode] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setScannedBarcode(data);  
  };
  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

 

  return (
    <View style={styles.cameraContainer}>
      <BarCodeScanner
          onBarCodeScanned={scanned ? undefined :handleBarCodeScanned}
          style={[StyleSheet.absoluteFillObject]}
        />
      {scanned && (
        <View style={styles.containers}>
          <Text style={styles.label}>Scanned Barcode Data:</Text>
          <Text style={styles.barcodeData}>{scannedBarcode}</Text>
          <TouchableOpacity onPress={()=>setScanned(false)}>
            <Text  style={styles.label}>Scan Again</Text>
          </TouchableOpacity>
        </View>
      )} 

      <TouchableOpacity
        onPress={() =>  navigation.navigate('ProductDetails', {scannedBarcode})}
        style={styles.button}
      >
        <Text style={styles.label}>Scan The Barcode</Text>
        </TouchableOpacity>
        {console.log('Data: ' + scannedBarcode)}
    </View>
  );
};

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#F8F0E5',
  },
  containers: {
    backgroundColor: '#DAC0A3',
    paddingBottom: 20,
    alignItems: 'center',
  },
  button: {
    marginBottom: 30,
    height: 70,
    width: 300,
    backgroundColor: '#DAC0A3',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    marginTop:20,
  },
  label: {
    fontSize: 16,
    color:'#F8F0E5',
    fontWeight: 'bold',
    margin: 5,
  },
  barcodeData: {
    fontSize: 18,
    fontStyle: 'italic',
  },
});

export default BarcodeScanner