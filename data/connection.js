const mongoose = require("mongoose");
if (!process.env.MONGODB_URL)throw new Error('The required environment variable, MONGODB_URL does not exist or has no value');
let connection;

const getConnection = async () => {
    if (!connection) {
        let mStr = process.env.MONGODB_URL;
        //if the last character is not a /, add one
        if( mStr.substr(mStr.length - 1) !== "/") {
            mStr = mStr + "/";
        }
        const url = `${mStr}${process.env.RESELLER_DB_NAME}`;
        let conn;
        console.log(`Attempting to connect at url: ${url}.`)
        conn = await mongoose.connect(url).catch(e =>{
            console.error(e);
            throw e;
        });
        connection = conn;
    }
    return connection
}

const closeConnection = async () => {
    if (connection) {
        const url = connection.url;
        console.log(`Closing connection into ${url}`);
        connection.disconnect();
        console.log(`Closed connection into ${url}`);
    }
}

const getConnectionUrlSync = () => {
    return `${process.env.MONGODB_URL}/${process.env.RESELLER_DB_NAME}`;
};

module.exports = {getConnection, closeConnection, getConnectionUrlSync};

