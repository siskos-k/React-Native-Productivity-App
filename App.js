import React, { useState } from 'react';
import { StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false); 

  const addTask = () => {
    if (taskText.trim() !== '') {
      setTasks([...tasks, taskText]);
      setTaskText('');
    }
  };

  const removeTask = index => {
    let updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <View style={[styles.container, isDarkMode && styles.containerDark]}> 
      <Text style={[styles.title, isDarkMode && styles.titleDark]}>To-Do List</Text> 
      <TextInput
        style={[styles.input, isDarkMode && styles.inputDark]}
        placeholder="Enter task..."
        value={taskText}
        onChangeText={text => setTaskText(text)}
      />
      <TouchableOpacity style={[styles.addButton, isDarkMode && styles.addButtonDark]} onPress={addTask}>
        <Text style={[styles.buttonText, isDarkMode && styles.buttonTextDark]}>Add Task</Text>
      </TouchableOpacity>
      {tasks.map((task, index) => (
        <TouchableOpacity key={index} onPress={() => removeTask(index)}>
          <Text style={[styles.task, isDarkMode && styles.taskDark]}>{task}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity onPress={toggleDarkMode}>
        <Text style={[styles.darkModeButton, isDarkMode && styles.darkModeButtonDark]}>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
  },
  containerDark: {
    backgroundColor: '#111', 
  },
  
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  titleDark: {
    color: '#fff', 
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  inputDark: {
    color: '#fff',
    backgroundColor: '#222', 
    borderColor: '#444', 
  },
  addButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  addButtonDark: {
    backgroundColor: 'white', 
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  buttonTextDark: {
    color: '151515', 
  },
  task: {
    fontSize: 16,
    marginBottom: 10,
  },
  taskDark: {
    color: 'white', 
  },
  darkModeButton: {
    marginTop: 10,
    color: '151515',
  },
  darkModeButtonDark: {
    marginTop: 10,
    color: 'white',
  },
});
