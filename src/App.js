import React, { Component } from 'react';
import Search from './components/Search';
import Result from './components/Result';


class App extends Component {

  state = {
    termino : '',
    imagenes : [],
    pagina : ''
  }
  //hace scroll hacia arriba de la pagina
  scroll = () =>{
    const elemento = document.querySelector('.jumbotron');
    elemento.scrollIntoView('smooth','start');
  }
  //paginacion hacia adelante y atras
  paginaAnterior = () =>{
    
    //leer el state
    let pagina = this.state.pagina;
    //si pagina es 1 no ir a tras
    if(pagina ===1)return null;
    //restar uno
    pagina--;

    //agregar la pagina en el state
    this.setState({
      pagina
    },() =>{
      this.consultarApi();
      this.scroll();
    });
    console.log(pagina);
  }
  paginaSiguiente = () =>{
    
 //leer el state
    let pagina = this.state.pagina;

    //restar uno
    pagina++;

    //agregar la pagina en el state
    this.setState({
      pagina
    }, () => {
      this.consultarApi();
      this.scroll();
    });
    console.log(pagina);
  }
  consultarApi = () =>{
    const termino = this.state.termino;
    const pagina = this.state.pagina;
    const url = `https://pixabay.com/api/?key=20145731-f38a6776ff358f77afe12f7b0&q=${termino}&per_page=30&page=${pagina}`;
    console.log(url);
    fetch(url)
      .then(response => response.json())
      .then(date => this.setState({imagenes : date.hits}))
  }

  datosBusqueda = (termino)=>{
    this.setState({
      termino : termino,
      pagina : 1
    },()=>{
        this.consultarApi();
    })
  }


  render(){
  return (
    <div className="app container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imgenes</p>
        <Search datosBusqueda={this.datosBusqueda}/>
      </div>
      <div className="row justify-content-center">
        <Result imagenes={this.state.imagenes} paginaAnterior={this.paginaAnterior} paginaSiguiente={this.paginaSiguiente}  />
      </div>      
    </div>
  );
  }
}

export default App;
