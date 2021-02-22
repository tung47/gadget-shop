import express from 'express'
import compression from 'compression'
import session from 'express-session'
import bodyParser from 'body-parser'
import lusca from 'lusca'
import mongo from 'connect-mongo'
import flash from 'express-flash'
import path from 'path'
import mongoose from 'mongoose'
import passport from 'passport'
import bluebird from 'bluebird'
import morgan from 'morgan'

import { MONGODB_URI, SESSION_SECRET, PAYPAL_CLIENT_ID } from './util/secrets'

import productRouter from './routers/product'
import userRouter from './routers/user'
import orderRouter from './routers/order'
import uploadRouter from './routers/upload'

import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

const mongoUrl = MONGODB_URI

mongoose.Promise = bluebird
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
  })
  .catch((err: Error) => {
    console.log(
      'MongoDB connection error. Please make sure MongoDB is running. ' + err
    )
    process.exit(1)
  })

app.get('/', (req, res) => res.send('Hello from Express!'))

// Express configuration
// app.set('port', process.env.PORT || 5000)
app.listen(process.env.PORT || 5000, () => {
  console.log('You are connected!')
})

// Use common 3rd-party middlewares
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(lusca.xframe('SAMEORIGIN'))
app.use(lusca.xssProtection(true))
app.use(express.json())

// Use router
app.use('/api/v1/products', productRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/orders', orderRouter)
app.use('/api/v1/upload', uploadRouter)

app.get('/api/v1/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

app.use('/uploads', express.static(path.join(path.resolve(), '/uploads')))

// Custom API error handler
app.use(apiErrorHandler)

export default app
