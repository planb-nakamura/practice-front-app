import { RefObject } from "react";
import styled from "styled-components";

const Input = styled.input`
  width: 100%;
  padding: 20px;
  font-size: 120%;
  border: 3px solid #dcdcdc;
  box-sizing: border-box;
`;

const TitleForm = (props: {
  placeholder?: string;
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <Input
      placeholder={props.placeholder}
      value={props.value}
      onChange={(e) => props.onChange(e)}
    ></Input>
  );
};

export default TitleForm;
