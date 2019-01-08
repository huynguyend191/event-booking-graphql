const bcrypt = require('bcryptjs');

const Event = require('../../models/event');
const User = require('../../models/user');

const user = async userId => {
  try {
    const user = await User.findById(userId)
    return {
      ...user._doc,
      _id: user.id,
      password: null,
      createdEvents: events.bind(this, user._doc.createdEvents)
    };
  } catch (error) {
    throw error;
  }
};

const events = async eventIds => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } })
    return events.map(event => {
      return {
        ...event._doc,
        _id: event.id,
        creator: user.bind(this, event.creator),
        date: new Date(event._doc.date).toISOString()
      };
    })
  } catch (error) {
    throw error;
  }
}

module.exports = {
  events: async () => {
    try {
      const events = await Event.find()
      return events.map(event => {
        return {
          ...event._doc,
          _id: event.id,
          creator: user.bind(this, event._doc.creator),
          date: new Date(event._doc.date).toISOString()
        };
      })
    } catch (error) {
      throw error;
    }
  },

  createEvent: async (args) => {
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date),
      creator: '5c34c538e86b740cc0306a4e'
    });
    let createdEvent;
    try {
      const result = await event.save();
      createdEvent = {
        ...result._doc,
        _id: result.id,
        date: new Date(result._doc.date).toISOString(),
        creator: user.bind(this, result._doc.creator)
      };
      const creator = await User.findById('5c34c538e86b740cc0306a4e');
      if (!creator) {
        throw new Error('User not found');
      }
      creator.createdEvents.push(event);
      await creator.save();
      return createdEvent;
    } catch (error) {
      throw(error);
    }
  },

  createUser: async (args) => {
    try {
      const existingUser = await User.findOne({ email: args.userInput.email })
      if (existingUser) {
        throw new Error('User already exists');
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12)
      const user = new User({
        email: args.userInput.email,
        password: hashedPassword
      });
      const result = await user.save()
      return { ...result._doc, _id: result.id, password: null }
    } catch (error) {
      throw(error)
    }
  }
}