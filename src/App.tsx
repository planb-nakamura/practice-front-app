import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css';
import Home from "./pages/Home";
import EditPost from "./pages/EditPost";
import PostDetail from "./pages/PostDetail";
import CreatePost from './pages/CreatePost';
import emotionReset from 'emotion-reset';
import { Global, css } from '@emotion/react';
import Header from './components/Header';

const queryClient = new QueryClient();


function App() {
  return (
    <>
    <Global styles={css`
        ${emotionReset}

        *, *::after, *::before {
          box-sizing: border-box;
          -moz-osx-font-smoothing: grayscale;
          -webkit-font-smoothing: antialiased;
          font-smoothing: antialiased;
        }
      `} />
    {/* <Header /> */}
    <Router>
      <Switch>
      <QueryClientProvider client={queryClient}>
        <Route exact path='/' component={Home} />
        <Route exact path='/post/create' component={CreatePost} />
        <Route exact path='/post/:id/edit' component={EditPost} />
        <Route exact path='/post/:id' component={PostDetail} />
      </QueryClientProvider>
      </Switch>
    </Router>
    </>

    // <Router>
    // <Routes>
    // <QueryClientProvider client={queryClient}>
    //   <Route path='/' element={<Home />} />
    //   <Route path='/post/create' element={<CreatePost />} />
    //   <Route path='/post/:id/edit' element={<EditPost />} />
    //   <Route path='/post/:id' element={<PostDetail />} />
    // </QueryClientProvider>
    // </Routes>
    // </Router>
  )
}

export default App;
