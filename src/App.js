import './App.css';
import { useState } from 'react';
import Axios from 'axios';


function App() {
  const [name,setName]=useState('');
  const [age,setAge]=useState(0)
  const [country,setCountry]=useState('');
  const [position,setPosition]=useState('');
  const [wage,setWage]=useState(0)

  const [infos,setInfos]=useState([])

  const [newWage, setNewWage] = useState(0);

  const getInfo=()=>{
    Axios.get('http://localhost:3001/employees')
    .then(response=>{
      setInfos(response.data)
    })
  }

  const addInfo=()=>{
    Axios.post('http://localhost:3001/create',{
      name: name,
      age:age,
      country:country,
      position:position,
      wage:wage
    }).then(()=>{
      console.log("Sucsess")
    })    
  }

  const updateEmployeeWage = (id) => {
    Axios.put("http://localhost:3001/update", { wage: newWage, id: id }).then(
      (response) => {
        setInfos(
          infos.map((val) => {
            return val.id == id
              ? {
                  id: val.id,
                  name: val.name,
                  country: val.country,
                  age: val.age,
                  position: val.position,
                  wage: newWage,
                }
              : val;
          })
        );
      }
    );
  };

  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setInfos(
        infos.filter((val) => {
          return val.id != id;
        })
      );
    });
  };
  return (
    <div className="App">
      <div style={{textAlign: 'center',borderRadius:'20px'}}>
        <h2>React-Node-Express-Mysql</h2>
        <h2>CRUD OPERATION</h2>
        <hr />
        <h1>Employee Management System</h1>
      </div>
     <div className="information">
       <label >Name</label>
       <input type="text" onChange={(event)=>setName(event.target.value)} />
       <label>Age</label>
       <input type="number" onChange={(event)=>setAge(event.target.value)} />
       <label>Country</label>
       <input type="text" onChange={(event)=>setCountry(event.target.value)} />
       <label >Position</label>
       <input type="text" onChange={(event)=>setPosition(event.target.value)} />
       <label>Salary</label>
       <input type="number" onChange={(event)=>setWage(event.target.value)} />

       <button onClick={addInfo}>Add Info</button>
     </div>
        <div className="employees">
          <button style={{margin:'10px'}} onClick={getInfo}>Show Details</button>
          {
            infos.map((info,key)=>{
              return <div className="employee">
                     <div>
                        <h3>Name: {info.name}</h3>
                        <h3>age: {info.age}</h3>
                        <h3>Country: {info.country}</h3>
                        <h3>Position: {info.position}</h3>
                        <h3>Salary: ${info.wage}</h3>
                        <input
                          type="text"
                          placeholder="Update Your Salary"
                          onChange={(event) => {
                            setNewWage(event.target.value);
                          }}
                        />
                        <button style={{height:'50px',width:'150px' ,margin:'10px'}}
                          onClick={() => {
                            updateEmployeeWage(info.id);
                          }}
                        >
                          {" "}
                          Update
                        </button>
                        <button style={{height:'50px',width:'150px'}}
                          onClick={() => {
                            deleteEmployee(info.id);
                          }}
                        >
                          Delete
                        </button>
                     </div>
                </div>
            })
          }
        </div>
 <footer style={{backgroundColor:'red',color:'white',fontWeight:'bolder',textAlign:'center'}}>Developed MD ASIF HOSSAIN</footer>
    </div>
  );
}

export default App;
