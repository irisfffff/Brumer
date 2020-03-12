import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {editTimer, deleteTimer} from '../../actions/timerActions';

import {View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import TimerCard from './TimerCard';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const MyTimers = ({editTimer, deleteTimer, timers}) => {
  console.log("State in mytimers", timers)
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Timers</Text>
        <TouchableOpacity style={styles.addBtn} onPress={() => editTimer({
            name: '',
            sum: [0, 0, 0],
            sequence: [
              {
                id: '_' + Math.random().toString(36).substr(2, 9),
                title: '',
                time: [0, 0, 0],
                ifPause: false,
                pauseTime: [0, 0, 0],
              }
            ],
          })}>
          <Text style={styles.addBtnText}>+ Add New</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.timers}>
        <SwipeListView 
          disableRightSwipe
          data={timers}
          renderItem={(data, rowMap) => <TimerCard item={data.item}/>}
          renderHiddenItem={ (data, rowMap) => (
            <View style={styles.rowBack}>
              <TouchableWithoutFeedback onPress={() => deleteTimer(data.item.id)}>
                <View style={[styles.backRightBtn, styles.backRightBtnRight]}>
                  <Icon style={styles.icon} name="trash" size={30} color="#fff"/>
                  <Text style={styles.backTextWhite}>Delete</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          )}
          rightOpenValue={-75}
        />
        {/* <FlatList 
          data={timers}
          renderItem={({item}) => <TimerCard item={item}/>}
          keyExtractor={item => item.id}
        /> */}
      </View>
    </View>
  );
}; 

MyTimers.propTypes = {
  editTimer: PropTypes.func.isRequired,
  deleteTimer: PropTypes.func.isRequired,
  timers: PropTypes.array.isRequired,
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingLeft: 30,
    paddingRight: 25,
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  addBtn: {
    backgroundColor: '#c8701860',
    padding: 12,
    borderRadius: 6,
  },
  addBtnText: {
    color: '#fff',
  },
  timers: {
    alignItems: 'stretch',
    flexGrow: 1,
    maxHeight: '80%',
  },
  backTextWhite: {
    color: '#fff',
  },
  rowBack: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 85,
    height: 70,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    paddingLeft: 10,
  },
  backRightBtnRight: {
    backgroundColor: '#843728',
    right: 0,
  },
});

const mapStateToProps = state => ({
  timers: state.timers.items,
});

export default connect(mapStateToProps, {editTimer, deleteTimer})(MyTimers);