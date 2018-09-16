import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

export default class Progress extends React.Component {
	constructor(props) {
        super(props);

        this.state = {
        	hideLabel: props.hideLabel,
        	fill: props.fill,
        	width: props.width,
        	size: props.size,
        };
    }

	componentWillReceiveProps(newProps) {
        this.setState({
        	hideLabel: newProps.hideLabel,
        	fill: newProps.fill,
        	width: newProps.width,
        	size: newProps.size,
        });
	}

  render() {
  	let { hideLabel, fill, size, width } = this.state;
  	let fillValue = Math.abs(fill);
  	let fillColor = fill < 0 ? "red" : "#3d5875";


    return (
      <View style={styles.container}>
        <AnimatedCircularProgress
          size={size}
          width={width}
          fill={fillValue}
          tintColor={fillColor}
          onAnimationComplete={() => console.log('onAnimationComplete')}
          backgroundColor="#efefef"
          style={styles.bar}>
          {
    !hideLabel && ((fill) => (
      <Text style={styles.points}>
        { this.state.fill }%
      </Text>
    ))
  }
        </AnimatedCircularProgress>
          { !hideLabel && (<Text style={styles.label}>{this.props.label}</Text>) }
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
  bar: {
    transform: [{ rotate: '0deg'}]
  },
  label: {
    paddingTop: 10,
  },
  points: {
  	fontSize: 10,
  }
});
