import React,{useState,useEffect} from "react";
import styled from "styled-components";
import axios from "axios";

import {SearchBar,Loading,RestaurantList} from "../components";

export default function List({history}){

  const [loading,setLoading]=useState(true);

  //for searched data
  const [searchKeyword,setSearchKeyword]=useState();
  const [searchResult,setSearchResult]=useState([]);

  //for filtered data
  const [foodDetailList,setFoodDetailList]=useState([]);

  /* array that stores filtered location/foodtype to send POST requests */
  const [selectedLocationList,setSelectedLocationList]=useState([]);
  const [selectedFoodTypeList,setSelectedFoodTypeList]=useState([]);

  useEffect(()=>{
    getFullListByGET(); //setFoodDetailList 
    getAllListByPOST(); //setSearchResult
  },[]);

  useEffect(()=>{
    setSearchResult(filterBySearchKeyword(searchKeyword,foodDetailList));
  },[searchKeyword]); 

  useEffect(()=>{
    getFilteredList();
  },[selectedFoodTypeList,selectedLocationList]);

  const handleRegisterButton=()=>{
    history.push("/register");
  }

  const getFullListByGET=async()=>{
    await axios.get('https://ewha-plate.herokuapp.com/list/all')
    .then(({data})=>{
      setFoodDetailList(data);
      setLoading(false);
    })
    .catch((err)=>{
      console.log(err);
    });
  }

  const checkFoodTypeSelected=(food)=>{
    if(selectedFoodTypeList.includes(food)) return true;
    else return false;
  }

  const checkLocationSelected=(location)=>{
    if(selectedLocationList.includes(location)) return true;
    else return false
  }

  const getAllListByPOST=async()=>{
    await axios.post('https://ewha-plate.herokuapp.com/list',{
      "categories":[],
      "ewhaTypes":[]
    },{
      headers:{
      'Content-Type': 'application/json'
    }
  })
    .then(({data})=>{
      setSearchResult(data);
    })
    .catch((err)=>{
      console.log(err);
    });
  }

  const filterBySearchKeyword=(searchKeyword,foodDetailList)=>{
    return foodDetailList.filter((foodDetail)=>{
      if(foodDetail.name.includes(searchKeyword)){
        return foodDetail;
      }
      else{
        return null;
      };
    });
  }

  const getFilteredList=async()=>{
    await axios.post('https://ewha-plate.herokuapp.com/list',{
      "categories":selectedFoodTypeList,
      "ewhaTypes":selectedLocationList
    },{
      headers:{
      'Content-Type': 'application/json'
    }
  })
    .then(({data})=>{
      setFoodDetailList(data);
      setSearchResult(data);
    })
    .catch((err)=>{
      console.log(err);
    });
  }

  const addFoodTypes=(foodType)=>{
    setSelectedFoodTypeList([...selectedFoodTypeList,foodType]);
  }

  const deleteFoodTypes=(foodType)=>{
    setSelectedFoodTypeList(selectedFoodTypeList.filter(food=>food!==foodType));
  }

  const addLocation=(location)=>{
    setSelectedLocationList([...selectedLocationList,location]);
  }

  const deleteLocation=(location)=>{
    setSelectedLocationList(selectedLocationList.filter(loc=>loc!==location));
  }

  const checkFoodState=(food)=>{
    checkFoodTypeSelected(food) ? deleteFoodTypes(food) : addFoodTypes(food);
  }

  const checkLocationState=(location)=>{
    checkLocationSelected(location) ? deleteLocation(location) : addLocation(location);
  }

  const handleButtonClick=(event)=>{

    const {target:{innerText}}=event;

    if(innerText==="한식") 
      checkFoodState("한식");
    else if(innerText==="분식")
      checkFoodState("분식");
    else if(innerText.substring(0,1)==="양")
      checkFoodState("양식");
    else if(innerText.substring(0,1)==="일")
      checkFoodState("일식");
    else if(innerText==="중식")
      checkFoodState("중식");
    else if(innerText==="패스트푸드")
      checkFoodState("패스트푸드");
    else if(innerText==="정문")
      checkLocationState("정문");
    else if(innerText==="후문")
      checkLocationState("후문");
    else if(innerText==="신촌")
      checkLocationState("신촌");
  }

  return(

    <>
      {loading && <Loading text="전체 맛집 목록 가져오는중..."/>}
      {!loading && 
      <>
        <Wrapper>
          <FilterWrapper>
          <Filter>
            <FilterName>위치</FilterName>
            <FilterButton selected={checkLocationSelected("정문")} onClick={handleButtonClick}>정문</FilterButton>
            <FilterButton selected={checkLocationSelected("후문")} onClick={handleButtonClick}>후문</FilterButton>
            <FilterButton selected={checkLocationSelected("신촌")} onClick={handleButtonClick}>신촌</FilterButton>
          </Filter>
          <Filter>
            <FilterName>음식 종류</FilterName>
            <FilterButton selected={checkFoodTypeSelected("한식")} onClick={handleButtonClick}>한식</FilterButton>
            <FilterButton selected={checkFoodTypeSelected("분식")} onClick={handleButtonClick}>분식</FilterButton>
            <FilterButton selected={checkFoodTypeSelected("양식")} onClick={handleButtonClick}>양식</FilterButton>
            <FilterButton selected={checkFoodTypeSelected("일식")} onClick={handleButtonClick}>일식</FilterButton>
            <FilterButton selected={checkFoodTypeSelected("중식")} onClick={handleButtonClick}>중식</FilterButton>
            <FilterButton selected={checkFoodTypeSelected("패스트푸드")} onClick={handleButtonClick}>패스트푸드</FilterButton>
          </Filter>
          <SearchBar {...{setSearchKeyword}}/>
          </FilterWrapper>
          <RestaurantList {...{searchResult}}/>
        </Wrapper>
        <FloatingButton onClick={handleRegisterButton}><i class="fas fa-pen"></i></FloatingButton>
      </>
      }
    </>
    
  )
}

