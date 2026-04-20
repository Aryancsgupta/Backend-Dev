const express = require('express');
const { fetchData } = require('../services/dataFetcher');
const { saveData, loadData } = require('../services/fileStorage');

const router = express.Router();

router.get('/data', async (req, res, next) => {
  try {
    const data = await loadData();
    res.json({
      success: true,
      count: data.length,
      data: data
    });
  } catch (error) {
    next(error);
  }
});

router.get('/filter', async (req, res, next) => {
  try {
    const data = await loadData();
    const { userId, limit } = req.query;

    let filtered = data;

    if (userId) {
      filtered = filtered.filter(item => item.userId === parseInt(userId));
    }

    if (limit) {
      filtered = filtered.slice(0, parseInt(limit));
    }

    res.json({
      success: true,
      count: filtered.length,
      data: filtered
    });
  } catch (error) {
    next(error);
  }
});

router.post('/refresh', async (req, res, next) => {
  try {
    const data = await fetchData();
    await saveData(data);
    res.json({
      success: true,
      message: 'Data refreshed successfully',
      count: data.length
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
