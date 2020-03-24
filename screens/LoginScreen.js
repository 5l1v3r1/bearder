import * as React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, KeyboardAvoidingView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { MonoText } from '../components/StyledText';

import TextButton from '../components/TextButton.js';
import TextField from '../components/TextField.js';
import HelpField from '../components/HelpField.js';
import Logo from '../components/Logo.js';

export default class LoginScreen extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      number: "",
      sms_code: "",
      sms_sent: false,
    };
    this.ptdr = this.ptdr.bind(this);
    this.handleNumber = this.handleNumber.bind(this);
    this.handleSms = this.handleSms.bind(this);
  }

  ptdr(dat) {
    alert(dat);
  }

  handleNumber(num) {
    this.setState({number: num});
  }

  handleSms(sms) {
    this.setState({sms_code: sms});
  }

  render() {
    var form;

    if (this.state.sms_sent == true) {
      form = <View style={styles.form}><TextField text="SMS Code" run={this.handleSms} />
          <TextButton text="LOGIN" run={() => {this.ptdr(this.state.number)}} /></View>;
    } else {
      form = <View style={styles.form}><TextField text="phone number" run={this.handleNumber} />
          <TextButton text="NEXT" run={() => {this.ptdr(this.state.number)}} /></View>;
    }
    return (
      <KeyboardAvoidingView style={styles.container} behavior="position" enabled>
        <View style={styles.elemContain}>
          <HelpField text="WTF?" />
        </View>
        <View style={styles.elemContain}>
          <Logo />
        </View>
          {form}
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 35,
    flex: 1,
    backgroundColor: '#495057',
  },
  elemContain: {
    width: '100%',
  },
  form: {
    width: '100%',
    alignItems: 'center',
  }
});
