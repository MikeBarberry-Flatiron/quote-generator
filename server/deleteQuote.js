import { MongoClient, ObjectId } from 'mongodb';

const client = new MongoClient(process.env.MONGO_URI);

export const handler = async (event) => {
  const body = JSON.parse(event.body);
  const id = body.id;
  const db = client.db('quotegen');
  const collection = db.collection('quotes');

  try {
    const quote = await collection.findOne({ _id: ObjectId(id) });

    const stringifiedQuote = {
      id: quote._id.toString(),
      quote: quote.quote,
      show_id: quote.show_id.toString(),
    };

    await collection.deleteOne({ _id: ObjectId(id) });

    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: {
          note: 'Quote Successfully Deleted!',
          quote: stringifiedQuote,
        },
      }),
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    };
    return response;
  } catch (err) {
    console.log('error', err);
    const response = {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    };
    return response;
  }
};
