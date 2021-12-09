require('dotenv').config();
const Client = require('../models/Client')

const { sockets } = require('../server');

const tk = process.env.SECURITY_TOKEN;

module.exports = {
  async index(req, res) {
    console.log(app)
    const { token } = req.headers;
    if (token !== tk) return res.status(401).json({ status: "Error: Invalid token" });

    const client = await Client.find();

    return res.status(200).json(client);
  },
  async store(req, res) {
    const { token } = req.headers;

    if (token !== tk) return res.status(401).json({ status: "Error: Invalid token" });

    const client = await Client.create(req.body);

    return res.status(200).json({ status: "Success, new item has been created", body: client });
  },
  async show(req, res) {
    const { token } = req.headers;

    if (token !== tk) return res.status(401).json({ status: "Error: Invalid token" });

    const client = await Client.findById(req.params.id);

    return res.status(client == null ? 404 : 200).json(client == null ? { status: "Error: 404" } : client);
  },
  async update(req, res) {
    const { token } = req.headers;


    if (token !== tk) return res.status(401).json({ status: "Error: Invalid token" });

    const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (client != null) sockets.emitMessage(client);

    return res.status(client == null ? 404 : 200).json(client == null ? { status: "Error: 404" } : { status: "Success, updated and purged by socket.io", body: client });
  },
  async destroy(req, res) {
    const { token } = req.headers;

    if (token !== tk) return res.status(401).json({ status: "Error: Invalid token" });

    const client = await Client.findByIdAndRemove(req.params.id);

    return res.status(client == null ? 404 : 200).json(client == null ? { status: "Error: 404" } : { status: "Success, item destroyed" });
  },

};