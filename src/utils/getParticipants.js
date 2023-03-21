export const getParticipants = (participants, email) => {
  if (participants.length === 0) {
    return {};
  }
  return participants.find((participant) => participant.email !== email);
};
