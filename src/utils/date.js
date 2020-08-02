import moment from 'moment';

export const formatCommentDateShort = (dateString) => {
  const date = new Date(dateString);
  const commentDateString = moment(date).format(`MMMM YYYY`);
  return commentDateString;
};

export const formatCommentDateFull = (dateString) => {
  const date = new Date(dateString);
  const commentDateString = moment(date).format(`YYYY-MM-DD`);
  return commentDateString;
};
