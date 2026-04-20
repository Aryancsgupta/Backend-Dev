const express = require('express');
const logger = require('./middleware/logger');
const dataRoutes = require('./routes/dataRoutes');
const { fetchData } = require('./services/dataFetcher');
const { saveData } = require('./services/fileStorage');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(logger);

const initializeApp = async () => {
  try {
    console.log('Initializing app: fetching and storing data...');
    const data = await fetchData();
    await saveData(data);
    console.log('Data initialized successfully');
  } catch (error) {
    console.error('Initialization error:', error.message);
  }
};

app.use('/api', dataRoutes);

app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({
    success: false,
    error: err.message
  });
});

app.listen(PORT, async () => {
  await initializeApp();
  console.log("Server started");
});
