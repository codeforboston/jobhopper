import styled from 'styled-components';

export const ToolTipStyleDiv = styled.div`
  font-weight: 'bolder';
  width: 90vw;
  height: 10vh;
  margin: auto;
`;

export const SimpleFlexRow = styled.div`
  display: flex;
  flex: 0 1 fit-content;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow: hidden;
`;

export const SimpleFlexUnit = styled.div`
  flex: 0 1 fit-content;
  margin: 0;
  padding: 0 5px;
  white-space: normal;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  font-family: pt sans;
  font-weight: 400;
  font-size: 16px;
  color: black;
  width: 100%;
  height: 26px;
  margin: 0 5px;
`;

export const Title = styled.div`
  height: 5vh;
  font-family: PT Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 30px;
  color: #000000;
`;

export const Key = styled.div`
  display: block;
  font-family: PT Sans;
  font-weight: 400;
  line-height: 30px;
  text-align: left;
  margin: 2em;
  width: 30%;
  height: 50%;
`;

export const KeyTitle = styled.div`
  font-size: 18px;
`;

export const KeyList = styled.div`
  font-size: 14px;
`;

export const KeyExplanation = styled.div`
  font-size: 14px;
  line-height: 18px;
  padding: 5px;
  margin-top: 18px;
`;
