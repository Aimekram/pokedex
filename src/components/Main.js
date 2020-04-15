import React, { Component } from "react";
import Pokemon from "./Pokemon"
import Pagination from "./Pagination";
import Filter from "./Filter";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isFetched: false,
      displayedPage: 1,
      itemsPerPage: 10,
      filterValue: "",
    };
    this.fetchData = this.fetchData.bind(this)
    this.fetchMoreData = this.fetchMoreData.bind(this)
    this.getSinglePage = this.getSinglePage.bind(this)
    this.changePage = this.changePage.bind(this)
    this.handleFilterSubmit = this.handleFilterSubmit.bind(this)
    this.handleFilterChange = this.handleFilterChange.bind(this)
  }

  async componentDidMount() {
    try {
        const rawData = await this.fetchData("https://pokeapi.co/api/v2/pokemon?limit=50");
        const data = await this.fetchMoreData(rawData.results)
        this.setState({ data, isFetched: true });
        console.log(this.state);
    } catch (error) {
        console.log(error);
    }
  }

  //universal function to make API fetch
  async fetchData(url) {
      try {
          let response = await fetch(url);
          let data = await response.json();
          return data;
      } catch (error) {
          console.log(error)
      }
  }

  //get specific data about each Pokemon for all Pokemons
    async fetchMoreData(data) {
    for (const [index, item] of data.entries()) {
      try {
        let moreData = await this.fetchData(item.url);
        data[index].moreData = moreData;
      } catch (error) {
        console.log(error);
      }
    }
    return data;
  }

   getSinglePage() {
    const {data, displayedPage, itemsPerPage} = this.state;
    const pageFirstItem = (displayedPage-1)*itemsPerPage;
    const singlePageData = data.slice(pageFirstItem, pageFirstItem + itemsPerPage);
    return singlePageData; 
  }

  //change page on pagination list
  changePage(number) {
    this.setState({displayedPage: number})
  }

  //filter data
  handleFilterSubmit(e) {
    e.preventDefault();
    console.log(this.state.filterValue);
    // const filteredData = this.state.data.filter(item => item.name === this.state.filterValue)
    // this.setState({data: filteredData});
  }

  handleFilterChange(e) {
    this.setState({filterValue: e.target.value});
  }

  render() {
    const {data, isFetched, itemsPerPage } = this.state;
    const singlePageData = this.getSinglePage();

    return (
      !isFetched ? 
        <p>Loading...</p> : 
        <main className="main">
          <Filter handleFilterSubmit={this.handleFilterSubmit} handleFilterChange={this.handleFilterChange}/>
          <Pagination totalItems={data.length} itemsPerPage={itemsPerPage} changePage={this.changePage}/>
          <ul className="pokemonlist">
              {singlePageData.map(item => {
                return <li key={item.name}><Pokemon name={item.name} moreData={item.moreData}/></li>})
              }
          </ul>
          <Pagination totalItems={data.length} itemsPerPage={itemsPerPage} changePage={this.changePage}/>
        </main>
    )
  }
}

export default Main;
