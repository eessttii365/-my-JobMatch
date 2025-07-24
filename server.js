require("dotenv").config();
const express = require("express");
const cors = require("cors");
const citiesRoute = require('./routes/citiesRoute');


const app = express();

app.use(express.json());//jsonמאפשר לקרוא בקשות בפורמט 
app.use(cors());

app.listen(5001, () => {
    console.log('🚀 השרת רץ על http://localhost:5001');
});

// מסלול התחברות
app.use("/authRoute", require("./routes/authRoute"));
app.use("/categoryRoute", require("./routes/categoryRoute"));
app.use('/api', citiesRoute);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


