import React, { Component } from "react";
import Pokemon from "./Pokemon"
import Pagination from "./Pagination";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
      displayedPage: 1,
    };
    this.fetchData = this.fetchData.bind(this)
    this.changePage = this.changePage.bind(this)
  }

  async componentDidMount() {
    this.setState({loading: true})
    try {
        let data = await this.fetchData("https://pokeapi.co/api/v2/pokemon?limit=100")
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

  changePage(number) {
    this.setState({displayedPage: number})
  }

  render() {
    const {data, loading} = this.state;
    const itemsPerPage = 5;
    const pageFirstItem = (this.state.displayedPage-1)*itemsPerPage;
    const dataOnPage = data.slice(pageFirstItem, pageFirstItem + itemsPerPage); 

    return (
        loading ? 
        <p>Loading...</p> :
        <main>
            <Pagination totalItems={data.length} itemsPerPage={itemsPerPage} changePage={this.changePage}/>
            <ul>
                {dataOnPage.map(item => 
                    <li key={item.name}><Pokemon fetchData={this.fetchData} url={item.url} /></li>)}
            </ul>
            <Pagination totalItems={data.length} itemsPerPage={itemsPerPage} changePage={this.changePage}/>
        </main>
    )
  }
}

export default Main;
