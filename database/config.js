const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Conexión exitosa a la base de datos');
  } catch(err) {
    console.log(err);
    throw new Error('Error al conectar con la base de datos');
  }
}

module.exports = {
  dbConnection
}