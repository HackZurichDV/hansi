import React from 'react';
import {Modal, Text, TouchableOpacity, View, Alert, FlatList, StyleSheet, ImageBackground} from 'react-native';
import Progress from './Progress';

export default class DonateModal extends React.Component {

constructor(props) {
    super(props);

    this.state = {
      visible: false,
      items: [
        {
          item: 'WWF',
          src: require('../../src/images/1.png'),
          desc: 'World Wildlife Fund - The leading organization in wildlife conservation and endangered species. Learn how you can help WWF make a difference.'
        },
        {
          item: 'VIVA CON AGUA',
          src: require('../../src/images/2.png'),
          desc: 'World Wildlife Fund - The leading organization in wildlife conservation and endangered species. Learn how you can help WWF make a difference.'
        },
        {
          item: 'PETA',
          src: require('../../src/images/3.png'),
          desc: 'World Wildlife Fund - The leading organization in wildlife conservation and endangered species. Learn how you can help WWF make a difference.'
        },
      ]
    }
}

componentWillReceiveProps(nextProps) {
  this.setState({ visible: nextProps.visible });
}

  _renderListItem({item}) {
    return (

        <TouchableOpacity onPress={() => this.props.onItemAdd(item)}>
              <ImageBackground
          source={item.src}
          style={styles.headerImage}
      >
  	      <View style={styles.listItem}>
  	        <Text style={styles.listItemText}>{item.item}</Text>
  	      </View>
          </ImageBackground>
  	      </TouchableOpacity>
      
    );
  }

  render() {
  	let { visible, items } = this.state;

    return (
      <View style={{marginTop: 0, flex: 1}}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={visible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View>
            <View style={styles.header}>
            	<Text style={styles.modalTitle}>Donate</Text>
				<TouchableOpacity
					style={styles.closeModal}
	                onPress={this.props.hideModalHandler}>
	                <Text>Close</Text>
	              </TouchableOpacity>
            </View>
<View style={{marginTop: 0}}>
        <FlatList
          data={items}
          renderItem={this._renderListItem.bind(this)}
          keyExtractor={this._keyExtractor}
          style={styles.flatList}
          />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}


const styles = StyleSheet.create({
	closeModal: {
		position: 'absolute',
		top: 50,
		right: 15,
	},
	header: {
		backgroundColor: '#e3e3e3',
		paddingTop: 44,
		paddingBottom: 14,
	},
  listItem: {
  	flex: 1,
    flexDirection: 'row',
    borderBottomColor: '#efefef',
    borderBottomWidth: 1,
  },
  progressView: {
    flexDirection: 'row',
    flexShrink: 1,
    width: 90,
  },
  listItemText: {
    flex: 1,
    flexDirection: 'row',
    flexGrow: 1,
    paddingLeft: 10,
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 28,
    paddingTop: 40,
    paddingLeft: 26,
  },
  listItemDesc: {
    flex: 1,
    flexDirection: 'row',
    flexGrow: 1,
    paddingLeft: 10,
    color: '#ffffff',
    fontWeight: '100',
    fontSize: 12,
    paddingTop: 10,
    paddingLeft: 26,
  },
  flatList: {
    alignSelf: 'stretch',
    flexGrow: 1,
  },
  modalTitle: {
  	fontWeight: 'bold',
  	fontSize: 20,
  	textAlign: 'center',
  	color: '#3d5875'
  },
  headerImage: {
    height: 250,
    width: '100%'
  },
});
