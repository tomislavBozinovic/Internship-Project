const Item = require('../models/item');

const fetchItems = async (req, res) => {
  try {
    const items = await Item.find({});
  
    res.status(200).json({
      status: 'success',
      results: items.length,
      data: {
        items
      }
    });
  } catch(err) {
    res.status(500).json({
      status: 'fail',
      message: err.message
    });
  }
};

const createItem = async (req, res) => {
  const newItem = new Item(req.body);
  
  try {
    await newItem.save();
    res.status(201).json({
      status: 'success',
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message
    });
  }
}

module.exports  = {
  fetchItems,
  createItem
}