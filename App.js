import React, { useState } from 'react';
import { StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View, CheckBox } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function App() {
  const [tasks, setTasks] = useState([{ text: "task1", completed: false }]);
  const [taskText, setTaskText] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [dailyHighlight, setDailyHighlight] = useState('');
  const [completedTasksCount, setCompletedTasksCount] = useState(0); 

  const addTask = () => {
    if (taskText.trim() !== '') {
      setTasks([...tasks, { text: taskText, completed: false }]);
      setTaskText('');
    }
  };

  const handleKeyPress = ({ nativeEvent }) => {
    if (nativeEvent.key === 'Enter') {
      addTask();
    }
  };

  const removeTask = index => {
    let updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
    if (tasks[index].completed) {
      setCompletedTasksCount(completedTasksCount - 1);
    }
  };

  const handleTaskAction = (index, action) => {
    const updatedTasks = tasks.map((task, i) => i === index ? { ...task, completed: action === 'toggle' ? !task.completed : task.completed } : task);
    setTasks(updatedTasks);
    if (updatedTasks[index].completed && action !== 'remove') {
      setCompletedTasksCount(completedTasksCount + 1);
    } else if (!updatedTasks[index].completed && action !== 'remove') {
      setCompletedTasksCount(completedTasksCount - 1);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleHighlightChange = text => {
    setDailyHighlight(text);
  };

  return (
    <View style={[styles.container, isDarkMode && styles.containerDark]}>
      <Text style={[styles.title, isDarkMode && styles.titleDark]}>Daily Highlight</Text>
      <TextInput
        style={[styles.input, isDarkMode && styles.inputDark]}
        placeholder="The most important thing you'll do today"
        value={dailyHighlight}
        onChangeText={handleHighlightChange}
      />
      <Text style={[styles.title, isDarkMode && styles.titleDark]}>To-Do List</Text>
      <TextInput
        style={[styles.input, isDarkMode && styles.inputDark]}
        placeholder="Enter task..."
        value={taskText}
        onChangeText={text => setTaskText(text)}
        onKeyPress={handleKeyPress}
      />
      <TouchableOpacity style={[styles.addButton, isDarkMode && styles.addButtonDark]} onPress={addTask}>
        <Text style={[styles.buttonText, isDarkMode && styles.buttonTextDark]}>Add Task</Text>
      </TouchableOpacity>
      {tasks.map((task, index) => (
        <View style={styles.taskBox} key={index}>
          <View style={[styles.taskContainer, isDarkMode && { borderColor: "white" }]}>
            <Text style={[styles.task, isDarkMode && styles.taskDark, task.completed && styles.completedTask]}>{task.text}</Text>
          </View>
          <CheckBox
            value={task.completed}
            onValueChange={() => handleTaskAction(index, 'toggle')}
          />
          <View style={{ marginRight: 10 }}></View>
          <TouchableOpacity onPress={() => handleTaskAction(index, 'remove')}>
            <Icon name="trash" size={20} color="red" />
          </TouchableOpacity>
        </View>
      ))}
      <Text style={styles.completedTasksText}>Completed Tasks: {completedTasksCount} / {tasks.length}</Text> 
      <TouchableOpacity onPress={toggleDarkMode} style={styles.darkModeButton}>
        <Icon name={isDarkMode ? 'sun-o' : 'moon-o'} size={30} color={isDarkMode ? 'yellow' : 'black'} />
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
    borderRadius: 10,
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
    color: '#151515',
  },
  taskBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskContainer: {
    borderColor: 'black',
    borderWidth: 3,
    borderRadius: 10,
    padding: 2,
    width: 200,
    alignItems: 'center',
    margin: 10,
  },
  task: {
    fontSize: 16,
    margin: 10,
  },
  taskDark: {
    color: 'white',
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  darkModeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  completedTasksText: {
    marginTop: 10,
    fontWeight: 'bold',
  },
});
