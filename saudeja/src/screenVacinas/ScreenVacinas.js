import React from "react";
import {View , StyleSheet,TouchableOpacity,TextInput,Text,FlatList} from 'react-native';
import Banner from "./banner";
import { vacinas } from "./data/vacinas";
// import { useNavigation } from "@react-navigation/native";

export default function ScreenVacinas(){
    // const navigation=useNavigation();

    return(
        <View style={styles.container}>
           <Banner/>
           <Text style={styles.textBanner}>VACINAS DISPONÍVEIS</Text>
            
            <FlatList
                data={vacinas}
                keyExtractor={(item)=>item.id}
                showsHorizontalScrollIndicator={false}
                style={{width:'100%'}}
                renderItem={({item})=>(
                    <TouchableOpacity style={styles.item} >
                        <Text style={styles.itemText}>{item.nome.toUpperCase()}</Text>
                    </TouchableOpacity>
                )}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container:{
    flex:1,
    alignItems:'center',
    width:'100%',
    height:'100%',
    backgroundColor:'#D6DBDE'
    },
    textBanner:{
        fontSize:24,
        paddingHorizontal:'18%',
        paddingVertical:'5',
        width:'100%',
        color:'#03559D',
        fontWeight:'700',
        
        borderStyle:'solid',
        borderWidth:1,
        borderColor:'#03559D',
    },
      item: {
    backgroundColor: "#fff",
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    width: "100%",
  },
  itemText: {
    fontSize: 16,
    color: "#03559D",
    fontWeight: "bold",
  },

    
});