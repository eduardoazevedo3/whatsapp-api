import mongoose from 'mongoose'
import { MongoStore } from 'wwebjs-mongo'
import { Client, Message, MessageContent, RemoteAuth } from 'whatsapp-web.js'

class WhatappService {
  _client: Client

  constructor(clientId: string) {
    const store = new MongoStore({ mongoose })
    this._client = new Client({
      authStrategy: new RemoteAuth({
        backupSyncIntervalMs: 60000,
        clientId,
        store,
      }),
    })
  }

  private triggerReady() {
    console.log('Client is ready!')
  }

  private triggerMessage(message: Message) {
    if (message.body === '!ping') {
      message.reply('pong')
    }

    if (message.body === '!hello') {
      this._client.sendMessage(message.from, 'Hi, how can I help you?')
    }
  }

  sendMessage(chatId: string, content: MessageContent) {
    this._client.sendMessage(chatId, content)
  }

  initialize() {
    // this._client.on("ready", this.triggerReady);
    this._client.on('message', this.triggerMessage)
    this._client.initialize()
  }

  get client() {
    return this._client
  }
}

export default WhatappService
