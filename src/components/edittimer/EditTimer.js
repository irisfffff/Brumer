import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createTimer, editTimer, saveTimer} from '../../actions/timerActions';

import {View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, FlatList, TextInput, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import TimerSection from './TimerSection';
import {uuid} from 'uuidv4';

const emptySection = {
  title: '',
  time: [0, 0, 0],
  ifPause: false,
  pauseTime: [0, 0, 0],
};

class EditTimer extends Component {

  constructor(props) {
    super(props);
    this.isNew = !('id' in this.props.timer);
    
    this.refSections = {};
    this.state = {
      name: this.props.timer.name,
      sum: this.props.timer.sum,
      sequence: this.props.timer.sequence,
    };
  }

  // Maximum length 20
  // TODO: add empty validation
  nameValidation = text => {
    return text.length <= 20;
  };

  addSection = () => {
    this.setState({sequence: this.state.sequence.concat([{id: '_' + Math.random().toString(36).substr(2, 9), ...emptySection}])})
  };

  deleteSection = index => {
    let sequence = [];
    this.state.sequence.forEach(item => {
      sequence.push(this.refSections[item.id].getSectionValue());
    });
    delete this.refSections[sequence[index].id]
    sequence.splice(index, 1);
    if (!sequence.length) {
      sequence = [{id: '_' + Math.random().toString(36).substr(2, 9), ...emptySection}];
    }
    this.setState({sequence: sequence});
  };

  copySection = index => {
    let sequence = [];
    this.state.sequence.forEach(item => {
      sequence.push(this.refSections[item.id].getSectionValue());
    });
    let newSection = {...sequence[index]};
    newSection.id = '_' + Math.random().toString(36).substr(2, 9);
    sequence.push(newSection);
    this.setState({sequence: sequence});
  };

  saveTimer = () => {
    if (!this.state.name || !this.state.name.length) {
      Alert.alert('Empty name', 'Please enter a name for your timer', {text: 'OK'});
      return;
    }
    let sequence = [];
    let sumTime = [0, 0, 0];
    this.state.sequence.forEach(item => {
      let section = this.refSections[item.id].getSectionValue();
      sumTime = sumTime.map((num, idx) => num + section.time[idx]);
      if (section.ifPause) {
        sumTime = sumTime.map((num, idx) => num + section.pauseTime[idx]);
      }
      sequence.push(section);
    });
    sumTime[1] += Math.floor(sumTime[2] / 60);
    sumTime[2] %= 60;
    sumTime[0] += Math.floor(sumTime[1] / 60);
    sumTime[1] %= 60;
  
    if (this.isNew) {
      const timer = {
        id: uuid(),
        name: this.state.name,
        sum: sumTime,
        sequence: sequence,
      };
      this.props.createTimer(timer);
    } else {
      const timer = {
        id: this.props.timer.id,
        name: this.state.name,
        sum: sumTime,
        sequence: sequence,
      };
      this.props.saveTimer(timer);
    }
    // this.props.editTimer(undefined);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableWithoutFeedback onPress={() => this.props.editTimer(undefined)}><Icon name="angle-left" size={32}/></TouchableWithoutFeedback>
          <TextInput style={styles.headerText}
            placeholder="Enter name"
            onChangeText={text => {
              if (this.nameValidation(text))
                this.setState({name: text})}}
            value={this.state.name}
          />
        </View>
        {/* <Text style={styles.sum}>{displayTime(this.state.sum)} in total</Text> */}
        <FlatList 
          data={this.state.sequence}
          renderItem={({item, index}) => <TimerSection
            ref={TimerSection => this.refSections[item.id] = TimerSection}
            section={item}
            index={index}
            handleDelete={this.deleteSection}
            handleCopy={this.copySection}
          />}
          keyExtractor={item => item.id}
        />
        <TouchableOpacity style={styles.addBtn} onPress={() => this.addSection()}>
          <Text style={styles.btnText}>+ Add Section</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveBtn} onPress={() => this.saveTimer()}>
          <Text style={styles.btnText}>Save</Text>
        </TouchableOpacity>
      </View>
    );
  }

}

EditTimer.propTypes = {
  createTimer: PropTypes.func.isRequired,
  editTimer: PropTypes.func.isRequired,
  saveTimer: PropTypes.func.isRequired,
  timer: PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingLeft: 30,
    paddingRight: 25,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
  },
  headerText: {
    marginLeft: 16,
    fontSize: 30,
    fontWeight: 'bold',
  },
  sum: {
    fontSize: 24,
    marginBottom: 16,
  },
  addBtn: {
    backgroundColor: '#c8701880',
    padding: 10,
    borderRadius: 6,
    marginTop: 16,
  },
  saveBtn: {
    backgroundColor: '#84372880',
    padding: 10,
    borderRadius: 6,
    marginTop: 16,
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
  },
  timers: {
    alignItems: 'stretch',
    flexGrow: 1,
    maxHeight: '84%',
  }
});

const mapStateToProps = state => ({
  timer: state.timers.item,
});

export default connect(mapStateToProps, {createTimer, editTimer, saveTimer})(EditTimer);