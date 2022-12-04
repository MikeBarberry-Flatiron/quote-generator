import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGO_URI);

export const handler = async (event) => {
  const db = client.db('quotegen');
  const collection = db.collection('shows');

  try {
    const showQuotes = await collection
      .aggregate([
        {
          $lookup: {
            from: 'quotes',
            localField: '_id',
            foreignField: 'show_id',
            as: 'quotes',
          },
        },
      ])
      .toArray();

    const cleansedData = showQuotes
      .map((show) => {
        const { _id, name, quotes } = show;
        const cleansedQuotes = quotes.map((quote) => {
          return {
            id: quote._id.toString(),
            quote: quote.quote,
            show_id: quote.show_id.toString(),
          };
        });
        return {
          id: _id.toString(),
          name,
          quotes: cleansedQuotes,
        };
      })
      .sort((a, b) => a.name - b.name);

    const response = {
      statusCode: 200,
      body: JSON.stringify(cleansedData),
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
    };
    return response;
  }
};
