const functions = require('firebase-functions');
const axios = require('axios');
const cors = require('cors')({ origin: true });

const PLACE_API_KEY = '';

exports.searchPlace = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const lat = req.body.latitude;
    if (lat == null) return res.json({ message: 'Latitude is required' });
    const lon = req.body.longitude;
    if (lon == null) return res.json({ message: 'Longitude is required' });
    const rad = req.body.radius;
    if (rad == null) return res.json({ message: 'Radius is required' });

    axios.default
      .get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lon}&radius=${rad}&type=restaurant&key=${PLACE_API_KEY}`
      )
      .then(body => {
        res.json(body.data);
      })
      .catch(error => {
        res.json(error);
      });
  });
});
