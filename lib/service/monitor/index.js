const Models = require('../../../app/models');
const async = require('async');
const http = require('http');
const https = require('https');
/**
 * This is the service class for the Monitor functionalist all core business logic is defined here
 */
class Monitor {
  /**
   * [createMonitor function to create a new url record to monitor]
   * @param  {[type]}   params   [description]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  createMonitor(params, callback) {
    Models.Monitor.create(params, (insertErr, insertResult) => {
      if (insertErr) return callback(insertErr);

      return callback(null, insertResult);
    });
  }
  /**
   * [getMyMonitor function to get a info for the given mongering service]
   * @param  {[type]}   params   [description]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  getMyMonitor(params, callback) {
    if (!params.monitorId)
      return callback({ msg: 'Incorrect payload', success: false });
    const query = Models.Monitor.findOne();
    query.where({ _id: params.monitorId });
    query.lean();
    const responseQuery = Models.ResponseTime.find();
    responseQuery.where({ urlId: params.monitorId });
    responseQuery.select({ responseTime: 1, _id: 0 });
    responseQuery.sort({ createdAt: -1 });
    responseQuery.limit(100);
    responseQuery.lean();
    async.parallel(
      [
        cb => {
          query.exec(cb);
        },
        cb => {
          responseQuery.exec(cb);
        },
      ],
      (error, result) => {
        if (error) return callback(error);
        if (result[0] === null) return callback({ msg: 'no records found' });
        let timeArray = [];
        timeArray = result[1].map(item => {
          return item.responseTime;
        });
        const responseObj = result[0];
        responseObj.responseArr = timeArray;
        responseObj.percentile_50 = this.getPercentile(timeArray, 0.5);
        responseObj.percentile_75 = this.getPercentile(timeArray, 0.75);
        responseObj.percentile_95 = this.getPercentile(timeArray, 0.95);
        responseObj.percentile_99 = this.getPercentile(timeArray, 0.99);

        return callback(null, responseObj);
      },
    );
  }
  /**
   * [deleteMonitor function to delete the mongering service by Id]
   * @param  {[type]}   params   [description]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  deleteMonitor(params, callback) {
    if (!params.monitorId) return callback({ msg: 'Incorrect payload' });

    Models.Monitor.deleteOne({ _id: params.monitorId }, (error, result) => {
      if (error) return callback(error);

      return callback(null, result);
    });
  }
  /**
   * [getAllMonitor function to get all the mongering data]
   * @return {[type]} [description]
   */
  getAllMonitor(params, callback) {
    const query = Models.Monitor.find();
    query.where({});
    query.lean();
    query.exec((error, result) => {
      if (error) return callback(error);

      return callback(null, result);
    });
  }
  /**
   * [updateMonitor function to update the monitor data]
   * @param  {[type]}   params   [description]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  updateMonitor(params, callback) {
    if (!params.monitorId) return callback({ msg: 'Incorrect payload' });
    const monitorId = params.monitorId;
    delete params.monitorId;
    Models.Monitor.updateOne({ _id: monitorId }, params, (error, result) => {
      if (error) return callback(error);
      return callback(null, result);
    });
  }
  /**
   * [saveResponseTime function to insert the response time for every URL after the response is made]
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  saveResponseTime(params) {
    const query = Models.ResponseTime.findOne();
    const objectToInsert = {};
    objectToInsert.urlId = params.urlId;
    objectToInsert.responseTime = params.responseTime;
    Models.ResponseTime.create(objectToInsert, (error, result) => {
      if (error) console.log(error);
      //console.log(result);
    });
  }
  /**
   * [getPercentile function to calculate the percentile from an array]
   * @param  {[type]} timeArry [description]
   * @param  {[type]} point    [description]
   * @return {[type]}          [description]
   */
  getPercentile(timeArry, point) {
    const index = parseInt(timeArry.length * point);

    return timeArry.sort((a, b) => {
      return a - b;
    })[index];
  }
  /**
   * [makeRequest function to make a request every second]
   * @return {[type]} [description]
   */
  makeRequest() {
    this.getAllMonitor({}, (error, result) => {
      if (error) console.log(result);
      result.forEach(element => {
        //console.log(element);
        const start = new Date();
        try {
          http.get(element.url, res => {
            res.on('data', (err, resultArr) => {
              const responseTime = new Date() - start;
              //console.log(responseTime, 'response time');

              this.saveResponseTime({ urlId: element._id, responseTime });
            });
          });
        } catch (logErr) {
          console.log(logErr);
        }
      });
    });
  }
}

module.exports = Monitor;
