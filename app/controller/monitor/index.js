const express = require('express');
const Monitor = require('../../../lib/service/monitor');

const router = express.Router();
/**
 * This is the controller class for the Monitor functionality
 */
class MonitorController {
  /**
   * [createMonitor this is the controller function which take care of the new Monitor]
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  createMonitor(req, res) {
    const MonitorObj = new Monitor();
    const params = req.body;
    MonitorObj.createMonitor(params, (err, result) => {
      const endTime = new Date();

      if (err)
        return res
          .status(500)
          .json({ error: err, responseTime: endTime - req.start });
      res.status(200).json({
        msg: result.msg || 'Successfully created the Monitor.',
        isError: false,
        isInserted: true,
        data: result,
        responseTime: endTime - req.start,
      });
    });
  }
  /**
   * [getMonitor this function is called when the client request for the Monitor details]
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  getMonitor(req, res) {
    const params = {};
    params.monitorId = req.params.id;
    const MonitorObj = new Monitor();
    MonitorObj.getMyMonitor(params, (err, result) => {
      //const end = new Date();
      //const MonitorObj = new Monitor();
      //const responseTime = end - req.start;
      //MonitorObj.saveResponseTime({ urlId: req.params.id, responseTime });
      if (err) return res.status(500).json(err);
      return res.status(200).json({
        msg: result.msg || 'Successfully got the desired Monitor.',
        isError: false,
        isFetched: true,
        data: result,
      });
    });
  }
  /**
   * [updateMonitor function  to update the monitor data]
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  updateMonitor(req, res) {
    const MonitorObj = new Monitor();
    const params = req.body;
    params.monitorId = req.params.id;
    MonitorObj.updateMonitor(params, (err, result) => {
      if (err) return res.status(500).json(err);

      res.status(200).json({
        msg: result.msg || 'Successfully update Monitor.',
        isError: false,
        isUpdated: true,
        data: result,
      });
    });
  }
  /**
   * [getMyMonitor function is used to fetch all the Monitor all record]
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  getAll(req, res) {
    const params = {};
    const MonitorObj = new Monitor();
    MonitorObj.getAllMonitor(params, (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(200).json({
        msg: result.msg || 'Successfully got the desired Monitor.',
        isError: false,
        isFetched: true,
        data: result,
      });
    });
  }
  /**
   * [deleteMonitor function is called when user deletes a Monitor url ]
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  deleteMonitor(req, res) {
    const parameter = {
      monitorId: req.params.id,
    };
    const MonitorObj = new Monitor();
    MonitorObj.deleteMonitor(parameter, (err, result) => {
      if (err) return res.status(500).json(err);

      res.status(200).json({
        msg: result.msg || 'Successfully deleted Monitor.',
        isError: false,
        isDeleted: true,
      });
    });
  }
}
const MonitorRoute = new MonitorController();

router.post('/', MonitorRoute.createMonitor);
router.get('/', MonitorRoute.getAll);
router.get('/:id', MonitorRoute.getMonitor);
router.put('/:id', MonitorRoute.updateMonitor);
router.delete('/:id', MonitorRoute.deleteMonitor);
module.exports = router;
