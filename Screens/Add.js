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

const Add = ({navigation})=>{

  const [name,setName] = useState('')
  const [totalNoSeason,setTotalNoSeason] = useState('')

  const addToList = async()=>{
    try{
      if(!name || !totalNoSeason){
        return alert('Please add both fields')
      }
      const seasonToAdd ={          //object for data storage
        id: shortid.generate(),
        name,
        totalNoSeason: totalNoSeason,
        isWatched: false,
      }

      const storedValue= await AsyncStorage.getItem('@season_list')   //get the list if it exist
      const prevList = await JSON.parse(storedValue)    //parsing to add value

      if(!prevList){        //check if there is prev list or not
        const newList = [seasonToAdd]     //creates a new list
        await AsyncStorage.setItem('@season_list',JSON.stringify(newList))    //new list gets new object with the tag with which It can be called
      }else{
        prevList.push(seasonToAdd)      //prev list exists and season gets pushed
        await AsyncStorage.setItem('@season_list',JSON.stringify(prevList))     //the season is saved inside the storage
      }

      navigation.navigate('Home')

    }catch(error){
      console.log(error)
    }
  }

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
                value={name}
                onChangeText ={(Text)=>setName(Text)}
                />
              </Item>
              <Item
              rounded style={styles.formItem}
              >
                <Input 
                placeholder='Total No. of Seasons'
                style={{color:'#eee'}}
                value ={totalNoSeason}
                onChangeText={(Text)=>setTotalNoSeason(Text)}
                />
              </Item>
              <Button
              rounded block
              onPress={addToList}
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