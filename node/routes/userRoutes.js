const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const shortid = require('shortid');

const adapter = new FileSync('db.json');
const db = low(adapter);

module.exports = (app) => {

  app.get(`/api/userlist`, async (req, res) => {
    const users = db.get('users').value();
    return res.status(200).send(users);
  });

  app.post(`/api/adduser`, async (req, res) => {
    const { name, email, password, uploadFileName, uploadImageBase64 } = req.body;
    const id = shortid.generate();
    var moment = require('moment');
    var time = moment();
    var timeStamps = time.format('YYYY-MM-DD HH:mm:ss Z');
    db
      .get('users')
      .push({ id, name, email, password, uploadFileName, uploadImageBase64,timeStamps })
      .write();

    const user = db.get('users')
      .find({ id })
      .value();

    return res.status(201).send({
      error: false,
      user
    });

  })

  app.put(`/api/updateuser`, async (req, res) => {
    const { id, name, email, password, uploadFileName, uploadImageBase64 } = req.body;

    db.get('users')
      .find({ id })
      .assign({ name, email, password, uploadFileName, uploadImageBase64 })
      .write();

    const user = db.get('users')
      .find({ id })
      .value();

    return res.status(202).send({
      error: false,
      user
    });
  });


}