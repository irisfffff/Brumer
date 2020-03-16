import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {runTimer, pauseTimer, resumeTimer} from '../../actions/timerActions';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';

import CircularSlider from './CircularSlider';
import TimerText from './TimerText';

function calculateSecondsFromAngle(angle) {
  return Math.round(angle / (2 * Math.PI / (60 * 2))) * 30;
}

function calculateTimeFromAngle(angle) {
  const seconds = calculateSecondsFromAngle(angle);
  const m = Math.floor(seconds / 60);
  const s = seconds - m * 60;

  return [ m, s ];
}

function roundAngleToFives(angle) {
  const thirtySecondAngle = 2 * Math.PI / 120;

  return Math.round(angle / thirtySecondAngle) * thirtySecondAngle;
}

function calculateAngleLength(sum) {
  return (sum[1] * 60 + sum[2]) * (2 * Math.PI / (60 * 60));
}

class QuickTimer extends Component {

  state = {
    startAngle: 0, 
    angleLength: Math.PI / 6, // 5 min
  }

  onUpdate = ({ startAngle, angleLength }) => {
    this.setState({
      // startAngle: roundAngleToFives(startAngle),
      angleLength: roundAngleToFives(angleLength)
    });
  }

  render() {
    const { startAngle, angleLength } = this.state;
    const { runningTimer, timeLeft, runTimer, pauseTimer, resumeTimer } = this.props;

    return (
      <View style={styles.container}>
        <View>
          {runningTimer && runningTimer.isQuickTimer ? 
            <TimerText
              style={styles.sleepTimeContainer}
              isRunning={true}
              minutes={timeLeft[1]}
              seconds={timeLeft[2]}
            /> :
            <TimerText
              style={styles.sleepTimeContainer}
              isRunning={false}
              secondsLong={calculateSecondsFromAngle(angleLength)}
            />}
          <CircularSlider
            startAngle={startAngle}
            angleLength={runningTimer && runningTimer.isQuickTimer ? calculateAngleLength(timeLeft) : angleLength}
            onUpdate={this.onUpdate}
            segments={5}
            strokeWidth={30}
            radius={145}
            gradientColorFrom="#FDBB04"
            gradientColorTo="#843728"
            showClockFace
            clockFaceColor="#9d9d9d"
            bgCircleColor="#f9f9f9"
          />
        </View>
        {!runningTimer &&
          <View style={styles.btnContainer}>
            <TouchableOpacity onPress={() => runTimer({sum: [0, ...calculateTimeFromAngle(angleLength)], isQuickTimer: true})}>
              <Image style={styles.btn} source={require('../../assets/images/start_btn.png')}/>
            </TouchableOpacity>
          </View>}
        {runningTimer && runningTimer.isQuickTimer &&
          <View style={styles.btnContainer}>
            <TouchableOpacity onPress={() => runTimer(undefined)}>
              <Image style={styles.btn} source={require('../../assets/images/cancel_btn.png')}/>
            </TouchableOpacity>
            {runningTimer.isRunning ? 
              <TouchableOpacity onPress={() => pauseTimer()}>
                <Image style={styles.btn} source={require('../../assets/images/pause_btn.png')}/>
              </TouchableOpacity> : 
              <TouchableOpacity onPress={() => resumeTimer(timeLeft)}>
                <Image style={styles.btn} source={require('../../assets/images/start_btn.png')}/>
              </TouchableOpacity>}
          </View>
        }
      </View>
    );
  }
}

QuickTimer.propTypes = {
  runTimer: PropTypes.func.isRequired,
  pauseTimer: PropTypes.func.isRequired,
  resumeTimer: PropTypes.func.isRequired,
  runningTimer: PropTypes.object,
  timeLeft: PropTypes.array,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  sleepTimeContainer: {
    flex: 1,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 36,
  },
  btn: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginLeft: 12,
    marginRight: 12,
  }
});

const mapStateToProps = state => ({
  runningTimer: state.timers.runningItem,
  timeLeft: state.timers.timeLeft,
});

export default connect(mapStateToProps, {runTimer, pauseTimer, resumeTimer})(QuickTimer);