import React, { Component } from "react";
import Pokemon from "./Pokemon"

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
    };
    this.fetchData = this.fetchData.bind(this)
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
          return data;
      } catch (error) {
          console.log(error)
      }
  }

  render() {
    const {data, loading} = this.state;
    return (
        loading ? 
        <p>Loading...</p> :
        <main>
            <ul>
                {data.map(item => 
                    <li key={item.name}><Pokemon fetchData={this.fetchData} url={item.url}/></li>)}
            </ul>
        </main>
    )
  }
}

export default Main;
