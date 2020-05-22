import React, { Component } from "react";  
import { StyleSheet, View, TextInput, Text, Button,Picker,ScrollView }  from "react-native";
import DatePicker from 'react-native-datepicker';
//import TimePicker from 'react-native-simple-time-picker';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { CheckBox } from 'react-native-elements'
//import CheckboxFormX from 'react-native-checkbox-form';

class App extends Component { 

  constructor(props) {
    super(props);
    this.delTask = this.delTask.bind(this);
    this.isDone = this.isDone.bind(this);
  }
  
  state = {  

    taskName : "",
    userTask : "",
    
    date : "",
  tableHead: ['S No.', 'Task', 'Due Date','Done' ,'Actions'],
    
    tasks : [],
  widthArr: [40, 110, 70, 70, 70],
    
  }

  userNameListChange = (inputText) => {  
    this.setState({ taskName: inputText })  
  } 
  
  
  userdateTextChange = (inputText) => {  
    this.setState({ userTask: inputText })  
  } 
    
  
  addTask = () => {  
    let tasks = this.state.tasks;
    tasks.push([this.state.taskName,this.state.date,false]);
    this.setState({ tasks: tasks });
    console.log(this.state.tasks);
    this.setState({taskName : "",date : ""});

    fetch('http://127.0.0.1:5000/api/addtask', {
      method: 'POST',
      mode : 'no-cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
      body: JSON.stringify({
            task_Name: this.state.taskName,
            due_Date:this.state.date,
            is_Done : false
          })
    });   
  } 

  delTask(index){
    console.log(index);
    let task_list = this.state.tasks;
    task_list.splice(index, 1);
      this.setState({tasks: task_list});
    
   }

  isDone(index){
    console.log(index);
    let task_list = this.state.tasks;
    task_list[index][2] = true;
    // task_list.splice(index, 1);
    this.setState({tasks: task_list});

    
   }

  render() {   
  const data = [];
  
    for (let i = 0; i < this.state.tasks.length; i += 1) {
      const dataRow = [];
    dataRow.push(i+1);
      dataRow.push(this.state.tasks[i][0]);
    dataRow.push(this.state.tasks[i][1]);
    if(!this.state.tasks[i][2]){
    dataRow.push(<CheckBox
      checked ={this.state.tasks[i][2]}
      onPress={() =>
        
        this.isDone(i)
      }
      />  
      
    );
      }else{
        dataRow.push("Done");
      }
    if(!this.state.tasks[i][2]){
      dataRow.push(<Button  
        title="DEL"  
        color="green"  
        onPress={() => this.delTask(i)} 
      /> );
      
    }
    
    data.push(dataRow);
    }
    return (  
      <ScrollView >
      <View style={styles.container}>  
        <Text style={styles.txtLogin}>TO DO List</Text>
        
        <TextInput
          style={styles.textInputStyle}  
          onChangeText={this.userNameListChange}
          value = {this.state.taskName}
          placeholder="Add Task Name"  
          placeholderTextColor="black"  
        /> 
         
        <DatePicker
        style = {styles.textInputStyle}
        date={this.state.date}
        mode="date"
        placeholder="select date"
        format="DD-MM-YYYY"
        
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {this.setState({date: date})}}
      />
     
            
      <View style={{ margin: 25 }}>  
          <Button  
            title="ADD"  
            color="#293a8f"  
            onPress={this.addTask}
      /> 
      </View>
      </View>
      <View >
            <Table borderStyle={{borderColor: '#C1C0B9'}}>
        <Row data={this.state.tableHead} widthArr={this.state.widthArr} style={styles.head} textStyle={styles.text}/>
                {
                  data.map((dataRow, index) => (
                    <Row
                      key={index}
                      data={dataRow}
                      widthArr={this.state.widthArr}
                      style={[styles.row, index%2 && {backgroundColor: '#ffffff'}]}
                      textStyle={styles.text}
                    />
                  ))
                }
              </Table>
      </View> 
      </ScrollView>
    ); 
    }
}  
  
const styles = StyleSheet.create({  
  container: {  
    flex: 1,  
    justifyContent: "flex-start",  
    alignContent: "center",  
    //margin: 10, 
    backgroundColor: "#1a2238", 
    padding: 25,
    marginTop: 50,
  
     
  }, 
  
  textInputStyle: {  
    borderColor: "black",  
    borderWidth: 1,  
    height: 50,  
    marginLeft: 20,  
    marginRight: 20,  
    padding: 5,  
    marginTop: 8,
    
    backgroundColor: "#d3e3d7",   
    
  },  
  txtLogin: {  
    
    fontWeight: "bold",  
    fontSize: 30,
    
    height: 100,  
    marginLeft: 20,  
    marginRight: 20,  
    padding: 30,  
    marginTop: 50,
    
    backgroundColor: "#d3e3d7", 
    textAlign:"center",
    margin : 10
    

  },
  txtLogin1: {  
    padding: 15,
    backgroundColor: "silver", 
    
    fontWeight: "bold",  
    fontSize: 20,
    textAlign:"center",
    margin: 5,
  },

  head: { 
    height: 50, 
    backgroundColor: '#6b81f2' 
  },
  text: { 
    textAlign: 'center', 
    fontWeight: '200' ,
    fontWeight: 'bold'
  },
  dataWrapper: { 
    marginTop: -1 
  },
  row: { 
    height: 40, 
    backgroundColor: '#F7F8FA' 
  }  
}); 
  
export default App;  