import conferenceFeedStatic from '../../data/conference-feed.json';

export default async (req, res) => {
    const data = conferenceFeedStatic;
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(data));
}