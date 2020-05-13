import * as React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';

export default class TextField extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      type: 'default'
    };

    if (this.props.type !== undefined) {
      this.state.type = this.props.type;
    }
  }

  render() {
    return (
        <View style={styles.container}>
          <TextInput style={styles.input}
            onChangeText={this.props.run}
            placeholder={this.props.text}
            keyboardType={this.state.type}
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
