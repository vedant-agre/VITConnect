const Event = require('../models/Event');
const Registration = require('../models/Registration');

// @desc    Get all events
// @route   GET /api/events
// @access  Public
exports.getEvents = async (req, res) => {
    try {
        const { keyword, featured } = req.query;
        let query = {};

        if (keyword) {
            query.title = { $regex: keyword, $options: 'i' };
        }
        if (featured) {
            query.featured = featured === 'true';
        }

        const events = await Event.find(query).sort({ date: 1 });
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get single event
// @route   GET /api/events/:id
// @access  Public
exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (event) {
            res.json(event);
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Create an event
// @route   POST /api/events
// @access  Private/Admin
exports.createEvent = async (req, res) => {
    try {
        const { title, description, date, venue, organizer, featured } = req.body;
        // Image is handled by multer and path is in req.file.path
        // Convert path to use forward slashes and relative to public
        // req.file.path e.g., 'public\uploads\image.jpg' -> '/uploads/image.jpg'
        
        let imagePath = '';
        if (req.file) {
            imagePath = '/uploads/' + req.file.filename;
        } else {
            return res.status(400).json({ message: 'Image is required' });
        }

        const event = await Event.create({
            title,
            description,
            date,
            venue,
            organizer,
            image: imagePath,
            featured: featured === 'true'
        });

        res.status(201).json(event);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error: ' + error.message });
    }
};

// @desc    Update an event
// @route   PUT /api/events/:id
// @access  Private/Admin
exports.updateEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (event) {
            event.title = req.body.title || event.title;
            event.description = req.body.description || event.description;
            event.date = req.body.date || event.date;
            event.venue = req.body.venue || event.venue;
            event.organizer = req.body.organizer || event.organizer;
            if (req.body.featured !== undefined) {
                event.featured = req.body.featured === 'true';
            }
            if (req.file) {
                 event.image = '/uploads/' + req.file.filename;
            }

            const updatedEvent = await event.save();
            res.json(updatedEvent);
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Private/Admin
exports.deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (event) {
            await event.deleteOne();
            res.json({ message: 'Event removed' });
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Register user for event
// @route   POST /api/events/:id/register
// @access  Private/Student
exports.registerForEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const studentId = req.session.user.id;

        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        const alreadyRegistered = await Registration.findOne({
            event: id,
            student: studentId
        });

        if (alreadyRegistered) {
            return res.status(400).json({ message: 'Already registered for this event' });
        }

        const registration = await Registration.create({
            event: id,
            student: studentId
        });

        res.status(201).json({ message: 'Registration successful', registration });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get logged in user's registrations
// @route   GET /api/events/my/registrations
// @access  Private/Student
exports.getMyRegistrations = async (req, res) => {
    try {
        const studentId = req.session.user.id;
        const registrations = await Registration.find({ student: studentId })
            .populate('event', 'title date venue'); // Populate event details
        res.json(registrations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get registrations for an event
// @route   GET /api/events/:id/registrations
// @access  Private/Admin
exports.getEventRegistrations = async (req, res) => {
    try {
        const registrations = await Registration.find({ event: req.params.id })
            .populate('student', 'name email regNumber');
        res.json(registrations);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
