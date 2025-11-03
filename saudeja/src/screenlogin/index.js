import React from "react";
import {View , StyleSheet,TouchableOpacity,TextInput} from 'react-native';
import Banner from "./banner";

const Screenlogin = () =>{
    return (
        <View style={styles.container}>
        <Banner/>
          <View style={styles.box_text}>
            <TextInput style={styles.InputText} placeholder="CPF" />
            <TextInput style={styles.InputText} placeholder="SENHA" />
          </View>
        </View>
    );
}

const styles=StyleSheet.create({
 container:{
    flex:1,
    alignItems:'center',
    width:'100%',
    height:'100%',
    backgroundColor:'#D6DBDE'
 },
 box_text:{
    flex:1,
    justifyContent:'flex-start',
    alignItems:'center',
    marginTop:100,
 }
 ,
 InputText:{
    backgroundColor:'#fff',
    marginBottom:50,
    padding:15,
    width:257,
    borderRadius:12,
    boxShadow:'0px 3px 1px #B3B3B3',
    // BORDA
    borderWidth:2,
    borderColor:'#B3B3B3',
    borderStyle:'solid'
    
}
});

export default Screenlogin;

// width: 257px;
//   border-radius: 8px;
//   box-shadow: #B3B3B3 0px 3px 1px;
//   border: 2px solid rgb(179, 179, 179);