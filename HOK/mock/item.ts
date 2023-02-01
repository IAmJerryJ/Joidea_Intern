import itemlist from './itemlist.json';

export default {
  '/api/itemlist.json': itemlist,

  'POST /api/itemdetails.json': (req, res) => {
    const { item_id } = req.body;
    const item = itemlist.filter(
      (item) => item.item_id === parseInt(item_id, 10),
    )[0];
    res.send(item);
  },
};
