const { PubSub } = require('@google-cloud/pubsub');
const { logger } = require('../winston-log/winston');

// Creates a client instance
const pubsub = new PubSub();

// Publishes a message to the topic
async function publishMessage(message) {
    try {
        logger.info('Publishing message to Pub/Sub topic: ' + JSON.stringify(message));
        const topicName = process.env.PUBSUB_TOPIC_NAME;
        const dataBuffer = Buffer.from(JSON.stringify(message));
        const messageId = await pubsub.topic(topicName).publishMessage({data: dataBuffer});;
        logger.info(`Message ${messageId} published to topic ${topicName}`);
        return { success: true, code: 200 };
    } catch (error) {
        logger.error('Error publishing message:', error);
        return { success: false, code: error.code, message: error.message};
    }
}

module.exports = { publishMessage };