import { ISocket, IUser } from "../interfaces/userInterfaces"
import User from "../models/userModel";

export const updateStatus = (userId: IUser["_id"], status: "ONLINE" | "OFFLINE" | "TYPING"): void => {
    User.findByIdAndUpdate(userId, { userStatus: status })
}

export const getUserStatus = async (userId: IUser["_id"]) => {
    return new Promise<IUser["userStatus"]>(async (resolve, reject) => {
        try {
            const user = await User.findById(userId, { userStatus: 1 });
            resolve(user?.userStatus ?? "OFFLINE")
        } catch (error: any) {
            reject({message: error.message || "Status Failed"})
        }
    })
}

export const searchUsers = async (quary: string, userId: IUser["_id"]) => {
    return new Promise<IUser[]>(async (resolve, reject) => {
        try {
            if (!quary) {
                return reject({
                    message: `Provide quary event`,
                });
            }

            const users: IUser[] = await User.find({
                _id: { $ne: userId },
                name: {
                    $regex: `^${quary}`, $options: "i",
                },
                userName: { $regex: `^${quary}`, $options: "i" }
            }, {
                accounts: 0,
                TwoStepVerification: 0,
                logs: 0,
                __v: 0,
            });
            resolve(users);
        } catch (error: any) {
            reject({
                message: error.message,
            });
        }
    });
};

// export const createConversation = async ({
//     userId,
//     senderId,
//     msgData,
//     type,
//     groupId,
// }:{userId:IUser["_id"],senderId:IUser["_id"],msgData:}) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             if (!userId || !msgData || !type) {
//                 return reject({
//                     success: false,
//                     msg: `Provide valid datas in event`,
//                 });
//             }
//             if (type === "private-chat") {
//                 let conversation = await Conversation.findOne({
//                     $or: [
//                         { participants: [userId, senderId] },
//                         { participants: [senderId, userId] },
//                     ]
//                 });

//                 if (conversation) {
//                     conversation.messages = [
//                         ...conversation.messages,
//                         { ...msgData },
//                     ];

//                     let { _id, messages } = await conversation.save();

//                     return resolve({
//                         response: {
//                             success: true,
//                             data: {
//                                 convId: _id,
//                                 messages,
//                             },
//                         },
//                         type: "Old Conv",
//                     });
//                 } else {
//                     const { _id, messages } = await Conversation.create({
//                         participants: [userId, senderId],
//                         messages: [{ ...msgData }],
//                     });

//                     let userInbox = await Inbox.create({
//                         type,
//                         userId: userId,
//                         senderId: senderId,
//                         conversationId: _id,
//                     });
//                     let senderInbox = await Inbox.create({
//                         type,
//                         userId: senderId,
//                         senderId: userId,
//                         conversationId: _id,
//                     });

//                     return resolve({
//                         response: {
//                             success: true,
//                             data: { convId: _id, messages },
//                         },
//                         type: "New Conv",
//                         userInbox,
//                         senderInbox,
//                     });
//                 }
//             }

//             if (type === "group-chat") {
//                 let conversation = await Conversation.findOne({
//                     $and: [{ groupId }, { participants: { $in: [userId] } }],
//                 });

//                 if (!conversation) {
//                     const { _id, messages } = await Conversation.create({
//                         groupId,
//                         participants: [{ userId }],
//                         roles: {
//                             admin: [{ userId }],
//                         },
//                         messages: [],
//                     });
//                     let userInbox = await Inbox.create({
//                         type,
//                         userId: userId,
//                         groupId: groupId,
//                         conversationId: _id,
//                     });
//                     return resolve({
//                         response: {
//                             success: true,
//                             data: { convId: _id, messages },
//                         },
//                         userInbox,
//                         type: "new Conv",
//                     });
//                 } else {
//                     return reject({
//                         success: false,
//                         msg: "Group Conversation already exist",
//                     });
//                 }
//             }
//         } catch (error) {
//             console.log(error.message);
//             return reject({
//                 success: false,
//                 msg: error.message,
//             });
//         }
//     });
// };

// export const getUserInboxes = async (user) => {
//     return new Promise(async (resolve, reject) => {
//       try {
//         if (!user) {
//           return reject({
//             success: false,
//             msg: `Unauthorized event`,
//           });
//         }
  
