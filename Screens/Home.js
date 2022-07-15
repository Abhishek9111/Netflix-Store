import React, { useState,useEffect } from 'react'
import {StyleSheet,ScrollView} from 'react-native'

import {
  List,
  ListItem,
  Left,
  Text,
  Button,
  Body,
  Right,
  CheckBox,
  Title,
  Spinner,
  H1,
  Fab,
  Icon,
  Subtitle,
  Container
} from 'native-base'

import AsyncStorage from '@react-native-community/async-storage'
import { useIsFocused } from '@react-navigation/native' //custom hook by 3rd party library, can be used in react too



const Home = ({navigation, route})=>{

  const [listOfSeasons,setListOfSeasons] = useState([])
  const [loading,setLoading] = useState(false)
  
  const isFocused = useIsFocused()    //this is used to render the screen while we navigate the screen from add to home
                                      //this in turn will display the newly added value into the home screen so we don't
                                      //have to restart the app again and again

  const getList = async()=>{

    setLoading(true)
    const storedValue = await AsyncStorage.getItem('@season_list')    //fetching item

    if(!storedValue){
      setListOfSeasons([])
    }
    const list = JSON.parse(storedValue)      //if list exists 
    setSeasonList(list)
    setLoading(false)

  }

  const deleteSeason = async(id)=>{

    const newList = await listOfSeasons.filter((list)=>list.id !== id)    //will remove the item with the id specified in the call back
    await AsyncStorage.setItem('@season_list', JSON.stringify(newList))
    setListOfSeasons[newList]

  }

  const markComplete = async(id)=>{

    const newArr = listOfSeasons.map((list)=>{
      if(list.id == id){
        list.isWatched = !list
      }
      return list
    })

    await AsyncStorage.setItem('@season_list', JSON.stringify(newArr))
    setListOfSeasons[newArr]
  }

  useEffect(()=>{
    getList();
  },[isFocused])

  if(loading) {
    return(             //indicator/animation while the data is being fetched and being loaded
      <Container style={styles.container}>
        <Spinner color='00b7c2'/>
      </Container>
    )
  }
  

    return(
        <ScrollView contentContainerStyle = {styles.container}>
          
          {listOfSeasons.length == 0 ? (

            <Container style={styles.container}>
              <H1 style={styles.heading}>
                Watch list is empty. Please add a season
              </H1>
            </Container>

          ):(
            <>
            <H1
            style={styles.heading}>
              Next Series to watch
            </H1>
            <List>
             {listOfSeasons.map((season)=>(
               <ListItem key={season.id} style={styles.listItem}
               noBorder>
                 <Left>
                   <Button 
                   style={styles.actionButton}
                   danger
                   onPress={()=>deleteSeason(season.id)}
                   >
                       <Icon name='trash' active />
                   </Button>
                   <Button style={styles.actionButton} 
                   onPress={()=>{
                    navigation.navigate('Edit',{season})
                   }}
                   >
                       <Icon active name='edit' type='Feather ' />
                   </Button>
                 </Left>
 
                 <Body>
                   <Title style={styles.seasonName}>
                     {season.name}
                   </Title>
                   <Text note> {season.totalNoSeason} </Text>
 
                 </Body>
                 <Right>
                   <Checkbox
                   Checked = {season.isWatched}
                   onPress={()=>markComplete(season.id)}
                   />               
                 </Right>
                 
               </ListItem>
             ))}
            </List>
            </>
          )}


          <Fab
          style={{backgroundColor:'#5067FF'}}
          position ="bottomRight"
          onPress={()=>navigation.navigate('Add')}
          >
            <Icon name='add'/>
          </Fab>
        </ScrollView>
    )
}

export default Home

const styles = StyleSheet.create({
    emptyContainer: {
      backgroundColor: '#1b262c',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      backgroundColor: '#1b262c',
      flex: 1,
    },
    heading: {
      textAlign: 'center',
      color: '#00b7c2',
      marginVertical: 15,
      marginHorizontal: 5,
    },
    actionButton: {
      marginLeft: 5,
    },
    seasonName: {
      color: '#fdcb9e',
      textAlign: 'justify',
    },
    listItem: {
      marginLeft: 0,
      marginBottom: 20,
    },
  });
  