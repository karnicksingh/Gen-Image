import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from "./Navbar.jsx"
import { MdOutlineFileDownload } from "react-icons/md";
import { FiUser } from "react-icons/fi";

export default function Profile() {
  const [images, setImages] = useState([]);
  const [user, setUser] = useState(null);
  const API= import.meta.env.VITE_API_URL;
  console.log(API);
  useEffect(() => {
    fetchImage();
    fetchUser();
  }, [])

//   const handleDownload =async (url)=>{
//  try{
//  const response=await fetch(url);
//   const blob=await response.blob();
//   const blobUrl= window.URL.createObjectURL(blob);

//   const link = document.createElement('a');
//   link.href =blobUrl;
//   link.download="generated-image.png";

//   document.body.appendChild(link);
// link.click();
// link.remove();
// window.URL.revokeObjectURL(blobUrl);
//  }catch(err){
//   console.error("Download Failed,err");
//  }

  // }
//   const handleDownload =async (url)=>{
//  try{
//  const link = document.createElement('a');
// link.href =url;
// link.setAttribute("download","generated-image.png");
// link.setAttribute("target","_bkank");
// document.body.appendChild(link);
// link.click();
// document.body.removeChild(link);
//  }catch(err){
//   console.error("Download Failed,err");
//  }

//   }


  const fetchImage = async () => {
    try {
      const res = await fetch(`${API}/images`, {
        credentials: 'include',
      });

      const data = await res.json();
      console.log("Image Data", data);
      setImages(data);
    } catch (error) {
      console.log(error);
    }

  }
  const fetchUser = async () => {
    try {
      const res = await fetch(`${API}/profile`, {
        credentials: 'include',
      });

      const data = await res.json();
      console.log("User Data", data);
      setUser(data);
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen  bg-[#060810]  px-6 py-8 ">

        {/* profile header */}
        <div className='flex items-center justify-between bg-white/5 backdrop-blur-md  border border-white/10 rounded-2xl  px-6 py-4'>

          {/* left */}
          <div className='flex items-center gap-4'>
            <div className='w-15 h-15 rounded-xl  bg-green-500/10 border border-green-500/30 flex items-center justify-center '>
            <FiUser className='text-green-400' size={24} />
            </div>

            <div>
              <h2 className='text-lg  text-gray-400 font-semibold'>
                {user?.name}
              </h2>
              <p className='text-sm text-gray-400'>
                {user?.email}
              </p>
            </div>
          </div>
          {/* Right status */}
          <div className=' flex item-center gap-6'>


            {/* Generated */}
            <div className='text-center'>
              <p className='text-green-400 text-xl font-bold'>8</p>
              <p className='text-gray-400 text-gray'>Generated</p>
            </div>

            {/* divider line */}
            <div className='h-10 w-px bg-white/20'></div>

            {/* credits */}
            <div className='text-center'>
              <p className='text-green-400 text-xl font-bold'>5</p>
              <p className='text-gray-400 text-gray'>credits</p>
            </div>
          </div>

        </div>

<br></br>

        <h1 className="text-2xl  text-white font-bold mb-6">Your Creations</h1>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-6">
          {images.map((img) => (
            <div
              key={img._id}
              className=" relative rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md group hover:shadow-xl transition"
            >
              {/* image */}
              <img
                src={img.imageUrl}
                className="w-full aspect-square object-cover group-hover:scale-105 transition duration-300"
              />
              {/* OverLay */}

              <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transprent p-3'>


                <p className="text-xs text-gray-200 italic line-clamp-2">
                  {img.prompt}
                </p>

                <div className=' flex justify-between items-center mt-2'>
             <span className=' text-[10px] text-gray-400'>
              
             </span>

             <button  className='w-6 h-6 rounded-md bg-green-500/20 border border-green-500/40 flex items-center justify-center text-green-400 hover:bg-green-500/30'>
             <MdOutlineFileDownload />
             </button>

                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </>

  )


}