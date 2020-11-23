const Flight = require('../models/flight');
module.exports = {
    index,
    new: newFlight,
    create,
};

function index(req, res) {
    Flight.find({}, function(err, flights) {
        flights.sort(function(a, b) {
            return a.departs - b.departs;
        });
        res.render('flights/index', {flights});
    });
};
function newFlight(req, res) {
    const newFlight = new Flight();
    const dt = newFlight.departs;
    const departsDate = dt.toISOString().slice(0,16);
    res.render('flights/new', {departsDate});
}
function create(req, res) {
    req.body.airline = req.body.airline.replace(/ *, */g, ',');
    req.body.airport = req.body.airport.replace(/ *, */g, ',');
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
      }
    const flight = new Flight(req.body);
    flight.save(function(err) {
        if(err) return res.render('flights/new');
        res.redirect('/flights');
    });
};