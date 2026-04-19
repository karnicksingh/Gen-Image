import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from "./Navbar.jsx"

export default  function Profile(){
 const[images,setImages]=useState([]);
 
 useEffect(()=>{
 fetchImage();
 },[])


 const fetchImage = async ()=>{
try{
 const res= await fetch("http://localhost:8000/images",{
    credentials:'include',
 });

const data = await res.json();
console.log("Image Data",data);
setImages(data);
}catch(error){
    console.log(error);
}

 }

return(
<>
<Navbar/>
<div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Your Images</h1>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((img) => (
            <div
              key={img._id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
            >
              <img
                src={img.imageUrl}
                className="w-full h-60 object-cover hover:scale-105 transition duration-300"
              />

              <div className="p-4">
                <p className="text-sm text-gray-600">
                  {img.prompt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
</>

)


}