import React from 'react';
import {Modal, Text, TouchableOpacity, View, Alert, FlatList, StyleSheet} from 'react-native';
import Progress from './Progress';

export default class ItemModal extends React.Component {

constructor(props) {
    super(props);

    this.state = {
      visible: false,
      items: [
        {
          item: 'Avocado',
          earth: -2.5,
          health: 1.45,
          selfth: 2.1,
        },
        {
          item: 'Mandelmilch',
          earth: -4.83,
          health: 1.45,
          selfth: 1.1,
        },
        {
          item: 'Chia Seeds',
          earth: +3.21,
          health: 3.45,
          selfth: 4.21,
        },
        {
          item: 'Evian Water - still 500ml',
          earth: -3.7,
          health: 1,
          selfth: 23,
        },
        {
          item: 'Evian',
          earth: -3.7,
          health: 1,
          selfth: 23,
        },
        {
          item: 'Evian',
          earth: -3.7,
          health: 1,
          selfth: 23,
        },
        {
          item: 'Evian',
          earth: -3.7,
          health: 1,
          selfth: 23,
        },
        {
          item: 'Evian',
          earth: -3.7,
          health: 1,
          selfth: 23,
        },
        {
          item: 'Evian',
          earth: -3.7,
          health: 1,
          selfth: 23,
        },
        {
          item: 'Evian',
          earth: -3.7,
          health: 1,
          selfth: 23,
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
	      <View style={styles.listItem}>
	        <Text style={styles.listItemText}>{item.item}</Text>
	        <View style={styles.progressView}>
	          <Progress
	            label="EARTH"
	            fill={item.earth}
	            size={20}
	            width={6}
	            hideLabel={true}
	            />

	          <Progress
	            label="HEALTH"
	            fill={item.health}
	            size={20}
	            width={6}
	            hideLabel={true}
	            />

	          <Progress
	            label="SELFTH"
	            fill={item.selfth}
	            size={20}
	            width={6}
	            hideLabel={true}
	            />
	        </View>
	      </View>
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
            	<Text style={styles.modalTitle}>Add purchase</Text>
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
    paddingTop: 14,
    paddingBottom: 14,
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
  	flexGrow: 1,
    fontSize: 14,
    paddingLeft: 10
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
  }
});
