import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function AboutScreen(){
    return(
        <View style={styles.container}>
            <Text> Tela About</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems:'center'
    }
});

export default AboutScreen;