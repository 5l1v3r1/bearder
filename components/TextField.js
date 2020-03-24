import * as React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default class TextField extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      func: undefined
    };

    this.noFunction = this.noFunction.bind(this);
    if (this.props.run === undefined) {
      this.state.func = this.noFunction;
    } else {
      this.state.func = this.props.run;
    }
  }

  noFunction(dat) {
    console.log("Text changed: ", dat);
  }

  render() {
    return (
        <View style={styles.container}>
          <TextInput style={styles.input}
            onChangeText={this.state.func}
            placeholder={this.props.text}
          />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '70%',
    height: 60,
    marginTop: 15,
    marginRight: 15,
    marginLeft: 15,
    marginBottom: 15,
  },
  input: {
    width: '100%',
    height: '100%',
    color: "#FFFFFF",
    borderBottomWidth: 1,
    borderColor: '#c70082',
    fontSize: 35,
  }
});
