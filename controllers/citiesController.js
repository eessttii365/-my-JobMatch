const axios = require('axios');

// פונקציה לקריאת ה-API עם פרמטר חיפוש
const fetchCitiesFromGovAPI = async (searchQuery) => {
  try {
    const response = await axios.get('https://data.gov.il/api/3/action/datastore_search', {
      params: {
        resource_id: '5c78e9fa-c2e2-4771-93ff-7f400a12f7ba',
        limit: 5,
        q: searchQuery || '' // אם אין חיפוש – מחזיר הכל
      }
    });

    console.log(`סה"כ תוצאות עבור '${searchQuery}':`, response.data.result.total);

    return response.data.result.records;

  } catch (error) {
    console.error('שגיאה בקריאת ה-API:', error.message);
    throw error;
  }
};

// ה-API שלך מקבל ?search=xxx
const getCitiesHandler = async (req, res) => {
  const searchQuery = req.query.search || ''; // נקלט מהקליינט

  try {
    console.log(`חיפוש ערים עבור: ${searchQuery}`);
    const cities = await fetchCitiesFromGovAPI(searchQuery);
    res.json(cities);
  } catch (error) {
    console.error('שגיאה בטעינת ערים:', error.message);
    res.status(500).json({ error: 'שגיאה בטעינת ערים' });
  }
};

module.exports = { getCitiesHandler };
