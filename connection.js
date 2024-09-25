import { connect } from 'mongoose';

async function connectToDatabase(url) {
  try {
    await connect(url);
  } catch (error) {
    throw new Error(`Error While connection to db ${error.message}`);
  }
}

export { connectToDatabase };
