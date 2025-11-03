import React from 'react';
import {Image, StyleSheet} from 'react-native';

const Banner = () =>{
const styles = StyleSheet.create({
    img:{
        width:'100%',
        height:280,
        borderBottomLeftRadius:22,
        borderBottomRightRadius:22,
    }
});
    return(
    <Image style={styles.img} source={require('./assets/Prefeitura-de-Fortaleza-SMS-quadrado.jpg')} />
    );
}

export default Banner;