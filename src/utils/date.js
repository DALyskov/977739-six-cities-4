import moment from 'moment';

export const formatCommentDateShort = (date) => {
  const commentDateString = moment(date).format(`MMMM YYYY`);
  return commentDateString;
};

export const formatCommentDateFull = (date) => {
  const commentDateString = moment(date).format(`YYYY-MM-DD`);
  return commentDateString;
};
