# thelocalgame

This is the respository holding the Stream Portion Front-end (tlg_ffx) and Back-end (tlg_bff) for the entirity of the RFID Poker Table.

Learn more about this project on my [website][https://www.yourlocaldev.com/projects/rfid]

## Notible files:

### Front-end (Stream Overlay) | Next.js SPA

[Live.tsx](https://github.com/yourlocaldeveloper/thelocalgame/blob/develop/tlg_ffx/organism/Live/Live.tsx)

Handles the green screen stream overlay displaying information about the game. Cards, player stack, community cards and more.

### Back-end | Express App

[app.js](https://github.com/yourlocaldeveloper/thelocalgame/blob/develop/tlg_bff/app.js)

Handles socket.io and endpoint requests. This is where we the RFID module will fire its POST requests with the UIDs of the cards.

## To run dev:

### To run tlg_ffx

```bash
# using npm
npm run dev

# OR using Yarn
yarn dev
```

### To run tlg_bff

```bash
# using npm
npm run devbff

# OR using Yarn
yarn devbff
```
