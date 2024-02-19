import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../utils/defaults';
import Toast from 'react-native-toast-message';
import { Button, TextInput } from 'react-native-paper';

export default function UpdateScreen({ navigation, route }) {
  const todo = route.params.todo;
  const [text, setText] = useState(todo.content);

  const handleInputChange = (txt) => {
    setText(txt);
  };

  const handleUpdate = async () => {
    const body = {
      id: todo.id,
      planned: todo.planned,
      content: text,
    };

    if (!text) {
      Toast.show({
        type: 'error',
        text1: 'Lütfen değer giriniz.',
      });
      return;
    }

    await axios
      .put(baseUrl, body)
      .then((response) => {
        Toast.show({
          type: 'info',
          text1: 'Başarıyla güncellendi.',
        });
        navigation.navigate('List',{updateState:true});
      })
      .catch((error) => {
        Toast.show({
          type: 'error',
          text1: 'Hata meydana geldi.',
        });
        console.error(error);
      });
  };

  return (
    <>
      <TextInput
        onChangeText={handleInputChange}
        value={text}
      />
      <Button
        style={{ backgroundColor: 'yellow', marginTop: 10 }}
        onPress={handleUpdate}
        disabled={!text}
      >
        Güncelle
      </Button>
      <Toast />
    </>
  );
}

const styles = StyleSheet.create({});
