import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { Link } from 'react-router-dom';

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
      return <span>Loading...</span>
    }

    if(isError) {
      return <span>Error: </span>;
    }

    return(
      <QueryClientProvider client={queryClient}>
        <ul>
          {data.items.map((post: Post) => (
          <li key={post.id}>
            <Link to={`post/${post.id}`}>
              <p>{post.title}</p>
              <p>{post.createdAt}</p>
            </Link>
          </li>
          ))}
        </ul>
        <Link to="/post/create"><button>Add</button></Link>
      </QueryClientProvider>
    )
}

export default Home;