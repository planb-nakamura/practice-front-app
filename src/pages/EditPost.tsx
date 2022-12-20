import { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import Loading from "../components/Loading";
import styled from "styled-components";
import axios from "axios";

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
    <Div>
      <form>
        <Input value={title} onChange={(e) => setTitle(e.target.value)}></Input>
      </form>
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></Textarea>
      <Middle>
        <Submit onClick={() => mutate()}>Edit</Submit>
      </Middle>
    </Div>
  );
}

export default EditPost;
