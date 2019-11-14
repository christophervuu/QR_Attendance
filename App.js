//This is an example code to Scan QR code//
import React, { Component } from 'react';
//import react in our code.
import { Text, View, Linking, TouchableHighlight, PermissionsAndroid, Platform, StyleSheet} from 'react-native';
// import all basic components
import { CameraKitCameraScreen, } from 'react-native-camera-kit';
//import CameraKitCameraScreen we are going to use.
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      //variable to hold the qr value
      qrvalue: '',
      opneScanner: false,
    };
  }
  componentDidMount() {
    var that = this;

    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds

    that.setState({
      //Setting the value of the date time
      date:
        date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
    });
  }
  onOpenlink() {
    //Function to open URL, If scanned 
    Linking.openURL(this.state.qrvalue);
    //Linking used to open the URL in any browser that you have installed
  }
  onBarcodeScan(qrvalue) {
    //called after te successful scanning of QRCode/Barcode
    this.setState({ qrvalue: qrvalue });
    this.setState({ opneScanner: false });
  }
  onOpneScanner() {
    var that =this;
    //To Start Scanning
    if(Platform.OS === 'android'){
      async function requestCameraPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,{
              'title': 'CameraExample App Camera Permission',
              'message': 'CameraExample App needs access to your camera '
            }
          )
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //If CAMERA Permission is granted
            that.setState({ qrvalue: '' });
            that.setState({ opneScanner: true });
          } else {
            alert("CAMERA permission denied");
          }
        } catch (err) {
          alert("Camera permission err",err);
          console.warn(err);
        }
      }
      //Calling the camera permission function
      requestCameraPermission();
    }else{
      that.setState({ qrvalue: '' });
      that.setState({ opneScanner: true });
    }    
  }
  render() {
    let displayModal;
    //If qrvalue is set then return this view
    if (!this.state.opneScanner) {
      return (
        <View style={styles.container}>
            <Text style={styles.heading}>QR Code Attendence</Text>
            <Text style={styles.simpleText}>{this.state.qrvalue ? 'Employee Id: '+this.state.qrvalue : ''}</Text>
            <Text style={styles.simpleText}>{this.state.qrvalue ? 'Log Date: '+this.state.date : ''}</Text>
            {this.state.qrvalue.includes("http") ? 
              <TouchableHighlight
                onPress={() => this.onOpenlink()}
                style={styles.button}>
                  <Text style={{ color: '#FFFFFF', fontSize: 12 }}>Open Link</Text>
              </TouchableHighlight>
              : null
            }
            <TouchableHighlight
              onPress={() => this.onOpneScanner()}
              style={styles.button}>
                <Text style={{ color: '#FFFFFF', fontSize: 12 }}>
                Open QR Scanner
                </Text>
            </TouchableHighlight>
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <CameraKitCameraScreen
          //Show/hide scan frame
          scanBarcode={true}

          //Scanner Frame color
          onReadCode={event =>
            this.onBarcodeScan(event.nativeEvent.codeStringValue)
          }

          actions={{ rightButtonText: 'Done', leftButtonText: 'Cancel' }}
          onBottomButtonPressed={(event) => this.onBottomButtonPressed(event)}

          frameColor={"white"}
          showFrame={true}   //(default false) optional, show frame with transparent layer (qr code or barcode will be read on this area ONLY), start animation for scanner,that stoped when find any code. Frame always at center of the screen
          //offsetForScannerFrame = {10}   //(default 30) optional, offset from left and right side of the screen
          //heightForScannerFrame = {400}  //(default 200) optional, change height of the scanner frame
          //colorForScannerFrame = {'red'} //(default white) optional, change colot of the scanner frame
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'white'
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#2c3539',
    padding: 10,
    width:300,
    marginTop:16
  },
  heading: { 
    color: 'black', 
    fontSize: 24, 
    alignSelf: 'center', 
    padding: 10, 
    marginTop: 30 
  },
  simpleText: { 
    color: 'black', 
    fontSize: 20, 
    alignSelf: 'center', 
    padding: 10, 
    marginTop: 16
  }
});