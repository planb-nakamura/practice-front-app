import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import TitleForm from "../components/TitleForm";
import ContentForm from "../components/ContentForm";
import SubmitBtn from "../components/SubmitBtn";

const Middle = styled.div`
  text-align: center;
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
      .then(() => {
        history.push("/");
      });
  };

  return (
    <>
      <TitleForm
        placeholder="記事タイトルを入力"
        onChange={(e) => setTitle(e.target.value)}
      ></TitleForm>
      <ContentForm
        placeholder="記事本文を入力"
        onChange={(e) => setContent(e.target.value)}
      ></ContentForm>
      <Middle>
        <SubmitBtn buttonName="Add" onClick={() => postData()}></SubmitBtn>
      </Middle>
    </>
  );
}

export default CreatePost;
