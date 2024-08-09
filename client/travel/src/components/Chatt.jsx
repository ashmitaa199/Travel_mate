import React from 'react';

const Chatt = ({ descendingOrderMessages }) => {
  return (
    <div className="chat-display flex flex-col items-end w-screen pr-4">
      {descendingOrderMessages.map((message, _index) => (
        <div key={_index} className="flex gap-5 w-full justify-end mb-2">
          <div className="flex flex-row items-end px-4">
            <p className="bg-red-200 rounded-xl p-2 max-w-xs break-words text-right">{message.message}</p>
            <div className="chat-message-header flex flex-col items-end mt-1">
              <div className="img-container">
                <img src={message.img} alt={message.name + ' profile'} className="w-8 h-8 rounded-full" />
              </div>
              {/* <p>{message.name}</p> */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Chatt;
