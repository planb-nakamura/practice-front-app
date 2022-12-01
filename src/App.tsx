import React, { useState } from 'react';
import axios from "axios";
import './App.css';

function App() {
  const[posts, setPosts] = useState([]);
  //データ一覧
  axios
  .get('localhost:18080/v1/note')            
  .then(response => {
      setPosts(response.data);
      console.log(response.data);
  })                              
  .catch(() => {
      console.log('通信に失敗しました');
  });     
  return(
    <></>
  )

  //データ送信
  

}

export default App;
