'use strict';

// Requires
var fs = require('fs'); 
var _ = require('lodash');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');

// module exports
module.exports = {
    isValidLogin: isValidLogin,
    isUsernameUnique: isUsernameUnique,
    registerUser: registerUser,
}

// API endpoints

// /api/isValidLogin
function isValidLogin(req, res) {
    if (!req.body) return res.sendStatus(400);
    getAllUsers().then(
        function (users) {
            let user = _.find(users, ['username', req.body.username]);
            if (typeof user !== 'undefined') {
                bcrypt.compare(req.body.password, user.password).then(
                    function (result) {
                        return res.send(result);
                    },
                    function (error) {
                        return res.sendStatus(500);
                    }
                );
            }
        },
        function (error) {
            return res.sendStatus(500);
        }
    );
}

// /api/isUsernameUnique/:username
function isUsernameUnique(req, res) {
    getAllUsers().then(
        function (users) {
            let username = req.params.username;
            return res.send(_.findIndex(users, ['username', username]) === -1);
        },
        function (error) {
            throw error;
        }
    );
}

// /api/registerUser
function registerUser(req, res) {
    if (!req.body) return res.sendStatus(400);
    var promises = [];
    promises.push(bcrypt.hash(req.body.password, 8));
    promises.push(getAllUsers());

    Promise.all(promises).then(
        function (data) {
            var newUser = {
                username: req.body.username,
                password: data[0],
                email: req.body.email,
            };           
            data[1].push(newUser);

            fs.writeFile('users.json', JSON.stringify(data[1]), (err) => {  
                if (err) throw err;
                return res.send(true);
            });
        },
        function (error) {
            throw error;
        }
    );
}

// Library functions

// Make promise version of fs.readFile()
fs.readFileAsync = function(filename) {
    return new Promise(function(resolve, reject) {
        fs.readFile(filename, function(err, data){
            if (err) 
                reject(err); 
            else 
                resolve(data);
        });
    });
};

function getAllUsers() {
    return fs.readFileAsync('users.json').then(
        function (data) {
            let users = JSON.parse(data);
            return users;
        },
        function (error) {
            throw error;
        }
    );
}