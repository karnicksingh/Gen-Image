import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import "./Register.css";
import { useState } from 'react';
import axios from 'axios';

export default function Register() {
    let[data,setData]=useState({name:"",email:"",password:""});

    let handleChange =(event)=>{
        let fieldName= event.target.name;
        let newValue= event.target.value;

        setData((currData)=>{
            return{...currData,[fieldName]:newValue};
        });
    }
    let handleSubmit= async (event)=>{
      event.preventDefault();
      try{
        const response = await axios.post(
            "http://localhost:8000/register",data
        );
        alert(response.data); 
        setData({
        name:"" ,
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
            <div className="register-container" >
                <Card className="register-card">
                    <CardContent>
                        <Typography variant="h5"  component="h2" gutterBottom>
                            Register
                        </Typography>
                        <br/>
                        <form className="register" onSubmit={handleSubmit}>
                            <TextField id="outlined-basic" label="Username" variant="outlined" value={data.name}  name="name" onChange={handleChange}/>
                            <br />
                            <TextField id="outlined-basic" label="Email" variant="outlined"  value={data.email} name="email" onChange={handleChange} />
                            <br />
                            <TextField type='password' id="outlined-basic" label="Password" variant="outlined"  value={data.password} name="password" onChange={handleChange}/>
                            <br />
                            <br />
                            <Button type="submit" variant="contained">Sumbit</Button>
                        </form>

                    </CardContent>

                </Card>
            </div>

        </>
    )
}