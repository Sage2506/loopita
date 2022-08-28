import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { setEditable } from '../actions/editable';
import { initVariables } from '../utils/common';
import ModalVideo from 'react-modal-video'
import 'react-modal-video/css/modal-video.css';


export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
    this.openModal = this.openModal.bind(this)
  }
  componentDidMount() {
    initVariables(this.props.setEditables)
    this.openModal();
  }
  openModal() {
    this.setState({ isOpen: true })
  }
  render() {
    return (
      <div>
        <ModalVideo channel='youtube' isOpen={this.state.isOpen} videoId='CrlFYtSl258' onClose={() => this.setState({ isOpen: false })} youtube={{
          autoplay: 1,
          mute: 1
        }} />
        <div className="cover__page">
          <div className="grid_double">
            <div style={{ textAlign: "center" }} >
              <div style={{ flex: 7 }}>
                <Link to="/contract" className='home-button-position'>
                  <button
                    className="btn btn-primary btn-home contratar__Web "
                  >Contratar
                  </button>
                </Link>
              </div>
              <h4 className="desktop_info">
                Contrata una pauta en medios <br /> exteriores a la medida de tu marca
              </h4>
            </div>
          </div>
          <div style={{ textAlign: "center", paddingTop: '30px' }}>
            <h4 className="mobile_info">
              Contrata una pauta en medios exteriores a la medida de tu marca
            </h4>
          </div>
          <Link to="/contract" className="contratar__mobil__a">
            <button
              className="btn btn-primary btn-home contratar__mobil"
            >Contratar
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  loaded: store.editableReducer.loaded
})

const mapDispatchToProps = dispatch => {
  return {
    setEditables: data => { dispatch(setEditable(data)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)