const url = require('url');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const ws = require('ws');

const Cookies = require('cookies');

const controller = require('./controllers');

const session = require('koa-session');

const Sequelize = require('sequelize');
const config = require('./config');


// 这是一个类
const WebSocketServer = ws.Server;

const templating = require('./templating');
const { create } = require('domain');
const isProduction = process.env.NODE_ENV === 'production';


// (async () => {
//     var coaches = await Coach.findAll({
//     });
//     console.log(`find ${coaches.length} coaches:`);
//     for(let c of coaches) {
//         console.log(JSON.stringify(c));
//     }
// })();

const tables = require('./tables');

var where_clause = {
};

// function findInCoaches(where_clause) {
//     (async () => {
//         var coaches = await tables.Coach.findAll({
//             where: where_clause
//         });
//         console.log(`find ${coaches.length} coaches:`);
//         console.log(coaches);
//         // for(let c of coaches) {
//         //     console.log(c);
//         // }
//     })();
// }

// findInCoaches(where_clause);

// (async () => {
//     var LiMing = await Coach.create({
//         coach_name: 'Limin',
//         country: 'China'
//     });
//     console.log('create: ' + JSON.stringify(LiMing));
// })();


app.keys = ['this is my secret and fuck you all'];


app.use(session({
    key: 'koa:sess',
    maxAge: 7200000,
    overwrite: true,
    httpOnly: true,
    signed: true,
}, app));

// log request URL:
// 记录下请求的 URL 
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    var start = new Date().getTime();
    await next();
    var execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', `${execTime}ms`);
});


//static file support:
if(!isProduction) {
    let staticFiles = require('./static-files');
    app.use(staticFiles('/static/', __dirname + '/static'));
}

app.use(bodyParser());

// add nunjucks as view:
app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction
}));

// add controller middleware
app.use(controller());


let server = app.listen(3777);
console.log('app started at port 3777');


// function onConnect() {
//     let user = this.user;
//     let msg = createMessage('join', user, `${user.name} joined.`);
//     this.wss.broadcast(msg);
//     // build user list
//     var users = new Array();
//     this.wss.clients.forEach(function each(client) {
//         users.push(client.user);
//     });
//     this.send(createMessage('list', user, users));
//     for(let msg in history_messages) {
//         this.send(createMessage('chat', history_messages[msg][0], history_messages[msg][1]));
//     }
// }

// var history_messages = new Array();

// function onMessage(message) {
//     console.log(message);
//     if(message && message.trim()) {
//         history_messages.push([this.user, message.trim()]);
//         let msg = createMessage('chat', this.user, message.trim());
//         //this.wss.broadcast(msg);
//         this.wss.clients.forEach(function each(client) {
//             client.send(msg);
//         });
//     }
// }

// function onClose() {
//     let user = this.user;
//     let msg = createMessage('left', user, `${user.name} is left`);
//     //this.wss.broadcast(msg);
//     this.wss.clients.forEach(function each(client) {
//         client.send(msg);
//     });
// }

// var messageIndex = 0;

// function createMessage(type, user, data) {
//     messageIndex ++;
//     return JSON.stringify({
//         id: messageIndex,
//         type: type,
//         user: user,
//         data: data
//     });
// }

// function createWebSocketServer(server, onConnection,
//                        onMessage, onClose, onError) {
//     let wss = new WebSocketServer({
//         server: server
//     });

//     wss.broadcast = function (data) {
//         wss.clients.forEach(function (client) {
//             client.send(data);
//         });
//     };

//     onConnection = onConnection || function() {
//         console.log('[WebSocket] connected');
//     };

//     onMessage = onMessage || function(msg) {
//         console.log('[WebSocket] message received: ' + msg);
//     };

//     onClose = onClose || function(code, message) {
//         console.log(`[WebSocket] closed: ${code} - ${message}`);
//     };

//     onError = onError || function(err) {
//         console.log('[WebSocket] error: ' + err);
//     };

//     wss.on('connection', function(ws, req) {
//         let location = url.parse(req.url, true);
//         console.log('[WebSocketServer] connection: ' + location.href);
//         ws.on('message', onMessage);
//         ws.on('close', onClose);
//         ws.on('error', onError);
//         console.log('wss.on(connection) location.pathname: ' + location.pathname);
//         if(location.pathname !== '/ws/chat') {
//             //close ws:
//             ws.close(4000, 'Invalid URL');
//         }

//         // check user:
//         let user = parseUser(req);
//         if(!user) {
//             ws.close(4001, 'Invalid user');
//         }
//         ws.user = user;
//         ws.wss = wss;
//         onConnection.apply(ws);
//     });
//     console.log('WebSocketServer was attached');
//     return wss;
// }

// app.wss = createWebSocketServer(server, onConnect, onMessage, onClose);

// console.log('app started at port 3666');