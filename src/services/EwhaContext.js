import React,{useState,createContext} from "react";

export const LocationContext=createContext();
export const LocationProvider=(props)=>{

  const [location,setLocation]=useState("");

  return(
    <LocationContext.Provider value={[location,setLocation]}>
      {props.children}
    </LocationContext.Provider>
  );

}

export const FoodTypeContext=createContext();
export const FoodTypeProvider=(props)=>{

  const [foodType,setFoodType]=useState([]);

  return(
  <FoodTypeContext.Provider value={[foodType,setFoodType]}>
    {props.children}
  </FoodTypeContext.Provider>
  );

}