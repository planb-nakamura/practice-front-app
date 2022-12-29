import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import Home from "./pages/Home";
import EditPost from "./pages/EditPost";
import PostDetail from "./pages/PostDetail";
import CreatePost from "./pages/CreatePost";
import emotionReset from "emotion-reset";
import { Global, css } from "@emotion/react";
import Error404 from "./components/Error404";
import Header from "./components/Header";
import styled from "styled-components";

const queryClient = new QueryClient();

const Wrap = styled.div`
  max-width: 800px;
  margin: 80px auto 0 auto;
  position: relative;
`;

function App() {
  return (
    <>
      <Global
        styles={css`
          ${emotionReset}
          *, *::after, *::before {
            box-sizing: border-box;
            -moz-osx-font-smoothing: grayscale;
            -webkit-font-smoothing: antialiased;
          }
        `}
      />

      <QueryClientProvider client={queryClient}>
        <Header></Header>
        <Wrap>
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/post/create" component={CreatePost} />
              <Route exact path="/post/:id/edit" component={EditPost} />
              <Route exact path="/post/:id" component={PostDetail} />
              <Route exact path="*" component={Error404} />
            </Switch>
          </Router>
        </Wrap>
      </QueryClientProvider>
    </>
  );
}

export default App;
