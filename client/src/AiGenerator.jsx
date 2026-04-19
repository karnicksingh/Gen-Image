import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from "./Navbar.jsx"
import Profile from "./Profile.jsx"

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

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8000/logout", {
        method: "POST",
        credentials: "include"
      });
      setCredits(0);
      setImage("");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar credits={credits} handleLogout={handleLogout} />

      <div className="flex flex-col items-center mt-12 px-4">

        <h4 className="text-3xl font-bold mb-6 text-center">
          AI Image Generator
        </h4>

        <input
          className="border border-gray-300 rounded px-4 py-2 w-80 outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <div className="mt-4">
          <button
            disabled={credits === 0}
            onClick={generateImage}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-2 rounded transition-colors"
          >
            Generate Image
          </button>
        </div>

        <div className="mt-8 w-full max-w-sm">
          {image && (
            <img src={image} alt="generated" className="w-full rounded-xl shadow-md" />
          )}
        </div>

      </div>
    </>
  )
}