import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from "./pages/Home";
import EditPost from "./pages/EditPost";
import PostDetail from "./pages/PostDetail";
import CreatePost from './pages/CreatePost';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/post/create' component={CreatePost} />
        <Route exact path={`/post/:id/edit`} component={EditPost} />
        <Route exact path={`/post/:id`} component={PostDetail} />
      </Switch>
    </Router>
  )

}

export default App;
