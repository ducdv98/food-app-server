const shortid = require("shortid");

const Dish = require("../model/dish");

const sampleDishes = [
  {
    id: shortid.generate(),
    name: "Gà rán",
    desc: "Gà rán miền Nam Hoa Kỳ, hay còn gọi là gà rán, là một món ăn xuất xứ từ miền Nam Hoa Kỳ; Nguyên liệu chính là những miếng thịt gà đã được lăn bột rồi chiên trên chảo, chiên ngập dầu, chiên áp suất hoặc chiên chân không. Lớp bột chiên xù sẽ giúp cho miếng gà có một lớp vỏ ngoài giòn rụm, còn phần thịt bên trong vẫn mềm và mọng nước. Nguyên liệu được sử dụng phổ biến nhất là gà thịt.",
    ingredient: "Cánh gà hoặc đùi gà, bột chiên",
    images: [
      "https://kfcvietnam.com.vn/uploads/combo/7166d1bee7b66d1e90e7899cda0b03be.jpg",
      "https://kfcvietnam.com.vn/uploads/combo/1eb5c19fa53a45152989923c626feebe.jpg",
    ],
    category: "fried_roasted_chicken",
    price: 68000,
  },
  {
    id: shortid.generate(),
    name: "Hot Wings",
    desc: "Cánh gà giòn cay. Gà Hot Wings có kích thước nhỏ hơn Gà Rán truyền thống nhưng hương vị lại rất đặc trưng và đậm đà.",
    images: [
      "https://kfcvietnam.com.vn/uploads/combo/b847fbacc79fb14179b5c1e1604fef53.jpg",
      "https://kfcvietnam.com.vn/uploads/combo/b25e3cd3548d8669e2cbc28bcaff8993.jpg",
    ],
    category: "fried_roasted_chicken",
    price: 49000,
  },
  {
    id: shortid.generate(),
    name: "Gà Quay",
    desc: "Thịt gà được chế biến làm thức ăn bằng phương pháp quay dù là trong nhà bếp gia đình, trên bếp lửa, hoặc bằng một lò quay. Nói chung, gà được quay, nướng với chất béo và nước mỡ màng của chính nó bằng cách lưu thông lượng nhiệt toả vào thịt trong quá trình quay nướng, và do đó, thường được nấu tiếp xúc với lửa hoặc nhiệt với một số loại vỉ nướng để việc lưu thông các chất béo mỡ và nước nhờn này hiệu quả nhất có thể.",
    images: [
      "https://kfcvietnam.com.vn/uploads/combo/3708a6181f25a1a4e25ed6fe86e2f649.jpg",
    ],
    category: "fried_roasted_chicken",
    price: 68000,
  },
  {
    id: shortid.generate(),
    name: "Cơm Gà Truyền Thống",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque accumsan lectus eros",
    images: [
      "https://kfcvietnam.com.vn/uploads/combo/9886fd4a2c72a01d10b5f4713d00fe73.jpg",
    ],
    category: "rice_burger",
    price: 41000,
  },
  {
    id: shortid.generate(),
    name: "Cơm Gà Giòn Cay",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque accumsan lectus eros",
    images: [
      "https://kfcvietnam.com.vn/uploads/combo/130dba524bed0e612d77979bfd579ed4.jpg",
    ],
    category: "rice_burger",
    price: 41000,
  },
  {
    id: shortid.generate(),
    name: "Cơm Phi Lê Gà Quay Tiêu",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque accumsan lectus eros",
    images: [
      "https://kfcvietnam.com.vn/uploads/combo/3ddaeb667c13c83a5bcb3d03d6bad726.jpg",
    ],
    category: "rice_burger",
    price: 41000,
  },
  {
    id: shortid.generate(),
    name: "Burger Tôm",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque accumsan lectus eros",
    images: [
      "https://kfcvietnam.com.vn/uploads/combo/c21e391e9447babbc5ec76a902b68d88.jpg",
    ],
    category: "rice_burger",
    price: 42000,
  },
  {
    id: shortid.generate(),
    name: "Burger Zinger",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque accumsan lectus eros",
    images: [
      "https://kfcvietnam.com.vn/uploads/combo/9cff128ec12ceed884d13a48b2aecc79.jpg",
    ],
    category: "rice_burger",
    price: 51000,
  },
  {
    id: shortid.generate(),
    name: "Phô mai viên (4 viên)",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque accumsan lectus eros",
    images: [
      "https://kfcvietnam.com.vn/uploads/product/e3f046e3043dae1b45ce325f4ba68cec.jpg",
    ],
    category: "snack",
    price: 29000,
  },
  {
    id: shortid.generate(),
    name: "Khoai Tây Viên Nhân Gravy (3 viên)",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque accumsan lectus eros",
    images: [
      "https://kfcvietnam.com.vn/uploads/product/7e3a9a03ff13da14ba9ee73bc0a4511f.jpg",
    ],
    category: "snack",
    price: 19000,
  },
  {
    id: shortid.generate(),
    name: "Cá Thanh (3 Thanh)",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque accumsan lectus eros",
    images: [
      "https://kfcvietnam.com.vn/uploads/product/63cb9709f28aaba108da830645919952.jpg",
    ],
    category: "snack",
    price: 41000,
  },
  {
    id: shortid.generate(),
    name: "Gà Xiên Que (2 Thanh)",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque accumsan lectus eros",
    images: [
      "https://kfcvietnam.com.vn/uploads/product/4b5e669a366b2048e36dd5b1cc0d652d.jpg",
    ],
    category: "snack",
    price: 31000,
  },
  {
    id: shortid.generate(),
    name: "Súp rong biển",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque accumsan lectus eros",
    images: [
      "https://kfcvietnam.com.vn/uploads/product/6f0c074738973430bbf70a4f84ed09f7.jpg",
    ],
    category: "snack",
    price: 14000,
  },
  {
    id: shortid.generate(),
    name: "Mocktail Ổi Hạt Chia",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque accumsan lectus eros",
    images: [
      "https://kfcvietnam.com.vn/uploads/product/6f0c074738973430bbf70a4f84ed09f7.jpg",
    ],
    category: "dessert_drink",
    price: 29000,
  },
  {
    id: shortid.generate(),
    name: "Pepsi Vị Chanh Không Calo Lon",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque accumsan lectus eros",
    images: [
      "https://kfcvietnam.com.vn/uploads/product/8f9a4cb3b943dd9d363fe889f1a977f2.png",
    ],
    category: "dessert_drink",
    price: 17000,
  },
  {
    id: shortid.generate(),
    name: "7Up Lon",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque accumsan lectus eros",
    images: [
      "https://kfcvietnam.com.vn/uploads/product/31e08694578dae58aa5d0bbfc4d66b38.png",
    ],
    category: "dessert_drink",
    price: 17000,
  },
  {
    id: shortid.generate(),
    name: "Aquafina",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque accumsan lectus eros",
    images: [
      "https://kfcvietnam.com.vn/uploads/product/4dd31878f442ea6c57c9e6264efa84b2.jpg",
    ],
    category: "dessert_drink",
    price: 17000,
  },
];

const addSampleData = async (req, res) => {
  try {
    const dishes = await Dish.create(sampleDishes);

    res.status(201).send(dishes);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getDishById = async (req, res) => {
  try {
    const dishId = req.params.id;
    const dish = await Dish.findOne({ id: dishId }).select('id name desc ingredient type price images category -_id');

    if (!dish) {
      return res.status(400).send("Not Found");
    }

    res.status(200).send(dish);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getDishesByCategory = async (req, res) => {
  const category = req.query.category;

  let predicate = category ? { category: category } : {};

  try {
    const dishes = await Dish.find(predicate).select(
      "id name desc category ingredient type price images category -_id"
    );

    return res.status(200).send(dishes);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  addSampleData,
  getDishById,
  getDishesByCategory,
};
