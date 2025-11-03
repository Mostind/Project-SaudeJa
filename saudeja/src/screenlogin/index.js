import React from "react";
import {View , StyleSheet,TouchableOpacity,TextInput,Text} from 'react-native';
import Banner from "./banner";



const Screenlogin = () =>{
    return (
        <View style={styles.container}>
        <Banner/>
          <View style={styles.box_text}>
            <TextInput style={styles.InputText} placeholder="CPF" inputMode="numeric"/>
            <TextInput style={styles.InputText} placeholder="SENHA" />
            <TouchableOpacity style={styles.button}><Text style={styles.ButtonText}>ACESSAR</Text></TouchableOpacity>
            <Text style={styles.BaseboardText}>ESQUECI SENHA</Text>
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
    width:350,
    borderRadius:12,
    boxShadow:'0px 3px 1px #B3B3B3',
    // BORDA
    borderWidth:2,
    borderColor:'#B3B3B3',
    borderStyle:'solid',
    color:'#272626ff',
    fontSize:15,
},
 button:{
    padding:10,
    backgroundColor:'#009F80',
    width:250,
    height:54,
    borderRadius:23
 },
 ButtonText:{
    color:'#E8EFF1',
    margin:'auto',
 },
 BaseboardText:{
    marginTop:20,
    color:'#00745cff',
    fontWeight:'900',
    fontSize:13
 }


});

export default Screenlogin;

// width: 257px;
//   border-radius: 8px;
//   box-shadow: #B3B3B3 0px 3px 1px;
//   border: 2px solid rgb(179, 179, 179);