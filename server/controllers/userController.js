const connection = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

class userController {
  //User register
  saveUser = (req, res) => {
    const { name, user_name, password } = req.body;

    bcrypt.hash(password, 8, (error, hash) => {
      if (error) throw error;
      let sql = `INSERT INTO user (name, user_name, password) VALUES ( '${name}', '${user_name}', '${hash}')`;

      connection.query(sql, (error, result) => {
        error ? res.status(400).json({ error }) : res.status(200).json(result);
      });
    });
  };

  //User login
  login = (req, res) => {
    let { user_name, password } = req.body;
    let sql = `SELECT * FROM user WHERE user_name = '${user_name}'`;

    connection.query(sql, (error, result) => {
      //en caso de error en la consulta
      if (error) return res.status(400).json(error);

      //en caso de no encontrar ningún user con dicho user_name
      if (!result || !result.length) {
        res.status(401).json("Usuario no registrado");
      }

      //en caso de que el user_name sea correcto
      const [user] = result;
      const hash = user.password;

      //comparamos contraseñas
      bcrypt.compare(password, hash, (error, response) => {
        if (error) throw error;
        //si las contraseñas coinciden
        if (response === true) {
          const token = jwt.sign(
            { user: { user_name: user.user_name, name: user.name } },
            process.env.SECRET,
            { expiresIn: "5min" }
          );
          res.status(200).json({ token });
          //si las contraseñas no coinciden
        } else {
          res.status(401).json("contraseña no válida");
        }
      });
    });
  };
}
module.exports = new userController();
