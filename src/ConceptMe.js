import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, StatusBar} from 'react-native';
import Slider from '@react-native-community/slider';
import { createStackNavigator} from '@react-navigation/stack';
import { Entypo } from 'react-native-vector-icons';


const Stack = createStackNavigator();

const ConceptMe = ({ navigation }) => {
  const [textInput, setTextInput] = useState('');
  const [ageInput, setAgeInput] = useState('5');

  const handleSend = async () => {
    const age = parseInt(ageInput);
    if (isNaN(age) || age < 5 || age > 70) {
      alert('Please enter a valid age between 5 and 70.');
      return;
    }
    navigation.navigate('ResponseScreen', { topic: textInput, age: ageInput });
  }
  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor="#f7e6fa" />
      <TouchableOpacity style={styles.noteButton} onPress={() => navigation.navigate('NoteScreen')}>
      <Entypo name="book" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.mottoContainer}>
      <Text style={styles.mottoText}>Break Barriers,</Text>
      <Text style={styles.mottoText}>Be Extraordinary </Text>
      </View>
      <View style={styles.divider}></View>
      <View style={styles.container}>
      <Text style={styles.title}>Conceptualizer</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={textInput}
          placeholder="Enter topic"
          placeholderTextColor="gray"
          onChangeText={text => setTextInput(text)}
        />
        <View style={styles.sliderContainer}>
          <Text style={styles.ageText}>Age: {ageInput}</Text>
          <Slider
            style={styles.slider}
            minimumValue={5}
            maximumValue={70}
            step={1}
            value={Number(ageInput)}
            onValueChange={value => setAgeInput(value.toString())}
            trackStyle={styles.sliderTrack}
          />
        </View>
      </View>
      <TouchableOpacity
        style={[
          styles.button,
          { opacity: !textInput || !ageInput ? 0.5 : 1 },
        ]}
        disabled={!textInput || !ageInput}
        onPress={handleSend}
      >
        <Text style={styles.buttonText}>Go</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7e6fa',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#f7e6fa',
    padding: 8,
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 26,
    marginBottom: 30,
    marginTop: 5,
    fontFamily: 'monospace',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    borderColor: 'black',
    color: 'black',
    height: 50,
    borderRadius: 10,
    borderRightWidth: 4,
    borderBottomWidth: 5,
    borderWidth: 1.5,
    paddingLeft: 16,
    marginBottom: 10,
    fontSize: 16,
    fontFamily: 'monospace',
  },
  ageText: {
    marginTop: 10,
    color: 'black',
    marginRight: 5,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  slider: {
    width: '100%',
    height: 40,
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: '#f7e6fa',
  },
  button: {
    backgroundColor:'#dac8fa',
    width: '100%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRightWidth: 4,
    borderBottomWidth: 5,
    borderColor: 'black',
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 18,
    fontFamily: 'monospace',
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
  mottoText: {
    marginTop: 5,
    alignSelf: 'center',
    fontFamily: 'monospace',
    fontWeight: 900,
    fontSize: 26,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#000000',
    marginBottom: 10,
  },
  mottoContainer: {
    marginBottom: 10,
  },
});
export default ConceptMe;


