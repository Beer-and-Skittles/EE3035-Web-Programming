const Mutation = {
  createItem: async (parent, { input }, {itemModel, pubSub}) => {
    const newItem = new itemModel(input);
    await newItem.save();
    pubSub.publish("ITEM_CREATED", {
      itemCreated: newItem,
    });
    return newItem;
  },

  updateItem: async (parent, { input }, {itemModel, pubSub}) => {
    const item = await itemModel.findOneAndUpdate(
      { id: input.id },
      {
        $set: {
          name: input.name,
          amount: input.amount,
          category: input.category,
          date: input.date,
          description: input.description,
        },
      }
    );
    const newItem = {
      id: input.id ?? item.id,
      name: input.name ?? item.name,
      amount: input.amount ?? item.amount,
      category: input.category ?? item.category,
      date: input.date ?? item.date,
      description: input.description ?? item.description,
    }
    pubSub.publish("ITEM_UPDATED", {
      itemUpdated: newItem,
    });
    return newItem;
  },
  // TODO 5.2 Define the itemDelete mutation resolver
  // TODO 6.3 Publish itemDeleted
  deleteItem: async (parent, args, {itemModel, pubSub}) => {

    await itemModel.deleteOne({id: args.id});
    pubSub.publish("ITEM_DELETED",{
      itemDeleted: args.id,
    });
    return args.id;
  },
  // TODO 5.2 End
  // TODO 6.3 End

};

export default Mutation;
