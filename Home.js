import React,{useState, useEffect} from 'react';
import {StatusBar, Button, FlatList, StyleSheet, Text, View, Image, TextInput, TouchableOpacity} from 'react-native';

let originalData = [];

const Home = ({navigation}) => {
   const [myData, setMyData] = useState([]);


  const myurl = "https://l16-appwebservice.onrender.com/allcountries"
  
  useEffect(()=>{
  fetch(myurl)
  .then((response)=>{
    return response.json();
  })
  .then((myJson)=>{
        setMyData(myJson);
        originalData=myJson;
  })},[]);

  const FilterData = (text) => {
    if(text!='') {
      let myFilteredData = originalData.filter((item) =>
        item.country_name.toLowerCase().includes(text.toLowerCase()));
      setMyData(myFilteredData);
    }
    else {
      setMyData(originalData);
    }
  }

  const renderItem = ({item, index}) => {
    return (
        <TouchableOpacity
        onPress={()=>{
            navigation.navigate("Edit", {id: item.id, name: item.country_name, pic: item.country_pic})
        }}>
            <View style={{flexDirection:"row", alignItems:"center",borderWidth:1}}>
                <View style={{flex:1}}><Text style={{fontWeight:"bold", margin:10}}>{item.country_name}</Text></View>
                <View style={{flex:1}}><Image source={{uri:item.country_pic}} style={{width:150,height:100, margin:10}}></Image></View>
            </View>
        </TouchableOpacity>
    );
  };

  return (
    <View style={{flex:1}}>
      <StatusBar translucent={false}/>
      <Text style={{fontWeight:"bold"}}>Search:</Text>
      <TextInput style={{borderWidth:1, margin:10}} onChangeText={(text)=>{FilterData(text)}}/>
        <Button title='Add Country' onPress={()=>{navigation.navigate("Add")}}/>
      <FlatList style={{margin:10}} data={myData} renderItem={renderItem} />
    </View>
  );
};

export default Home;