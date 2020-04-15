import React from "react";

const Pokemon = ({ name, weight, sprites, id }) => {
  // class Pokemon extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     data: [],
  //     loading: false,
  //   };
  //   this.fetchData = this.props.fetchData.bind(this);
  // }

  // async componentDidMount() {
  //   this.setState({ loading: true });
  //   try {
  //     let data = await this.fetchData(this.props.url);
  //     this.setState({ data, loading: false });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // render() {
  // const { data, loading } = this.state;
  // const { name, weight, sprites, id } = props;
  // const imgURL = sprites ? sprites.front_default : null;

  return (
    <div className="pokemoncard">
      <p className="pokemoncard_name">{name}</p>
      {/* <img src={sprites.front_default} alt={name} /> */}
    </div>
  );
};

export default Pokemon;
