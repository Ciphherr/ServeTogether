import api from "./axios";

export const registerForEvent = async (data) => {
  const response = await api.post("/api/register", data, {
    withCredentials: true, // ✅ VERY IMPORTANT
  });
  return response.data;
};

export const generateCertificate = async ({name ,event ,date ,certId})=>{
 try {
   const payload = {name ,event ,date ,certId}
   const response = await api.post("/api/certificates/generate", payload, {
     responseType: "blob",
     withCredentials : true,
   });
 
   return response.data;
 } catch (error) {
      console.error("Certificate data posting failed:", error)
      throw error
 }

};