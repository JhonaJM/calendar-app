import React from 'react';

export const CalendarEvents = ({event}) => {
    const {title,user}= event;

  return (
    <div>
        <strong>{title}</strong>
        <span>-{user.name}</span>
    </div>
  );
};
