// const { Router } = require("express");
// const routes = Router();
// const axios=require("axios");
// const auth = require("../middleware/auth.js");


// routes.post("/code/generate", async(req,res)=>{ 

// try{
//  const responce= await axios.post('https://openrouter.ai/api/v1/chat/completions',
//  { headers:{
//     Authorization: 'Bearer <OPENROUTER_API_KEY>',
//     'Content-Type': 'application/json',
//   }
// }
//  )
// }catch(error){
//   console.log(error)



// }



//     fetch('https://openrouter.ai/api/v1/chat/completions', {
//         method: 'POST',
//         headers: {
//           Authorization: 'Bearer <OPENROUTER_API_KEY>',
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           model: 'openai/gpt-5.2',
//           messages: [
//             {
//               role: 'user',
//               content: 'What is the meaning of life?',
//             },
//           ],
//         }),
//       });
      

// })