import ChatBoxModel from '../models/chatbox.js'

const makeName = (name, to) => {
  return [name, to].sort().join('_');
}

const Query = {
  chatbox: async (parent, { name1, name2 }) => {
    // console.log('in query!', name1, name2);
    const name = makeName(name1, name2);
    // console.log('name is',name);
    let box = await ChatBoxModel.findOne({name});
    if (!box) 
      box = await new ChatBoxModel({name}).save();
    // console.log('box saved:',name1,name2);
    return box;
  },
};

export { Query as default };
