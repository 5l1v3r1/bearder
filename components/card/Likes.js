import * as React from 'react';
import { StyleSheet, Text, View, Image, ScrollView} from 'react-native';

class Person extends React.Component
{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Image style={styles.thumbnail} source={{uri: this.props.url}} />
        <Text>HERE</Text>
      </View>
    );
  }
}

export default  class Likes extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      data : undefined,
    };
  }

  componentDidMount() {
  fetch("https://api.gotinder.com/v2/fast-match/teasers?locale=en", {
    credentials: "omit",
    headers: {
      accept: "application/json",
      "accept-encoding": "gzip, deflate, br",
      "accept-language": "en-US,en;q=0.9",
      "app-session-id": "a27bb1ea-ac87-46dc-9a49-ef8b3d03ec1f",
      "app-session-time-elapsed": "16669",
      "app-version": "1021800",
      "persistent-device-id": "0d4f3e12-ca69-48f2-9797-9728f00cd1b9",
      platform: "web",
      referer: "https://tinder.com/",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "cross-site",
      "tinder-version": "2.18.0",
      "user-agent":
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.72 Safari/537.36 Vivaldi/2.9.1705.31",
      "user-session-id": "64e2cb41-6eb5-4b2e-a512-a76b6e68c7f2",
      "user-session-time-elapsed": "16347",
      "x-supported-image-formats": "webp,jpeg",
      "Content-Type": "application/json",
      "x-auth-token": `${global.xauth}`
    },
    referrer: "https://tinder.com/",
    referrerPolicy: "origin",
    body: null,
    method: "GET",
    mode: "cors"
  })
    .then(result => result.json())
    .then(json => {
      this.setState({data: json.data.results});
    });
  }

  render() {
    var data;
    if (this.state.data != undefined) {
      data=this.state.data.map((item) => {
              return(<Person url={item.user.photos[0].processedFiles[0].url}/>);
            });
    }
    return (
      <View style={styles.container}>
        <ScrollView horizontal={true}>
          {data}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 150,
    position: 'absolute',
    bottom: '10%',
    backgroundColor: 'green',
  },
  thumbnail: {
    width: 100,
    height: 150,
  }
});
