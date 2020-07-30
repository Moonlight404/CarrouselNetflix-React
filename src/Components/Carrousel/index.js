import React from 'react';
import './style.css';
import Movie from './movie';

class Carrousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      CarrouselX: 1,
      index: 0,
      itemSlide: 0,
      maxItem: 6,
      moved: false,
      itemPush: [],
      hoverCond: false
    }
  }
  componentDidMount(){
    const self = this;
    setInterval(() => {
      window.addEventListener('resize', this.resizeWindow(self))
    }, 1000);
  }
  resizeWindow(self){
    if(window.innerWidth >= 1384){
      self.handleChange(5)
    }
    else if(window.innerWidth >= 1383){
      self.handleChange(4)
    } else if(window.innerWidth >= 1069){
      self.handleChange(3)
    } else if(window.innerWidth >= 803){
      self.handleChange(2)
    } else if(window.innerWidth <= 623){
      self.handleChange(1)
    } else{
      self.handleChange(5)
    }
  }
  handleChange(change) {
    this.setState(state => ({
      CarrouselX: change
    }))
    this.setState(state => ({
      maxItem: (this.props.data.length - 1) / this.state.CarrouselX
    }))
    this.setState(state => ({
      itemPush: []
    }))
    if(this.state.itemSlide > this.state.maxItem){
      this.state.itemSlide = this.state.maxItem
    }
    var push = []
    for(let i=0; i< this.state.maxItem; i++){
      push.push({i})
    }
    this.setState(state => ({
      itemPush: push
    }))
  }
  moveRight(){
    if(this.state.itemSlide >= this.state.maxItem - 1){
      return
    } else{
    this.setState(state => ({
      itemSlide: state.itemSlide + 1
    }));
    }
    this.forceUpdate()
  }
  moveLeft(){
    if(this.state.itemSlide === 0){
      return
    } else{
    this.setState(state => ({
      itemSlide: state.itemSlide - 1
    }));
    this.forceUpdate()
  }
  }
  hoverCarrousel(cond){
    this.setState(state => ({
      hoverCond: cond
    }));
  }
  render(){
    return  <div className="wrapper">
      { this.state.hoverCond && <div className="absolute-w">
      { this.state.itemPush.map((item, index) => (  
        <li key={index} className={this.state.itemSlide == index  ? 'ativo' : ''}>

        </li>
      )) }
      </div> }
      <div className="title">
        <h1> { this.props.title } </h1>
      </div>
      <div className="carrouselInner"
      onMouseEnter={() => this.hoverCarrousel(true)}
      onMouseLeave={() => this.hoverCarrousel(false)}>
      { this.state.hoverCond && 
       <div className="arrows">
        { this.state.itemSlide > 0 && <div 
        onClick={() => { this.moveLeft() }}
        className="arrow arrowLeft">
        <i className="fas fa-arrow-left"></i>
        </div> }
        <div 
        onClick={() => { this.moveRight() }}
        className="arrow arrowRight">
        <i className="fas fa-arrow-right"></i>
        </div>
      </div>
       }
      <div className={"listMovie " + (this.state.moved ? 'moved' : 'notMoved') }>
      { this.props.data.map((movie, index) => (  
        <div className="item" id={index} key={index}>
        { this.state.itemSlide * this.state.CarrouselX <= index && <Movie image={movie.image}/> }
        </div>
       )) }
      </div>
    </div>
    </div>
  };
}

export default Carrousel;