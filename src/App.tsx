import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css';
import Home from "./pages/Home";
import EditPost from "./pages/EditPost";
import PostDetail from "./pages/PostDetail";
import CreatePost from './pages/CreatePost';

const queryClient = new QueryClient();


function App() {
  return (
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
