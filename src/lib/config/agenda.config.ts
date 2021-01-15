// import Agenda from "agenda";
// import endpoint from "./endpoints.config";
// import User from "../../models/user";
// import pushNotification from "../util/pushNotification";
// const agenda = new Agenda({ db: { address: endpoint.DATABASE_URI } });

// agenda.define(
//   "send notification when add new map",
//   { priority: "high", concurrency: 10 },
//   async (job) => {

//   }
// );

// (async function () {
//   // IIFE to give access to async/await
//   await agenda.start();

//   await agenda.every("2 minutes", "send notification when add new map");
// })();
