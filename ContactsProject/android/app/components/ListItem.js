import React, {Component} from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  StyleSheet,
  Platform,
  Animated,
} from 'react-native';


class ListItem extends Component {
  render() {
    const {leftElement, contact} = this.props;

    const {
      itemContainer,
      leftElementContainer,
      rightSectionContainer,
      mainTitleContainer,
      titleStyle,
    } = styles;

    return (
      <View style={itemContainer}>
        <View style={leftElementContainer}>{leftElement}</View>

        <View style={rightSectionContainer}>
          <View style={mainTitleContainer}>
            <Text style={titleStyle}>{contact.name}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    minHeight: 44,
    height: 63,
  },
  leftElementContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2,
    paddingLeft: 13,
  },
  rightSectionContainer: {
    marginLeft: 18,
    flexDirection: 'row',
    flex: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#515151',
  },
  mainTitleContainer: {
    justifyContent: 'center',
    flexDirection: 'column',
    flex: 1,
  },
  rightElementContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.4,
  },

  titleStyle: {
    fontSize: 16,
  },
});

export default ListItem;
