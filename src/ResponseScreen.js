import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView, Dimensions, SafeAreaView} from 'react-native';
import axios from 'axios';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MaterialIcons, Entypo} from 'react-native-vector-icons';
import * as Animatable from 'react-native-animatable';




const ResponseScreen = ({ navigation, route }) => {
    const { topic, age } = route.params;
    const [loading, setLoading] = useState(true);
    const [text, setText] = useState("");
    const [addToNoteDisabled, setAddToNoteDisabled] = useState(true);
    const [noteAdded, setNoteAdded] = useState(false);
    const [animating, setAnimating] = useState(false);
    const [suggestedQueries, setSuggestedQueries] = useState([]);
    let query;



    const apiKey = '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';
    const apiUrl = 'https://api.openai.com/v1/engines/text-davinci-003/completions';
    const combinedPrompt = `Please provide a very descriptive(100 words) explanation of ${topic} tailored for a ${age}-year-old. 
                            The response should use simple language and avoid complex terminology if the age of 
                            the user belongs to very young people, while allowing more complexity for older audiences. 
                            Additionally, could you please suggest some related queries or questions that the user might 
                            have about ${topic}. Do not address the person by anything. Send the queries with "-" as denoter 
                            and there should be some new lines between the explanation and related queries.`;


const  handleQueryButtonPress = async (query) =>{
  try {
    setLoading(true);
    const response = await axios.post(
      apiUrl,
      {
        prompt: query,
        max_tokens: 1024,
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
    query = responseText.startsWith('?',) ? responseText.slice(1) : responseText;
 
    setText(query);
    setLoading(false);
    setAddToNoteDisabled(false);
  } catch (error) {

    console.error("API Request Error", error);
    alert('An error occurred while processing your request.');
  }
}


  
const apiRequest = async () => {
    try {
      const response = await axios.post(
        apiUrl,
        {
          prompt: combinedPrompt,
          max_tokens: 1024,
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
      query = responseText.startsWith('?',) ? responseText.slice(1) : responseText;
      const regex = /^[-•]\s*(.*)$/gm;
      const matches = [];
      let match;
      while ((match = regex.exec(query)) !== null) {
        matches.push(match[1]);
      }
      setSuggestedQueries(matches);

      const regex2 = /^(.*?)(?:\s*[-–—]\s*|$)/gm;
    const matches2 = [];
    let match2;

    while ((match2 = regex2.exec(query)) !== null) {
      matches2.push(match2[1]);
    }

    const filteredText = matches2.join('');
      setText(filteredText);
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
      setNoteAdded(true);
      setAnimating(true);
      setTimeout(() => {
        setNoteAdded(true);
      }, 500);

    } catch (error) {
      console.log('Error saving note:', error);
    }
  };

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.noteButton} onPress={() => navigation.navigate('NoteScreen')}>
      <Entypo name="book" size={22} color="black" />
      </TouchableOpacity>
        <StatusBar backgroundColor="#f5f5f5" />
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
              <View>
      <Text style={styles.responseText}>{text}</Text>
      <View style={styles.suggestedQueries}>
        {suggestedQueries.map((query, index) => (
          <TouchableOpacity
            key={index}
            style={styles.queryButton}
            onPress={() => handleQueryButtonPress(query)}
          >
            <Text style={styles.queryButtonText}>-{query}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
              
            )}
          </ScrollView>
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <MaterialIcons name="arrow-back-ios" size={17} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
  style={styles.AddToNote}
  onPress={handleAddToNote}
  disabled={addToNoteDisabled || noteAdded}
>
{animating ? (
    <Animatable.Text
      style={styles.addNoteButton}
      animation="fadeOut"
      duration={500}
      onAnimationEnd={() => setAnimating(false)}
    >
      Adding...
    </Animatable.Text>
  ) : (
    <Text style={styles.addNoteButton}>
      {noteAdded ? 'Added to Note' : 'Add to Note'}
    </Text>
  )}
</TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      flex: 1,
    backgroundColor: '#f5f5f5',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },
    scrollContent: {
      flexGrow: 1,
      justifyContent: 'center',
    },
    responseContainer: {
    backgroundColor: '#f5f5f5',
      borderRadius: 10,
      borderWidth: 1.5,
      borderRightWidth: 5,
      borderBottomWidth: 6,
      marginTop: 5,
      padding: 8,
      alignItems: 'center',
    },
  
    heading: {
      fontSize: 18,
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
      backgroundColor: '#fdfd96',
      borderWidth: 1.5,
      borderColor: 'black',
      borderRadius: 5,
      paddingHorizontal: 10,
      paddingVertical: 5,
      marginTop: 10,
      borderRightWidth: 4,
      borderBottomWidth: 5,
      opacity: 0.5,
      
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
    width: 50,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignSelf: 'center',
    },
    addNoteButton:{
      backgroundColor: '#fdfd96',
      borderWidth: 1.5,
      borderColor: 'black',
      borderRadius: 5,
      paddingHorizontal: 10,
      paddingVertical: 5,
      marginTop: 10,
      borderRightWidth: 4,
      borderBottomWidth: 5,
      marginLeft: 100,
      fontFamily: 'monospace',
    },
    disabledButton:{
      opacity: 0.5,
    },
    suggestedQueries: {
      marginTop: 10,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    queryButton: {
      backgroundColor: '#f5f5f5',
      borderRadius: 4,
      margin: 5,
      borderWidth: 1,
      padding: 3,
      borderRightWidth: 3,
      borderBottomWidth: 4,
      backgroundColor: '#e3dff2',
    },
    queryButtonText:{
      fontFamily: 'monospace',
    }
  });

  export default ResponseScreen;
  
  
  