const mongoose= require('mongoose');

// map promises to global
mongoose.Promise = global.Promise;
// mongoose connect
mongoose.connect('mongodb://sandy:sandy@ds223738.mlab.com:23738/pusherpoll2')
.then(() => console.log('mongo DB connected'))
.catch((err) => console.log(err));