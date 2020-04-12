import React, { Component } from "react";

class Pokemon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
    };
    this.fetchData = this.props.fetchData.bind(this);
  }

  async componentDidMount() {
    this.setState({ loading: true });
    try {
      let data = await this.fetchData(this.props.url);
      this.setState({ data, loading: false });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { data, loading } = this.state;
    const { name, weight, sprites } = data;
    const imgURL = sprites ? sprites.front_default : null;

    return loading ? (
      <p>Loading Pokemon...</p>
    ) : (
      <>
        <p>
          Name: {name}, weight: {weight}
        </p>
        <img src={imgURL} alt={name} />
      </>
    );
  }
}

export default Pokemon;
