const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {

  const { con } = req;

  const { user } = req.query;
  let filter;
  if (user) {
    filter = 'WHERE userid = ?';
  }

  con.query(`SELECT * FROM account ${filter}`, user, (err, data) => {
    if (err) {
      console.log(err);
    }
    // use index.ejs
    res.render('index', { title: 'Account Information', data, user });
  });

});

//userAdd
router.get('/add', (req, res, next) => {
  res.render('userAdd', { title: 'Add User' });
});

router.post('/userAdd', (req, res, next) => {
  const { con } = req;
  const { userid, password, email } = req.body;
  const sql = {
    userid,
    password,
    email,
  };

  //console.log(sql);
  con.query('INSERT INTO account SET ?', sql, err => {
    if (err) {
      console.log(err);
    }
    res.setHeader('Content-Type', 'application/json');
    res.redirect('/');
  });

});

//userEdit
router.get('/userEdit', (req, res, next) => {
  const { id } = req.query;
  const { con } = req;

  con.query('SELECT * FROM account WHERE id = ?', id, (err, data) => {
    if (err) {
      console.log(err);
    }
    res.render('userEdit', { title: 'Edit Account', data });

  });

});

router.post('/userEdit', (req, res, next) => {

  const { con } = req;
  let { id } = req.body;

  const { userid, password, email } = req.body;
  // let userid = req.body.userid;
  // let password = req.body.password;
  // let email = req.body.email;
  const sql = {
    userid,
    password,
    email,
  };

  con.query(`UPDATE account SET ? WHERE id = ?`, [sql, id], err => {
    if (err) {
      console.log(err);
    }
    res.setHeader('Content-Type', 'application/json');
    res.redirect('/');
  });

});

router.get('/userDelete', (req, res, next) => {
  let { id } = req.query;
  //let id = req.query.id;
  const { con } = req;

  con.query('DELETE FROM account WHERE id = ?', id, (err) => {
    if (err) {
      console.log(err);
    }
    res.redirect('/');
  });
});

module.exports = router;
