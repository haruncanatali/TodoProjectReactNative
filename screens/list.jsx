import { Alert, FlatList, StyleSheet, Text, View, Button as BTN } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { baseUrl } from '../utils/defaults'
import Toast from 'react-native-toast-message'
import dayjs from 'dayjs'
import { Card, Text as Txt, Avatar, Button } from 'react-native-paper'


export default function ListScreen({navigation, route}) {    
    const [todos, setTodos] = useState([{}])
    const updateState = route.params?.updateState;
    const getTodos = async() => {
        await axios.get(baseUrl)
        .then((response) => {
            setTodos(response.data)
            Toast.show({
                type: 'success',
                text1: 'Bilgiler başarıyla servisten getirildi.'
            })
        })
        .catch((error) => {
            console.log(error)
            Toast.show({
                type: 'error',
                text2: 'Hata meydana geldi.'
            })
        })
    }

    useEffect(() => {
        getTodos()
    }, [updateState])

    const deleteTodo = async(id) => {
        Alert.alert('Uyarı', 'Silinecek. Emin misiniz ?', [
            {text:'Evet', onPress: () => deleteTodoAct(id)},
            {text:'Hayır', onPress: () => getTodos()}
        ])
        
    }

    const deleteTodoAct = async(id) => {
        await axios.delete(baseUrl + '/' + id)
        .then((response) => {
            Toast.show({
                type:'success',
                text1:'Başarıyla silindi'
            })
        })
        .catch((error) => console.log(error))
        .finally(() => {
            getTodos()
        })
    }

    const updateTodo = async(id) => {
        await axios.get(baseUrl + '/' + id)
        .then((response) => {
            navigation.navigate('Update',{todo:response.data})
        })
        .catch((error) => {
            console.log(error)
            Toast.show({
                type:'error',
                text1:'Todo çekilemedi.'
            })
        })
    }

    const routeCreate = () => {
        navigation.navigate('Create')
    }

    const LeftContent = props => <Avatar.Image size={48} source={require('../assets/my_icon.jpeg')} />
    const Item = ({content, createdAt, planned, id}) => (
        <Card style={{marginBottom:10, padding:3}}>
            <Card.Title title="Yapılacak" subtitle={id} left={LeftContent} />
            <Card.Content>
                <Txt variant='titleLarge' style={{color:'purple'}}>Eylem</Txt>
                <Txt variant='bodyMedium'>{content}</Txt>
                <Txt variant='titleLarge' style={{color:'purple'}}>Planlanan Tarih</Txt>
                <Txt variant='bodyMedium'>{dayjs(planned).format("DD/MM/YYYY hh:mm")}</Txt>
                <Txt variant='titleLarge' style={{color:'purple'}}>Oluşturma Tarihi</Txt>
                <Txt variant='bodyMedium'>{dayjs(createdAt).format("DD/MM/YYYY hh:mm")}</Txt>
            </Card.Content>
            <Card.Actions>
                <Button onPress={() => {
                    deleteTodo(id)
                }}>Sil</Button>
                <Button onPress={() => {
                    updateTodo(id)
                }}>Güncelle</Button>
            </Card.Actions>
        </Card>
        
    )

    const renderTodoItem = ({item}) => (
        <Item content={item?.content} createdAt={item?.createdAt} planned={item?.planned} id={item?.id} />
    )

  return (
    <>
        <View style={{padding:5}}>
            <Button style={{backgroundColor:'wheat', borderRadius:15}} onPress={() => routeCreate()}>Ekle</Button>
        </View>
        {
            todos.length > 0 && todos !== null ? (
                <FlatList 
                    data={todos}
                    renderItem={renderTodoItem}
                    keyExtractor={(todo) => todo.id}
                    style={{padding:8}}
                />
            ) : null
        }
        <Toast/>
    </>
  )
}

const styles = StyleSheet.create({})