import React from "react";
import "./App.css";
import axios from "axios";
import { Route } from "react-router-dom";
import UserList from "./components/UserList.jsx";
import PostList from "./components/PostList.jsx";
import Nav from "./components/Nav.jsx";
import UserPage from "./components/UserPage";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
      posts: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/users")
      .then(res =>
        this.setState({
          users: res.data
        })
      )
      .catch(err => console.log(err));
    axios
      .get("http://localhost:5000/posts")
      .then(res =>
        this.setState({
          posts: res.data
        })
      )
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <Route path="/" component={Nav} />
        <Route
          exact path="/users"
          render={props => <UserList {...props} users={this.state.users} />}
        />
        <Route path="/users/:id" component={UserPage} />
        <Route
          path="/posts"
          render={props => <PostList {...props} posts={this.state.posts} />}
        />
      </div>
    );
  }
}

export default App;
