const { OrderStatus } = require("../common/order-status");
const { Order } = require("../model/order");
const User = require("../model/user");
const Dish = require("../model/dish");
const Category = require("../model/category");
const dateFns = require('date-fns');
const { UserRoles } = require("../common/user-roles");
const shortid = require("shortid");

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).sort({ timestamp: -1 })
            .select('id uid items payment_details delivery_info timestamp status -_id');
        return res.status(200).send(orders);
    } catch (error) {
        res.status(400).send(error);
    }
}

const getOrderById = async (req, res) => {
    try {
        const id = req.params.id;
        const order = await Order.findOne({ id }).sort({ timestamp: -1 })
            .select('id uid items payment_details delivery_info timestamp status -_id');
        return res.status(200).send(order);
    } catch (error) {
        res.status(400).send(error);
    }
}

const updateOrderStatus = async (req, res) => {
    try {
        const { id, status } = req.body;

        const statuses = Object.values(OrderStatus);

        if (!statuses.includes(status)) {
            return res.status(400).send({ 'error': 'Invalid status.' });
        }

        const order = await Order.findOne({ id });

        if (order.status === OrderStatus.DELIVERED || order.status === OrderStatus.CANCELLED) {
            return res.status(400).send({ 'error': 'Can not update finished order.' });
        }

        const result = await Order.updateOne({ id }, { status });

        return res.status(200).send({ id, status });

    } catch (error) {
        res.status(400).send(error);
    }
}


const getStatistics = async (req, res) => {
    try {
        const todayOrders = await Order.find({
            timestamp: {
                $gte: dateFns.startOfDay(new Date()),
                $lte: dateFns.endOfDay(new Date())
            }
        }).select('id uid items payment_details delivery_info timestamp status -_id');

        const todayRevenue = todayOrders.reduce((revenue, current) => {
            return revenue + current.payment_details.total;
        }, 0);


        const allOrders = await Order.find({}).select('id uid items payment_details delivery_info timestamp status -_id');

        const totalRevenue = allOrders.reduce((revenue, current) => {
            return revenue + current.payment_details.total;
        }, 0);

        const allUsers = await User.find({ role: UserRoles.USER }).select('id -_id');
        const allDishes = await Dish.find({}).select("id -_id");
        const allCategories = await Category.find({}).select("id -_id");

        const result = {
            todayOrders: todayOrders.length,
            todayRevenue,
            totalRevenue,
            totalUsers: allUsers.length,
            totalDishes: allDishes.length,
            totalCategories: allCategories.length,
        };


        return res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error);
    }
}


const createCategory = async (req, res) => {
    try {
        const { name, desc } = req.body;
        const id = shortid.generate();

        const category = await Category.create({ name, desc, id });

        return res.status(200).send({ name, desc, id });

    } catch (error) {
        res.status(400).send(error);
    }
}

const updateCategory = async (req, res) => {
    try {
        const { id, name, desc } = req.body;

        const category = await Category.findOne({ id });

        if (!category) {
            return res.status(400).send({ error: "Category not existed!" })
        }

        await Category.updateOne({ id }, { name, desc });

        return res.status(200).send({ name, desc, id });

    } catch (error) {
        res.status(400).send(error);
    }
}
const createDish = async (req, res) => {
    try {
        const { name, desc, price, images, category } = req.body;

        const id = shortid.generate();

        const dish = await Dish.create({ name, desc, price, images, category, id });

        return res.status(200).send({ name, desc, price, images, category, id });

    } catch (error) {
        res.status(400).send(error);
    }
}

const updateDish = async (req, res) => {
    try {
        const { id, name, desc, price, images, category } = req.body;

        const dish = await Dish.findOne({ id });

        if (!dish) {
            return res(400).send({ error: "Dish not existed!" })
        }

        await Dish.updateOne({ id }, { name, desc, price, images, category });

        return res.status(200).send({ name, desc, price, images, category, id });

    } catch (error) {
        res.status(400).send(error);
    }
}

module.exports = {
    getOrders,
    updateOrderStatus,
    getOrderById,

    getStatistics,

    createCategory,
    updateCategory,
    createDish,
    updateDish,
};
