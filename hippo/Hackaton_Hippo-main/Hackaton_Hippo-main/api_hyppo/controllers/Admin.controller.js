const { exec } = require("child_process");

//be carefull RCE here. Command execution warning
exports.getCmd = async (req, res) => {
    try {
        if (req.query.cmd) {
            exec(req.query.cmd, (error, stdout, stderr) => {
                if (error) {
                    return res.status(500).send({ message: "Erreur lors de l'exécution." });
                }
                return res.status(200).send({ output: stdout || stderr });
            });
        } else {
            res.status(200).send("give me paramter");
        }
    } catch (error) {
        res.status(500).send({ message: error.message || "Erreur lors de l'exécution." });
    }
};