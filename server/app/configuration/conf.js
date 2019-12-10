module.exports = {
    isProduction: process.env.NODE_ENV === 'production',
    serverPort: process.env.PORT || 3000,
    mongoHost: process.env.DB_HOST,
    mongoDbName: process.env.DATA_BASE_NAME,
};