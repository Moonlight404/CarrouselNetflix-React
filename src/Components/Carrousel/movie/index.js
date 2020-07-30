import React from 'react';
import './style.css';

class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: 0
    }
  }
  hover(cond){
    this.setState(state => ({
        hover: cond
    }));
  }
  render(){
    return <div 
    onMouseEnter={() => this.hover(true)}
    onMouseLeave={() => this.hover(false)}
    className={"movie " + (this.state.hover ? 'hover': 'notHover')} data-id={this.props.id}>
       <img src={this.props.image}/>
    </div>
  };
}

export default Movie;