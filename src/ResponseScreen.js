import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView, Dimensions} from 'react-native';
import axios from 'axios';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MaterialIcons, Entypo} from 'react-native-vector-icons';



const ResponseScreen = ({ navigation, route }) => {
    const { topic, age } = route.params;
    const [loading, setLoading] = useState(true);
    const [text, setText] = useState("");
    const [addToNoteDisabled, setAddToNoteDisabled] = useState(true);

    const apiKey = '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';
    const apiUrl = 'https://api.openai.com/v1/engines/text-davinci-003/completions';
    const combinedPrompt = `Please provide a descriptive explanation of ${topic} tailored for a ${age}-year-old. 
                            The response should use simple language and avoid complex terminology if the age of 
                            the user belongs to very young people, while allowing more complexity for older audiences. 
                            Additionally, could you please suggest some related queries or questions that the user might 
                            have about ${topic}. Do not address the person by anything.`;
  
const apiRequest = async () => {
    try {
      const response = await axios.post(
        apiUrl,
        {
          prompt: combinedPrompt,
          max_tokens: 740,
          temperature: 1,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
      const responseText = response.data.choices[0].text.trim();
      setText(responseText.startsWith('?',) ? responseText.slice(1) : responseText);
      setLoading(false);
      setAddToNoteDisabled(false);
    } catch (error) {

      console.error("API Request Error", error);
      alert('An error occurred while processing your request.');
    }
  }
    const handleGoBack = () => {
      navigation.goBack();
    };

  useEffect(() => {
    apiRequest();
  }, []);

  const handleAddToNote = async () => {
    try {
      const noteKey = `note_${Date.now()}`;
      const noteValue = `${topic}\n${text}`

      await AsyncStorage.setItem(noteKey, noteValue);

    } catch (error) {
      console.log('Error saving note:', error);
    }
  };

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.noteButton} onPress={() => navigation.navigate('NoteScreen')}>
      <Entypo name="book" size={20} color="black" />
      </TouchableOpacity>
        <StatusBar backgroundColor="#f7e6fa" />
        <ScrollView contentContainerStyle={styles.scrollContent} >
        
          <View style={[styles.responseContainer, { width: windowWidth * 0.92, height: windowHeight * 0.82 }]}>
            <Text style={styles.heading}>{topic}</Text>
            <View style={styles.divider}></View>
            <ScrollView showsVerticalScrollIndicator={false}>
            {loading ? (
              <View style={[styles.skeleton, { width: windowWidth * 0.85}]}>
                <View style={styles.skeletonLine}></View>
                <View style={styles.skeletonLine}></View>
                <View style={styles.skeletonLine}></View>
                <View style={styles.skeletonLine}></View>
                <View style={styles.skeletonLine}></View>
                <View style={styles.skeletonLine}></View>
                <View style={styles.skeletonLine}></View>
                <View style={styles.skeletonLine}></View>
                <View style={styles.skeletonLine}></View>
                <View style={styles.skeletonLine}></View>
                <View style={styles.skeletonLine}></View>
                <View style={styles.skeletonLine}></View>
                <View style={styles.skeletonLine}></View>
                <View style={styles.skeletonLine}></View>
                <View style={styles.skeletonLine}></View>
                <View style={styles.skeletonLine}></View>
                <View style={styles.skeletonLine}></View>
                <View style={styles.skeletonLine}></View>
                <View style={styles.skeletonLine}></View>
                <View style={styles.skeletonLine}></View>
                <View style={styles.skeletonLine}></View>
                <View style={styles.skeletonLine}></View>
                <View style={styles.skeletonLine}></View>
                <View style={styles.skeletonLine}></View>
                <View style={styles.skeletonLine}></View>
                <View style={styles.skeletonLine}></View>
                <View style={styles.skeletonLine}></View>
              </View>
            ) : (
              <Text style={styles.responseText}>{text}</Text>
            )}
          </ScrollView>
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <MaterialIcons name="arrow-back-ios" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.AddToNote, addToNoteDisabled ? styles.disabledButton : null]}
          onPress={handleAddToNote}
          disabled={addToNoteDisabled}>
          <Text style={styles.addNoteButton}>Add To Notes</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      flex: 1,
    backgroundColor: '#f7e6fa',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },
    scrollContent: {
      flexGrow: 1,
      justifyContent: 'center',
    },
    responseContainer: {
    backgroundColor: '#f7e6fa',
      borderRadius: 10,
      borderWidth: 1.5,
      borderRightWidth: 5,
      borderBottomWidth: 6,
      marginTop: 5,
      padding: 8,
      alignItems: 'center',
    },
  
    heading: {
      fontSize: 26,
      fontWeight: 'bold',
      marginBottom: 10,
      fontFamily: 'monospace',
      textAlign: 'center',
    },
  
    divider: {
      width: '100%',
      height: 1,
      backgroundColor: '#000000',
      marginBottom: 10,
    },
  
    responseText: {
      color: '#000000',
      fontSize: 16,
      textAlign: 'center',
      fontFamily: 'monospace',
    },
    backButton: {
      alignItems: 'center',
      alignSelf: 'center',
      backgroundColor: '#dac8fa',
      borderWidth: 1.5,
      borderColor: 'black',
      borderRadius: 5,
      paddingHorizontal: 10,
      paddingVertical: 5,
      marginTop: 10,
      borderRightWidth: 4,
      borderBottomWidth: 5,
      opacity: 0.6,
      
    },
    skeleton: {
      width: '100%',
      marginBottom: 10,
      paddingTop: 10,
      borderRadius: 10,
    },
    skeletonLine: {
      height: 12,
      backgroundColor: '#ebebeb',
      marginBottom: 10,
      borderRadius: 5,
    },
    noteButton: {
      alignSelf: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#a7dbd8',
    borderWidth: 1.5,
    borderColor: 'black',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 10,
    borderRightWidth: 4,
    borderBottomWidth: 5,
    justifyContent: 'center',
    width: 60,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignSelf: 'center',
    },
    addNoteButton:{
      backgroundColor: '#dac8fa',
      borderWidth: 1.5,
      borderColor: 'black',
      borderRadius: 5,
      paddingHorizontal: 10,
      paddingVertical: 5,
      marginTop: 10,
      borderRightWidth: 4,
      borderBottomWidth: 5,
      marginLeft: 60,
      fontFamily: 'monospace',
    },
    disabledButton:{
      opacity: 0.5,
    }
  });

  export default ResponseScreen;
  
  
  