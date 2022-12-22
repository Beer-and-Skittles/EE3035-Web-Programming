
const makeName = (name, to) => {
  return [name, to].sort().join('_');
}

const Subscription = {
  message: {
    subscribe: (parent, {from, to}, {pubsub}) => {
      console.log('in subscription');
      const chatBoxName = makeName(from, to);
      return pubsub.subscribe(`chatBox ${chatBoxName}`);
    },
  },
};

export { Subscription as default };