//         let inboxes = await Inbox.aggregate([
//           {
//             $match: { userId: ObjectId(user._id) },
//           },
//           {
//             $lookup: {
//               from: "users",
//               localField: "senderId",
//               foreignField: "_id",
//               as: "sender",
//             },
//           },
//           { $unwind: "$sender" },
//           {
//             $lookup: {
//               from: "conversations",
//               localField: "conversationId",
//               foreignField: "_id",
//               as: "conversations",
//             },
//           },
//           {
//             $unwind: "$conversations",
//           },
//           {
//             $addFields: {
//               lastMsg: { $last: "$conversations.messages" },
//             },
//           },
//           {
//             $lookup: {
//               from: "users",
//               localField: "lastMsg.authorId",
//               foreignField: "_id",
//               as: "author",
//             },
//           },
//           {
//             $unwind: "$author",
//           },
//           {
//             $addFields: {
//               authorName: "$author.name",
//             },
//           },
//           {
//             $project: {
//               userId: 0,
//               senderId: 0,
//               "sender.accounts": 0,
//               "sender.TwoStepVerification": 0,
//               "sender.logs": 0,
//               "sender.__v": 0,
//               __v: 0,
//               conversations: 0,
//               author: 0,
//             },
//           },
//         ]);
//         return resolve({
//           success: true,
//           data: { inboxes },
//         });
//       } catch (error) {
//         console.log(2);
//         return reject({
//           success: false,
//           msg: error.message,
//         });
//       }
//     });
//   };


// export const getUserConversation = async ({ userId, senderId, convId, type }) => {
//     return new Promise(async (resolve, reject) => {
//       try {
//         if (!userId || !convId || !type) {
//           return reject({
//             success: false,
//             msg: `Provide datas event`,
//           });
//         }
//         if (type === "private-chat") {
//           let conversation = await Conversation.aggregate([
//             {
//               $match: {
//                 $and: [
//                   { _id: ObjectId(convId) },
//                   {
//                     $or: [
//                       {
//                         participants: [ObjectId(userId), ObjectId(senderId)],
//                       },
//                       {
//                         participants: [ObjectId(senderId), ObjectId(userId)],
//                       },
//                     ],
//                   },
//                 ],
//               },
//             },
//             {
//               $lookup: {
//                 from: "users",
//                 localField: "participants",
//                 foreignField: "_id",
//                 as: "members",
//               },
//             },
//             {
//               $project: {
//                 _id: 0,
//                 members: 1,
//                 messages: 1,
//               },
//             },
//           ]);
  
//           let { messages, members } = conversation[0];
  
//           return resolve({
//             success: true,
//             data: { messages, members },
//           });
//         }
  
//         if (type === "group-chat") {
//           let conversation = await Conversation.aggregate([
//             {
//               $match: {
//                 $and: [
//                   { _id: ObjectId(convId) },
//                   {
//                     participants: { $in: [ObjectId(userId)] },
//                   },
//                 ],
//               },
//             },
//             {
//               $lookup: {
//                 from: "users",
//                 localField: "participants",
//                 foreignField: "_id",
//                 as: "members",
//               },
//             },
//             {
//               $project: {
//                 _id: 0,
//                 members: 1,
//                 messages: 1,
//                 roles: 1,
//               },
//             },
//           ]);
  
//           let { messages, members } = conversation[0];
  
//           return resolve({
//             success: true,
//             data: { messages, members, roles },
//           });
//         }
//       } catch (error) {
//         return reject({
//           success: false,
//           msg: error.message,
//         });
//       }
//     });
//   };
  

// exports.sentMessage = async ({ userId, convId, msgData, type }) => {
//     return new Promise(async (resolve, reject) => {
//       try {
//         if (!convId || !msgData || !userId) {
//           return reject({
//             success: false,
//             msg: `Provide valid datas in event`,
//           });
//         }
  
//         if (type === "private-chat") {
//           const newConv = await Conversation.findOneAndUpdate(
//             {
//               $and: [
//                 { _id: convId },
//                 {
//                   participants: { $in: [userId] },
//                 },
//               ],
//             },
//             {
//               $push: {
//                 messages: [{ ...msgData }],
//               },
//             },
//             { new: true }
//           );
//           let message = newConv.messages[newConv.messages.length - 1];
  
//           resolve({
//             success: true,
//             data: { message },
//           });
//         }
//       } catch (error) {
//         return reject({
//           success: false,
//           msg: `message creation faild in event`,
//         });
//       }
//     });
//   };