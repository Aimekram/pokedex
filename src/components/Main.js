import React, { Component } from "react";
import Pokemon from "./Pokemon"
import Pagination from "./Pagination";
import Filter from "./Filter";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      filteredData: [],
      isFetched: false,
      currentPage: 1,
      itemsPerPage: 12,
      filterValue: "none",
      windowWidth: 320,
    };
    this.fetchData = this.fetchData.bind(this);
    this.fetchMoreData = this.fetchMoreData.bind(this);
    this.getSinglePage = this.getSinglePage.bind(this);
    this.changePage = this.changePage.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.filterData = this.filterData.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }

  async componentDidMount() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize)
    try {
        const rawData = await this.fetchData("https://pokeapi.co/api/v2/pokemon?limit=220");
        const data = await this.fetchMoreData(rawData.results);
        this.setState({ data }, this.filterData);
        this.setState({ isFetched: true });
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

  //slice data for single page to display
  getSinglePage(data) {
    const { currentPage, itemsPerPage} = this.state;
    const pageFirstItem = (currentPage-1)*itemsPerPage;
    const singlePageData = data.slice(pageFirstItem, pageFirstItem + itemsPerPage);
    return singlePageData; 
  }

  //change page on pagination list
  changePage(number) {
    number !== "..." && this.setState({currentPage: number})
  }

  handleFilterChange(e) {
    this.setState({ filterValue: e.target.value }, this.filterData);
  }

  filterData() {
    const { data, filterValue } = this.state;
    console.log(data)
    const isNone = filterValue === "none"
    const filteredData = isNone ? data : data.filter(item => item.moreData.types.map((item) => item.type.name).includes(filterValue))
    this.setState( { filteredData, currentPage: 1 });
  }

  handleResize() {
    this.setState({ windowWidth: window.innerWidth })
  }

  render() {
    const { isFetched, itemsPerPage, currentPage, windowWidth, filteredData } = this.state;
    const singlePageData = this.getSinglePage(filteredData);
    const moreThanOnePage = filteredData.length > itemsPerPage;
    console.log(filteredData.length)

    return (
      !isFetched ? 
        <p>Loading...</p> : 
        <main className="main">
          <Filter handleFilterChange={this.handleFilterChange}/>
          { moreThanOnePage && <Pagination totalItems={filteredData.length} currentPage={currentPage} itemsPerPage={itemsPerPage} changePage={this.changePage}/>}
          <ul className="pokemonlist">
              {singlePageData.map(item => {
                return <li key={item.name}>
                  <Pokemon name={item.name} moreData={item.moreData} windowWidth={windowWidth}/>
                </li>})
              }
          </ul>
          { moreThanOnePage && <Pagination totalItems={filteredData.length} currentPage={currentPage} itemsPerPage={itemsPerPage} changePage={this.changePage}/>}
        </main>
    )
  }
}

export default Main;
