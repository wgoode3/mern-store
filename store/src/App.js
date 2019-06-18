import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [
      ],
      name: "",
      price: 0,
      description: "",
      discount: 0,
      errors: {
        name: {message: ""},
        price: {message: ""},
        description: {message: ""},
        discount: {message: ""}
      }
    }
  }

  componentDidMount = () => {
    axios.get("http://localhost:8000/api/games")
      .then( res => {
        this.setState({products: res.data.games});
      })
      .catch( err => {
        console.log(err);
      });
  }

  addName = (e) => {
    this.setState({name: e.target.value});
  }
  addPrice = (e) => {
    this.setState({price: e.target.value});
  }
  addDescription = (e) => {
    this.setState({description: e.target.value});
  }
  addDiscount = (e) => {
    this.setState({discount: e.target.value});
  }
  add = (e) => {
    e.preventDefault();
    let p = {
      name: this.state.name,
      price: this.state.price,
      description: this.state.description,
      discount: this.state.discount
    }
    axios.post("http://localhost:8000/api/games", p)
      .then( res => {
        if(res.data.errors){
          this.setState({errors: res.data.errors.errors});
        } else {
          this.setState({
            products: [...this.state.products, p],
            name: "",
            price: 0,
            description: "",
            discount: 0,
            errors: {
              name: {message: ""},
              price: {message: ""},
              description: {message: ""},
              discount: {message: ""}
            }
          });
        }
      })
      .catch( err => {
        console.log(err);
      });
  }

  gone = (i, id) => {
    console.log(i, id);
    axios.delete(`http://localhost:8000/api/games/${id}`)
      .then( res => {
        let games = [...this.state.products];
        games.splice(i, 1);
        this.setState({products: games});
      })
      .catch( err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.add}>
          <div className="form-group">
            <label>Name: </label>
            <input type="text" onChange={this.addName} value={this.state.name} />
            {
              this.state.errors.name ?
              <span>{this.state.errors.name.message}</span>:
              ""
            }
          </div>
          <div className="form-group">
            <label>Price: </label>
            <input type="number" step="0.01" onChange={this.addPrice} value={this.state.price} />
            {
              this.state.errors.price ?
              <span>{this.state.errors.price.message}</span>:
              ""
            }
          </div>
          <div className="form-group">
            <label>Discount: </label>
            <input type="number" onChange={this.addDiscount} value={this.state.discount} />
            {
              this.state.errors.discount ?
              <span>{this.state.errors.discount.message}</span>:
              ""
            }
          </div>
          <div className="form-group">
            <label>Description: </label>
            <textarea onChange={this.addDescription} value={this.state.description}></textarea>
            {
              this.state.errors.description ?
              <span>{this.state.errors.description.message}</span>:
              ""
            }
          </div>
          <input type="submit" />
        </form>
        <>
          {
            this.state.products.map( (p, i) => 
              <fieldset key={i}>
                <legend>{p.name}</legend>
                <p>${p.price} {p.discount}% off</p>
                <pre>{p.description}</pre>
                <button onClick={this.gone.bind(this, i, p._id)}>Buy me!</button>
              </fieldset>
            )
          }
        </>
      </div>
    )
  }
}

export default App;