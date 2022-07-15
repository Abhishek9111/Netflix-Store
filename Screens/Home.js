import React, { useState } from 'react'
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
  H1,
  Fab,
  Icon,
  Subtitle,
  Container
} from 'native-base'

import AsyncStorage from '@react-native-community/async-storage'


const Home = ({navigation, route})=>{

  const [listOfSeasons,setListOfSeasons] = useState([])

  const getList = async()=>{


  }

  const deleteSeason = async()=>{


  }

  const markComplete = async()=>{


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
              <ListItem stlyle={styles.listItem}
              noBorder>
                <Left>
                  <Button style={styles.actionButton} danger>
                      <Icon name='trash' active />
                  </Button>
                  <Button style={styles.actionButton} >
                      <Icon active name='edit' type='Feather ' />
                  </Button>
                </Left>

                <Body>
                  <Title style={styles.seasonName}>
                    The Blacklist Season
                  </Title>
                  <Text note> 3 seasons to watch </Text>

                </Body>
                <Right>

                  <Checkbox
            
                  />
                  
                </Right>
                
              </ListItem>
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
  