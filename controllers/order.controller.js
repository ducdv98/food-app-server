const { Cart } = require("../model/cart");
const { Order } = require("../model/order");
const Dish = require("../model/dish");
const { OrderStatus } = require("../common/order-status");
const shortid = require("shortid");

const getUserOrders = async (req, res) => {
    try {
        const uid = req.user.id;

        const orders = await Order.find({ uid }).select('id uid items payment_details delivery_info timestamp status -_id').sort({ timestamp: -1 });
        return res.status(200).send(orders);
    } catch (error) {
        res.status(400).send(error);
    }
};

const createOrderFromCart = async (req, res) => {
    try {
        const uid = req.user.id;
        const delivery_info = req.body;

        const cart = await Cart.findOne({ id: uid });

        if (!cart) {
            return res.status(400).send({ error: 'Cart is empty!' });
        } else {
            const cartItems = cart.items;

            const dishes = await Dish.find({}).select(
                "id name desc category ingredient type price images category -_id"
            );

            const items = cartItems.map(i => {
                const dish = dishes.find(d => d.id.localeCompare(i.id) === 0);

                return {
                    ...i._doc,
                    ...dish._doc
                };
            });


            const sub_total = items.reduce((total, current) => {
                return total + (current.amount) * (current.price);
            }, 0);

            const shipping_fee = 20000;
            const total = sub_total + shipping_fee;

            const order = {
                id: shortid.generate(),
                uid,
                items: cartItems,
                delivery_info,
                payment_details: {
                    sub_total,
                    shipping_fee,
                    total
                },
                timestamp: new Date(),
                status: OrderStatus.SUBMITTED
            };

            const result = new Order(order);

            await result.save();

            await Cart.deleteOne({ id: uid });

            return res.status(200).send(result);
        }
    } catch (error) {
        res.status(400).send(error);
    }
};

module.exports = {
    getUserOrders,
    createOrderFromCart,
};
