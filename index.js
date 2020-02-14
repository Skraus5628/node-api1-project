// implement your API here
const express = require("express")
const db = require("./data/db")
const port = 5000;

const server = express()

server.use(express.json())
server.use(cors())

server.get("/", (req, res) =>{
    res.json({ message: "We're all mad here..."})
})


// Get all Users
server.get("/api/users", (req, res) =>{
    db.find()
        .then(userList =>{
            res.status(200).json(userList);
        })
        .catch(err =>{
            res
                .status(500)
                .json({
                    errorMessage: "The users information could not be retrieved."
                })
        })
})

// Get Individual User
server.get('/api/users/:id', (req, res) =>{
    const userId = req.params.id;
    db.findById(userId)
        .then(user => {
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({
                    message: "The user with the specified ID does not exist."
                });
            }
        })

        .catch(err =>{
            res.status(404).json({
                errorMessage: "The user information could not be retrieved."
            });
        });
});


// Post a new User!
server.post('/api/users', (req, res) =>{
    const newUser = req.body;
    if (newUser.name && newUser.bio) {
        db.insert(newUser)
        .then(user =>{
            res.status(201).json(user);
        })
        .catch(err =>{
            res.status(500).json({
                errorMessage:
                "There was an error while saving the user to the database"
            });
        });
    } else {
        res
        .status(400)
        .json({ errorMessage: "Please provide nameand bio for the user."})
    }
});


// Delete a User

server.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    db.remove(userId)
        .then(user => {
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({
                  message: "The user with the specified ID does not exist."
                });
            }
        })
        .catch(err => {
            res.status(500).json({
              errorMessage: "The user could not be removed"
            });
        })
});

// Edit a User! Woohoo

server.put("/api/users/:id", (req, res) =>{
    const editUser = req.body;
    if (editUser.name && editUser.bio){
        db.update(editUser.id, editUser)
            .then(user =>{
                if(user){
                    res.status(201).json(user);
                } else {
                    res.status(404).json({
                        message: "The user with the specified ID does not exist."
                    });
                }
            })
            .catch(err =>{
                res.status(500).json({
                    errorMessage: "The user information could not be modified."
                });
            });
    } else {
        res
            .status(400)
            .json({ errorMessage: "Please provide name and bio for the user."})
    }
});

server.listen(port, () =>{
    console.log(`Server listening on port ${port}`);
})