/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import { TimerCountDownDisplay } from './TimerCountDownDisplay';
import { TimerToggleButton } from './TimerToggleButton';
import { TimerModeDisplay, TimerModes } from './TimerModeDisplay';

const FOCUS_TIME_MINUTES = 25 * 60 * 1000; //25 mins
const BREAK_TIME_MINUTES = 5 * 60 * 1000; //5 mins

function App(): React.JSX.Element {
  //timerCount and setTimerCount are state variables
  const [timerCount, setTimerCount] = useState<number>(FOCUS_TIME_MINUTES);

  const [timerInterval, setTimerInterval] = useState<NodeJS.Timer | null>(null); //initialize to null

  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  const [timerMode, setTimerMode] = useState<TimerModes>("Focus"); //a union type

  useEffect(() => {
    if (timerCount == 0) {
      //if timer ended, reset the timer and change timer mode to break. otherwise, set it to focus and set timer
      if(timerMode == "Focus") {
        setTimerMode('Break');
        setTimerCount(BREAK_TIME_MINUTES); //reset timer count
      } 
      else {
        setTimerMode('Focus');
        setTimerCount(FOCUS_TIME_MINUTES); 
      }
      stopTimer();
    }
  },[timerCount])

  //startTimer function
  const startTimer = () => {
    setIsTimerRunning(true);
    //it decreases by 1 second every second
    const id = setInterval(() => setTimerCount(prev => prev - 1000), 1000); //1000 = 1 second
    setTimerInterval(id);
  };

  const stopTimer = () => {
    if(timerInterval != null) {
      clearInterval(timerInterval);
    }
    setIsTimerRunning(false);
  };

  return (
    //
    <View style={{...styles.container, ...{backgroundColor: timerMode == 'Break' ? "#2a9d8f" : "#c95550"}}}>
      <TimerModeDisplay timerMode={timerMode}/>
      <TimerToggleButton isTimerRunning={isTimerRunning} startTimer={startTimer} stopTimer={stopTimer} />
      <TimerCountDownDisplay timerDate={new Date(timerCount)} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#c95550',
    alignItems: 'center',
  },

});

export default App;
