import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom'
import { setProgress } from '../../actions/client';
import { calculateDailyServiceTotals, calculateSpotServiceTotals, currencyFormat, parsePeakHourRange } from '../../utils/common';
import { isSafari } from 'react-device-detect';
import NavButtons from '../common/navButtons';
import DropFile from './dropFile';
import addBackground from './../../assets/img/billboard.png'

export class StatsSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      fileName: '',
      fileExtension: "",
      videoFormats: ['mp4'],
      imageFormats: ['png', 'jpg', 'jpeg'],
      addFile: null,
      servicePlan: { id: -1 },
      screen: { id: -1 },
      statistics: {
        noPeakHour: 0,
        peakHour: 0,
        total: 0,
        totalCars: 0,
        totalImpactEstimation: 0,
        cpm: 0,
        totalProjectTime: 0,
        totalSpots: 0,
      },
      carsPerHour: 15000,
      socioeconomicProfiles: [
        { label: 'C+', percentage: 35 },
        { label: 'C', percentage: 38 },
        { label: 'AB', percentage: 12 },
        { label: 'E', percentage: 9 },
        { label: 'D', percentage: 6 }
      ],
      genderStats: [
        { label: 'Hombres', percentage: 45 },
        { label: 'Mujeres', percentage: 55 },
      ],
      ageRanks: [
        { label: '0-14', percentage: 16 },
        { label: '15-19', percentage: 10 },
        { label: '20-29', percentage: 21 },
        { label: '30-44', percentage: 25 },
        { label: '45-54', percentage: 18 },
        { label: 'Más de 55', percentage: 10 },
      ],
    }
  }

  componentDidMount = () => {
    const statistics = {
      noPeakHour: 0,
      peakHour: 0,
      total: 0,
      totalCars: 0,
      totalImpactEstimation: 0,
      totalProjectTime: 0,
      totalSpots: 0,
    }

    let { planType, dailyPlan, peakHourRange, monthlyPlan } = this.props

    if (planType === 'monthly') {
      statistics.total = monthlyPlan.price
      statistics.peakHour = Math.round(statistics.total * 3 / 5 / 10 / monthlyPlan.loopMultipliyer)
      statistics.noPeakHour = Math.round(statistics.total * 2 / 5 / 10 / monthlyPlan.loopMultipliyer)
      statistics.totalSpots = 3600 / this.props.loopDuration * 17 * 30 * monthlyPlan.loopMultipliyer
      statistics.totalProjectTime = 18 * 10 * 20 / 60 * 30;
      statistics.totalCars = Math.round(this.state.carsPerHour / 18 / 60 * statistics.totalProjectTime)
    } else if (planType === 'daily') {
      const { total, totalHours, totalSpots, timesShowing, lowHours, highHours } = calculateDailyServiceTotals(dailyPlan, parsePeakHourRange(peakHourRange), this.props.normalHourPrice, this.props.peakHourPrice, this.props.loopDuration)
      statistics.total = total;
      statistics.peakHour = lowHours * timesShowing;
      statistics.noPeakHour = highHours * timesShowing;
      statistics.totalSpots = totalSpots
      statistics.totalProjectTime = (totalHours * timesShowing * 20 / 60).toFixed(2)
      statistics.totalCars = Math.round(((this.props.carsOnNormal * lowHours) + (this.props.carsOnPeak * highHours)) / timesShowing)
    } else {
      let { totalSpots, minInitialHour, maxEndingHour, normalHourPrice, peakHourPrice, loopDuration, startHour, endHour } = this.props
      const {
        highHours,
        lowHours,
        timesShowing,
        total,
        totalHours,
        totalSpotsNotCalculated,
      } = calculateSpotServiceTotals(totalSpots, startHour, endHour, minInitialHour, maxEndingHour, parsePeakHourRange(peakHourRange), normalHourPrice, peakHourPrice, loopDuration);
      statistics.total = total;
      statistics.peakHour = Math.round(highHours * timesShowing);
      statistics.noPeakHour = Math.round(lowHours * timesShowing);
      statistics.totalSpots = totalSpotsNotCalculated ? totalSpotsNotCalculated : 0;
      statistics.totalProjectTime = (totalHours * timesShowing * 20 / 60).toFixed(2)
      statistics.totalCars = Math.round(((this.props.carsOnNormal * lowHours) + (this.props.carsOnPeak * highHours)) / timesShowing)
    }


    statistics.totalImpactEstimation = Math.round(statistics.totalCars * 1.5)
    statistics.cpm = (statistics.total / statistics.totalImpactEstimation).toFixed(2)

    this.setState({
      statistics
    })
  }

  calculatePercentage = (total, percentage, decimals = 0) => {
    return (total * (percentage / 100)).toFixed(decimals)
  }

  handleUpload = fileData => {
    this.setState({
      file: fileData.file,
      fileName: fileData.fileName,
      fileExtension: fileData.fileExtension
    })
    //store into redux setLocalFileAdd(fileData)
  }

  saveProgress = () => {
    this.props.setProgress(4);
  }

  render() {
    const { planType, selectedDays } = this.props
    if (this.props.progress < 2) {
      if (this.props.planType === 'monthly') { return (<Navigate to="/monthly_plan" />) }
      if (this.props.planType === 'daily') { return (<Navigate to="/daily_plan" />) }
      if (this.props.planType === 'spots') { return (<Navigate to="/spots_form" />) }
    } else {

      const {
        file,
        statistics,
        fileExtension,
        videoFormats,
        imageFormats
      } = this.state;
      const {
        noPeakHour,
        peakHour,
        total,
        totalCars,
        totalImpactEstimation,
        totalProjectTime,
        totalSpots,
        cpm,
      } = statistics

      return (
        <div className="container">
          <div className="dobule_section_grid">
            <div>
              <p className="title__video">¿Como te van a recordar?</p>
              {!isSafari && <p>Sube tu archivo en formato .jpg, .png o .mp4</p>}
              {isSafari && <p>Sube tu archivo en formato .jpg, o .png </p>}
              <DropFile uploadFile={this.handleUpload} isSafari={isSafari} />
            </div>
            <div>
              <p className="title__video">Previsualizacion</p>
              <p>Especificaciones del anuncio</p>
              {!isSafari && file && fileExtension !== "" && videoFormats.includes(fileExtension) &&
                <div className='add-container'>
                  <video controls className="previewImg" autoPlay={true}>
                    <source src={URL.createObjectURL(file)} />
                  </video>
                  <img className='background' src={addBackground} alt="add background" />
                </div>
              }
              {isSafari && file && fileExtension !== "" && videoFormats.includes(fileExtension) &&
                <p>Su navegador no admite video</p>
              }
              {file && fileExtension !== "" && imageFormats.includes(fileExtension) &&
                <div className='add-container'>
                  <img className="previewImg" src={URL.createObjectURL(file)} alt="addPreview" />
                  <img className='background' src={addBackground} alt="add background" />
                </div>
              }
            </div>
          </div>
          <div className="triple_section_grid">
            <div>
              <table className="table table-striped">
                <tbody>
                  {planType === 'spots' &&
                    <tr>

                      <td>Rango seleccionado</td>
                      {!!selectedDays.from && !selectedDays.to && <td>Del <b>{selectedDays.from.toLocaleDateString()}</b></td>}
                      {!!selectedDays.to && <td>Del <b>{selectedDays.from.toLocaleDateString()}</b> al <b>{selectedDays.to.toLocaleDateString()}</b></td>}
                    </tr>
                  }
                  <tr>
                    <td>No. total de spots</td>
                    <td>{totalSpots}</td>
                  </tr>
                  <tr>
                    <td>Pantalla</td>
                    <td>{this.props.screen?.name || ''}</td>
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
                  {this.state.socioeconomicProfiles.map((item, idx) =>
                    <tr key={`profiles_${idx}`}>
                      <td>{item.label}</td>
                      <td>{this.calculatePercentage(this.state.statistics.totalImpactEstimation, item.percentage)}</td>
                      {<td>({item.percentage}%)</td>}
                    </tr>
                  )}
                </tbody>
              </table>
              <table className="table table-striped">
                <tbody>
                  {this.state.genderStats.map((item, idx) =>
                    <tr key={`gender_${idx}`}>
                      <td>{item.label}</td>
                      <td>{this.calculatePercentage(this.state.statistics.totalImpactEstimation, item.percentage)}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div>
              <table className="table table-striped">
                <tbody>
                  <tr>
                    <th colSpan="3">Rangos de edad</th>
                  </tr>
                  {this.state.ageRanks.map((item, idx) =>
                    <tr key={`ages_${idx}`}>
                      <td>{item.label}</td>
                      <td>{this.calculatePercentage(this.state.statistics.totalImpactEstimation, item.percentage)}</td>
                      {<td>({item.percentage}%)</td>}
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="dobule_section_grid">
            <div>
              <table className="table table-striped">
                <tbody>
                  <tr>
                    <td>Presupuesto proyectado </td>
                    <td>{currencyFormat(total)} MXN</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <NavButtons
                saveProgress={this.saveProgress}
                backLink={true}
                secondLink="/purchase_info"
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
}

const mapStateToProps = store => ({
  carsOnNormal: store.editableReducer.variables?.carsOnNormal?.value,
  carsOnPeak: store.editableReducer.variables?.carsOnPeak?.value,
  dailyPlan: store.planReducer.dailyPlan,
  loopDuration: store.editableReducer.variables.loopDuration?.value,
  maxEndingHour: store.editableReducer.variables.maxEndHour?.value,
  minInitialHour: store.editableReducer.variables.minInitialHour?.value,
  monthlyPlan: store.planReducer.monthlyPlan,
  normalHourPrice: store.editableReducer.variables?.normalHourSpotPrice?.value,
  peakHourPrice: store.editableReducer.variables.peakHourSpotPrice?.value,
  peakHourRange: store.editableReducer.variables.peakHourRange?.value,
  planType: store.planReducer.planType,
  progress: store.clientReducer.progress,
  screen: store.planReducer.screenSelected,
  selectedDays: store.planReducer.spotPlan.selectedDays,
  totalSpots: store.planReducer.spotPlan.totalSpots,
  startHour: store.planReducer.spotPlan?.startHour || store.editableReducer.variables.minInitialHour?.value,
  endHour: store.planReducer.spotPlan?.endHour || store.editableReducer.variables.maxEndHour?.value,
})

const mapDispatchToProps = dispatch => {
  return {
    setProgress: data => { dispatch(setProgress(data)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StatsSummary)