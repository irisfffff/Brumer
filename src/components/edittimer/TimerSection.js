import React, {Component, useState} from 'react';
import {View, Text, StyleSheet, Switch, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {pad} from '../../time-display';

class TimerSection extends Component {
  constructor(props) {
    super(props);
    let time = [0, 0, 0];
    if (this.props.section.time) {
      time = this.props.section.time;
    }
    let pauseTime = [0, 0, 0];
    if (this.props.section.ifPause && this.props.section.pauseTime) {
      pauseTime = this.props.section.pauseTime;
    }
    this.state = {
      title: this.props.section.title,
      time: time,
      ifPause: this.props.section.ifPause,
      pauseTime: pauseTime,
    };
  }

  isUnset = (h, m, s) => {
    if (h || m || s)
      return false;
    return true;
  };

  timeValidation = text => { 
    if (/^0+$/.test(text))
      return true;
    while(text[0] == '0')
      text = text.slice(1)
    if (text.length > 2)
      return false;
    return /^\d+$/.test(text) ? true : false;
  };

  getSectionValue = () => {
    return {
      ...this.state,
      id: this.props.section.id,
    };
  }

  // Maximum length 20
  // TODO: add empty validation
  titleValidation = text => {
    return text.length <= 20;
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <TextInput
            style={styles.title}
            placeholder="Enter title"
            onChangeText={text => {
              if (this.titleValidation(text))
                this.setState({title: text})}}
            value={this.state.title}
          />
          <View style={styles.timeContainer}>
            <TextInput
              style={this.isUnset(...this.state.time) ? styles.timeUnset : styles.time}
              placeholder="00"
              keyboardType={'number-pad'}
              onChangeText={text => {
                if (this.timeValidation(text)) {
                  let newTime = this.state.time.slice();
                  newTime[0] = parseInt(text, 10);
                  this.setState({time: newTime});
                  if (newTime[0]>9)
                    this.minutesInput.focus();
                }
              }}
              value={pad(this.state.time[0])}
            />
            <Text style={this.isUnset(...this.state.time) ? styles.timeUnset : styles.time}>:</Text>
            <TextInput
              style={this.isUnset(...this.state.time) ? styles.timeUnset : styles.time}
              ref={input => this.minutesInput = input}
              placeholder="00"
              keyboardType={'number-pad'}
              onChangeText={text => {
                if (this.timeValidation(text)) {
                  let newTime = this.state.time.slice();
                  newTime[1] = parseInt(text, 10);
                  newTime[0] += Math.floor(newTime[1] / 60);
                  newTime[1] %= 60;
                  this.setState({time: newTime});
                  if (newTime[1]>9)
                    this.secondsInput.focus();
                }
              }}
              value={pad(this.state.time[1])}
            />
            <Text style={this.isUnset(...this.state.time) ? styles.timeUnset : styles.time}>:</Text>
            <TextInput
              style={this.isUnset(...this.state.time) ? styles.timeUnset : styles.time}
              ref={input => this.secondsInput = input}
              placeholder="00"
              keyboardType={'number-pad'}
              onChangeText={text => {
                if (this.timeValidation(text)) {
                  let newTime = this.state.time.slice();
                  newTime[2] = parseInt(text, 10);
                  newTime[1] += Math.floor(newTime[2] / 60);
                  newTime[2] %= 60;
                  newTime[0] += Math.floor(newTime[1] / 60);
                  newTime[1] %= 60;
                  this.setState({time: newTime});
                }
              }}
              value={pad(this.state.time[2])}
            />
          </View>
          <View style={styles.pause}>
            <Switch
              style={styles.switch}
              trackColor={{true: '#FDBB04'}}
              value={this.state.ifPause}
              onValueChange={(value) => this.setState({ifPause: value})}
            />
            <Text style={styles.pauseText}>Pause </Text>
            {
              this.state.ifPause && <View style={styles.pause}>
              <TextInput
                style={this.isUnset(...this.state.pauseTime) ? styles.pauseTextUnset : styles.pauseText}
                placeholder="00"
                keyboardType={'number-pad'}
                onChangeText={text => {
                  if (this.timeValidation(text)) {
                    let newTime = this.state.pauseTime.slice();
                    newTime[0] = parseInt(text, 10);
                    
                    this.setState({pauseTime: newTime});
                    if (newTime[0]>9)
                      this.pauseMinutesInput.focus();
                  }
                }}
                value={pad(this.state.pauseTime[0])}
              />
              <Text style={this.isUnset(...this.state.pauseTime) ? styles.pauseTextUnset : styles.pauseText}>:</Text>
              <TextInput
                style={this.isUnset(...this.state.pauseTime) ? styles.pauseTextUnset : styles.pauseText}
                ref={input => this.pauseMinutesInput = input}
                placeholder="00"
                keyboardType={'number-pad'}
                onChangeText={text => {
                  if (this.timeValidation(text)) {
                    let newTime = this.state.pauseTime.slice();
                    newTime[1] = parseInt(text, 10);
                    newTime[0] += Math.floor(newTime[1] / 60);
                    newTime[1] %= 60;
                    this.setState({pauseTime: newTime});
                    if (newTime[1]>9)
                      this.pauseSecondsInput.focus();
                  }
                }}
                value={pad(this.state.pauseTime[1])}
              />
              <Text style={this.isUnset(...this.state.pauseTime) ? styles.pauseTextUnset : styles.pauseText}>:</Text>
              <TextInput
                style={this.isUnset(...this.state.pauseTime) ? styles.pauseTextUnset : styles.pauseText}
                ref={input => this.pauseSecondsInput = input}
                placeholder="00"
                keyboardType={'number-pad'}
                onChangeText={text => {
                  if (this.timeValidation(text)) {
                    let newTime = this.state.pauseTime.slice();
                    newTime[2] = parseInt(text, 10);
                    newTime[1] += Math.floor(newTime[2] / 60);
                    newTime[2] %= 60;
                    newTime[0] += Math.floor(newTime[1] / 60);
                    newTime[1] %= 60;
                    this.setState({pauseTime: newTime});
                  }
                }}
                value={pad(this.state.pauseTime[2])}
              />
            </View>
            }
            
          </View>
        </View>
        <View style={styles.operation}>
          <TouchableOpacity onPress={() => this.props.handleCopy(this.props.index)}>
            <Icon style={styles.icon} name="clone" size={20}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.handleDelete(this.props.index)}>
            <Icon style={styles.icon} name="trash" size={22} color="#843728"/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    borderTopColor: '#00000050',
    borderTopWidth: 0.5,
    borderRadius: 1,
    paddingTop: 8,
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    marginBottom: 4,
  },
  timeContainer: {
    flexDirection: 'row',
  },
  time: {
    fontSize: 24,
    marginBottom: 4,
  },
  timeUnset: {
    fontSize: 24,
    marginBottom: 4,
    color: '#c7c7cd',
  },
  pause: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pauseText: {
    fontSize: 18,
    fontWeight: '200',
  },
  pauseTextUnset: {
    fontSize: 18,
    fontWeight: '200',
    color: '#c7c7cd',
  },
  switch: {
    transform: [{ scaleX: .65 }, { scaleY: .65 }],
  },
  operation: {
    flexDirection: 'row',
  },
  icon: {
    margin: 6,
  },
});

export default TimerSection;