import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const FullNoteScreen = ({ route }) => {
  const { note } = route.params;

  return (
    <View style={styles.mainContainer}>
        <ScrollView contentContainerStyle={styles.container}> 
            <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={styles.fullNoteText}>{note}</Text>
      </ScrollView>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex:1,
        padding: 16,
        backgroundColor: '#f7e6fa',
    },
  container: {
    flex: 1,
    padding: 16,
    borderWidth: 1.5,
    borderRadius: 10,
    borderBottomWidth: 6,
    borderRightWidth: 5,
    margin: 8,
    alignItems: "center",
  },
  fullNoteText: {
    fontSize: 16,
    fontFamily: 'monospace',
  },
  scrollContent: {
    margin: 5,
    flexGrow: 1,
    justifyContent: 'center',
  }
});

export default FullNoteScreen;
