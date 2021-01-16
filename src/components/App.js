import React from "react";
import styled from "styled-components";
import 'antd/dist/antd.css';

import Router from "../services/Router";
import {Footer} from ".";
import {LocationProvider,FoodTypeProvider} from "../services/EwhaContext";

function App() {
  return (
    <LocationProvider>
    <FoodTypeProvider> 
    <Wrapper>
      <RouterWrapper><Router/></RouterWrapper>
      <FooterWrapper><Footer/></FooterWrapper>
    </Wrapper>
    </FoodTypeProvider>
    </LocationProvider>
  );
}
const RouterWrapper=styled.div`
`;

const FooterWrapper=styled.div`
`;

const Wrapper=styled.div`
  display:flex;
  flex-direction:column;
  justify-content:space-between;
  width: 100%;
  max-width: 26rem;
  margin:0 auto;
  height:100vh;
  font-family: 'Jua', sans-serif;
  box-shadow : 0 0 1rem 0 rgba(0, 0, 0, 0.2);
`;

export default App;
