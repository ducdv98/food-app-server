const mongoose = require("mongoose");
const OrderStatus = require("../common/order-status");
const validator = require("validator");

const paymentDetailsSchema = new mongoose.Schema({
    sub_total: { type: Number, required: true, default: 0 },
    shipping_fee: { type: Number, required: true, default: 0 },
    total: { type: Number, required: true, default: 0 },
});


const deliveryInfoSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone_number: {
        type: String,
        required: true,
        validate: (value) => {
            if (!validator.isMobilePhone(value, ["vi-VN"])) {
                throw new Error({ error: "Invalid phone number" });
            }
        },
    },
    address: { type: String, required: true }
});

const orderItemSchema = new mongoose.Schema({
    id: { type: String, required: true },
    amount: {
        type: Number,
        required: true,
        validate: (value) => {
            if (value <= 0) {
                throw new Error({ error: "Amount must not be less than 0" });
            }
        },
    },
    note: { type: String },
});

const orderSchema = new mongoose.Schema({
    id: { type: String, unique: true, required: true },
    uid: { type: String, required: true },
    items: [orderItemSchema],
    delivery_info: { type: deliveryInfoSchema, default: {}, required: true },
    payment_details: { type: paymentDetailsSchema, default: {}, required: true },
    timestamp: { type: Date, required: true },
    status: { type: String, required: true, default: OrderStatus.SUBMITTED }
});

const OrderItem = mongoose.model("orderItem", orderItemSchema);
const Order = mongoose.model("order", orderSchema);
const DeliveryInfo = mongoose.model("deliveryInfo", deliveryInfoSchema);
const PaymentDetails = mongoose.model("paymentDetails", paymentDetailsSchema);

module.exports = {
    OrderItem,
    Order,
    DeliveryInfo,
    PaymentDetails,
};
