import React from "react";
import { Pressable, View, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

type Props = {
    isTimerRunning: boolean;
    stopTimer: () => void; //the way to declare a function with a return type of void
    startTimer: () => void;
}

export const TimerToggleButton: React.FC<Props> = ({isTimerRunning, stopTimer, startTimer}) => {
    return (
        <Pressable onPress={isTimerRunning ? stopTimer : startTimer}>
            <View style={styles.container}>
                <FontAwesome 
                    name={isTimerRunning ? 'pause' : 'play'} 
                    size={50} 
                    style={styles.icon}
                />
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    icon: {
        alignSelf: 'center',
        color: "#fff"
    },
    container: {
        borderWidth: 5,
        width: 250,
        height: 250,
        borderRadius: 250 / 2,
        justifyContent: "center",
        borderColor: "#fff",
        marginVertical: 50
    }
})