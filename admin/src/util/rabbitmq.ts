import * as amqp from 'amqplib'
import _ from 'lodash'

/**
 * @var {Promise<MessageBroker>}
 */
let instance;

/**
 * Broker for async messaging
 */
class MessageBroker {
  queues: {};
  connection: amqp.Connection;
  channel: amqp.Channel;
  static getInstance: () => Promise<any>;
  /**
   * Trigger init connection method
   */
  constructor() {
    this.queues = {}
  }

  /**
   * Initialize connection to rabbitMQ
   */
  async init() {
    this.connection = await amqp.connect('amqp_url'); // replace your url here
    this.channel = await this.connection.createChannel();
    return this
  }

  /**
   * Send message to queue
   * @param {String} queue Queue name
   * @param {Object} msg Message as Buffer
   */
  async send(queue, msg) {
    if (!this.connection) {
      await this.init();
    }
    await this.channel.assertQueue(queue, { durable: true });
    this.channel.sendToQueue(queue, msg)
  }

  /**
   * @param {String} queue Queue name
   * @param {Function} handler Handler that will be invoked with given message and acknowledge function (msg, ack)
   */
  async subscribe(queue, handler) {
    if (!this.connection) {
      await this.init();
    }

    if (this.queues[queue]) {
      const existingHandler = _.find(this.queues[queue], h => h === handler)
      if (existingHandler) {
        return () => this.unsubscribe(queue, existingHandler)
      }
      this.queues[queue].push(handler)
      return () => this.unsubscribe(queue, handler)
    }



    await this.channel.assertQueue(queue, { durable: true });
    this.queues[queue] = [handler]
    this.channel.consume(
      queue,
      async (msg) => {
        const ack = await _.once(() => this.channel.ack(msg))
        console.log(ack)
        this.queues[queue].forEach(h => h(msg, ack))
      },
      {noAck: false}
    );


    return () => this.unsubscribe(queue, handler)
  }

  async ack(msg, channel: amqp.Channel) {
    channel.ack(msg);
  }

  async unsubscribe(queue, handler) {
    _.pull(this.queues[queue], handler)
  }
}

/**
 * @return {Promise<MessageBroker>}
 */
MessageBroker.getInstance = async function () {
  if (!instance) {
    const broker = new MessageBroker();
    instance = broker.init()
  }
  return instance;
};

export default MessageBroker;