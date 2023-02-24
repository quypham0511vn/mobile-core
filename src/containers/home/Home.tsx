import { COLORS } from '@/theme';
import { observer } from 'mobx-react';
import React from 'react';
import {
    StyleSheet, View, Text
} from 'react-native';


const Home = observer(() => {
    console.log('fdfd')
    return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontSize:100,color:COLORS.GREEN}}>Home</Text>
        </View>
    );
});

export default Home;


const styles = StyleSheet.create({
   
});
