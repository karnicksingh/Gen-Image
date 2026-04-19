import { useNavigate } from 'react-router-dom';
import Profile from "./Profile.jsx"
export default  function Navbar({credits, handleLogout}){
const navigate =useNavigate();
return (

    <div className='flex justify-between items-center bg-gray-900 text-white px-6 py-3 shadow-md'>

{/* logo */}
<h1 className='text-lg font-bold cursor-pointer' onClick={()=> navigate("/generate")}> 
    GenImage
</h1>

{/* Right side */}
<div className=' flex gap-4 items-center'>
    <span> Credits: {credits}</span>

<button
   onClick={()=>navigate("/profile")} className='px-3 py-1 bg-gray-700 rounded hover:bg-gray-600 transition' >
    Profile
   </button>

<button
   onClick={handleLogout} className='px-4 py-1 bg-red-600 rounded hover:bg-red-500 transition' >
    Logout
   </button>
</div>

    </div>
);

 }