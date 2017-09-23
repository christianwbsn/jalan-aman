/* eslint-disable */
import React, { Component } from 'react';
import request from 'superagent';

export default class ReportDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: [],
    };

    this.getComments();

    this.getComments = this.getComments.bind(this);
    this.getLatestReportComments = this.getLatestReportComments.bind(this);
  }

  getComments() {
    // comment = username, comment
    this.getLatestReportComments()
      .then(res => {
        try {
          // TODO: KALO UDH KONEK BENER, SAMBUNGIN SAMA STATE COMMENTS
          const data = JSON.parse(res.text).data;
          this.setState({ comments: [{  }] })
        } catch (err) {
          // pass
        }
      })
      .catch(err => {
        console.log('ERROR BANGGGGGGGG');
        console.log(err);
      });
  }

  getLatestReportComments() {
    return new Promise((resolve, reject) => {
      // TODO: KONEK KE API YG BENERAN HEHE
      request
        .get('http://168.235.69.213/report/all')
        .end((err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
    });
  }

  sendNewComment() {
    return new Promise((resolve, reject) => {
      request
        .post('http://168.235.69.213/report/allzz')
        .end((err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
    });
  }

  render() {
    const { title, parsedDate, parsedTime, address, description, id } = this.props;

    return (
      <div>
        <h4>{title}</h4>
        <h4>{parsedDate}</h4>
        <h4>{parsedTime}</h4>
        <h4>{address}</h4>
        <h4>{description}</h4>
      </div>
    );
  }
}