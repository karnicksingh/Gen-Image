import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from "./Navbar.jsx"


export default function AiGenerator() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");
  const [credits, setCredits] = useState(0);

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const res = await fetch("http://localhost:8000/profile", {
          credentials: "include"
        });
        console.log("fetching profile");
        const data = await res.json();
        console.log("profile response", data);
        setCredits(data.credits);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCredits();
  }, []);

  const generateImage = async () => {
    try {
      const res = await fetch("http://localhost:8000/generate", {
        method: "post",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setImage(data.imageUrl);
      setCredits(data.creditsLeft);
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  // const handleLogout = async () => {
  //   try {
  //     await fetch("http://localhost:8000/logout", {
  //       method: "POST",
  //       credentials: "include"
  //     });
  //     setCredits(0);
  //     setImage("");
  //     navigate("/");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <>
      <Navbar credits={credits}  />

      <div className=" min-h-screen bg-[#060810]  flex items-center justify-center ">

        <div className='w-full max-w-md p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shawdo-xl'>
          {/* {Title} */}
          <h4 className="text-xl text-white font-semibold  mb-2 ">
            AI Image Generator
          </h4>

          <p className='text-sm text-gray-400 mb-4'>
            Describe anything. Watch it Appear
          </p>

          {/* Input */}
          <input
            className=" w-full border border-gray-300 rounded-lg bg-transparent border border-green-500/30 text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 px-3 py-2 "
            placeholder="Enter prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />


          <div className="mt-4">
            <button
              disabled={credits === 0}
              onClick={generateImage}
              className=" w-full mt-4 py-2 rounded-lg bg-green-500 text-black font-semibold hover bg-blue-600 hover: bg-green-500 disabled:bg-gray-3400 disabled:cursor-not-allowed"
            >
              Generate Image
            </button>
          </div>

          <div
            className={`mt-6 rounded-lg overflow-hidden 
  ${image ? "border border-green-500/20" : ""}`}
          >
            {image ? (
              <img
                src={image}
                alt="generated"
                className="w-full object-cover"
              />
            ) : (
              <div className="h-52 flex items-center justify-center text-gray-500">
                Generated image appears here
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}