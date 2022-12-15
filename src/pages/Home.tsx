import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import emotionReset from 'emotion-reset';
import { Global, css } from '@emotion/react';
import Loading from '../components/Loading';


const Button = styled.button`
  position: fixed;
  bottom: 10px; 
  right: 10px;
  width: 60px;
	height: 38px;
	background: #FFF;
	border: 2px solid #2a82a3;
	-moz-border-radius: 70px;
	-webkit-border-radius: 70px;
	color: #2a82a3;
	padding: 42px 30px 20px;
	display: block;
	text-align: center;
	font-weight: bold;
	font-size: 120%;
	-webkit-transition: background-color 0.5s ease-in;
  &:hover{
    background: #2a82a3;
	  color: #FFF;
	  border: 2px solid #FFF;
  }
`

const Article = styled.li`
  height: 100px;
  list-style: none;
  border: 3px solid #f0ddc3;
  background-color: #f7d0a9;
  border-radius: 5px;
  width: 50%;
  margin: 0 auto;
  margin-top: 50px;
`

const Flame = styled.div`
  justify-content: space-between;
  align-items: center;
  position: relative;
  height: 100%;
`

const Left = styled.p`
  position: absolute;
  top: 50%;
  left: 25%;
  width: 50%;
  text-align: center;
  display: inline-block;
  transform : translate(-50%,-50%);
  color: black;
`

const Right = styled.p`
  position: absolute;
  top: 50%;
  left: 75%;
  width: 50%;
  text-align: center;
  display: inline-block;
  transform : translate(-50%,-50%);
  color: black;
`

type Post = {//typeを定義する理由はコードを見るだけでapiからどういったレスポンスが来ているのか把握できるため。
    id: string;
    title: string;
    content: string;
    createdAt: string;
    updateAt: string;
  }

const queryClient = new QueryClient();

const fetchPosts = async () => {
  const res = await fetch('http://localhost:18080/v1/note');//async,awaitを使わずにfetchだけだとpromiseオブジェクトが返ってくる
  console.log(res);
  return res.json();
};

function Home(){
    const { data, isLoading, isError, error } = useQuery('posts', fetchPosts);

    if (isLoading) {
      return <Loading/>
    }

    if(isError) {
      return <span>Error: </span>;
    }

    return(
      <QueryClientProvider client={queryClient}>
        <ul>
          {data.items.map((post: Post) => (
          <Article key={post.id}>
            <Link to={`post/${post.id}`}>
              <Flame>
              <Left>{post.title}</Left>
              <Right>{post.createdAt}</Right>
              </Flame>
            </Link>
          </Article>
          ))}
        </ul>
        <Link to="/post/create"><Button>Add</Button></Link>
      </QueryClientProvider>
    )
}

export default Home;