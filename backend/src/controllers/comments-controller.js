import Comments from '../models/Comment';

async function getCommentsByTopicID(topicID) {
  const comments = await Comments.find({ topicID }, { topicID: 0, __v: 0 }).sort({ date: -1 });
  return comments;
}

async function saveComment(topicID, username, message) {
  await new Comments({ topicID, username, message }).save();
}

export default {
  getCommentsByTopicID,
  saveComment,
};
