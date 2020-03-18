import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {View, StyleSheet, SafeAreaView} from 'react-native';
import TabBar from './src/components/tab/TabBar';
import QuickTimer from './src/components/quickTimer/QuickTimer';
import Bedtime from './src/components/quickTimer/Bedtime';
import MyTimers from './src/components/mytimers/MyTimers';
import EditTimer from './src/components/edittimer/EditTimer';

const App = ({selectedTimer}) => {
  const [tab, setTab] = useState(0);

  const switchTab = chosen => {
    if (chosen != tab) {
      setTab(chosen);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {
        selectedTimer ? <EditTimer /> : (
          tab ? <MyTimers />
          : <View style={styles.quickTimer}><QuickTimer /></View>
        ) 
      }
      {
        !selectedTimer && <TabBar selected={tab} switchTab={switchTab}/>
      }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcfcfc',
    marginBottom: 10,
  },
  quickTimer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

App.propTypes = {
  selectedTimer: PropTypes.object,
}

const mapStateToProps = state => ({
  selectedTimer: state.timers.item,
});

export default connect(mapStateToProps, {})(App);