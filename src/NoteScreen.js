import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator} from '@react-navigation/stack';
import { Foundation } from 'react-native-vector-icons';

const Stack = createStackNavigator();

const NoteScreen = ({navigation}) => {
  const [savedNotes, setSavedNotes] = useState([]);

  useEffect(() => {
    retrieveNotes();
  }, []);
  const handleAddNote = () => {
    navigation.navigate('TypeNoteScreen');
}

  const retrieveNotes = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const notes = await AsyncStorage.multiGet(keys);
      setSavedNotes(notes.map(([key, value]) => ({ key, note: value })));
    } catch (error) {
      console.log('Error retrieving notes:', error);
    }
  };

  const confirmDelete = async (key) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this note?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem(key);
              const updatedNotes = savedNotes.filter((note) => note.key !== key);
              setSavedNotes(updatedNotes);
            } catch (error) {
              console.log('Error deleting note:', error);
            }
          },
        },
      ]
    );
  };

  

  return (
    <View style={styles.mainContainer}>
    <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.saved}>Saved Notes:</Text>
        {savedNotes.length === 0 ? (
          <Text style={styles.noNotesText}>No notes available</Text>
        ) : (
          <ScrollView>
            {savedNotes.map((note) => (
              <TouchableOpacity
              key={note.key}
              style={styles.noteButton}
              onPress={() => navigation.navigate('FullNoteScreen', { note: note.note })}
            >
              <View key={note.key} style={styles.noteContainer}>
              
                <Text style={styles.noteText}>{note.note.split(' ')[0]} {note.note.split(' ')[1]}</Text>
              
              <TouchableOpacity
                onPress={() => confirmDelete(note.key)}
                style={styles.deleteButton}>
                <Foundation name="page-delete" size={28} color="black" />
              </TouchableOpacity>
              
            </View>
            </TouchableOpacity>
              
            ))}
          </ScrollView>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#f7e6fa',
      },
  container: {
    flex: 1,
    padding: 16,
    borderWidth: 1.5,
    margin: 15,
    borderRadius: 10,
    borderRightWidth: 6,
    borderBottomWidth: 5,
    backgroundColor: '#f7e6fa',
  },
  noteText: {
    fontSize: 16,
    color   : 'black',
    fontFamily  : 'monospace',
    paddingBottom: 3,
  },
      buttonText:{
        alignSelf: 'center',
        fontFamily: 'monospace',
      },
      noteContainer:{
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        padding: 5,
        margin: 8,
        borderColor: 'black',
        backgroundColor:'#f7e6fa',
        borderRadius: 6,
        borderRightWidth: 3,
        borderBottomWidth: 4,
          },
      saved:{
     fontWeight :   'bold',
     marginBottom: 10,
     fontFamily: 'monospace',
      },
      deleteButton: {
        paddingTop: 3,
      },
});

export default NoteScreen;

  