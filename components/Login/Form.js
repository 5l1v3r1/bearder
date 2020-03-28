import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import TextButton from '../Text/TextButton.js';
import TextField from '../Text/TextField.js';

export default class Form extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      number: "",
      sms_code: "",
      sms_sent: false,
    }
    this.sendPhoneNumber = this.sendPhoneNumber.bind(this);
    this.sendSmsCode = this.sendSmsCode.bind(this);
    this.handleNumber = this.handleNumber.bind(this);
    this.handleSms = this.handleSms.bind(this);
  }

  sendPhoneNumber(dat) {
    alert(dat);
    console.log("HERE");
    this.setState({sms_sent: true});
  }
  sendSmsCode(dat) {
    console.log("number", this.state.number, "code", dat);
    global.xauth="something";
    this.props.refresh();
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
      form = <View style={styles.container}><TextField type="numeric" text="SMS Code" run={this.handleSms} />
          <TextButton text="LOGIN" run={() => {this.sendSmsCode(this.state.sms_code)}} /></View>;
    } else {
      form = <View style={styles.container}><TextField type="numeric" text="phone number" run={this.handleNumber} />
          <TextButton text="NEXT" run={() => {this.sendPhoneNumber(this.state.number)}} /></View>;
    }
    return (
      <View style={styles.container}>
        {form}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
});
