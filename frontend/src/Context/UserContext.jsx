// context/UserContext.js
import axios from "axios"
import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [aiParameters, setAiParameters] = useState(null);
  const [categories,setCategories]=useState(null);
  const [loading, setLoading] = useState(true); // ✅ Add this
  const [incomeSources,setIncomeSources]=useState([]);
  const [PrimarySpendsLimits,setPrimarySpendsLimits]=useState(null);
  const [Expenses,setExpenses]=useState([]);
  const [allChats, setAllChats] = useState(null);
  

  useEffect(async() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");
    const savedAI = localStorage.getItem("AI");

    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
      setCategories(JSON.parse(savedUser).PrimarySpendsLimits.map(spend => spend.title));
      const fetchChats = async () => {
        try {
          const { data } = await axios.get("https://budgetly-back-k8l5.onrender.com/api/group/all", {
            headers: {
              Authorization: `Bearer ${savedToken}`,
            },
          });
          if (data) {
            setAllChats(data.chats);
            console.log("chats found");
            console.log(data.chats)
          }
        } catch (err) {
          console.log(err);
        }
      };
  
      fetchChats();
      try{
        const {data}=await axios.get("https://budgetly-back-k8l5.onrender.com/api/expense/get-all",{
          headers:{
            "Authorization":`Bearer ${savedToken}`
          }
        })
        if(data){
          setExpenses(data);
        }
      }
      catch(err){
        console.log("Error")
      }
  
      try{
        const {data}=await axios.get("https://budgetly-back-k8l5.onrender.com/api/users/all-income",{
          headers:{
            "Authorization":`Bearer ${savedToken}`
          }
        })
        if(data){
          console.log(data.incomeSources)
          setIncomeSources(data.incomeSources);
        }
      }
      catch(err){
        console.log(err);
      }
    }

    if (savedAI) {
      const data=JSON.parse(savedAI);
      setAiParameters(data);
      
    }

    

    setLoading(false);
  }, []);

  const login = async (userData, tokenData) => {
    setUser(userData);
    setToken(tokenData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", tokenData);
    setCategories(userData.PrimarySpendsLimits.map(spend => spend.title));
    console.log(userData)
    try{
      const {data}=await axios.get("https://budgetly-back-k8l5.onrender.com/api/expense/get-all",{
        headers:{
          "Authorization":`Bearer ${tokenData}`
        }
      })
      if(data){
        setExpenses(data);
      }
    }
    catch(err){
      console.log("Error")
    }

    try{
      const {data}=await axios.get("https://budgetly-back-k8l5.onrender.com/api/users/all-income",{
        headers:{
          "Authorization":`Bearer ${tokenData}`
        }
      })
      if(data){
        console.log(data.incomeSources)
        setIncomeSources(data.incomeSources);
      }
    }
    catch(err){
      console.log(err);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setAiParameters(null);
    localStorage.clear();
  };

  const setAiData = (data) => {
    console.log(typeof data)
    // If data is a string, parse it as JSON
    let aiData=data;
    // Destructure the expected fields from the JSON structure
    
  
    // Build parsed data object for your app
    
  
    // Save to localStorage and update your app state
    localStorage.setItem("AI", JSON.stringify(aiData));
    setAiParameters(aiData);
  };
  
  
  
  
  
  
  

  return (
    <UserContext.Provider
      value={{
        loading,
        user,
        setUser,
        setToken,
        token,
        aiParameters,
        setAiParameters,
        setAiData,
        login,
        logout,
        categories,
        setCategories,
        setExpenses,
        Expenses,
        setIncomeSources,
        incomeSources,
        setAllChats,
        allChats
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
