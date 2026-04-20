import { useNavigate } from 'react-router-dom';
export default function Navbar({ credits }) {
    const navigate = useNavigate();
  
    const handleLogout = async () => {
        try {
          await fetch("http://localhost:8000/logout", {
            method: "POST",
            credentials: "include"
          });
        //   setCredits(0);
        //   setImage("");
          navigate("/");
        } catch (err) {
          console.log(err);
        }
      };

     
    return (

        <div className='flex justify-between items-center bg-[#0a0c10] text-white px-6 py-3 border-b border-white/[0.13]'>

            {/* logo */}
            <h1 className='text-lg font-semibold cursor-pointer hover:text-green-400' onClick={() => navigate("/generate")}>
                GenImage
            </h1>

            {/* Right side */}
            <div className='flex items-center gap-3'>

            
            <div className=' flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-green-500/10 border border-green-500/20'>
                <span className='text-sm text-green-400  font-semibold '>{credits}</span>
                <span className='text-xs text-gray-400   '> credits</span>

            </div>

            {/* <button
                onClick={() => navigate("/gallery")} className='px-3 py-1.5 bg-white/10  text-gray-200 rounded-md hover:bg-white/20 transition' >
                Gallery
            </button> */}
            <button
                onClick={() => navigate("/profile")} className='px-3 py-1.5 bg-white/10  text white rounded-md hover:bg-white/20 transition' >
                Profile
            </button>

            <button
                onClick={handleLogout} className=' px-3 py-1.5 rounded-md text-sm font-medium bb-red-500/10 text-red-400 border  border-red-500/20 hover:bg-red-500/20 transition' >
                Logout
            </button>
            </div>
        </div>
    
);

}