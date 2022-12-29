import styled from "styled-components";

const Submit = styled.button`
  color: #fff;
  text-decoration: none;
  font-weight: bold;
  background: #000;
  border: 2px solid #000;
  border-radius: 5px;
  padding: 15px 20px;
  margin-top: 10px;
  width: 30%;
  &:hover {
    background: #fff;
    color: #000;
    transition: background-color 0.5s ease-in;
  }
`;

const SubmitBtn = (props: {
  buttonName: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  return <Submit onClick={props.onClick}>{props.buttonName}</Submit>;
};

export default SubmitBtn;
