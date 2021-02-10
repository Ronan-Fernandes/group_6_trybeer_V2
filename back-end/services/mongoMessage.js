require('dotenv').config();
const connection = require('./connection');

const getAllMessages = async (userId) => {
  try {
    const db = await connection();
    console.log('inside getAllMessages db', userId);
    const allMessages = await db.collection('messages').find(userId).toArray();
    console.log('inside getAllMessages db allMessages', allMessages);
    return allMessages;
  } catch (err) {
    console.log('Error', err);
  }
};

const storeMessage = async (payload, clientEmail) => {
  try {
    console.log('storeMessage', payload, clientEmail);
    // const dateToStore = dayjs(new Date()).format('DD-MM-YYYY hh:mm:ss');
    // const { userId } = payload;
    const db = await connection();

    await db
      .collection('messages')
      .updateOne(
        { userId: clientEmail },
        { $push: { messages: payload } },
        { upsert: true },
      );

    return 'message stored';
  } catch (err) {
    console.log('Error', err);
  }
};

module.exports = {
  getAllMessages,
  storeMessage,
};
