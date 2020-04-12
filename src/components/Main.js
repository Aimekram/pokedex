import React, { Component } from "react";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
    };
  }

  async componentDidMount() {
    this.setState({loading: true})
    try {
        let data = await this.fetchData("https://pokeapi.co/api/v2/pokemon?limit=10")
        this.setState({ data: data.results, loading: false })
    } catch (error) {
        console.log(error)
    }
  }

  async fetchData(url) {
      try {
          let response = await fetch(url);
          let data = await response.json();
          console.log(data)
          return data;
      } catch (error) {
          console.log(error)
      }
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
