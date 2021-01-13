import React,{useState,useEffect} from "react";
import styled from "styled-components";
import axios from "axios";

import {SearchBar,Loading,RestaurantList} from "../components";

export default function List({history}){

  const [foodDetailList,setFoodDetailList]=useState([]);
  const [loading,setLoading]=useState(true);
  const [searchKeyword,setSearchKeyword]=useState();
  const [searchResult,setSearchResult]=useState([]);
  const [locationList,setLocationList]=useState([]);
  const [foodTypeList,setFoodTypeList]=useState([]);

  const [foodType,setFoodType]=useState({"kor":false,"school":false,"west":false,"jap":false,"chi":false,"fast":false});
  const [location,setLoation]=useState({"front":false,"back":false,"sinchon":false});

  useEffect(()=>{
    getFullListByGET(); //setFoodDetailList 
    getAllListByPOST(); //setSearchResult
  },[]);

  useEffect(()=>{
    setSearchResult(filterBySearchKeyword(searchKeyword,foodDetailList));
  },[searchKeyword]); //foodDetailList도 dependency에 추가하면 searchResult.length가 처음 렌더링 후 0이 됨

  useEffect(()=>{
    getFilteredList();
    console.log()
  },[foodTypeList,locationList]);

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
      "categories":foodTypeList,
      "ewhaTypes":locationList
    },{
      headers:{
      'Content-Type': 'application/json'
    }
  })
    .then(({data})=>{
      console.log(data);
      setFoodDetailList(data);
    })
    .catch((err)=>{
      console.log(err);
    });
  }

  const addFoodTypes=(foodType)=>{
    if(foodType==="한식") setFoodTypeList([...foodTypeList,foodType]);
    else if(foodType==="분식") setFoodTypeList([...foodTypeList,foodType]);
    else if(foodType==="양식") setFoodTypeList([...foodTypeList,foodType]);
    else if(foodType==="일식") setFoodTypeList([...foodTypeList,foodType]);
    else if(foodType==="중식") setFoodTypeList([...foodTypeList,foodType]);
    else if(foodType==="패스트푸드") setFoodTypeList([...foodTypeList,foodType]);
  }

  const deleteFoodTypes=(foodType)=>{
    if(foodType==="한식") setFoodTypeList(foodTypeList.filter(food=>food!==foodType));
    else if(foodType==="분식") setFoodTypeList(foodTypeList.filter(food=>food!==foodType));
    else if(foodType==="양식") setFoodTypeList(foodTypeList.filter(food=>food!==foodType));
    else if(foodType==="일식") setFoodTypeList(foodTypeList.filter(food=>food!==foodType));
    else if(foodType==="중식") setFoodTypeList(foodTypeList.filter(food=>food!==foodType));
    else if(foodType==="패스트푸드") setFoodTypeList(foodTypeList.filter(food=>food!==foodType));
  }

  const addLocation=(location)=>{
    if(location==="정문") setLocationList([...locationList,location]);
    else if(location==="후문") setLocationList([...locationList,location]);
    else if(location==="신촌") setLocationList([...locationList,location]);
  }

  const deleteLocation=(location)=>{
    if(location==="정문") setLocationList(locationList.filter(loc=>loc!==location));
    else if(location==="후문") setLocationList(locationList.filter(loc=>loc!==location));
    else if(location==="신촌") setLocationList(locationList.filter(loc=>loc!==location));
  }


  const handleButtonClick=(event)=>{

    const {target:{innerText}}=event;

    if(innerText==="한식") {
      if(foodType.kor) {setFoodType({...foodType,"kor":false}); deleteFoodTypes("한식");}
      else {setFoodType({...foodType,"kor":true}); addFoodTypes("한식");}
    }
    else if(innerText==="분식"){
      if(foodType.school) {setFoodType({...foodType,"school":false}); deleteFoodTypes("분식");}
      else {setFoodType({...foodType,"school":true}); addFoodTypes("분식");}
    }
    else if(innerText.substring(0,1)==="양"){
      if(foodType.west) {setFoodType({...foodType,"west":false}); deleteFoodTypes("양식");}
      else {setFoodType({...foodType,"west":true}); addFoodTypes("양식");}
    }
    else if(innerText.substring(0,1)==="일"){
      if(foodType.jap){ setFoodType({...foodType,"jap":false}); deleteFoodTypes("일식")}
      else {setFoodType({...foodType,"jap":true}); addFoodTypes("일식")}
    }
    else if(innerText==="중식"){
      if(foodType.chi) {setFoodType({...foodType,"chi":false}); deleteFoodTypes("중식")}
      else {setFoodType({...foodType,"chi":true}); addFoodTypes("중식");}
    }
    else if(innerText==="패스트푸드"){
      if(foodType.fast) {setFoodType({...foodType,"fast":false}); deleteFoodTypes("패스트푸드");}
      else {setFoodType({...foodType,"fast":true}); addFoodTypes("패스트푸드");}
    }
    else if(innerText==="정문"){
      if(location.front) {setLoation({...location,"front":false}); deleteLocation("정문");}
      else {setLoation({...location,"front":true}); addLocation("정문");}
    }
    else if(innerText==="후문"){
      if(location.back) {setLoation({...location,"back":false}); deleteLocation("후문");}
      else {setLoation({...location,"back":true}); addLocation("후문");}
    }
    else if(innerText==="신촌"){
      if(location.sinchon) {setLoation({...location,"sinchon":false}); deleteLocation("신촌");}
      else {setLoation({...location,"sinchon":true}); addLocation("신촌");}
    }
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
          <FilterButton selected={location.front} onClick={handleButtonClick}>정문</FilterButton>
          <FilterButton selected={location.back} onClick={handleButtonClick}>후문</FilterButton>
          <FilterButton selected={location.sinchon} onClick={handleButtonClick}>신촌</FilterButton>
        </Filter>
        <Filter>
          <FilterName>음식 종류</FilterName>
          <FilterButton selected={foodType.kor} onClick={handleButtonClick}>한식</FilterButton>
          <FilterButton selected={foodType.school} onClick={handleButtonClick}>분식</FilterButton>
          <FilterButton selected={foodType.west} onClick={handleButtonClick}>양식</FilterButton>
          <FilterButton selected={foodType.jap} onClick={handleButtonClick}>일식</FilterButton>
          <FilterButton selected={foodType.chi} onClick={handleButtonClick}>중식</FilterButton>
          <FilterButton selected={foodType.fast} onClick={handleButtonClick}>패스트푸드</FilterButton>
        </Filter>
        <SearchBar {...{setSearchKeyword}}/>
        </FilterWrapper>
        <RestaurantList {...{foodDetailList}} {...{searchResult}} />
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