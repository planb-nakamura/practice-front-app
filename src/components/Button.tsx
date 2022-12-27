import styled from "styled-components";

const Btn = styled.button`
  position: fixed;
  right: 0;
  top: 18px;
  display: inline-flex;
  background: #fff;
  border: 2px solid #2a82a3;
  border-radius: 70px;
  color: #2a82a3;
  padding: 10px 20px 10px;
  margin-right: 10px;
  text-align: center;
  font-weight: bold;
  font-size: 120%;
  justify-content: center;
  align-items: center;
  transition: background-color 0.5s ease-in;
  &:nth-child(n + 2) {
    right: 100px;
  }
  &:hover {
    background: #2a82a3;
    color: #fff;
    border: 2px solid #fff;
  }
`;

const Button = (props: {
    buttonName: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
    return(
        <Btn onClick={props.onClick}>{props.buttonName}</Btn>
    )
}

export default Button;