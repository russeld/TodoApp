import React, { Component } from 'react';
import { View, FlatList, Text, TextInput, StyleSheet, Button } from 'react-native';

// Todo Model
class Todo {
  constructor(title) {
    this.title = title;
    this.isCompleted = false;
    this.createdAt = new Date();
  }
}

// Todo item component
const TodoItem = ({todo, onPressDone }) => {
  return (
    <View style={{alignItems: "center", flexDirection: "row", paddingLeft: 10, paddingRight: 10, marginBottom: 10}}>
      <Text style={{flex: 1}}>{todo.title}</Text>
      <Button
        title="Done"
        color="green"
        onPress={() => onPressDone(todo)}
      />
    </View>
  );
}

// Todo list component

const TodoList = ({todoList, onPressDone}) => {
  return (
    <FlatList
      data={todoList}
      keyExtractor={(item, index) => item.title + index}
      renderItem={({item, index}) => <TodoItem index={index} todo={item} onPressDone={onPressDone} />}
    />
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [], // list of dictionary
      text: ""
    }

    this.onChangeText = this.onChangeText.bind(this);
    this.onSubmitText = this.onSubmitText.bind(this);
    this.onPressDone = this.onPressDone.bind(this);
  }

  onSubmitText () {
    var todoList = [ new Todo(this.state.text), ...this.state.todoList];
    this.setState({text: "", todoList: todoList});
  }

  onChangeText (value) {
    this.setState({text: value});
  }

  onPressDone(todo) {
    var todoList = [ ...this.state.todoList ];

    todoList.splice(todoList.indexOf(todo), 1);

    this.setState({todoList: todoList});
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{marginBottom: 0}}>
          <TextInput
            style={styles.textInput}
            placeholder="Otoke..."
            onChangeText={this.onChangeText}
            value={this.state.text}
            onSubmitEditing={this.onSubmitText}
          />
        </View>
        <View style={{flex: 5, backgroundColor: "#eee", justifyContent: "center", paddingTop: 20, paddingBottom: 20, alignContent: "center"}}>
          <TodoList todoList={this.state.todoList} onPressDone={this.onPressDone} onPressDelete={this.onPressDelete}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 6,
    justifyContent: "flex-start",
  },
  textInput: {
    height: 60,
    fontSize: 20,
    backgroundColor: "#ccc",
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44
  },
  heading: {
    fontSize: 20,
    marginLeft: 5,
    marginBottom: 10,
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    paddingBottom: 5
  }
});

export default App;
