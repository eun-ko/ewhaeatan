import React,{useState} from "react";
import styled from "styled-components";
import axios from "axios";

import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import {Completed,Loading} from "../components";

export default function Register({history}){

  const [information,setInformation]=useState({name:"",location:"",foodType:""});
  const [registerd,setRegisterd]=useState(false);
  const [loading,setLoading]=useState(false);

  const handleLocationDropDown=(e)=>{
    setInformation({...information,
      location:e.target.innerHTML.substring(0,1)==="신"?"신촌":e.target.innerHTML});
  }

  const handleFoodTypeDropDown=(e)=>{
    const {target:{innerHTML}}=e;
    if(innerHTML.substring(0,1)==="양") 
      setInformation({...information,foodType:"양식"});
    else if(innerHTML.substring(0,1)==="회")
      setInformation({...information,foodType:"일식"});
    else
      setInformation({...information,foodType:innerHTML});
  }

  const handleInputChange=(e)=>{
    setInformation({...information,name:e.target.value});
  }

  const handleRegisterButton=async()=>{
    console.log(information.name);
    console.log(information.foodType);
    console.log(information.location);
    setLoading(true);
    await axios
    .post("https://ewha-plate.herokuapp.com/register",{
      "name":information.name,
      "category":information.foodType,
      "ewhaType":information.location
    },{
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(({data})=>{
      console.log(data.success);
      if(data.success){
        setRegisterd(true);
        setLoading(false);
      }
      else
        setRegisterd(false);
    }
    )
  }

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <Item onClick={handleFoodTypeDropDown}>한식</Item>
      </Menu.Item>
      <Menu.Item key="1">
        <Item onClick={handleFoodTypeDropDown}>분식</Item>
      </Menu.Item>
      <Menu.Item key="2">
        <Item onClick={handleFoodTypeDropDown}>양식 • 아시안</Item>
      </Menu.Item>
      <Menu.Item key="3">
        <Item onClick={handleFoodTypeDropDown}>회 • 돈까스 • 일식</Item>
      </Menu.Item>
      <Menu.Item key="4">
        <Item onClick={handleFoodTypeDropDown}>중식</Item>
        </Menu.Item>
      <Menu.Item key="5">
        <Item onClick={handleFoodTypeDropDown}>패스트푸드</Item>
      </Menu.Item>
    </Menu>
  );

  const location = (
    <Menu>
      <Menu.Item key="0">
        <Item onClick={handleLocationDropDown}>정문</Item>
      </Menu.Item>
      <Menu.Item key="1">
        <Item onClick={handleLocationDropDown}>후문</Item>
      </Menu.Item>
      <Menu.Item key="2">
        <Item onClick={handleLocationDropDown}>신촌 부근, 신촌</Item>
      </Menu.Item>

    </Menu>
  );

  return(
    <>
    {loading && <Loading text="맛집 등록하는중..."/>}
    {!loading &&
    <>
    {registerd && <CWrapper><Completed/></CWrapper>}
    {!registerd && 
      <Wrapper>
      <Header>
        <i onClick={()=>history.goBack()} style={{display:"flex", alignItems:"center", width:"20%"}} class="fas fa-arrow-left"></i>
        <Title>맛집 추가</Title>
        <Button onClick={handleRegisterButton}>완료</Button>
      </Header>

      <Form>
        <Content>
        <h4>가게명</h4>
        <Input onChange={handleInputChange} placeholder="등록할 맛집의 이름을 입력해주세요"></Input>
        </Content>

        <Content>
        <Dropdown overlay={menu} trigger={['click']}>
          <h4 style={{color:"black"}}  >
           음식종류 선택 <DownOutlined />
          </h4>
        </Dropdown>
        → {information.foodType}
        </Content>

        <Content>
        <Dropdown overlay={location} trigger={['click']}>
          <h4 style={{color:"black"}}  >
           위치 선택 <DownOutlined />
          </h4>
        </Dropdown>
        → {information.location}
        </Content>
      </Form>
    </Wrapper>}
    </>}
    </>

    )
}

const Item=styled.button`
  width:100%;
  display:flex;
  justify-content:flex-start;
  outline:none;
  border:none;
  background:none;
  font-family: 'Noto Sans KR', sans-serif;
  &:hover{
    color:rgb(7, 94, 59);
  }
  cursor:pointer;
`;

const Content=styled.div`
  padding:1rem;
  border-bottom:0.1rem solid rgba(0,0,0,0.1);
`;

const Form=styled.div`
  display:flex;
  flex-direction:column;
  width:100%;
  border-top:0.7rem solid #f2f2f2;
`;

const Input=styled.input`
  width:80%;
  box-shadow : 0rem 0rem 0.5rem 0rem rgba(0, 0, 0, 0.15);
  border:none;
  outline:none;
  padding:0.3rem;
`;

const Header=styled.header`
  width:90%;
  display: flex;
  justify-content: space-between;
  align-items:center;
  height:4rem;
`;

const Button=styled.button`
  width:3.3rem;
  font-size:0.8rem;
  border: 3px solid #00462A;
  border-radius:1rem;
  outline:none;
  color: white;
  background-color:#00462A;
  cursor: pointer;
  font-family: 'Noto Sans KR', sans-serif;
`;

const Title=styled.div`
  width:30%;
  font-size:1.1rem;
  font-weight:600;
`;

const Wrapper=styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  width:100%;
`;

const CWrapper=styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  width:100%;
  height:90vh;
`;
