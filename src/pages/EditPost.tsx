import { useState, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useQuery, useMutation, QueryClient } from "react-query";
import styled from "styled-components";
import axios from "axios";
import Loading from "../components/Loading";
import TitleForm from "../components/TitleForm";
import ContentForm from "../components/ContentForm";
import SubmitBtn from "../components/SubmitBtn";

const Middle = styled.div`
  text-align: center;
`;

type RouterParams = {
  id: string;
};

function EditPost() {
  const { id } = useParams<RouterParams>();
  const [title, setTitle] = useState<string>();
  const [content, setContent] = useState<string>();
  const history = useHistory();

  const fetchPost = async (id: string) => {
    const res = await fetch(`http://localhost:18080/v1/note/${id}`);
    return res.json();
  };

  const { isLoading } = useQuery("post", () => fetchPost(id), {
    onSuccess: (data) => {
      setTitle(data.title);
      setContent(data.content);
    },
  });

  const { mutate } = useMutation(
    () =>
      axios.put(`http://localhost:18080/v1/note/${id}`, {
        title,
        content,
      }),
    {
      onSuccess: () => {
        //ここでキャッシュ削除
        history.push("/");
      },
      onError: () => {
        alert("データ更新に失敗しました");
      },
    }
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <TitleForm
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      ></TitleForm>
      <ContentForm
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></ContentForm>
      <Middle>
        <SubmitBtn buttonName="Edit" onClick={() => mutate()}></SubmitBtn>
      </Middle>
    </>
  );
}

export default EditPost;
