// db.js
const { Sequelize } = require('sequelize');

// יצירת החיבור למסד נתונים
const sequelize = new Sequelize('jobmatch', 'root', 'jBm25!?', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ חיבור למסד נתונים הצליח!');
  } catch (error) {
    console.error('❌ שגיאה בחיבור למסד הנתונים:', error);
  }
})();

module.exports = sequelize;



