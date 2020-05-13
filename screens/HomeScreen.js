'use strict';

import React from 'react';
import {StyleSheet, Text, View, ImageBackground} from 'react-native';

import SwipeCards from 'react-native-swipe-cards';

import Likes from '../components/card/Likes';

export class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.card}>
        <ImageBackground style={styles.thumbnail} source={{uri: this.props.image}}>
          <Text style={styles.text}>{this.props.name}</Text>
        </ImageBackground>
      </View>
    )
  }
}

export class NoMoreCards extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <View style={styles.noMoreCards}>
        <Text>Loading...</Text>
      </View>
    )
  }
}

const cards = [
  {name: 'test', image: 'https://media.giphy.com/media/GfXFVHUzjlbOg/giphy.gif', id:'1'},
  {name: '2', image: 'https://media.giphy.com/media/irTuv1L1T34TC/giphy.gif', id:'1'},
  {name: '3', image: 'https://media.giphy.com/media/LkLL0HJerdXMI/giphy.gif', id:'1'},
  {name: '4', image: 'https://media.giphy.com/media/fFBmUMzFL5zRS/giphy.gif', id:'1'},
  {name: '5', image: 'https://media.giphy.com/media/oDLDbBgf0dkis/giphy.gif', id:'1'},
  {name: '6', image: 'https://media.giphy.com/media/7r4g8V2UkBUcw/giphy.gif', id:'1'},
  {name: '7', image: 'https://media.giphy.com/media/K6Q7ZCdLy8pCE/giphy.gif', id:'1'},
  {name: '8', image: 'https://media.giphy.com/media/hEwST9KM0UGti/giphy.gif', id:'1'},
  {name: '9', image: 'https://media.giphy.com/media/3oEduJbDtIuA2VrtS0/giphy.gif', id:'1'},
]

const cards2 = [
  {name: '10', image: 'https://media.giphy.com/media/12b3E4U9aSndxC/giphy.gif', id:'1'},
  {name: '11', image: 'https://media4.giphy.com/media/6csVEPEmHWhWg/200.gif', id:'1'},
  {name: '12', image: 'https://media4.giphy.com/media/AA69fOAMCPa4o/200.gif', id:'1'},
  {name: '13', image: 'https://media.giphy.com/media/OVHFny0I7njuU/giphy.gif', id:'1'},
]

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: cards,
      outOfCards: false,
      match: false,
    }

    this.handleYup = this.handleYup.bind(this);
  }
  componentDidMount() {
    var tmp_card = [];
    fetch("https://api.gotinder.com/recs", {
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
        for (let i = 0; i < json.results.length; i++) {
          tmp_card[i] = {name:json.results[i].user.name, image: json.results[i].user.photos[0].processedFiles[0].url, id: json.results[i].user._id}
        }
        this.setState({cards: tmp_card});
      });
  }

  handleYup (card) {
    fetch(`https://api.gotinder.com/like/${card.id}`, {
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
        console.log(json);
        this.setState({match: json.match});
      });
  }

  handleNope (card) {
    console.log("nope")
    fetch(`https://api.gotinder.com/pass/${card.id}`, {
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
      .then(json => console.log(json));
  }

  cardRemoved (index) {
    console.log(`The index is ${index}`);

    let CARD_REFRESH_LIMIT = 3

    if (this.state.cards.length - index <= CARD_REFRESH_LIMIT + 1) {
      var tmp_card = [];
      fetch("https://api.gotinder.com/recs", {
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
          for (let i = 0; i < json.results.length; i++) {
            tmp_card[i] = {name:json.results[i].user.name, image: json.results[i].user.photos[0].processedFiles[0].url, id: json.results[i].user._id}
          }
          this.setState({cards: tmp_card});
        });

    }

  }

  render() {
    var mdr;
    if (this.state.match === false) {
      mdr = <View style={styles.banner}></View>;
    } else {
      mdr = <View style={styles.banner2}></View>;
    }
    return (
      <View style={styles.container}>
        {mdr}
        <SwipeCards
          stack={true}
          cards={this.state.cards}
          loop={false}

          renderCard={(cardData) => <Card {...cardData} />}
          renderNoMoreCards={() => <NoMoreCards />}
          showYup={false}
          showNope={false}

          handleYup={this.handleYup}
          handleNope={this.handleNope}
          cardRemoved={this.cardRemoved.bind(this)}
          containerStyle={this.swiper}
        />
        <Likes />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#495057',
  },
  banner: {
    height: 50,
    width: '100%',
    backgroundColor: 'black',
    marginBottom: 10,
  },
  banner2: {
    height: 50,
    backgroundColor: '#c70082',
    width: '100%',
    marginBottom: 10,
  },
  card: {
    alignItems: 'center',
    borderRadius: 5,
    overflow: 'hidden',
    borderColor: 'grey',
    borderWidth: 1,
    elevation: 1,
  },
  thumbnail: {
    width: 300,
    height: 450,
  },
  text: {
    color: '#c70082',
    fontWeight: "bold",
    fontSize: 20,
  },
  noMoreCards: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  swiper: {
    height: 500,
    backgroundColor: 'green',
  }
})
