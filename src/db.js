require('dotenv').config()
const { Sequelize } = require('sequelize')
const {DB_USER, DB_PASSWORD, DB_HOST,DATABASE_URL} = process.env
const BusinessModel = require('./models/Business')
const UserModel = require('./models/User')
const SuperuserModel = require('./models/Superuser')
const MsgReceivedModel = require("./models/MsgReceived");
const MsgSendModel = require("./models/MsgSend");

// const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/db_whatacart`,{logging:false, native: false})
// postgres://fl0user:FN3gLZ9Prvmq@ep-green-pine-55017894.us-east-2.aws.neon.tech:5432/whatacart-db?sslmode=require
const sequelize = new Sequelize(DATABASE_URL,{dialect:"postgres",logging:false})

BusinessModel(sequelize)
UserModel(sequelize)
SuperuserModel(sequelize)

//Associations

const { User, Superuser, Business, MsgReceived, MsgSend } = sequelize.models;

//First: business belongs to superuser and superuser has many business
Superuser.hasMany(Business)
Business.belongsTo(Superuser)

//Second: Users belongs to business and business has many user, the forening key is in user, BusinessId
User.belongsTo(Business)
Business.hasMany(User)

MsgReceived.belongsTo(Business);
Business.hasMany(MsgReceived);

MsgSend.belongsTo(Business);
Business.hasMany(MsgSend);


module.exports={
    User,
    Business,
    Superuser,
    conn: sequelize,
}