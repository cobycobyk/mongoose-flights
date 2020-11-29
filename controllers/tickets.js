const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

module.exports = {
    new: newTicket,
    create,
    addTicket,
}


function create(req, res) {
    req.body.flight = req.params.id;
    Ticket.create(req.body, function(err, ticket) {
        res.redirect(`/flights/${req.params.id}`)
    })
}

function addTicket(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        Ticket.find({flight: flight._id}, function(err, tickets) {
            res.render(`flights/${flight._id}`)
        })
    })
}

function newTicket(req, res) {
    res.render('tickets/new', {
        id: req.params.id,
        title: 'Add Ticket'
    })
};