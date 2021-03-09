const express = require('express')
const next = require('next')

const port = process.env.PORT || 8080
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const passport = require('passport')
const session = require('express-session')
const mongoose = require('mongoose');
const isDev = process.env.NODE_ENV !== 'production';
const config = isDev?require('./config/config'):'';
const {ensureAuthenticated} = require('./routes/auth')


app.prepare().then(() => {
    const server = express()

    const connectDB = async () => {
        try {
          const conn = await mongoose.connect(isDev ? config.db_dev : process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
          })
      
          mongoose.Promise = global.Promise;
      
      
          console.log(`MongoDB Connected: ${conn.connection.host}`)
        } catch (err) {
          console.error(err)
          process.exit(1)
        }
      }
      
      connectDB();

    server.use(express.urlencoded({ extended: true }));
    server.use(express.json());
    var idk  = session({
        secret: 'keyboard cat',
        resave: false,
        cookie:{ maxAge: 60000000},
        saveUninitialized: false,
      })
      
    server.use(idk);
    
    //Passport Middleware
    server.use(passport.initialize())
    server.use(passport.session())
    server.use('/SignIn', require('./routes/SignIn'))
    server.use('/SignUp', require('./routes/SignUp'))
    server.use('/User',ensureAuthenticated, require('./routes/User'))
    server.use('/Link', require('./routes/Link'))


    server.all('*', (req, res) => {
        return handle(req, res)
    })

    server.listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
    })
})