require('dotenv').config();
const {Product} = require('../server')

const {send} = require('../../src/classes/socket');

const tk = process.env.SECURITY_TOKEN;

module.exports = {
  async index(req, res) {
    const { token } = req.headers; 

    if (token !== tk)  return  res.status(401).json({status: "Error: Invalid token"});
    
    const product = await Product.find();
    
    return res.status(200).json(product);
  }, 
  async store(req, res) {
    const { token } = req.headers; 

    if (token !== tk)  return  res.status(401).json({status: "Error: Invalid token"});

    const product = await Product.create(req.body);
    
    return res.status(200).json({status: "Success, new item has been created",body: product});
  },
  async show(req, res) {
    const { token } = req.headers; 

    if (token !== tk)  return  res.status(401).json({status: "Error: Invalid token"});

    const product = await Product.findById(req.params.id);

    return res.status(product == null ?404:200 ).json(product == null?{status: "Error: 404"}:product);
  },
  async update(req, res) {
    const { token } = req.headers; 

    if (token !== tk)  return  res.status(401).json({status: "Error: Invalid token"});

    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new :true} );

    if (product!=null)  send(product);

    return res.status(product == null ?404:200 ).json(product == null?{status: "Error: 404"}:{status: "Success, updated and purged by socket.io",body: product });
  },
  async destroy(req, res) {
    const { token } = req.headers; 

    if (token !== tk)  return  res.status(401).json({status: "Error: Invalid token"});

    const product = await Product.findByIdAndRemove(req.params.id);

    return res.status(product == null ?404:200 ).json(product == null?{status: "Error: 404"}:{status: "Success, item destroyed"});
  },

};