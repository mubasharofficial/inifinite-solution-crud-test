import React, {useState,useEffect} from 'react';
import axios  from './apiEndPoint';
import './App.css';
import SuccessResponseAlert from './SuccessResponseAlert';

function App() {

  const [supervisors,setsupervisors] = useState(null);
  const [apiSuccessResponse,setApiSuccessResponse] = useState(null);
  const [apiErrorResponse,SetApiErrorResponse] = useState(null);
  const [user,setuser] = useState(
    {supervisor_id:0,
      name:""
    }
    );

 
  const token = "Bearer 39|qFp2KXa0sllsyFupxtdPsTPqKDc2HapQrW2mSM9T";

  const fetchuser = async () => {
    const url = "bpo/supervisors"
    try {
      axios.get(url,
        {headers: {
          "Content-type":"application/json",
          "Authorization" : token
  
          }
        }
      )
      .then((response) => {
          setsupervisors(response.data.data);
        },
        (error) => {
          SetApiErrorResponse(error.response.status)
        }
      );
    } catch (err) {

      SetApiErrorResponse(err)
       
    }
};
const createuser = async () => {

  let posturl="bpo/teams";
  try {
    axios.post(posturl,user,
      {headers: {
        "Content-type":"application/json",
        "Authorization" : token

        }
      }
    )
    .then((response) => {
      setApiSuccessResponse(response.data);
      clear();
      },
      (error) => {
        SetApiErrorResponse(error.response.status)
      }
    );
  } catch (err) {

    SetApiErrorResponse(err);
    clear();
     
  }
};

  useEffect(  ()=>{
    fetchuser();
  },[])

  let name, value;
  const handleInputs = (e)=>{
    name= e.target.name;
    value = e.target.value;
    setuser({...user,[name]:value}) 
  }

   const clear = ()=>{
    
    user.name="";
    user.supervisor_id="";
    }

  return (
    <div className="App">
      {
       apiSuccessResponse!=null? 
              <div className='container-fluid'>
              <div className="alert alert-success alert-dismissible" role="alert">
              <button type="button" onClick={()=>setApiSuccessResponse(null)} className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <strong>Congratulations!</strong> Id <b>  {apiSuccessResponse.data.id} </b> and Name is <b> {apiSuccessResponse.data.name} </b> You successfully Resgister !
              </div>
              </div>
       :null
      }
   <div className='container-fluid'>
        <div className='row'>
              <div className='form-group col-md-3'>
                    <input className="form-control" name='name'
                    value={user.name}
                    onChange={handleInputs}
                    placeholder='Please Enter Team Member Name' autoComplete='off' required  />
              </div>
       
              <div className='form-group col-md-3'>
                    <select value={user.supervisor_id} onChange={handleInputs} className='form-control' name="supervisor_id" autoComplete='off'
                     onSelect={handleInputs}
                    required
                    >
                      <option  value="">Select Supervisor</option>
                      {
                                        supervisors!=null? supervisors.map((sup, index) =>
                                            <option value={sup.id} key={sup.id}> {sup.name}  </option>
                                            ):null
                      }

                    </select>
              </div>
              <div className='form-group col-md-3'>
                    <button className='form-control btn btn-success' onClick={createuser}>Send</button>
              </div>
        </div>

 
      </div>

    </div>
  );
}

export default App;
