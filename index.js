#!/usr/bin/env node
import * as childFork from 'child_process';
import { config } from 'dotenv';
config();
async function main() {
  fetch('https://api.api-ninjas.com/v1/quotes?category=happiness', {
    headers: {
      'X-Api-Key': process.env.QUOTE_SERVER_KEY
    }
  }).then(async (quote) => {
    const data = await quote.json();
    if (data[0]) {
      return childFork.exec(`notify-send '${data[0].author} says:' '${data[0].quote}'`);
    } else {
      return childFork.exec(`notify-send 'Hello Hari!' 'Welcome to Your Laptop!'`)
    }
  })
  childFork.execSync(`sleep 1 && vlc -Idummy assets/audio.mp3 vlc://quit`)
}

main();
