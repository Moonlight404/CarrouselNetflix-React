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
      hoverCond: false,
      width: -50.9
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
      self.handleChange(6)
      self.changeWidth(-50.9)
    }
    else if(window.innerWidth >= 1383){
      self.handleChange(5)
      self.changeWidth(-48.99)
    } else if(window.innerWidth >= 1069){
      self.handleChange(4)
      self.changeWidth(-40.8)
    } else if(window.innerWidth >= 803){
      self.handleChange(3)
      self.changeWidth(-20)
    } else if(window.innerWidth <= 623){
      self.handleChange(2)
      self.changeWidth(-20)
    } else{
      self.handleChange(5)
      self.changeWidth(-50.9)
    }
  }
  changeWidth(x){
    this.setState({width: x})
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
    this.state.moved = false
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
    this.state.moved = false
    
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
        <li key={index} className={this.state.itemSlide == index  ? 'ativo' : ''}/>
      )) }
      </div> }
      <div className="title">
        <h1> { this.props.title } </h1>
      </div>
      <div className={"carrouselInner "}
      onMouseEnter={() => this.hoverCarrousel(true)}
      onMouseLeave={() => this.hoverCarrousel(true)}>
      { this.state.hoverCond && 
       <div className="arrows">
        { this.state.itemSlide > 0 && <div 
        onClick={() => { this.moveLeft() }}
        className="arrow arrowLeft">
        <i className="fas fa-arrow-left"></i>
        </div> }
        { parseInt(this.state.itemSlide) < parseInt(this.state.maxItem - 0.16) &&<div 
        onClick={() => { this.moveRight() }}
        className="arrow arrowRight">
        <i className="fas fa-arrow-right"></i>
        </div> }
      </div>
       }
      <div className={"listMovie " + 
      (this.state.moved ? 'moved ' : 'notMoved ') +
      (parseInt(this.state.itemSlide) > 0 ? 'last' : 'notLast') }
      style={{
        transform: this.state.itemSlide > 0 ? `translateX(${this.state.width})%` : 'none'
      }}>
      { this.props.data.map((movie, index) => (  
        <div className="item" id={index} key={index}>
        { (this.state.CarrouselX) * (this.state.itemSlide) - 1 <= index &&  <Movie image={movie.image}/> }
        </div>
       )) }
      </div>
    </div>
    </div>
  };
}

export default Carrousel;