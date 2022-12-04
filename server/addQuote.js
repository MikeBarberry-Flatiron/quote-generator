import { MongoClient, ObjectId } from 'mongodb';

const client = new MongoClient(process.env.MONGO_URI);

export const handler = async (event) => {
  function getQuoteFromShow(show) {
    const quotesBank = {
      //Community
      '638c21169be83ed30898c5ba': [
        'Harrison Ford is irradiating our testicles with microwave satellite transmissions!',
        'Doing more than the minimum amount of work is my definition of failing.',
        'The next person that offers me charity or pity will be mentioned, by name, in my suicide note.',
        'I don’t have an ego. My Facebook photo is a landscape.',
        'Either I’m God, or truth is relative. Either way: booyah!',
        'I don’t step up to being a leader. I reluctantly accept it when it’s thrust upon me.',
        'Don’t talk to me about romance. I had a three way in a hot air balloon.',
        'Well I may be a genius, but I’m not a lesbian.',
        'I’m going to eat spaceman paninis with black Hitler and there’s nothing you can do about it!',
        'Do they find thoughts in our butts?',
        'I had sex with Eartha Kitt in an airplane bathroom.',
        'I was so unpopular in high school, the crossing guards used to lure me into traffic.',
        'A passing grade? Like a C? Why don’t I just get pregnant at a bus station?',
        'We’re all kind of crazytown bananapants.',
        'Make your money, whore.',
        'I know what a metaphor is! It’s like a thought with another thought’s hat on.',
        'Frankly, my dear, I don’t give a dean!',
        'I ate my twin in utero.',
        'Fire can’t go through doors, stupid. It’s not a ghost.',
        'You have just been proven racist by the racist prover!',
        'So… what is anthropology? Seriously, does anyone know?',
        'I quit doing blow, not being rad.',
        'I fear a political career could shine a negative light on my drug dealing.',
        'A little trick for achieving the proper competitive mindset: I always envision my opponent having aggresive sex with my mother.',
        'Look at me. It’s clear to you that I am awesome, but I can never admit that, because that would make me an ass.',
        'Some flies are too awesome for the wall.',
        'We’ll definitely be back next year. If not, it’ll be because an asteroid has destroyed all human civilization. And that’s canon.',
      ],
      //Game of Thrones
      '638c21459be83ed30898c5bb': [
        'There are no heroes...in life, the monsters win.',
        'Once you’ve accepted your flaws, no one can use them against you.',
        "And so he spoke, and so he spoke, that Lord of Castamere, but now the rains weep o'er his hall, with no one there to hear. Yes, now the rains weep o'er his hall, and not a soul to hear.",
        "A lion doesn't concern itself with the opinion of sheep.",
        'Fear cuts deeper than swords.',
        'The North remembers.',
        'Winter is coming.',
        'Do the dead frighten you?',
        "All dwarfs are bastards in their father's eyes",
        'Things are not always as they seemed, much that may seem evil can be good.',
        'Power is a curious thing. Who lives, Who dies. Power resides where men believe it resides. It is a trick, A shadow on the wall.',
        "Never forget who you are. The rest of the world won't. Wear it like an armor and it can never be used against you.",
        'Hodor? Hodor.',
        'Knowledge could be more valuable than gold, more deadly than a dagger.',
        'Every flight begins with a fall.',
        'Laughter is poison to fear.',
        'Nothing burns like the cold.',
        'Some old wounds never truly heal, and bleed again at the slightest word.',
        '... a mind needs books as a sword needs a whetstone, if it is to keep its edge.',
        'When you play a game of thrones you win or you die.',
        "Why is it that when one man builds a wall, the next man immediately needs to know what's on the other side?",
        'And I have a tender spot in my heart for cripples and bastards and broken things.',
        'When the snows fall and the white winds blow, the lone wolf dies but the pack survives.',
        "Give me honorable enemies rather than ambitious ones, and I'll sleep more easily by night.",
        'The things I do for love.',
        'Summer will end soon enough, and childhood as well.',
      ],
      //Hey Arnold
      '638c215e9be83ed30898c5bc': [
        "Stoop Kid's afraid to leave his stoop!",
        'MONKEYMAAAAN!',
        "You better not touch my gal, or I'll pop you in the kisser, pal",
        'Yahoo Soda Just Drink It',
        'I saw your face and wow!',
        'But you see, Arnold and tall hair boy, I don’t want to be famous! I want to live my life simply! I like my banana wallpaper, I like doing my own laundry! Just give me the simple things!',
        "Kitty, kitty, kitty, do you like to pet the kitty? I like to pet the kitty! Hey look! I'm petting the kitty!",
        "You're a bold kid, Arnold, a bold kid.",
        'Hey, short man!',
        'You keep the money!',
        'Suzie, make me a sandwich!',
        'But Gerald, the Jolly Olly Man is a stingy, mean spirited jerk, who hates kids and is constantly teetering on the brink of insanity.',
        "Can you get your arm off my shoulder? As I've told you many times before, I don't like you like you, I just like you.",
        'Move it, Footballhead',
        'Never eat raspberries.',
        "I'm okay!",
      ],
      //South Park
      '638c21769be83ed30898c5bd': [
        "Hippies. They're everywhere. They wanna save Earth, but all they do is smoke pot and smell bad",
        'They took our deers',
        'Kenny’s family is so poor that yesterday, they had to put their cardboard box up for a second mortgage',
        'Without evil there could be no good, so it must be good to be evil sometimes',
        "Dad, Tom Cruise won't come out of the closet!",
        'They took der derrs',
        "I'm not just sure, I'm HIV positive",
        "I don't make the rules Kyle, I simply think them up and write them down",
        "I'm just getting a little cancer Stan",
        'Respect my authoritaahh!!!',
        'Your mother was worried sick and I was here drinking beer',
        "Hey Panda Bear! We don't take kindly to your types around here.",
        "You know what they say: You can't teach a gay dog straight tricks",
        'They took our jobs',
        'Maybe we should send you to a concentration camp',
        'Life is short butters, & thats why you have to do whatever you want all the time',
        "No we haven't actually seen it Tom, we're just reporting it",
      ],
    };
    const showQuotes = quotesBank[show];
    function getQuote(showQuotes) {
      const index = Math.floor(Math.random() * showQuotes.length + 1);
      return showQuotes[index];
    }
    return getQuote(showQuotes);
  }
  const body = JSON.parse(event.body);
  const showId = body.id;
  const db = client.db('quotegen');
  const collection = db.collection('quotes');

  try {
    const newQuote = {
      quote: getQuoteFromShow(showId),
      show_id: ObjectId(showId),
    };

    const result = await collection.insertOne(newQuote);

    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: {
          note: 'Quote Successfully Created!',
          quote: {
            id: result.insertedId.toString(),
            quote: newQuote.quote,
            show_id: showId,
          },
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
      body: JSON.stringify({
        message: 'Internal Server Error',
      }),
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    };
    return response;
  }
};
