import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const TimerText = ({isRunning, minutes, seconds, secondsLong, ...rest}) => {

  return (
    <View {...rest}>
      <View style={styles.timerContainer}>
        <Text style={styles.time}>{isRunning ? minutes: Math.floor(secondsLong / 60)}</Text>
        <Text style={styles.text}>MIN</Text>
        <Text style={[styles.time, styles.span]}>{isRunning ? seconds : (secondsLong - Math.floor(secondsLong / 60) * 60)}</Text>
        <Text style={styles.text}>SEC</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  timerContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  time: {
    color: '#000',
    fontSize: 45,
    fontWeight: "300",
  },
  span: {
    marginLeft: 10,
  },
  text: {
    color: '#000',
    fontSize: 20,
    fontWeight: "300",
    marginBottom: 5,
  },
});

export default TimerText;