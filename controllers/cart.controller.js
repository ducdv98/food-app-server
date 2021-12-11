const { Cart, CartItem } = require("../model/cart");

const getCart = async (req, res) => {
  try {
    const uid = req.user.id;

    const cart = await Cart.findOne({ id: uid });

    if (!cart) {
      return res.status(200).send([]);
    } else {
      const items = cart.items.map((item) => ({
        id: item.id,
        amount: item.amount,
        note: item.note,
      }));

      return res.status(200).send(items);
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

const updateCart = async (req, res) => {
  try {
    const uid = req.user.id;
    const newItem = req.body;

    const cart = await Cart.findOne({ id: uid });


    if (!cart) {
      console.log(newItem)

      const updatedCart = await Cart.create({
        id: uid,
        items: [newItem],
      });

      const items = updatedCart.items.map((item) => ({
        id: item.id,
        amount: item.amount,
        note: item.note,
      }));
      return res.status(200).send(items);
    } else {
      const items = cart.items.filter((item) => item.id !== newItem.id);

      if (newItem.amount > 0) {
        items.push(newItem);
      }

      await Cart.updateOne({ id: uid }, { items });

      const updatedItems = items.map((item) => ({
        id: item.id,
        amount: item.amount,
        note: item.note,
      }));

      return res.status(200).send(updatedItems);
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  getCart,
  updateCart,
};
