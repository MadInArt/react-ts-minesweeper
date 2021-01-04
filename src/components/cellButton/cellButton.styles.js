import styled from "styled-components";

export const CellButtonContainer = styled.div`
  width: 30px;
  height: 30px;
  border-width: 4px;
  border-style: solid;
  border-right-color: #7b7b7b;
  border-bottom-color: #7b7b7b;
  border-left-color: white;
  border-top-color: white;
  font-weight:bold;
  display: flex;
  align-items: center;
  justify-content: center;


  &:active {
    border-right-color: white;
    border-bottom-color: white;
    border-left-color: #7b7b7b;
    border-top-color: #7b7b7b;
  }
  span{
    margin-left: 2px;
    font-size:18px;
  }
`;
