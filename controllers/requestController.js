import Request from '../models/Request.js';

export const createRequest = async (req, res, next) => {
  try {
    const request = new Request({
      ...req.body,
      sender: req.user.id,
      status: 'en_attente'
    });
    await request.save();
    res.status(201).json(request);
  } catch (err) {
    next(err);
  }
};

export const getMyRequests = async (req, res, next) => {
  try {
    const requests = await Request.find({ sender: req.user.id }).populate('trip');
    res.status(200).json(requests);
  } catch (err) {
    next(err);
  }
};

export const respondToRequest = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedRequest = await Request.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.status(200).json(updatedRequest);
  } catch (err) {
    next(err);
  }
};

export const getRequestsForTrip = async (req, res, next) => {
  try {
    const { tripId } = req.params;

    const requests = await Request.find({ trip: tripId }).populate('sender');

    if (!requests || requests.length === 0) {
      return res.status(404).json({ message: 'No requests found for this trip' });
    }

    res.status(200).json(requests);
  } catch (err) {
    next(err);
  }
};