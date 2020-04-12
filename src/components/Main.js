import React, { Component } from "react";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
    };
  }

  componentDidMount() {
      this.setState({loading: true})
    fetch("https://pokeapi.co/api/v2/pokemon?limit=10")
      .then((response) => response.json())
      .then((data) => this.setState({ data: data.results, loading: false }))
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const {data, loading} = this.state;
    console.log(data)
    return (
        loading ? 
        <p>Loading...</p> :
        <main>
            <ul>
                {data.map(item => 
                    <li key={item.name}>{item.name}</li>)}
            </ul>
        </main>
    )
  }
}

export default Main;
