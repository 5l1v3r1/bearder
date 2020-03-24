import * as React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, KeyboardAvoidingView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { MonoText } from '../components/StyledText';

import TextButton from '../components/Text/TextButton.js';
import TextField from '../components/Text/TextField.js';
import HelpField from '../components/Login/HelpField.js';
import Logo from '../components/Login/Logo.js';

export default class LoginScreen extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      number: "",
      sms_code: "",
      xauth_str: "",
      sms_sent: false,
      xauth: false,
    };
    this.sendPhoneNumber = this.sendPhoneNumber.bind(this);
    this.sendSmsCode = this.sendSmsCode.bind(this);
    this.handleNumber = this.handleNumber.bind(this);
    this.handleSms = this.handleSms.bind(this);
    this.setXauth = this.setXauth.bind(this);
    this.forceAuth = this.forceAuth.bind(this);
  }

  sendPhoneNumber(dat) {
    alert(dat);
    console.log("HERE");
    this.setState({sms_sent: true});
  }
  sendSmsCode(dat) {
    console.log("number", this.state.number, "code", dat);
    global.xauth="something";
  }

  forceAuth(val) {
    alert("Xauth set to: " + val);
    global.xauth=val;
  }

  handleNumber(num) {
    this.setState({number: num});
  }
  setXauth(dat) {
    this.setState({xauth_str: dat});
  }
  handleSms(sms) {
    this.setState({sms_code: sms});
  }

  render() {
    var form;

    if (this.state.xauth == false) {
      if (this.state.sms_sent == true) {
        form = <View style={styles.form}><TextField type="numeric" text="SMS Code" run={this.handleSms} />
            <TextButton text="LOGIN" run={() => {this.sendSmsCode(this.state.sms_code)}} /></View>;
      } else {
        form = <View style={styles.form}><TextField type="numeric" text="phone number" run={this.handleNumber} />
            <TextButton text="NEXT" run={() => {this.sendPhoneNumber(this.state.number)}} /></View>;
      }
    } else {
        form = <View style={styles.form}><TextField type="default" text="Enter xauth" run={this.setXauth} />
            <TextButton text="STEAL" run={() => {this.forceAuth(this.state.xauth_str)}} /></View>;
    }
    return (
      <KeyboardAvoidingView style={styles.container} behavior="position" enabled>
        <View style={styles.elemContain}>
          <HelpField text="WTF?" />
        </View>
        <View style={styles.elemContain}>
          <TouchableOpacity onPress={() => {this.setState({xauth: !this.state.xauth});}}>
            <Logo />
          </TouchableOpacity>
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
