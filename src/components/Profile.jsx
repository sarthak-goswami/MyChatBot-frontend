import React, { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState({});
  const [loading,setLoading] = useState(true);
  const [convos,setConvos] = useState(0);
  const [TotalConvos,setTotalConvos] = useState(0);
  useEffect(()=>{
    const fetchProfile = async () => {
    

    const res = await fetch(`http://localhost:5000/user/profile`,{
      method:"GET",
      credentials: "include",
    });

    const data = await res.json();
    if(data.successfull){
      console.log(data)
      setLoading(false)    
      setUser(data.user);
      setConvos(data.convos);
      setTotalConvos(data.totalConvos)
      // console.log(data.user)
    }

  }
  
  fetchProfile();
  ;},[])
  
  console.log(user)
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-850 to-indigo-800 px-4 py-10 text-white">
      {loading ? <h1>loading</h1>:<div className="w-3/5 text-2xl rounded-2xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-md">
        <h1>Username : {user.username}</h1>
        
        <h1>Email : {user.email}</h1>
        <h1>ID : {user._id}</h1>
        <h1>Conversations : {convos}</h1>
        <h1>Total Conversations : {TotalConvos}</h1>
        </div>}
    </div>
  );
};

export default Profile;
