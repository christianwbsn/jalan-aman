/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import request from 'superagent';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import Dialog from 'material-ui/Dialog';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import { connect } from 'react-redux';

import { sendValidatedReport } from '../../services/api';

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
      jenisKejahatan: 1
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

  sendForm(report) {
    request.post('https://api.jalanaman.ga/')
  }

  validateReport(report) {
    const { title, phone, address, datetime, description, lat, lng } = report;
    const errors = [];

    if (title.length < 1) errors.push('Nama kosong!');
    if (!(/^\d+$/.test(phone))) errors.push('Nomor telpon hanya boleh mengandung angka!');
    if (address.length < 1) errors.push('Lokasi kosong!');
    if (datetime.length <= 5) errors.push('Masukkan tanggal dan waktu kejadian!');
    if (description.length < 1) errors.push('Deskripsi kosong!');
    if (description.length > 320) errors.push('Deskripsi terlalu panjang (maks 320 karakter)');

    if (errors.length > 0) {
      console.log(errors.join('\n'));
      this.setState({ dialogContent: errors, isDialogOpen: true, isReportValid: false });
    } else {
      sendValidatedReport(report).then(() => {
        this.setState({ dialogContent: ['Data sudah kami simpan'], isDialogOpen: true, isReportValid: true });
      });
    }
  }

  submitForm(e) {
    if (!this.props.isAuthenticated) {
      alert('blom login coy')
      return;
    }
    e.preventDefault();
    let title = this.getVal('nama');
    let phone = this.getVal('telpon');
    let address = this.getVal('lokasiKejadian');
    let tanggalKejadian = this.refs.tanggalKejadian.state.date;
    let waktuKejadian = this.refs.waktuKejadian.state.time;
    let description = this.getVal('deskripsi');
    let lat = this.props.location.lat;
    let lng = this.props.location.lng;
    let tag = [ ['Begal', 'Pencurian', 'Pelecahan'][this.state.jenisKejahatan - 1] ];

    let tanggal = '', bulan = '', tahun = '', jam = '', menit = '', detik = '';
    if (tanggalKejadian && waktuKejadian) {
      tanggal = tanggalKejadian.getDate().toString();
      bulan = (tanggalKejadian.getMonth() + 1).toString();
      tahun = tanggalKejadian.getFullYear().toString();
      jam = waktuKejadian.getHours().toString();
      menit = waktuKejadian.getMinutes().toString();
      detik = waktuKejadian.getSeconds().toString();
      if (bulan.length < 2) bulan = '0' + bulan;
      if (tanggal.length < 2) tanggal = '0' + tanggal;
      if (menit.length < 2) menit = '0' + menit;
      if (jam.length < 2) jam = '0' + jam;
      if (detik.length < 2) detik = '0' + detik;
    }

    let parsedTanggalKejadian = tahun + '-' + bulan + '-' + tanggal;
    let parsedWaktuKejadian = jam + ':' +  menit + ':' + detik;
    let datetime = parsedTanggalKejadian + ' ' + parsedWaktuKejadian;

    const report = { title, phone, address, datetime, description, lat, lng , tag };
    this.validateReport(report);
  }

  handleSelect(event, index, value) {
    console.log(value);
    this.setState({ jenisKejahatan: value });
  }



	render() {
    const { dialogContent, isReportValid } = this.state;
    const { location } = this.props;
		return (
			<MuiThemeProvider>
        <div>
  				<form>
            <TextField ref={'nama'} floatingLabelText="Nama Pelapor"/><br />
            <TextField ref={'telpon'} floatingLabelText="Nomor Telpon"/><br />
            <TextField ref={'lokasiKejadian'} floatingLabelText="Lokasi Kejadian"/><br /><br />
            <DatePicker ref={'tanggalKejadian'} hintText="Tanggal Kejadian" /><br />
            <TimePicker ref={'waktuKejadian'} hintText="Waktu Kejadian" />
            <TextField ref={'deskripsi'} floatingLabelText={'Deskripsi Kegiatan'} /><br />
            <SelectField
              floatingLabelText="Jenis Kejahatan"
              value={this.state.jenisKejahatan}
              onChange={::this.handleSelect}
            >
              <MenuItem value={1} primaryText="Begal" />
              <MenuItem value={2} primaryText="Pencurian" />
              <MenuItem value={3} primaryText="Pelecehan" />
            </SelectField>
            <RaisedButton label="Submit Laporan" onClick={this.submitForm} primary={true}/>
  				</form>
          <Dialog
            title={isReportValid ? 'Submit Laporan Berhasil!' : 'Submit Laporan Gagal!'}
            modal={false}
            open={this.state.isDialogOpen}
            onRequestClose={this.handleClose}
          >
            <div>
              {dialogContent.map((message, key) => <h5 ket={key}>{message}</h5>)}
            </div>
          </Dialog>
        </div>
			</MuiThemeProvider>
		);
	}
}