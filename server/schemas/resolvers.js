const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signinToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) =>
        {
            if (context.user)
            {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                return userData;
            }
            throw new AuthenticationError('Authentication Error');
        }
    },

    Mutation: {
        login: async (parent, { email, password }) =>
        {
            const user = await User.findOne({ email });

            if (!user)
            {
                throw new AuthenticationError('Invalid Entry');
            }

            const correctPassword = await user.isCorrectPassword(password);

            if (!correctPassword)
            {
                throw new AuthenticationError('Invalid Entry');
            }

            const token = signinToken(user);
            return { token, user };
        },
        addUser: async (parent, args) =>
        {
            const user = await User.create(args);
            const token = signinToken(user);

            return { token, user };
        },
        saveBook: async (parent, args, context) =>
        {
            if (context.user)
            {
                const userUpdate = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { savedBooks: args.bookData } },
                    { new: true }
                );

                return userUpdate;
            }

            throw new AuthenticationError("Need to log-in to save books");
        },
        removeBook: async (parent, args, context) =>
        {
            if (context.user)
            {
                const userUpdate = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId: args.bookId } } },
                    { new: true }
                );

                return userUpdate;
            }

            throw new AuthenticationError("Need to log-in to remove books");
        }
    }
};

module.exports = resolvers;