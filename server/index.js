// server/index.js
require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors({ origin: 'http://localhost:5173' })); 
app.use(express.json({ limit: '50mb' }));

// Database Connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Test Connection on Start
pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ FATAL: Could not connect to Neon DB:', err.message);
  } else {
    console.log('✅ Connected to Neon Database successfully!');
    release();
  }
});

app.post('/api/save-school', async (req, res) => {
  console.log("📥 Received Save Request...");
  const data = req.body;

  // 1. Basic Validation
  if (!data || !data.schoolId) {
    console.error("❌ Error: Missing School ID in payload");
    return res.status(400).json({ message: "Missing School ID" });
  }

  console.log(`Processing School ID: ${data.schoolId}`);

  // 2. The Query
  const query = `
    INSERT INTO school_profiles (
      school_id, school_name, region, province, division, district, 
      municipality, leg_district, barangay, mother_school_id, 
      latitude, longitude, curricular_offering, submitted_by
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    ON CONFLICT (school_id) 
    DO UPDATE SET 
      school_name = EXCLUDED.school_name,
      region = EXCLUDED.region,
      province = EXCLUDED.province,
      division = EXCLUDED.division,
      district = EXCLUDED.district,
      municipality = EXCLUDED.municipality,
      leg_district = EXCLUDED.leg_district,
      barangay = EXCLUDED.barangay,
      mother_school_id = EXCLUDED.mother_school_id,
      latitude = EXCLUDED.latitude,
      longitude = EXCLUDED.longitude,
      curricular_offering = EXCLUDED.curricular_offering,
      submitted_by = EXCLUDED.submitted_by,
      submitted_at = CURRENT_TIMESTAMP;
  `;

  const values = [
    data.schoolId, data.schoolName, data.region, data.province, 
    data.division, data.district, data.municipality, data.legDistrict, 
    data.barangay, data.motherSchoolId, data.latitude, data.longitude, 
    data.curricularOffering, data.submittedBy
  ];

  try {
    await pool.query(query, values);
    console.log(`✅ SUCCESS: Saved School ${data.schoolId} to Neon.`);
    res.status(200).json({ message: "Data successfully saved to Neon!" });
  } catch (err) {
    console.error("❌ SQL ERROR:", err.message);
    
    // Specific error help
    if (err.message.includes('relation "school_profiles" does not exist')) {
        console.error("💡 HINT: You forgot to create the table in Neon! Run the CREATE TABLE SQL.");
    }
    
    res.status(500).json({ message: "Database error", error: err.message });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});