import express from 'express';
import bodyParser from 'body-parser';
import exphbs from 'express-handlebars';
import path from 'path';
import session from 'express-session';
import {indexRoutes} from './routes/indexRoutes.js';
import {orderRoutes} from './routes/orderRoutes.js';
import {helpers} from './utils/handlebar-util.js'
import {overrideMiddleware} from "./utils/method-override.js";

export const app = express();
const hbs = exphbs.create({
    extname: '.hbs',
    defaultLayout: "default",
    helpers: {
        ...helpers
    }
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.resolve('views'));


app.use(express.static(path.resolve('public')));

app.use(session({secret: 'casduichasidbnuwezrfinasdcvjkadfhsuilfuzihfioda', resave: false, saveUninitialized: true}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(overrideMiddleware);

app.use("/orders", orderRoutes);
app.use("/", indexRoutes);
