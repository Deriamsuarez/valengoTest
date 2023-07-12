const Announcement = require('../models/announcement.model');
const { Op } = require('sequelize');


exports.getAnnouncements = (req, res) => {
  Announcement.findAll()
    .then(announcements => {
      res.status(200).json(announcements);
    })
    .catch(error => {
      console.error('Error al obtener los registros:', error);
      res.status(500).json({ error: 'Error al obtener los registros' });
    });
};
