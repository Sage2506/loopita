import React, { Component } from 'react';

export default class DropFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      fileName: "",
      fileExtension: "",
      videoFormats: ['mp4'],
      imageFormats: ['png', 'jpg', 'jpeg']

    }
  }

  changeFile = e => {
  }

  saveChanges = () => {
    const fileData = this.state
    this.props.uploadFile(fileData)
  }

  saveFile = e => {
    const fileName = e.target.files[0].name
    if (fileName.split('.').length > 1) {
      this.setState({ fileExtension: fileName.split('.')[fileName.split('.').length - 1] })
    }
    this.setState({ file: e.target.files[0], fileName: fileName })
    this.props.uploadFile({ fileExtension: fileName.split('.')[fileName.split('.').length - 1], file: e.target.files[0], fileName: fileName })
  }

  render() {
    const { changeFile, saveFile, state } = this
    const { file, fileExtension, imageFormats, videoFormats } = state
    return (
      <div>
        <div>
          <section className="container__drop-file" onClick={changeFile}>
            {!file && <input type="file" onChange={saveFile} accept={this.props.isSafari ? ".jpeg, .jpg, .png " : ".jpeg, .jpg, .png, .mp4 "} />}
            {!this.props.isSafari && file && fileExtension !== "" && videoFormats.includes(fileExtension) &&
              <video autoPlay={true} id="videoPreview" >
                <source src={URL.createObjectURL(file)} />
              </video>
            }
            {this.props.isSafari && file && fileExtension !== "" && videoFormats.includes(fileExtension) &&
              <p>Su navegador no admite video</p>
            }
            {file && fileExtension !== "" && imageFormats.includes(fileExtension) &&
              <img src={URL.createObjectURL(file)} alt="addPreview" />
            }
          </section>
        </div>
      </div>
    );
  }
}