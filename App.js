import React, {useState, useEffect} from 'react';
import {FlatList, StatusBar, Text, TextInput, View, StyleSheet, Image} from 'react-native';


const styles = StyleSheet.create({
    inputContainer: {
        borderWidth: 1,
        marginVertical: 15,
        marginHorizontal: 10,
    },
    cardContainer: {
        borderWidth: 1,
        marginBottom: 15,
        marginHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,

    },
    cardImage: {
        width: 120,
        height: 180,
        resizeMode: "contain",
    }

})

const App = () => {
    const [myData, setMyData] = useState([]);
    const [originalData, setOriginalData] = useState([]);

    // Add fetch() - Exercise 1A
    useEffect(() => {
        const myurl = "https://l16-appwebservice.onrender.com/allcountries"
        fetch(myurl)
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                setMyData(myJson);
                setOriginalData(myJson);
            })
    }, [])

    const FilterData = (text) => {
        if (text != '') {
            let myFilteredData = originalData.filter((item) =>
                item.country_name.toLowerCase().includes(text.toLowerCase()));
            setMyData(myFilteredData);
        } else {
            setMyData(originalData);
        }
    }

    const renderItem = ({item, index}) => {
        return (
            <View style={styles.cardContainer}>
                <Text>{item.country_name}</Text>
                <Image
                    source={{uri: item.country_pic}}
                    style={styles.cardImage}
                />
            </View>
        );
    };

    return (
        <View>
            <StatusBar/>
            <Text>Search:</Text>
            <TextInput style={styles.inputContainer} onChangeText={(text) => {FilterData(text)}}/>
            <FlatList data={myData} renderItem={renderItem}/>
        </View>
    );
}

export default App;
