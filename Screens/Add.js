import React,{ useState } from 'react'
import {Text,StyleSheet,ScrollView} from 'react-native'

import { 
  Container,
  Form,
  Item,
  Input,
  Button,
  H1
} from 'native-base'

import shortid from 'shortid'
import AsyncStorage from '@react-native-community/async-storage'

const Add = ()=>{

  const [name,addName] = useState('')
  const [totalNoSeason,setTotalNoSeason] = useState('')

    return(
        <Container
        stlyle={styles.container}>
          <ScrollView
          contentContainerStyle={{flexGrow:1}}>
            <H1
            style={styles.heading}
            >
              Add to watch list
            </H1>
            <Form>
              <Item
              rounded style={styles.formItem}
              >
                <Input 
                placeholder='Season Name'
                style={{color:'#eee'}}
                />
              </Item>
              <Item
              rounded style={styles.formItem}
              >
                <Input 
                placeholder='Total N  o. of Seasons'
                style={{color:'#eee'}}
                />
              </Item>
              <Button
              rounded block
              >
                <Text style={{color:'#eee'}}>Add</Text>
              </Button>
            </Form>
          </ScrollView>
        </Container>
    )
}

export default Add

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#1b262c',
      flex: 1,
      justifyContent: 'flex-start',
    },
    heading: {
      textAlign: 'center',
      color: '#00b7c2',
      marginHorizontal: 5,
      marginTop: 50,
      marginBottom: 20,
    },
    formItem: {
      marginBottom: 20,
    },
  });