const express = require('express');
const announcementController = require('../controllers/announcement.controller');
const router = express.Router();

router.get('/announcements', announcementController.getAnnouncements);

module.exports = router;
