import webpush from "../config/webpush.config";

const pushNotification = async (
  subscription: webpush.PushSubscription,
  payload: object
) => {
  try {
    await webpush
      .sendNotification(subscription, JSON.stringify(payload))
      .catch((err) => {
        console.log(err);
      });

    return true;
  } catch (error) {
    return false;
  }
};

export default pushNotification;
