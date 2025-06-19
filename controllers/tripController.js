import Trip from '../models/Trip.js';

export const createTrip = async (req, res, next) => {
  try {
    const newTrip = new Trip({ ...req.body, driver: req.user.id });
    const saved = await newTrip.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};

export const getTrips = async (req, res, next) => {
  try {
    const trips = await Trip.find().populate('driver', 'firstName lastName');
    res.status(200).json(trips);
  } catch (err) {
    next(err);
  }
};

export const getMyTrips = async (req, res, next) => {
  try {
    const myTrips = await Trip.find({ driver: req.user.id });
    res.status(200).json(myTrips);
  } catch (err) {
    next(err);
  }
};
