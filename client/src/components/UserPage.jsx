import React from "react";
import axios from "axios";

export default class UserPage extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      posts: []
    };
  }

  componentDidMount() {
    axios
      .get(`http://localhost:5000/users/${this.props.match.params.id}`)
      .then(res => this.setState({ name: res.data.name }))
      .catch(err => console.log(err))
    axios
      .get(`http://localhost:5000/users/${this.props.match.params.id}/posts`)
      .then(res => this.setState({ posts: res.data }))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        <h2>{this.state.name}</h2>
        {this.state.posts.map(el => {
          return <p>{el.text}</p>
        })}
      </div>
    );
  }
}
