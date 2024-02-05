const router = require('express').Router();
const { Tag, Product } = require('../../models');

router.get('/', (req, res) => {
  Tag.findAll({
    include: { model: Product, attributes: ['product_name', 'price', 'stock', 'category_id'] }
  })
    .then(data => res.json(data))
    .catch(err => res.status(500).json(err));
});

router.get('/:id', (req, res) => {
  Tag.findOne({
    where: { id: req.params.id },
    include: { model: Product, attributes: ['product_name', 'price', 'stock', 'category_id'] }
  })
    .then(data => res.json(data))
    .catch(err => res.status(500).json(err));
});

router.post('/', (req, res) => {
  Tag.create({ tag_name: req.body.tag_name })
    .then(data => res.json(data))
    .catch(err => res.status(500).json(err));
});

router.put('/:id', (req, res) => {
  Tag.update(req.body, { where: { id: req.params.id } })
    .then(data => res.json(data || { message: 'No tag found with this ID' }))
    .catch(err => res.status(500).json(err));
});

router.delete('/:id', (req, res) => {
  Tag.destroy({ where: { id: req.params.id } })
    .then(data => res.json(data || { message: 'No tag found with this ID' }))
    .catch(err => res.status(500).json(err));
});

module.exports = router;
