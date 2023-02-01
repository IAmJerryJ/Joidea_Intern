import summonerlist from './summonerlist.json';

export default {
  '/api/summonerlist.json': summonerlist,

  'POST /api/summonerdetails.json': (req, res) => {
    const { summoner_id } = req.body;
    const summoner = summonerlist.filter(
      (summoner) => summoner.summoner_id === parseInt(summoner_id, 10),
    )[0];
    res.send(summoner);
  },
};
