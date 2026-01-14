const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { protect, admin } = require('../middleware/authMiddleware');
const {
    getEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
    registerForEvent,
    getEventRegistrations,
    getMyRegistrations
} = require('../controllers/eventController');

// Multer Storage Engines
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

const checkFileType = (file, cb) => {
    const filetypes = /jpg|jpeg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Images only!');
    }
}

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
});

router.route('/')
    .get(getEvents)
    .post(protect, admin, upload.single('image'), createEvent);

router.route('/my/registrations')
    .get(protect, getMyRegistrations);

router.route('/:id')
    .get(getEventById)
    .put(protect, admin, upload.single('image'), updateEvent)
    .delete(protect, admin, deleteEvent);

router.route('/:id/register')
    .post(protect, registerForEvent);

router.route('/:id/registrations')
    .get(protect, admin, getEventRegistrations);

module.exports = router;
