import React from "react";
import styled from "styled-components";

import Router from "./Router";
import {Footer} from "./components";

function App() {
  return (
    <Wrapper>
      <Router/>
      <Footer/>
    </Wrapper>
  );
}

const Wrapper=styled.div`
  display:flex;
  flex-direction:column;
  justify-content:space-between;
  width: 100%;
  max-width: 26rem;
  height:100vh;
  min-height: 100vh;
  margin:0 auto;
  font-family: 'Noto Sans KR', sans-serif;
  box-shadow : 0 0 1rem 0 rgba(0, 0, 0, 0.2);
`;

export default App;
