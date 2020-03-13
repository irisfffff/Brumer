import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {editTimer, runTimer} from '../../actions/timerActions';

import {View, Text, StyleSheet, TouchableOpacity, Image, TouchableWithoutFeedback, Alert} from 'react-native';
import {displayTime} from '../../time-display';

const TimerCard = ({item, runningTimer, timeLeft, editTimer, runTimer}) => {

  const handleTimerRun = () => {
    if (runningTimer) {
      Alert.alert('Timer Running', 'Sorry, you can have only one running timer at a time :(', {text: 'OK'});
      return;
    }
    runTimer(item);
  }

  return (
    <TouchableWithoutFeedback onPress={() => editTimer(item)}>
      <View style={styles.card}>
          <View style={styles.info}>
            <Text style={styles.timerTitle}>{item.name}</Text>
            { runningTimer && runningTimer.id == item.id ? 
              <Text style={styles.timerTime}>{displayTime(timeLeft)}</Text> : 
              <Text style={styles.timerTime}>{displayTime(item.sum)}</Text>}
          </View>
          <View>
            <TouchableOpacity onPress={() => handleTimerRun()}>
              <Image style={styles.startBtn} source={require('../../assets/images/start_btn.png')}/>
            </TouchableOpacity>
          </View>
      </View>
    </TouchableWithoutFeedback>
  );
}; 

TimerCard.propTypes = {
  editTimer: PropTypes.func.isRequired,
  runTimer: PropTypes.func.isRequired,
  runningTimer: PropTypes.object,
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

const mapStateToProps = state => ({
  runningTimer: state.timers.runningItem,
  timeLeft: state.timers.timeLeft,
});

export default connect(mapStateToProps, {editTimer, runTimer})(TimerCard);