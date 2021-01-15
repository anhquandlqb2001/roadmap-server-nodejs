// export const notePost = async (req: Request, res: Response) => {
//   try {
//     const { text } = req.body;
//     const mapId = req.params.mapId;
//     const ownerMapId = req.params.ownerMapId;
//     if (!mapId || !text) {
//       return res.status(404).json({ success: false });
//     }

//     const userID = req.session.userId;

//     const user = await User.findOne({
//       _id: userID,
//       "maps._id": ownerMapId,
//       "maps.mapId": mapId,
//     });
//     console.log("user: ", user);

//     if (!user) {
//       return res.status(404).json({ success: false });
//     }

//     const note = await Note.findOne({ userID, ownerMapId, mapId });

//     if (!note) {
//       const _note = new Note();
//       (_note.userId = mongoose.Types.ObjectId(userID)),
//         (_note.mapId = mongoose.Types.ObjectId(mapId));
//       _note.ownerMapId = mongoose.Types.ObjectId(ownerMapId);
//       _note.text = text;
//       await _note.save();
//     } else {
//       note.text = text;
//       await note.save();
//     }
//     return res.json({ success: true });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, error });
//   }
// };

// export const getNote = async (req: Request, res: Response) => {
//   try {
//     const mapId = req.params.mapId;
//     const ownerMapId = req.params.ownerMapId;

//     const note = await Note.findOne({ mapId, ownerMapId });
//     if (!note) {
//       return res.status(404).json({ success: false });
//     }
//     return res.json({
//       success: true,
//       data: { text: note.text, updatedAt: note.updatedAt },
//     });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, error });
//   }
// };
