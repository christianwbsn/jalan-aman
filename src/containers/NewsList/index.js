import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NewsItem from '../../components/NewsItem';

export default class NewsList extends Component {
  // static propTypes = {
  //   reports: PropTypes.shapeOf({
  //     judul: PropTypes.string,
  //     lokasi: PropTypes.string,
  //     waktu: PropTypes.string,
  //     status: PropTypes.string,
  //     komentar: PropTypes.string,
  //   }).isRequired
  // };

  render() {
    const reports = [
      {
        judul: 'Begal di Cisitu',
        lokasi: 'Cisitu Lama',
        waktu: 'kemaren',
        status: 'udah basi',
        komentar: 'ini kerjain nanti deh',
      },
      {
        judul: 'Rampok di Tubis',
        lokasi: 'tubis...',
        waktu: 'dulu',
        status: 'ini cuma booangan',
        komentar: 'ini kerjain nanti deh',
      },
      {
        judul: 'cimbel aman',
        lokasi: 'cimbel',
        waktu: 'selalu',
        status: 'aman',
        komentar: 'ini kerjain nanti deh',
      },
    ];

    return (
      <div>
        {reports.map((report, key) => <NewsItem key={key} {...report} />)}
      </div>
    );
  }
}
