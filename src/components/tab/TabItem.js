import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const TabItem = (props) => {

  return (
    <View {...props} style={[styles.container, props.ifSelected ? {opacity: 1.0} : {opacity: 0.4}]}>
      <Image style={styles.icon} source={props.iconUri}/>
      <Text style={styles.text}>{props.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginBottom: 4,
  },
  text: {
    fontSize: 10,
  },
});

export default TabItem;