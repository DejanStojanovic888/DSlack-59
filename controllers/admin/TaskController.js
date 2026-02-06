const User = require('../../models/User');

const index = async (req, res) => {
    const Task = require('../../models/Task');  // ??? zasto AI kaze da ovo mora ovde. Baza prvo da se ucita nesto...
    const tasks = await Task.find({});
    res.render('admin/task/index', { tasks,user: req.session.user, title: 'Tasks'}); // ovde ne moze samo 'admin/task'
}

const create = async (req, res) => {
    const users = await User.find({});
    res.render('admin/task/create', { users, user: req.session.user, title: 'Create Task'});
}

module.exports = {
    index, create
}