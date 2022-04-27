import React, { Component } from 'react';
import Buttons from '../components/Buttons';
import DropFile from '../components/DropFile';
import { getLocalScreen, getSelectedDates, getSelectedPlan, setLocalFileAdd, setSelectedPlan } from '../service/storaje';
import { calculateDailyServiceTotals, currencyFormat } from '../utils/common';
export default class UploadFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      fileName: '',
      fileExtension : "",
      videoFormats : ['mp4'],
      imageFormats : ['png','jpg','jpeg'],
      addFile: null,
      servicePlan: { id: -1 },
      screen: { id: -1 },
      statistics: {
        ageRangeFifteenToNineteen: 0,
        ageRangeFourtyfiveToFiftyfour: 0,
        ageRangeOverFiftyfive: 0,
        ageRangeThirtyToFourtyfour: 0,
        ageRangeTwentyToTwentynine: 0,
        ageRangeZeroToFourteen: 0,
        men: 0,
        noPeakHour: 0,
        peakHour: 0,
        profileAB: 0,
        profileC: 0,
        profileCPlus: 0,
        profileD: 0,
        profileE: 0,
        total: 0,
        totalCars: 0,
        totalImpactEstimation: 0,
        cpm: 0,
        totalProjectTime: 0,
        totalSpots: 0,
        women: 0
      },
      carsPerHour : 15000
    }
  }

  componentDidMount = () => {
    //TODO: print screen name
    //TODO: show stellar picture
    //TODO: preview add inside stellar picture
    const screen = getLocalScreen(); // the selected screen for the list
    const servicePlan = getSelectedPlan() // selected month plan if one
    const dailyServiceConfig = getSelectedDates(); // configurated daily plan if one
    if (servicePlan.id === -1 && dailyServiceConfig !== null) {
      this.calculateDailyTotal(dailyServiceConfig)
    } else {
      this.calculateMonthTotal(servicePlan)
    }
    this.setState({
      screen,
      servicePlan
    })
  }

  calculateMonthTotal = (servicePlan) => {
    const statistics = {
      ageRangeFifteenToNineteen: 0,
      ageRangeFourtyfiveToFiftyfour: 0,
      ageRangeOverFiftyfive: 0,
      ageRangeThirtyToFourtyfour: 0,
      ageRangeTwentyToTwentynine: 0,
      ageRangeZeroToFourteen: 0,
      men: 0,
      noPeakHour: 0,
      peakHour: 0,
      profileAB: 0,
      profileC: 0,
      profileCPlus: 0,
      profileD: 0,
      profileE: 0,
      total: 0,
      totalCars: 0,
      totalImpactEstimation: 0,
      totalProjectTime: 0,
      totalSpots: 0,
      women: 0,
    }

    statistics.total = servicePlan.price
    statistics.peakHour = Math.round( statistics.total * 3 / 5 / 10 / servicePlan.loopMultipliyer)
    statistics.noPeakHour = Math.round(statistics.total * 2 / 5 / 10 / servicePlan.loopMultipliyer)
    statistics.totalSpots = Math.round( statistics.total / 10 / servicePlan.loopMultipliyer)
    statistics.totalProjectTime = 18 * 10 * 20 / 60 * 30 ;
    statistics.totalCars = Math.round( this.state.carsPerHour / 18 / 60 * statistics.totalProjectTime)
    const totalImpactEstimation = Math.round(statistics.totalCars * 1.5)
    statistics.totalImpactEstimation = Math.round(totalImpactEstimation)
    statistics.cpm =  (statistics.total / totalImpactEstimation).toFixed(2)
    statistics.profileCPlus = Math.round(totalImpactEstimation * 0.35)
    statistics.profileC = Math.round(totalImpactEstimation * 0.38)
    statistics.profileAB = Math.round(totalImpactEstimation * 0.12)
    statistics.profileE = Math.round(totalImpactEstimation * 0.09)
    statistics.profileD = Math.round(totalImpactEstimation * 0.06)
    statistics.men = Math.round(totalImpactEstimation * 0.45)
    statistics.women = Math.round(totalImpactEstimation * 0.55)
    statistics.ageRangeZeroToFourteen =Math.round( totalImpactEstimation * 0.16)
    statistics.ageRangeFifteenToNineteen = Math.round(totalImpactEstimation * 0.15)
    statistics.ageRangeTwentyToTwentynine = Math.round(totalImpactEstimation * 0.14)
    statistics.ageRangeThirtyToFourtyfour = Math.round(totalImpactEstimation * 0.22)
    statistics.ageRangeFourtyfiveToFiftyfour = Math.round(totalImpactEstimation * 0.18)
    statistics.ageRangeOverFiftyfive = Math.round(totalImpactEstimation * 0.15)

    this.setState({
      statistics
    })
  }

  calculateDailyTotal = (dailyServiceConfig) => {
    const statistics = {
      ageRangeFifteenToNineteen: 0,
      ageRangeFourtyfiveToFiftyfour: 0,
      ageRangeOverFiftyfive: 0,
      ageRangeThirtyToFourtyfour: 0,
      ageRangeTwentyToTwentynine: 0,
      ageRangeZeroToFourteen: 0,
      men: 0,
      noPeakHour: 0,
      peakHour: 0,
      profileAB: 0,
      profileC: 0,
      profileCPlus: 0,
      profileD: 0,
      profileE: 0,
      total: 0,
      totalCars: 0,
      totalImpactEstimation: 0,
      totalProjectTime: 0,
      totalSpots: 0,
      women: 0,
    }
    const { total, minTotal, maxTotal, totalHours } = calculateDailyServiceTotals(dailyServiceConfig)
    setSelectedPlan({ id: -1 , price : total})
    statistics.total = total;
    statistics.peakHour = maxTotal / 10;
    statistics.noPeakHour = minTotal / 10;
    statistics.totalSpots = totalHours * 10
    statistics.totalProjectTime = (totalHours * 10 * 20 / 60).toFixed(2)//statistics.totalSpots * 20 / 60
    statistics.totalCars =Math.round( this.state.carsPerHour / 18 / 60 * statistics.totalProjectTime)
    const totalImpactEstimation = statistics.totalCars * 1.5
    statistics.totalImpactEstimation = Math.round(totalImpactEstimation)
    statistics.cpm = (total / totalImpactEstimation).toFixed(2)
    statistics.profileCPlus = Math.round(totalImpactEstimation * 0.35)
    statistics.profileC = Math.round(totalImpactEstimation * 0.38)
    statistics.profileAB = Math.round(totalImpactEstimation * 0.12)
    statistics.profileE = Math.round(totalImpactEstimation * 0.09)
    statistics.profileD = Math.round(totalImpactEstimation * 0.06)
    statistics.men = Math.round((totalImpactEstimation * 0.45).toFixed(2))
    statistics.women = Math.round((totalImpactEstimation * 0.55).toFixed(2))
    statistics.ageRangeZeroToFourteen = Math.round(totalImpactEstimation * 0.16)
    statistics.ageRangeFifteenToNineteen = Math.round(totalImpactEstimation * 0.15)
    statistics.ageRangeTwentyToTwentynine = Math.round(totalImpactEstimation * 0.14)
    statistics.ageRangeThirtyToFourtyfour = Math.round(totalImpactEstimation * 0.22)
    statistics.ageRangeFourtyfiveToFiftyfour = Math.round(totalImpactEstimation * 0.18)
    statistics.ageRangeOverFiftyfive = Math.round(totalImpactEstimation * 0.15)

    this.setState({
      statistics
    })
  }

  handleUpload = fileData => {
    this.setState({
      file: fileData.file,
      fileName: fileData.fileName,
      fileExtension: fileData.fileExtension
    })
    setLocalFileAdd(fileData)
  }

  render() {
    const {
      file,
      statistics,
      screen,
      fileExtension,
      videoFormats,
      imageFormats
    } = this.state;
    const {
      ageRangeFifteenToNineteen,
      ageRangeFourtyfiveToFiftyfour,
      ageRangeOverFiftyfive,
      ageRangeThirtyToFourtyfour,
      ageRangeTwentyToTwentynine,
      ageRangeZeroToFourteen,
      men,
      noPeakHour,
      peakHour,
      profileAB,
      profileC,
      profileCPlus,
      profileD,
      profileE,
      total,
      totalCars,
      totalImpactEstimation,
      totalProjectTime,
      totalSpots,
      cpm,
      women,
    } = statistics

    return (
      <div className="Drop__file">
        <div className="dobule_section_grid">
          <div>
            <p className="title__video">¿Como te van a recordar?</p>
            <p>Sube tu archivo en formato .jpg, .png o .mp4</p>
            <DropFile uploadFile={this.handleUpload} />
          </div>
          <div>
            <p className="title__video">Previsualizacion</p>
            <p>Especificaciones del anuncio</p>
            {file && fileExtension !== "" && videoFormats.includes(fileExtension) &&
              <div>
                <video controls id="videoPreview" >
                  <source src={URL.createObjectURL(file)} />
                </video>
              </div>
            }
            {file &&  fileExtension !== "" && imageFormats.includes(fileExtension) &&
              <img className="previewImg" src={URL.createObjectURL(file)} alt="addPreview" />
            }
          </div>
        </div>
        <div className="triple_section_grid">
          <div>
            <table className="table table-striped">
              <tbody>
              <tr>
                  <td>No. total de spots</td>
                  <td>{totalSpots.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Pantalla</td>
                  <td>{ screen? screen.name : ''}</td>
                </tr>

                <tr>
                  <td>Total de spots en hora pico</td>
                  <td>{peakHour}</td>
                </tr>
                <tr>
                  <td>Total de spots en hora no pico</td>
                  <td>{noPeakHour}</td>
                </tr>
                <tr>
                  <td>Total de tiempo proyectado (minutos)</td>
                  <td>{(totalProjectTime)}</td>
                </tr>
                <tr>
                  <th colSpan="2">Impactos totales</th>
                </tr>
                <tr>
                  <td>No. de automóviles</td>
                  <td>{totalCars}</td>
                </tr>
                <tr>
                  <td>Estimado de impactos</td>
                  <td>{totalImpactEstimation}</td>
                </tr>
                <tr>
                  <td>CPM</td>
                  <td>{cpm}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <table className="table table-striped">
              <tbody>
                <tr>
                  <th colSpan="3">Perfil socioeconomico</th>
                </tr>
                <tr>
                  <td>C+</td>
                  <td>{profileCPlus} </td>
                  <td>(35%)</td>
                </tr>
                <tr>
                  <td>C</td>
                  <td>{profileC}</td>
                  <td>(38%)</td>
                </tr>
                <tr>
                  <td>AB</td>
                  <td>{profileAB}</td>
                  <td>(12%)</td>
                </tr>
                <tr>
                  <td> E</td>
                  <td>{profileE}</td>
                  <td>(9%)</td>
                </tr>
                <tr>
                  <td>D</td>
                  <td>{profileD}</td>
                  <td>(6%)</td>
                </tr>
              </tbody>
            </table>
            <table className="table table-striped">
              <tbody>
                <tr>
                  <td>Hombres</td>
                  <td>{men}</td>
                </tr>
                <tr>
                  <td>Mujeres</td>
                  <td>{women}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <table className="table table-striped">
              <tbody>
                <tr>
                  <th colSpan="3">Rangos de edad</th>
                </tr>
                <tr>
                  <td>0-14</td>
                  <td>{ageRangeZeroToFourteen}</td>
                  <td>(16%)</td>
                </tr>
                <tr>
                  <td>15-19</td>
                  <td>{ageRangeFifteenToNineteen}</td>
                  <td>(15%)</td>
                </tr>
                <tr>
                  <td>20-29</td>
                  <td>{ageRangeTwentyToTwentynine}</td>
                  <td>(14%)</td>
                </tr>
                <tr>
                  <td>30-44</td>
                  <td>{ageRangeThirtyToFourtyfour}</td>
                  <td>(22%)</td>
                </tr>
                <tr>
                  <td>45-54</td>
                  <td>{ageRangeFourtyfiveToFiftyfour}</td>
                  <td>(18%)</td>
                </tr>
                <tr>
                  <td>Más de 55</td>
                  <td>{ageRangeOverFiftyfive}</td>
                  <td>(15%)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="dobule_section_grid">
          <div>
            <table className="table table-striped">
              <tbody>
              <tr>
                  <td>Presupuesto proyectado</td>
                  <td>{currencyFormat(total)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <Buttons
              firstLink="planPorDia"
              firstName="atrás"
              secondLink="compra"
              secondName="Siguiente"
            />
          </div>
        </div>
        <div>
          *datos calculados con estadisticos de sintrafico.com
        </div>
      </div>
    );
  }
}