import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { setEditable } from '../actions/editable';

export class Home extends Component {
  componentDidMount() {
    axios.get('http://localhost/loopita/data.php').then(response => {
      if (!!response.data) {
        const variables = {}
        response.data.constants.forEach(constant => {
          variables[constant.tag] = { description: constant.description, value: constant.constant }
        });
        response.data.labels.forEach(label => {
          variables[label.tag] = { description: label.description, value: label.text }
        })
        console.log("setting editables");
        this.props.setEditables(variables)
      }
    })
  }
  render() {
    return (
      <div>
        <div className="cover__page">
          <div className="grid_double">
            <div style={{ textAlign: "center" }} >
              <div style={{ flex: 7 }}></div>
              <div style={{ flex: 1 }} className="desktop_button">
                <Link to="/contract" style={{ maxWidth: '150px' }}>
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