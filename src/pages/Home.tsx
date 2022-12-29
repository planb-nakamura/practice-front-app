import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Loading from "../components/Loading";
import Button from "../components/Button";

const Article = styled.li`
  height: 100px;
  list-style: none;
  border: 3px solid #f0ddc3;
  background-color: #f7d0a9;
  border-radius: 5px;
  margin-top: 50px;
`;

const Flame = styled.div`
  justify-content: space-between;
  align-items: center;
  position: relative;
  height: 100%;
`;

const Left = styled.p`
  position: absolute;
  padding-left: 30px;
  top: 50%;
  left: 25%;
  width: 50%;
  text-align: center;
  display: inline-block;
  transform: translate(-50%, -50%);
  color: black;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Right = styled.p`
  position: absolute;
  top: 50%;
  left: 75%;
  width: 50%;
  text-align: center;
  display: inline-block;
  transform: translate(-50%, -50%);
  color: black;
`;

type Post = {
  //typeを定義する理由はコードを見るだけでapiからどういったレスポンスが来ているのか把握できるため。
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updateAt: string;
};

const fetchPosts = async () => {
  const res = await fetch("http://localhost:18080/v1/note"); //async,awaitを使わずにfetchだけだとpromiseオブジェクトが返ってくる
  return res.json();
};

function Home() {

  const { data, isError } = useQuery<{
    items: Post[];
    total: number;
  }>("posts", fetchPosts);

  if (!data) {
    return <Loading />;
  }

  if (isError) {
    return <span>データを取得できませんでした</span>;
  }

  return (
    <>
      <ul>
        {data.items.map((post: Post) => (
          <Article key={post.id}>
            <Link to={`post/${post.id}`}>
              <Flame>
                <Left>{post.title}</Left>
                <Right>{post.createdAt.slice(0, -14).replace(/-/g, "/")}</Right>
              </Flame>
            </Link>
          </Article>
        ))}
      </ul>
      <Link to="/post/create">
        <Button buttonName="Add"></Button>
      </Link>
    </>
  );
}

export default Home;