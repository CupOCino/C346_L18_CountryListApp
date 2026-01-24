import React, { useState } from 'react';
import { StatusBar, View, Button, Text, TextInput, Alert } from 'react-native';

const Edit = ({ navigation, route }) => {
    const [name, setName] = useState(route.params.name);
    const [pic, setPic] = useState(route.params.pic);
    return (
        <View>
            <StatusBar />
            <Text>Country Name:</Text>
            <TextInput style={{ borderWidth: 1 }} value={name} onChangeText={(text) => setName(text)} />
            <Text>Country Pic URL:</Text>
            <TextInput style={{ borderWidth: 1 }} value={pic} onChangeText={(text) => setPic(text)} />
            <Text> </Text>
            <Button title='Update'
                    onPress={() => {
                        const updatedItem = {
                            country_name: name,
                            country_pic: pic
                        };

                        fetch("https://l16-appwebservice.onrender.com/updatecountry/" + route.params.id,
                            {
                                method: "PUT",
                                headers: {"Content-Type": "application/json"},
                                body: JSON.stringify(updatedItem)
                            })
                            .then((response) => {
                                navigation.navigate('Home');
                            })
                    }
            }
            />
            <Text> </Text>
            <Button title='Delete'
                    onPress={() => {
                        fetch("https://l16-appwebservice.onrender.com/deletecountry/" + route.params.id,
                            {
                                method: "DELETE",
                            }
                        )
                            .then((response) => {
                                navigation.navigate("Home");
                            })
                    }
                    }
            />
        </View>
    );
};

export default Edit;