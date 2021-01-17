import React,{useState} from "react";
import styled from "styled-components";
import axios from "axios";

import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import {Completed,Loading} from "../components";
import {HOST} from "../services/config";

export default function Register({history}){

  const [foodInformation,setFoodInformtaion]=useState({name:"",location:"",foodType:""});
  const [registerd,setRegisterd]=useState(false);
  const [loading,setLoading]=useState(false);

  const handleLocationDropDown=(e)=>{
    setFoodInformtaion({...foodInformation,
      location:e.target.innerHTML.substring(0,1)==="신"?"신촌":e.target.innerHTML});
  }

  const handleFoodTypeDropDown=(e)=>{
    const {target:{innerHTML}}=e;
    if(innerHTML.substring(0,1)==="양") 
      setFoodInformtaion({...foodInformation,foodType:"양식"});
    else if(innerHTML.substring(0,1)==="회")
      setFoodInformtaion({...foodInformation,foodType:"일식"});
    else
      setFoodInformtaion({...foodInformation,foodType:innerHTML});
  }

  const handleInputChange=(e)=>{
    setFoodInformtaion({...foodInformation,name:e.target.value});
  }

  const handleRegisterButton=async()=>{
    setLoading(true);
    await axios
    .post(`${HOST}/register`,{
      "name":foodInformation.name,
      "category":foodInformation.foodType,
      "ewhaType":foodInformation.location
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
    <Menu >
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
    <Menu >
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

  const leftArrowIconStyle={
    display:"flex",
    alignItems:"center",
    width:"20%"
  }

  return(
    <>
    {loading && <Loading text="맛집 등록하는중..."/>}
      {!loading &&
        <>
          {registerd && <CWrapper><Completed/></CWrapper>}
          
          {!registerd && 
          <Wrapper>
              <Header>
                <i onClick={()=>history.goBack()} style={leftArrowIconStyle} class="fas fa-arrow-left"></i>
                <Title>맛집 추가</Title>
                <Button onClick={handleRegisterButton}>완료</Button>
              </Header>

              <Form>
                <Content>
                  <Label>가게명</Label>
                  <Input onChange={handleInputChange} placeholder="등록할 맛집의 이름을 입력해주세요"></Input>
                </Content>

                <Content>
                  <Dropdown overlay={menu} trigger={['click']}>
                    <Label>
                    음식종류 선택 <DownOutlined />
                    </Label>
                  </Dropdown>
                  {foodInformation.foodType}
                </Content>

                <Content>
                  <Dropdown overlay={location} trigger={['click']}>
                    <Label>
                    위치 선택 <DownOutlined />
                    </Label>
                  </Dropdown>
                  {foodInformation.location}
                </Content>
              </Form>
          </Wrapper>
          }
        </>
      }
    </>
    )
}

const Label=styled.h4`
  color:black;
`;

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

const Header=styled.div`
  width:90%;
  display: flex;
  justify-content: space-between;
  align-items:center;
  height:4rem;
`;

const Button=styled.button`
  width:3.8rem;
  padding:0.2rem;
  font-size:0.9rem;
  border: 3px solid #00462A;
  border-radius:1rem;
  outline:none;
  color: white;
  background-color:#00462A;
  cursor: pointer;
  font-family: 'Jua', sans-serif;
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
