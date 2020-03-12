import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {editTimer} from '../../actions/timerActions';

import {View, Text, StyleSheet, TouchableOpacity, Image, TouchableWithoutFeedback} from 'react-native';
import {displayTime} from '../../time-display';

const TimerCard = ({item, editTimer}) => {

  return (
    <TouchableWithoutFeedback onPress={() => editTimer(item)}>
      <View style={styles.card}>
          <View style={styles.info}>
            <Text style={styles.timerTitle}>{item.name}</Text>
            <Text style={styles.timerTime}>{displayTime(item.sum)}</Text>
          </View>
          <View>
            <TouchableOpacity>
              <Image style={styles.startBtn} source={require('../../assets/images/start_btn.png')}/>
            </TouchableOpacity>
          </View>
      </View>
    </TouchableWithoutFeedback>
  );
}; 

TimerCard.propTypes = {
  editTimer: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    flex: 1,
    height: 70,
    borderRadius: 8,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 0.10,
    shadowRadius: 3.84,
    elevation: 5,
  },
  info: {
    flexDirection: 'column',
  },
  timerTitle: {
    fontSize: 16,
    fontWeight: '200',
    marginBottom: 5,
  },
  timerTime: {
    fontSize: 22,
  },
  startBtn: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginRight: 18, 
  }
});

export default connect(null, {editTimer})(TimerCard);