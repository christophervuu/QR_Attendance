//This is an example code to Scan QR code//
import React, { Component } from 'react';
//import react in our code.
import { Text, View, Button, TouchableHighlight, TextInput, Platform, StyleSheet} from 'react-native';

export default class Records extends Component {
    render() {
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Search for an employee's log history:</Text>

            <TextInput
                placeholder="Enter the NAME or ID"
                onChangeText={(text) => this.setState({text})}
            />

            <Button
                title="Export to Excel"
                onPress={() => this.props.navigation.navigate('Details')}
            />

          </View>
        );
      }
}