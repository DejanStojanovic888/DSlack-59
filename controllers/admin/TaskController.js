const User = require('../../models/User');
const Task = require('../../models/Task');  

const index = async (req, res) => {
    console.log(req.session.user)
    // ne valja da nam daje sve taskove ovde ispod zato ide $or:
    const tasks = await Task.find({ // ovo je array of mongoose document objects(ako hocemo da dobijemo array of plain JS objects moramo da dodamo .lean() To je dobro za performanse. Mongoose-document-object ima svoje metode pa je veci od JS-objekta)
        $or: [                      // da ne bi povlacili celu bazu(baza filtrira umesto nas)
            { assignedBy: req.session.user._id }, 
            { assignedTo: req.session.user._id },
            { public: true }
        ] 
    })   
    .populate('assignedTo')             // Ali ako hocemo da dodajemo nove metode i virtuale na ovaj object onda ne smemo da dodajemo .lean() jer onda nece raditi
    .populate('assignedBy');            // .lean() bi koristio kada su veliki datasetovi(sa milionima korisnika)
    // console.log(tasks)   // bitan log jer nam daje sliku sa cime radimo
    res.render('admin/task/index', { tasks, title: 'Tasks', user: req.session.user }); // ovde ne moze samo 'admin/task'
}

const create = async (req, res) => {
    const users = await User.find({});
    res.render('admin/task/create', { users, title: 'Create Task', user: req.session.user});
}

const store = async (req, res) => {
    let { title, description, assignedTo, public} = req.body;
    // console.log(req.session, "session");
    public = public == 'on';
    const task = await Task.create({ 
        title, 
        description, 
        assignedTo, 
        public, 
        assignedBy: req.session.user._id   // bitno
    });
    res.redirect('/admin/task');
}

module.exports = {
    index, create, store
}