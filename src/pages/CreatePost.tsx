import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const Div = styled.div`
  width: 50%;
  margin: 0 auto;
`;

const Middle = styled.div`
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  margin-top: 50px;
  padding: 20px;
  font-size: 120%;
  border: 3px solid #dcdcdc;
  box-sizing: border-box;
`;

const Textarea = styled.textarea`
  width: 100%;
  margin-top: 50px;
  padding: 20px;
  font-size: 120%;
  min-height: 400px;
  resize: none;
  border: 3px solid #dcdcdc;
  box-sizing: border-box;
`;

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
    -webkit-transition: background-color 0.5s ease-in;
  }
`;

function CreatePost() {
  const [title, setTitle] = useState<string>();
  const [content, setContent] = useState<string>();
  const history = useHistory();

  const postData = () => {
    axios
      .post("http://localhost:18080/v1/note", {
        title,
        content,
      })
      .then((res) => {
        console.log(res);
        window.location.href = "http://localhost:3000";
        history.push("/");
      });
  };

  return (
    <Div>
      <form>
        <Input
          placeholder="記事タイトルを入力"
          onChange={(e) => setTitle(e.target.value)}
        ></Input>
      </form>
      <Textarea
        placeholder="記事本文を入力"
        onChange={(e) => setContent(e.target.value)}
      ></Textarea>
      <Middle>
        <Submit onClick={() => postData()}>Add</Submit>
      </Middle>
    </Div>
  );
}

export default CreatePost;
