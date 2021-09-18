import moment from "moment";

export const message = (user, text) => {
  return {
    user,
    text,
    time: moment().format("h:mm a"),
  };
};
