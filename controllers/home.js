function index(req, res) {
    try {
        res.render("home");
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

module.exports = { index };
