import React from 'react';
import { TouchableOpacity, TouchableHighlight, FlatList, StyleSheet, Text, View, ImageBackground, Button } from 'react-native';
import Progress from './src/components/Progress';
import ItemModal from './src/components/ItemModal';
import DonateModal from './src/components/DonateModal';

export default class App extends React.Component {
  constructor() {
    super();

    //this.hideModal = this.hideModal.bind(this)

    this.state = {
      modalVisible: false,
      donateModalVisible: false,
      logs: [
      ]
    }
  }

  _keyExtractor(item, index) {
    return index;
  }

  _renderListItem({item}) {
    return (
      <View style={styles.listItem}>
        <Text style={styles.listItemText}>{item.item}</Text>
      </View>
    );
  }

  onItemAdd(item) {
    this.setState({
      logs: [...this.state.logs, item]
    })

    this.hideModal();
  }

  hideModal() {
    this.setModalVisible(false)
  }

   hideDonateModal() {
    this.setDonateModalVisible(false)
  }

  setModalVisible(visibility) {
    this.setState({modalVisible: visibility})
  }

   setDonateModalVisible(visibility) {
    this.setState({donateModalVisible: visibility})
  }
onPressLearnMore() {
}
  render() {
    let { modalVisible, logs, donateModalVisible } = this.state;

    let fillEarth = logs.map(item => item.earth).reduce((a, b) => a + b, 0).toFixed(2);
    let fillHealth = logs.map(item => item.health).reduce((a, b) => a + b, 0).toFixed(2);
    let fillSelfth = logs.map(item => item.selfth).reduce((a, b) => a + b, 0).toFixed(2);

    let date = new Date().toDateString();

    let costs = (fillEarth * 1) + (fillHealth * 0.85) + (fillSelfth * 0.95);

    if (costs < 0) {
      costs *= -1;
      costs *= 0.3;
    } else {
      costs = null;
    }

    return (
      <View style={styles.container}>
      <ImageBackground
          source={require('./src/images/header.png')}
          style={styles.headerImage}
      >
        <View style={styles.headerTextView}>
          <Text style={styles.headerText}>Footprint { costs > 0 && (<Text>- {costs.toFixed(2)}€</Text>) }</Text>
          <Text style={styles.headerTextSmall}>You are on your goals to better{"\n"}health, earth and selfth.{"\n"}{"\n"}Your friends have recently donated!</Text>


        <TouchableHighlight
          onPress={() => {
            this.setDonateModalVisible(true);
          }}
          style={styles.button}
          >
          <Text style={styles.buttonText}>Donate for a good cause!</Text>
        </TouchableHighlight>
</View>
      </ImageBackground>

        <View style={styles.progressView}>
          <Progress
            label="EARTH"
            fill={fillEarth}
            size={65}
            width={5}
            />

          <Progress
            label="HEALTH"
            fill={fillHealth}
            size={65}
            width={5}
            />

          <Progress
            label="SELFTH"
            fill={fillSelfth}
            size={65}
            width={5}
            />
        </View>

        {
          this.state.logs.length && (<Text style={styles.dateView}>{date}</Text>)
        }

        <FlatList
          data={this.state.logs}
          renderItem={this._renderListItem}
          keyExtractor={this._keyExtractor}
          style={styles.flatList}
          />
        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}
          style={styles.addItem}
          >
          <Text style={styles.addItemText}>+</Text>
        </TouchableHighlight>

        <ItemModal visible={modalVisible} hideModalHandler={this.hideModal.bind(this)} onItemAdd={this.onItemAdd.bind(this)}/>
        <DonateModal visible={donateModalVisible} hideModalHandler={this.hideDonateModal.bind(this)} onItemAdd={this.onItemAdd.bind(this)}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressView: {
    flexDirection: 'row',
    flexShrink: 0,
  },
  listItemText: {
    fontSize: 14,
    paddingLeft: 10
  },
  flatList: {
    alignSelf: 'stretch',
    flexGrow: 1,
    marginTop: 0
  },
  headerImage: {
    height: 284,
    width: '100%',
    marginBottom: 20
  },
  headerTextView: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 60,
  },
  headerText: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#ffffff',
    paddingBottom: 24,
  },
  headerTextSmall: {
    fontSize: 14,
    color: '#ffffff'
  },
  button: {
    backgroundColor: '#ffffff',
    paddingTop: 8,
    paddingRight: 20,
    paddingBottom: 8,
    paddingLeft: 20,
    borderRadius: 2,
    marginTop: 24,
    width: '100%',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3d5875',
    textAlign: 'center',
  },
  listItem: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 14,
    paddingBottom: 14,
    borderBottomColor: '#efefef',
    borderBottomWidth: 1,
  },
  addItem: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#3d5875',
    borderRadius: 100,
    width: 50,
    height: 50,
  },
  addItemText: {
    width: 50,
    height: 50,
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 45,
    fontSize: 40,
    fontWeight: '100'
  },
  dateView: {
    flexShrink: 0,
    alignSelf: 'stretch',
    backgroundColor: '#efefef',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    marginTop: 15,
    marginBottom: 0,
    width: '100%',
    color: '#3d5875',
    fontSize: 12,
    fontWeight: '300'
  }
});
