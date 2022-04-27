import React, { Component } from 'react';
import PreviewScreenOne from '../components/PreviewScreenOne';
import { PreviewScreenTwo } from '../components/PreviewScreenTwo';
import Buttons from '../components/Buttons';
import { getLocalFileAdd } from '../service/storaje';

export default class PreView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addData : {
        file : null,
        fileName : ''
      }
    }
  }
  componentDidMount = () =>{
    const fileAdd = getLocalFileAdd()
    if(fileAdd){
      this.setState({
        addData : {
          file : fileAdd.file,
          fileName: fileAdd.fileName
        }
      })
    }
  }
  render() {
    return (
      <div className="contaienr__preview-screen">
        <p className="title__preview">Previsualización</p>
        <p className="sub__title-preview">
          Especificaciones del video. Lorem ipsum dolot sit amet, consectetuer
          adispicing e it, sed diam nonummy nibh.
        </p>
        <PreviewScreenOne addFile={this.state.addData} />
        <PreviewScreenTwo />
        <Buttons
          firstName="Atrás"
          secondName="Siguiente"
          firstLink="archivos"
          secondLink="compra"
        />
      </div>
    );
  }
}