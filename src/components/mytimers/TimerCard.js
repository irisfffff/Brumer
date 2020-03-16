import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {editTimer, runTimer, pauseTimer, resumeTimer} from '../../actions/timerActions';

import {View, Text, StyleSheet, TouchableOpacity, Image, TouchableWithoutFeedback, Alert} from 'react-native';
import {displayTime} from '../../time-display';

const TimerCard = ({item, runningTimer, timeLeft, editTimer, runTimer, pauseTimer, resumeTimer}) => {

  const handleTimerRun = () => {
    if (runningTimer) {
      Alert.alert('Timer Running', 'Sorry, you can have only one running timer at a time :(', {text: 'OK'});
      return;
    }
    runTimer({...item, isQuickTimer: false});
  }

  return (
    <TouchableWithoutFeedback onPress={() => editTimer(item)}>
      <View style={styles.card}>
          <View style={styles.info}>
            <Text style={styles.timerTitle}>{item.name}</Text>
            { runningTimer && !runningTimer.isQuickTimer && runningTimer.id == item.id ? 
              <Text style={styles.timerTime}>{displayTime(timeLeft)}</Text> : 
              <Text style={styles.timerTime}>{displayTime(item.sum)}</Text>}
          </View>
          <View>
            { runningTimer && !runningTimer.isQuickTimer && runningTimer.id == item.id ? 
                <View style={styles.pauseContainer}>
                  {
                    runningTimer.isRunning ?
                    <TouchableOpacity onPress={() => pauseTimer()}>
                      <Text style={styles.pauseText}>{'Pause'}</Text>
                    </TouchableOpacity> :
                    <TouchableOpacity onPress={() => resumeTimer(timeLeft)}>
                      <Text style={styles.pauseText}>{'Resume'}</Text>
                    </TouchableOpacity>
                  }
                  
                  <View style={styles.line}></View>
                  <TouchableOpacity onPress={() => runTimer(undefined)}>
                    <Text style={styles.pauseText}>{'Cancel'}</Text>
                  </TouchableOpacity>
                </View> : 
                <TouchableOpacity onPress={() => handleTimerRun()}>
                  <Image style={styles.startBtn} source={require('../../assets/images/start_btn.png')}/>
                </TouchableOpacity>}
          </View>
      </View>
    </TouchableWithoutFeedback>
  );
}; 

TimerCard.propTypes = {
  editTimer: PropTypes.func.isRequired,
  runTimer: PropTypes.func.isRequired,
  pauseTimer: PropTypes.func.isRequired,
  resumeTimer: PropTypes.func.isRequired,
  runningTimer: PropTypes.object,
  timeLeft: PropTypes.array,
};

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
  },
  pauseContainer: {
    flexGrow: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    borderLeftColor: '#84372840',
    borderLeftWidth: 0.5,
    borderRadius: 1,
  },
  pauseText: {
    color: '#843728',
    textAlign: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 6,
    paddingBottom: 6,
  },
  line: {
    height: 0,
    borderColor: '#84372840',
    borderWidth: 0.3,
    borderRadius: 1,
  }
});

const mapStateToProps = state => ({
  runningTimer: state.timers.runningItem,
  timeLeft: state.timers.timeLeft,
});

export default connect(mapStateToProps, {editTimer, runTimer, pauseTimer, resumeTimer})(TimerCard);