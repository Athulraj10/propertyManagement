
module.exports.getConfig = () => {
  const config = {
    'MODE': 'development',
    'MONGO_CONNECTION_STRING': process.env.MONGO_CONNECTION_STRING
  };
  return config;
};