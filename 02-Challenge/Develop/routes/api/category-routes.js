const router = require('express').Router();
const { Category, Product } = require('../../models');

router.get('/', (req, res) => {
  Category.findAll({
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
  })
    .then(data => res.json(data || { message: 'Category not found with this ID.' }))
    .catch(err => res.status(500).json(err));
});

router.get('/:id', (req, res) => {
  Category.findOne({
    where: { id: req.params.id },
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
  })
    .then(data => res.json(data || { message: 'Category not found with this ID.' }))
    .catch(err => res.status(500).json(err));
});

router.post('/', (req, res) => {
  Category.create({ category_name: req.body.category_name })
    .then(data => res.json(data))
    .catch(err => res.status(500).json(err));
});

router.put('/:id', (req, res) => {
  Category.update(req.body, { where: { id: req.params.id } })
    .then(data => res.json(data || { message: 'Category not found with this ID.' }))
    .catch(err => res.status(500).json(err));
});

router.delete('/:id', (req, res) => {
  Category.destroy({ where: { id: req.params.id } })
    .then(data => res.json(data || { message: 'Category not found with this ID.' }))
    .catch(err => res.status(500).json(err));
});

module.exports = router;
