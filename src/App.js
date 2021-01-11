import React from "react";
import styled from "styled-components";
import 'antd/dist/antd.css';

import Router from "./Router";
import {Footer} from "./components";
import {LocationProvider,FoodTypeProvider} from "./EwhaContext";

function App() {
  return (
    <LocationProvider>
    <FoodTypeProvider> 
    <Wrapper>
      <Router/>
      <Footer/>
    </Wrapper>
    </FoodTypeProvider>
    </LocationProvider>
  );
}

const Wrapper=styled.div`
  display:flex;
  flex-direction:column;
  justify-content:space-between;
  width: 100%;
  max-width: 26rem;
  min-height: 100vh;
  margin:0 auto;
  font-family: 'Noto Sans KR', sans-serif;
  box-shadow : 0 0 1rem 0 rgba(0, 0, 0, 0.2);
`;

export default App;
