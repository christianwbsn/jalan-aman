/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import Dialog from 'material-ui/Dialog';

import { connect } from 'react-redux';

@connect(
  state => ({
    isAuthenticated: state.auth.isAuthenticated,
  }),
)
export default class ReportForm extends Component {
	constructor(props) {
		super(props);

    this.state = {
      isDialogOpen: false,
      isReportValid: false,
      dialogContent: [],
    };

    this.submitForm = this.submitForm.bind(this);
    this.getVal = this.getVal.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.validateReport = this.validateReport.bind(this);
	}

  handleOpen() {
    this.setState({ isDialogOpen: true });
  };

  handleClose() {
    this.setState({ isDialogOpen: false });
  };

  getVal(refName) {
    return this.refs[refName].input.value;
  }

  validateReport(report) {
    const { nama, telpon, lokasiKejadian, TanggalWaktuKejadian, deskripsi } = report;
    const errors = [];

    if (nama.length < 1) errors.push('Nama kosong!');
    if (!(/^\d+$/.test(telpon))) errors.push('Nomor telpon hanya boleh mengandung angka!');
    if (lokasiKejadian.length < 1) errors.push('Lokasi kosong!');
    if (TanggalWaktuKejadian.length <= 5) errors.push('Masukkan tanggal dan waktu kejadian!');
    if (deskripsi.length < 1) errors.push('Deskripsi kosong!');
    if (deskripsi.length > 320) errors.push('Deskripsi terlalu panjang (maks 320 karakter)');

    if (errors.length > 0) {
      console.log(errors.join('\n'));
      this.setState({ dialogContent: errors, isDialogOpen: true, isReportValid: false });
    } else {
      //
      //
      // TODO: SEND FORM KE BACKEND, HANDLE ASYNC, TERUS PANGGIL REDUX LOAD REPORT
      //
      //
      this.setState({ dialogContent: ['Data sudah kami simpan'], isDialogOpen: true, isReportValid: true });
    }
  }

  submitForm(e) {
    if (!this.props.isAuthenticated) {
      alert('blom login coy')
      return;
    }
    e.preventDefault();
    let nama = this.getVal('nama');
    let telpon = this.getVal('telpon');
    let lokasiKejadian = this.getVal('lokasiKejadian');
    let tanggalKejadian = this.refs.tanggalKejadian.state.date;
    let waktuKejadian = this.refs.waktuKejadian.state.time;
    let deskripsi = this.getVal('deskripsi');

    let tanggal = '', bulan = '', tahun = '', jam = '', menit = '', detik = '';
    if (tanggalKejadian && waktuKejadian) {
      tanggal = tanggalKejadian.getDate().toString();
      bulan = (tanggalKejadian.getMonth() + 1).toString();
      tahun = tanggalKejadian.getFullYear().toString();
      jam = waktuKejadian.getHours().toString();
      menit = waktuKejadian.getMinutes().toString();

      if (menit.length < 2) menit = '0' + menit;
      if (jam.length < 2) jam = '0' + jam;
    }

    let parsedTanggalKejadian = tanggal + '-' + bulan + '-' + tahun;
    let parsedWaktuKejadian = jam + ':' +  menit;
    let TanggalWaktuKejadian = parsedTanggalKejadian + ' ' + parsedWaktuKejadian;

    const laporan = { nama, telpon, lokasiKejadian, TanggalWaktuKejadian, deskripsi };
    this.validateReport(laporan);
  }



	render() {
    const { dialogContent, isReportValid } = this.state;
    console.log(typeof dialogContent);
		return (
			<MuiThemeProvider>
        <div>
  				<form>
            <TextField ref={'nama'} floatingLabelText="Nama Pelapor"/><br />
            <TextField ref={'nama'} floatingLabelText="Nama Pelapor"/><br />
            <TextField ref={'telpon'} floatingLabelText="Nomor Telpon"/><br />
            <TextField ref={'lokasiKejadian'} floatingLabelText="Lokasi Kejadian"/><br /><br />
            <DatePicker ref={'tanggalKejadian'} hintText="Tanggal Kejadian" /><br />
            <TimePicker ref={'waktuKejadian'} hintText="Waktu Kejadian" />
            <TextField ref={'deskripsi'} floatingLabelText={'Deskripsi Kegiatan'} /><br />
            <RaisedButton label="Submit Laporan" onClick={this.submitForm} primary={true}/>
  				</form>
          <Dialog
            title={isReportValid ? 'Submit Laporan Berhasil!' : 'Submit Laporan Gagal!'}
            modal={false}
            open={this.state.isDialogOpen}
            onRequestClose={this.handleClose}
          >
            <div>
              {dialogContent.map(message => <h5>{message}</h5>)}
            </div>
          </Dialog>
        </div>
			</MuiThemeProvider>
		);
	}
}