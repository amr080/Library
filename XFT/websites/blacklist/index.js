const express = require('express');
const axios = require('axios');
const NodeCache = require('node-cache');
const xml2js = require('xml2js');

const app = express();
const cache = new NodeCache({ stdTTL: 3600 });
const ITEMS_PER_PAGE = 100;

const parseXML = async (xmlData) => {
    const parser = new xml2js.Parser({ explicitArray: false });
    return parser.parseStringPromise(xmlData);
};

app.get('/api/blacklist', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const cacheKey = `blacklist_${page}`;
        
        let data = cache.get(cacheKey);
        
        if (!data) {
            const response = await axios.get('https://sanctionslistservice.ofac.treas.gov/entities', {
                headers: {
                    'Accept': 'application/xml'
                },
                timeout: 5000
            });
            
            const parsedData = await parseXML(response.data);
            const entities = parsedData.sanctionsData.entities.entity || [];
            
            data = {
                items: entities.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE),
                totalPages: Math.ceil(entities.length / ITEMS_PER_PAGE),
                currentPage: page,
                totalItems: entities.length
            };
            
            cache.set(cacheKey, data);
        }

        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});