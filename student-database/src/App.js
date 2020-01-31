import React, { Component } from 'react';
import './App.css';
import Axios from 'axios';
class AddStudents extends Component{
  constructor(props){
    super(props);
    this.state={
      'firstName':'',
      'lastName':'',
      'skills':'',
    };
    this.addNote=this.addNote.bind(this);
  }
  addNote()
{
  // const skill = this.state.skills ? this.state.skills.toString().split(',') : [];
  // let final_state = this.state
  // final_state['skills'] = skill;
  if(this.state.firstName !== '' && this.state.lastName !== '' && this.state.skills.length !== '' ){
    this.props.studentinfo(this.state);
    this.setState({
      'firstName':'',
      'lastName':'',
      'skills':''
    })
  }
  else{
    alert('Please enter all fields!!!')
  }
}
SearchStudent()
{
  this.setState({
  })
}
  render() {
    return(
      <div className="form">
         <div className="inputtext">
         <div><input type="text" className="firstName" placeholder="first name"  onChange={(event) =>this.setState({'firstName':event.target.value})}/> </div>
         <div> <  input type="text" className="lastName" placeholder="last name"   onChange={(event) =>this.setState({'lastName':event.target.value})}/> </div>
         <div>  <input type="text" className="skills"placeholder="skills" onChange={(event) =>this.setState({'skills':event.target.value})}/> </div>
              < div className="submit" onClick={this.addNote}>submit</div>
              
          </div>
          <div>search:<input type="text" className="search" onChange={(event)=> this.props.searchInfo(event.target.value)} / ></div>
          <div className="searchbutton" onClick={this.SearchStudent}></div>
      </div>
    )
  }
}
class Student extends Component
{
  constructor(props)
  {
    super(props);
    this.state={
      query: '',
      students : [
        // {
        //   'firstName': 'Harikrishna',
        //   'lastName': 'Yadav',
        //   'skills': ['Python','HTML','CSS']
        // },
        // {
        //   'firstName': 'nandana',
        //   'lastName': 'Kariya',
        //   'skills': ['Python', 'HTML', 'CSS', 'CAT']
        // },
        // {
        //   'firstName': 'Samarth',
        //   'lastName': 'Hegde',
        //   'skills': ['Python', 'Git', 'CSS']
        // }
      ]
    };
    this.textshow=this.textshow.bind(this);
    this.SortFirstName=this.SortFirstName.bind(this);
    this.SortLastName=this.SortLastName.bind(this);
    this.SortSkills=this.SortSkills.bind(this);
    this.searchField= this.searchField.bind(this);
    this.ListView=this.ListView.bind(this);
    this.DeleteList=this.DeleteList.bind(this);
  }

  textshow(students)
  {
    // this.setState({
    //   students: [...this.state.students,students]
    // })
    Axios.post('http://127.0.0.1:8000/userupdate/',students).then(res =>{
      this.ListView();
    })
  }

  DeleteList(pk)
  {
    Axios.delete('http://127.0.0.1:8000/userdelete/'+pk.toString()+'/').then(res => {
      this.ListView();
    })
  }

 ListView()
 {
   Axios.get('http://127.0.0.1:8000/user/')
   .then(res =>{
     this.setState({
       students:res.data

     })
   })
 }
 componentDidMount()
 {
   this.ListView();
 }
  SortFirstName()
  {
    const sortFirstname=this.state.students.sort((a,b) => {return a.firstName.localeCompare(b.firstName);
    });
    this.setState({
      students:sortFirstname
    })
  }
  SortLastName()
  {
    const sortLastname=this.state.students.sort((a,b) => {return a.lastName.localeCompare(b.lastName);
    });
    this.setState({
      students:sortLastname
    })
  }
  SortSkills()
  {
    const sortSkills=this.state.students.sort((a,b) => {return a.skills.localeCompare(b.skills);
    });
    this.setState({
      students:sortSkills
    })
  }
  searchField(text) {
    this.setState({
      query: text
    })
  }
  render(){
    console.log(this.state.students)
    return(
      <div>
      <AddStudents studentinfo={this.textshow} searchInfo={this.searchField}/>
      <table>
        <thead>
          <tr>
            <th onClick={this.SortFirstName}>firstName</th>
            <th onClick={this.SortLastName}>lastName</th>
            <th onClick={this.SortSkills}>skills</th>
          </tr>
          </thead>
          <tbody>
        { this.state.students
        .filter((name) => {
          return name.firstName.toLowerCase().includes(this.state.query.toLowerCase()) ||
          name.lastName.toLowerCase().includes(this.state.query.toLowerCase())
        })
        .map((item,index) =>
        <tr key={index}>
          <td>{item.firstName} </td>
          <td>{item.lastName}</td>
          <td>
          {

            item.skills_list.map((item,index) =>

 
              <ul key={index}>
                <li>{item}</li>
              </ul>
                
               )}
              <button className="deletebutton" onClick={(event) => this.DeleteList(item.pk)}>delete</button>
          </td>
        </tr>
        )}
</tbody>
    </table>
    </div>
   )
  }
}
class App extends Component {
  render() {
    return (
      <div>
        {/* <AddStudents/> */}
        <Student/>
      </div>
    );
  }
}
export default App;

