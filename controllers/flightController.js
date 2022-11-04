const { Flights } = require("../models/Flight")
// const uuid = require("uuid").v4()
const { v4: uuid } = require("uuid")


//get all
exports.getFlights = async (req, res) => {
    try {
        const flights = Flights;
        res.status(200).json({
            message: "All flights",
            flights,
        });
    } catch (err) {
        res.status(500).json({ message: err })
    }
}
// get single
exports.getFlight = async (req, res) => {
    try {
        let id = req.params.id
        const flight = Flights.find((flight) => flight.id === id)
        res.status(200).json({
            message: "Flight found",
            flight
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}
// create new
exports.createFlight = async (req, res) => {
    try {
        // const flight = await req.body
        // flight.id = uuid()
        // Flights.push(flight)

        const {title, price} = await req.body
        const newFlight = {
            id: uuid(),
            title,
            price,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
        }

        Flights.push(newFlight)
        
        res.status(201).json({
            message: "flight created",
            // flight
            newFlight
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

// update
exports.updateFlight = async (req, res) => {
    try {
        let id = req.params.id
        const flight = Flights.find((flight) => flight.id === id)
        const { title, time, price, date } = await req.body
        flight.title = title,
        flight.time = time
        flight.price = price,
        flight.date = date
        res.status(200).json({
            message: "flight updated",
            flight
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}
// delete
exports.deleteFlight = async (req, res) => {
    try {
        let id = req.params.id
        const flight = Flights.find((flight) => flight.id === id)
        Flights.splice(Flights.indexOf(flight, 1))
        res.status(200).json({
            message: "flight deleted",
            flight
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}