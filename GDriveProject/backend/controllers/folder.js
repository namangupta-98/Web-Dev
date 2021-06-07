const fs = require("fs");

exports.create_folder = (req, res) => {
    const { name } = req.query;
    let username = req.profile.username;
    fs.readdir("./public/" + username + "/", async (err, files) => {
        if (await files.includes(name)) {
            res.status(301).json({
                message: 'Folder Already Present!'
            });
        } else {
            fs.mkdir("./user_data/" + username + "/" + name, (err) => {
                if (err) {
                    res.status(301).json({
                        message: 'Folder Not Created!'
                    });
                } else {
                    res.status(200).json({
                        message: 'Folder Created.'
                    });
                }
            });
        }
    });

}