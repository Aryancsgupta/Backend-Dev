const fs = require('fs').promises;
const path = require('path');

const DATA_FILE = path.join(__dirname, '../../data/stored.json');

const ensureDataDir = async () => {
  try {
    const dir = path.dirname(DATA_FILE);
    await fs.mkdir(dir, { recursive: true });
  } catch (error) {
    throw new Error(`Failed to create data directory: ${error.message}`);
  }
};

const saveData = async (data) => {
  try {
    await ensureDataDir();
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    throw new Error(`Failed to save data: ${error.message}`);
  }
};

const loadData = async () => {
  try {
    await ensureDataDir();
    const fileContent = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw new Error(`Failed to load data: ${error.message}`);
  }
};

module.exports = { saveData, loadData };
