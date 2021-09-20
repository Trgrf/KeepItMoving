const router = require("express").Router();
const { User } = require("../../models");

router.get("/", async (req, res) => {
    console.log("GET /api/user");
    try {
        const userData = await User.findAll();
        res.status(200).json(userData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    console.log('POST /');
    try {
        console.log(req.body);
        const userData = await User.create(req.body);

        req.session.save(() => {
            console.log(userData)
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        })
    } catch (err) {
        res.status(400).json(err);
        console.log(err);
    }
});

router.post('/login', async (req, res) => {
    console.log('POST /login')
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });

        if (!userData) {
            res.status(400).json({ message: " User not found!" });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: "Incorrect email or password, please try again." });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'You are now logged in!' })
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/logout', (req, res) => {
    console.log('POST /logout')
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        })
    } else {
        res.status(404).end();
    }
});

module.exports = router;