import { useState } from 'react';
import axios from 'axios';
import {Link}  from "react-router-dom"
import toast from 'react-hot-toast'
import { FiUserPlus } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import "./Register.css";

export default function Register() {
    let[data,setData]=useState({name:"",email:"",password:""});
    const API= import.meta.env.VITE_API_URL;
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
            `${API}/register`,data,{
                withCredentials:true
            }
        );
        toast.success(response.data,{
            style:{
                background:"#111827",
                color:"white",
                border:" 1px solid #22c55e",
                borderRadius:"10px",
                padding:"12px"
            },
        });
        setData({
        name:"" ,
        email:"",
        password:"" ,
         });
     }catch(err){
        if(err.response){
            toast.error(err.response.data,{
                style:{
                    background:"#111827",
                    color:"white",
                    border:" 1px solid #DE2E0D",
                    borderRadius:"10px",
                    padding:"12px"
                },
            });
        }else{
            toast.error(err.response.data,{
                style:{
                    background:"#111827",
                    color:"white",
                    border:" 1px solid #DE2E0D",
                    borderRadius:"10px",
                    padding:"12px"
                },
            });
        }
     }
    };

    return (

        <div className="min-h-screen bg-[#07111b] flex items-center justify-center relative overflow-hidden">

        <div className="absolute w-[500px] h-[500px] bg-emerald-500/10 blur-3xl rounded-full top-[-100px] left-[-100px]"></div>

        <div className="absolute w-[400px] h-[400px] bg-cyan-500/10 blur-3xl rounded-full bottom-[-100px] right-[-100px]"></div>

        <div className="relative z-10 w-full max-w-md">

            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl">

                <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center mb-6">
                    <FiUserPlus className='text-green-400' size={24} />
                </div>

                <h1 className="text-4xl font-bold text-white mb-2">
                    Create your account 
                </h1>

                <p className="text-gray-400 mb-8">
                  Start generating AI images Instantly
                </p>

                <form onSubmit={handleSubmit}>
                    {/* username  */}
 
                    <label className='text-gray-500 text-sm' name="name" >Username</label>
                    {/* <FiUser className='text-gray-400' size={15}/> */}
                    <input
                        type="text"
                        placeholder="your username"
                        className="   placeholder:italic placeholder:text-sm w-full mb-4 px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white"
                        value={data.name}  name="name" onChange={handleChange}
                    />
                    {/* email  */}
 
                    <label className='text-gray-300 text-sm' name="name" >Email address</label>
                    <input
                        type="email"
                        placeholder="you@example.com"
                        className="   placeholder:italic placeholder:text-sm w-full mb-4 px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white"
                        value={data.email} name="email" onChange={handleChange}
                    />

                   {/* Password */}

                   <label className='text-gray-500 text-sm '  name="password" >Password</label>
                    <input
                        type="password"
                        placeholder="choose a strong password"
                        className=" placeholder:italic placeholder:text-sm w-full mb-6 px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white"
                        value={data.password} name="password" onChange={handleChange}
                    />

                    <button className="w-full bg-emerald-400 hover:bg-emerald-300 text-black py-3 rounded-xl font-semibold">
                        Create account
                    </button>

                    <p className='text-gray-300 text-sm flex items-center justify-center pt-4'>Already have an account?{" "}

                        <Link to="/" className='text-green-400 font-semibold'> Sign in </Link>
                    </p>
                    

                </form>

            </div>

        </div>

    </div>
        
    )
}




/* <>
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

        </> */