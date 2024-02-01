const mongoose = require("mongoose");
require("dotenv").config();
const conectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWARD}@cluster0.hsqsr7t.mongodb.net/testdb?retryWrites=true&w=majority`;
//const uri = `mongodb+srv://bhosaleajinkya1998:root@cluster0.hsqsr7t.mongodb.net/testdb?retryWrites=true&w=majority`;
const uri =`mongodb+srv://bhosaleajinkya1998:root@cluster0.fvealcv.mongodb.net/?retryWrites=true&w=majority`
const connexion = mongoose
  .connect(uri, conectionParams)
  .then(() => console.log("connected to cloud atlas"))
  .catch((err) => console.log(err));

module.exports = connexion;
