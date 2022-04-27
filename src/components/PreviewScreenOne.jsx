import React, { Component } from 'react';

export default class PreviewScreenOne extends Component {

  render (  ) {
    const { addFile } = this.props
    const {file} = addFile
    return(
      <div>
        <div className="preview__screen">
          { file &&
                <video controls id="videoPreview">
                  <source src={URL.createObjectURL(file)} />
                </video>
              }
        </div>
        <table className="table table-striped">
            <thead>
                <tr>

                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">Pantalla</th>
                    <td>#1 - CECUT</td>
                </tr>
                <tr>
                    <th scope="row">Pantalla</th>
                    <td>#2 - RIO</td>
                </tr>
                <tr>
                    <th scope="row">Pantalla</th>
                <td>#3 - CAÑON DEL DIABLO</td>
                </tr>
            </tbody>
        </table>
    </div>
    );
  }
}