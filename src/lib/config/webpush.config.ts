import webpush from 'web-push'

const vapidKeys = {
  privateKey: process.env.WEBPUSH_PRIVATE_KEY,
  publicKey: process.env.WEBPUSH_PUBLIC_KEY
};

webpush.setVapidDetails('mailto:example@yourdomain.org', vapidKeys.publicKey, vapidKeys.privateKey);


export default webpush