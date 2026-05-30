const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse form data and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static assets from the current directory
app.use(express.static(__dirname));

// Route for the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API Endpoint to handle customization requests
app.post('/api/customize', (req, res) => {
    const { name, email, craftType, details } = req.body;
    
    if (!name || !email || !details) {
        return res.status(400).json({ success: false, message: "Please fill out all required fields!" });
    }

    console.log(`✨ New Custom Request Received for ${craftType}:`, { name, email, details });
    
    // Simulate saving to a database
    res.json({ 
        success: true, 
        message: `Thank you, ${name}! Your creative request for "${craftType}" has been received by the maker.` 
    });
});

app.listen(PORT, () => {
    console.log(`🎨 Artifacto running beautifully at http://localhost:${PORT}`);
});
