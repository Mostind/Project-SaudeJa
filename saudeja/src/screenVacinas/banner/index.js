import React from 'react';
import {Image, StyleSheet} from 'react-native';

const Banner = () =>{
const styles = StyleSheet.create({
    img:{
        width:'100%',
        height:180,
    }
});
    return(
    <Image style={styles.img} source={require('./assets/logo-sus.png')} />
    );
}

export default Banner;