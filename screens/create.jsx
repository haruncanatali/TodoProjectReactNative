import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-paper'
import axios from 'axios'
import { baseUrl } from '../utils/defaults'

const reducer = (state, action) => {
    
}

export default function CreateScreen() {
    const handleCreate = async() => {
        await axios.post(baseUrl,{})
    }
  return (
    <>
        <TextInput  />
    </>
  )
}

const styles = StyleSheet.create({})