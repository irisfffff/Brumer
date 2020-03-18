import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {runTimer, countdown} from './src/actions/timerActions';

import Sound from 'react-native-sound';

// Enable playback in silence mode
Sound.setCategory('Playback');  

// Load the sound file 'default.mp3' from the app bundle
// See notes below about preloading sounds within initialization code below.
const sound = new Sound('default.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // loaded successfully
  // console.log('duration in seconds: ' + sound.getDuration() + 'number of channels: ' + sound.getNumberOfChannels());
});

const Countdown = ({runTimer, countdown, runningTimer}) => {
  const [currentTimer, setCurrentTimer] = useState(null);

  const countLeft = ([h, m, s]) => {
    if (s)
      return [h, m, s-1];
    if (m)
      return [h, m-1, 59];
    if (h)
      return [h-1, 59, 59];
    return [0, 0, 0];
  }

  useEffect(() => {
    // Cancel running timer / timer finished running
    if (!runningTimer){
      if (currentTimer) {
        if (currentTimer.myInterval){
          clearInterval(currentTimer.myInterval);
          currentTimer.myTimeouts.forEach(item => clearTimeout(item));
        }
        setCurrentTimer(null);
      }
      return;
    }

    // Set currentTimer state will trigger useEffect, do nothing
    if (currentTimer && runningTimer.isRunning == currentTimer.timer.isRunning) {
      return;
    }

    // Pause or resume timer
    if (currentTimer && runningTimer.isRunning != currentTimer.timer.isRunning && currentTimer.timer.isRunning) {
      clearInterval(currentTimer.myInterval);
      currentTimer.myTimeouts.forEach(item => clearTimeout(item));
      setCurrentTimer({
        timer: {...currentTimer.timer, isRunning: false},
        myInterval: null,
        myTimeouts: null});
      return;
    }

    // if (currentTimer) {
    //   currentTimer.myTimeouts.forEach(item => clearTimeout(item));
    //   clearInterval(currentTimer.myInterval);
    // }

    // Update left time state to redux and display in TimerCard
    let sum = runningTimer.sum;
    if (currentTimer && !currentTimer.timer.isRunning)
      sum = runningTimer.timeLeft;
    let newInterval = setInterval(() => {
      sum = countLeft(sum);
      if (!sum[0] && !sum[1] && !sum[2]) {
        clearInterval(newInterval);
        console.log('Times out');
        // No timer running
        runTimer(undefined);
      }
      
      countdown(sum);
    }, 998); // There is often some delay
    
    // Play sound after timeout
    let playSound = [];
    if (runningTimer.isQuickTimer) {
      if (currentTimer && !currentTimer.timer.isRunning) {
        playSound.push((runningTimer.timeLeft[0] * 3600 + runningTimer.timeLeft[1] * 60 + runningTimer.timeLeft[2]) * 1000)
      } else {
        playSound.push((runningTimer.sum[0] * 3600 + runningTimer.sum[1] * 60 + runningTimer.sum[2]) * 1000);
      }
    } else {
      let prev = 0;
      let timePassed = 0;
      if (currentTimer && !currentTimer.timer.isRunning)
        timePassed = (runningTimer.sum[0] * 3600 + runningTimer.sum[1] * 60 + runningTimer.sum[2]) - (runningTimer.timeLeft[0] * 3600 + runningTimer.timeLeft[1] * 60 + runningTimer.timeLeft[2]);
      timePassed *= 1000;
      
      for (var i = 0; i < runningTimer.sequence.length; i++) {
        let sum = prev;
        sum += (runningTimer.sequence[i].time[0] * 3600 + runningTimer.sequence[i].time[1] * 60 + runningTimer.sequence[i].time[2]) * 1000;
        if (sum >= timePassed)
          playSound.push(sum - timePassed);
        prev = sum;
        if (runningTimer.sequence[i].ifPause) {
          prev += (runningTimer.sequence[i].pauseTime[0] * 3600 + runningTimer.sequence[i].pauseTime[1] * 60 + runningTimer.sequence[i].pauseTime[2]) * 1000;
        }
      }
    }
    
    let newTimeouts = [];
    playSound.forEach(time => {
      newTimeouts.push(setTimeout(() => sound.play(), time));
    });

    setCurrentTimer({
      timer: runningTimer,
      myInterval: newInterval,
      myTimeouts: newTimeouts,
    });
  });

  return null;
}

Countdown.propTypes = {
  runTimer: PropTypes.func.isRequired,
  countdown: PropTypes.func.isRequired,
  runningTimer: PropTypes.object,
};

const mapStateToProps = state => ({
  runningTimer: state.timers.runningItem,
});

export default connect(mapStateToProps, {runTimer, countdown})(Countdown);