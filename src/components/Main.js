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
        const rawData = await this.fetchData("https://pokeapi.co/api/v2/pokemon?limit=150");
        const data = await this.fetchMoreData(rawData.results);
        this.setState({ data, filteredData: data });
        this.setState({ isFetched: true });
    } catch (error) {
        console.log(error);
    }
  }

  componentDidUpdate() {}

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
    const moreData = [];
    for (const item of data) {
      try {
        let freshData = await this.fetchData(item.url);
        moreData.push(freshData);
      } catch (error) {
        console.log(error);
      }
    }
    return moreData;
  }

  //slice data for single page to display
  getSinglePage(data, currentPage, itemsPerPage) {
    const pageFirstItem = (currentPage-1)*itemsPerPage;
    const singlePageData = data.slice(pageFirstItem, pageFirstItem + itemsPerPage);
    return singlePageData; 
  }

  //change page on pagination list
  changePage(number) {
    number !== "..." && this.setState({ currentPage: number })
  }

  handleFilterChange(e) {
    this.setState({ filterValue: e.target.value }, this.filterData);
  }

  filterData() {
    const { data, filterValue } = this.state;
    const isNone = filterValue === "none"
    const filteredData = isNone ? data : data.filter(item => item.types.map((item) => item.type.name).includes(filterValue))
    this.setState( { filteredData, currentPage: 1 });
  }

  handleResize() {
    this.setState({ windowWidth: window.innerWidth })
  }

  render() {
    const { isFetched, itemsPerPage, currentPage, windowWidth, filteredData } = this.state;
    const singlePageData = this.getSinglePage(filteredData, currentPage, itemsPerPage);
    const moreThanOnePage = filteredData.length > itemsPerPage;

    return (
      !isFetched ? 
      <div className="loading">
        <div className="pokeball">
          <div className="upper">
            <div className="inner"></div>
          </div>
          <div className="middle"></div>
          <div className="lower">
            <div className="inner"></div>
          </div>
        </div>
        <p className="message">Loading...</p>
      </div> :
        <main className="main">
          <Filter handleFilterChange={this.handleFilterChange}/>
          { moreThanOnePage && <Pagination totalItems={filteredData.length} currentPage={currentPage} itemsPerPage={itemsPerPage} changePage={this.changePage}/>}
          <ul className="pokemonlist">
              {filteredData.length === 0 ? <p className="message">no items found</p> :
              singlePageData.map(item => {
                return <li key={item.id}>
                  <Pokemon data={item} windowWidth={windowWidth} />
                </li>})
              }
          </ul>
          { moreThanOnePage && <Pagination totalItems={filteredData.length} currentPage={currentPage} itemsPerPage={itemsPerPage} changePage={this.changePage}/>}
        </main>
    )
  }
}

export default Main;
