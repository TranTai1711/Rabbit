const amqp = require('amqplib/callback_api');

const AMQP_UTRL = 'amqp://localhost';
const ON_DEATH = require('death');

module.exports.publish = function(ex, msgKey, msgPayload){
    amqp.connect(AMQP_UTRL, (err, conn) =>{
        conn.createChannel((err,ch) => {
            ch.assertExchange(ex,'direct', { durable: true});
            ch.publish(ex,msgKey,Buffer.from(msgPayload))
            console.log("sent '%s'", msgKey)
            return '';
        });
        ON_DEATH((signal,err) => {
            console.log('clear')
            setTimeout(()=>{
                conn.close();
                process.emit(0);
            },1000);
        })
    })
}

module.exports.consume = (ex,qname, msgKey, invkFn) => {
    amqp.connect(AMQP_UTRL, (err, conn) =>{
        conn.createChannel((err,ch) => {
            ch.assertExchange(ex,'direct', { durable: true});
            ch.assertQueue(qname,{exclusive: false}, (err,q) => {
                ch.bindExchange(q.queue,ex,msgKey);
                ch.consume(q.queue, (msg) => {
                    invkFn(msg);

                    ON_DEATH((signal,err) => {
                        console.log('clear')
                        setTimeout(()=>{
                            conn.close();
                            process.emit(0);
                        },1000);
                    })
                }, {noAck: true})
            })
        });
        
    })
}