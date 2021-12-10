const Category = require("../model/category");

const sampleDishes = [
  {
    id: "fried_roasted_chicken",
    name: "Gà rán - Quay",
    desc: "Gà rán miền Nam Hoa Kỳ, hay còn gọi là gà rán, là một món ăn xuất xứ từ miền Nam Hoa Kỳ; Nguyên liệu chính là những miếng thịt gà đã được lăn bột rồi chiên trên chảo, chiên ngập dầu, chiên áp suất hoặc chiên chân không. Lớp bột chiên xù sẽ giúp cho miếng gà có một lớp vỏ ngoài giòn rụm, còn phần thịt bên trong vẫn mềm và mọng nước. Nguyên liệu được sử dụng phổ biến nhất là gà thịt.",
  },
  {
    id: "rice_burger",
    name: "Cơm - Burger",
    desc: "Loại thức ăn bao gồm bánh mì kẹp thịt xay (thường là thịt bò) ở giữa. Miếng thịt có thể được nướng, chiên, hun khói hay nướng trên lửa.",
  },
  {
    id: "snack",
    name: "Thức ăn nhẹ",
    desc: null,
  },
  {
    id: "dessert_drink",
    name: "Tráng miệng - Thức uống",
    desc: null,
  },
];

const addSampleData = async (req, res) => {
  try {
    const categories = await Category.create(sampleDishes);

    res.status(201).send(categories);
  } catch (error) {
    res.status(400).send(error);
  }
};

const allCategories = async (req, res) => {
  try {
    const categories = await Category.find({}).select("id name desc -_id");

    res.status(200).send(categories);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  addSampleData,
  allCategories,
};
