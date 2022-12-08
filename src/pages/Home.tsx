import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

type Post = {//typeを定義する理由はコードを見るだけでapiからどういったレスポンスが来ているのか把握できるため。
    id: string;
    title: string;
    content: string;
    createdAt: string;
    updateAt: string;
  }
  
type FindAllPostsResponse = {
    items: Post[];
    total: number;
}

function Home(){
    const[posts, setPosts] = useState<Post[]>([]);

    useEffect(() => { 
      axios
      .get<FindAllPostsResponse>('http://localhost:18080/v1/note')            
      .then(response => {
          setPosts(response.data.items);
          // console.log(response.data);
      })                              
      .catch(() => {
          alert('通信に失敗しました');
      }); 
    }, []);

    return(
      <>
        <ul>
          {posts.map((post) => (
            <>
                <li key={post.id}>
                    <Link to={`post/${post.id}`}>
                        <p>{post.title}</p>
                        <p>{post.createdAt}</p>
                    </Link>
                </li>
            </>
          ))}
        </ul>
        <Link to="/post/create"><button>Add</button></Link>
      </>
    )
}

export default Home;