const Wrapper=styled.div`
  display:flex;
  flex-direction:column;
  width:100%;
`;

const FilterName=styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  margin-right:0.5rem;
`;

const FilterWrapper=styled.div`
  padding:0.5rem 0;
  width:100%;
  position:sticky;
  z-index:100;
  top:0;
  background-color:rgba(255,255,255,0.9);
`;

const Filter=styled.div`
  display:flex;
  width:100%;
  text-align:left;
  height:2.3rem;
  margin-top:0.3rem;
  margin-left:1rem;
`;

const FilterButton=styled.button`
  display:flex;
  justify-content:center;
  align-items:center;
  outline:none;
  border:0.1rem solid rgba(0,0,0,0.1);
  border-radius:0.8rem;
  background:${props=>props.selected? "rgba(0,0,0,0.2)": "none"};
  color:${props=>props.selected? "white" : "inherit"};
  cursor:pointer;
  font-size:0.8rem;
  font-family: 'Noto Sans KR', sans-serif;
  margin:0.1rem;
`;

const FloatingButton=styled.button`
  &:hover {
    opacity:0.75;
    box-shadow : 0rem 0rem 1.5rem 0rem rgba(0, 0, 0, 0.4);
  }
  position:fixed;
  bottom:1.3rem;
  right:1rem;
  margin-right:1rem;
  box-shadow : 0rem 0rem 1rem 0rem rgba(0, 0, 0, 0.2);
  display:flex;
  justify-content:center;
  align-items:center;
  font-weight:600;
  width:3.3rem;
  height:3.3rem;
  font-size:1rem;
  border: 3px solid #00462A;
  border-radius:50%;
  margin-bottom:1rem;
  color: white ;
  background-color:#00462A;
  cursor: pointer;
  outline:none;
  font-family: 'Noto Sans KR', sans-serif;
  `;