const Flight = require('../models/flight');
const Ticket = require('../models/ticket');
module.exports = {
    index,
    new: newFlight,
    create,
    show,
};

function index(req, res) {
    Flight.find({}, function(err, flights) {
        flights.sort(function(a, b) {
            return a.departs - b.departs;
        });
        res.render('flights/index', {flights, title: 'All The Flights!'});
    });
};
function newFlight(req, res) {
    const newFlight = new Flight();
    const dt = newFlight.departs;
    const departsDate = dt.toISOString().slice(0,16);
    res.render('flights/new', {departsDate, title: 'Enter A New Flight'});
}
function create(req, res) {
    req.body.airline = req.body.airline.replace(/ *, */g, ',');
    req.body.airport = req.body.airport.replace(/ *, */g, ',');
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
      }
    const flight = new Flight(req.body);
    flight.save(function(err) {
        if(err) return res.redirect('/flights/new');
        res.redirect('/flights');
    });
};

function show(req, res) {
    const allAirports = ['AUS', 'DFW', 'DIA', 'LAX', 'SAN'];
    Flight.findById(req.params.id, function(err, flight) {
        Ticket.find({flight: flight._id}, function(err, tickets) {
            const airports = allAirports.filter(a => !flight.destinations.some(d => d.airport === a));
            flight.destinations.sort(function(a, b) {
                return a.arrival - b.arrival;
            });
            res.render('flights/show', {title: 'Flight Details', flight, airports, tickets});
        })
    });
};