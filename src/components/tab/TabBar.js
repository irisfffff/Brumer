import React from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import TabItem from './TabItem';

const TabBar = ({selected, switchTab}) => {

  return (
    <View style={styles.tab}>
      <TouchableWithoutFeedback onPress={() => switchTab(0)}>
        <TabItem iconUri={require('../../assets/images/quick_timer.png')} text={'Quick Timer'} ifSelected={selected == 0}/>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => switchTab(1)}>
        <TabItem iconUri={require('../../assets/images/chemex.png' )} text={'My Timers'} ifSelected={selected == 1}/>
      </TouchableWithoutFeedback>
    </View>
  );
}; 

const styles = StyleSheet.create({
  tab: {
    height: 49,
    backgroundColor: '#fff',
    borderTopWidth: 0.5,
    borderTopColor: '#aaa',
    paddingTop: 6,
    paddingRight: 30,
    paddingLeft: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  text: {
    textAlign: 'center'
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  }
});

export default TabBar;