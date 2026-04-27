import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';

import { useState,useEffect} from 'react';
import axios from 'axios';
import './login.css';

export default  function Login(){
    let[data,setData]=useState({email:"",password:""});
    const API= import.meta.env.VITE_API_URL;
    let navigate = useNavigate();
  
    let handleChange =(event)=>{
        let fieldName= event.target.name;
        let newValue= event.target.value;

        setData((prevData)=>{
            return{...prevData,[fieldName]:newValue};
        });
    }

let handleSubmit= async (event)=>{
    event.preventDefault();
    try{
      const response = await axios.post(
          `${API}/login`,data,{
            withCredentials:true
          }
      );
      navigate("/generate");
      alert("Login Successful");
      setData({
      email:"",
      password:"" ,
       });
   }catch(err){
      if(err.response){
          alert(err.response.data);
      }else{
          alert("Server Error");
      }
   }
  };


    return (
        <>
            <div className="login-container" >
                <Card className="login-card">
                    <CardContent>
                        <Typography variant="h5"  component="h2" gutterBottom>
                            Login
                        </Typography>
                        <br/>
                        <form className="login" onSubmit={handleSubmit}>

                            <TextField id="outlined-basic" label="Email" variant="outlined"  value={data.email} name="email" onChange={handleChange} />
                            <br />
                            <TextField type='password' id="outlined-basic" label="Password" variant="outlined"  value={data.password} name="password" onChange={handleChange}/>
                            <br />
                            <br />
                            <Button type="submit" variant="contained">Sumbit</Button>
                        </form>
                        <br />
                        <p>Don't have an account?</p>
                        <Button  variant="contained" onClick={()=>{
                            navigate("/register")
                        }}>Register</Button>

                    </CardContent>

                </Card>
            </div>

        </>
    )
}