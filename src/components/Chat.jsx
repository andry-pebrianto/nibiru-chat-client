/* eslint-disable react/prop-types */
import React from 'react';
import moment from 'moment';

export default function Chat({
  activeReceiver,
  detailReceiver,
  listChat,
  onSendMessage,
  message,
  setMessage,
}) {
  return (
    <>
      {activeReceiver ? (
        <div className="chat-menu col-8 col-md-9 p-0 m-0 d-flex flex-column justify-content-between">
          <div className="chat-menu-header bg-white py-3 px-5">
            <div className="d-flex">
              {detailReceiver.data.photo ? (
                <img
                  className="profile-rounded"
                  src={`https://drive.google.com/uc?export=view&id=${detailReceiver.data.photo}`}
                  alt="Gambar Profile"
                />
              ) : (
                <img
                  className="profile-rounded"
                  src="https://images227.netlify.app/mernuas/default.jpg"
                  alt="Gambar Profile"
                />
              )}
              <div className="ms-3">
                <p className="fw-bold m-0 p-0">{detailReceiver.data.username}</p>
                <p className="fw-bold color-blue m-0 p-0">
                  <small>Online</small>
                </p>
              </div>
            </div>
          </div>
          <div className="chat-menu-message p-4" id="chatMenuMessage">
            {
              listChat.map((chat) => (
                <div key={chat.id}>
                  {chat.sender_id === localStorage.getItem('id') ? (
                    <div className="d-flex justify-content-end align-items-end mt-4">
                      <div className="ballon-right me-2">
                        <p className="p-0 m-0">{chat.chat}</p>
                        <small className="text-secondary" style={{ fontSize: '13px' }}>{moment(chat.date).format('LLL')}</small>
                      </div>
                      {chat.photo ? (
                        <img
                          className="profile-rounded"
                          src={`https://drive.google.com/uc?export=view&id=${chat.photo}`}
                          alt="Gambar Profile"
                        />
                      ) : (
                        <img
                          className="profile-rounded"
                          src="https://images227.netlify.app/mernuas/default.jpg"
                          alt="Gambar Profile"
                        />
                      )}
                    </div>
                  ) : (
                    <div className="d-flex justify-content-start align-items-end mt-4">
                      {chat.photo ? (
                        <img
                          className="profile-rounded"
                          src={`https://drive.google.com/uc?export=view&id=${chat.photo}`}
                          alt="Gambar Profile"
                        />
                      ) : (
                        <img
                          className="profile-rounded"
                          src="https://images227.netlify.app/mernuas/default.jpg"
                          alt="Gambar Profile"
                        />
                      )}
                      <div className="ballon-left ms-2">
                        <p className="p-0 m-0">{chat.chat}</p>
                        <small className="text-light" style={{ fontSize: '13px' }}>{moment(chat.date).format('LLL')}</small>
                      </div>
                    </div>
                  )}
                </div>
              ))
            }
          </div>
          <div className="chat-menu-form bg-white py-3 px-5">
            <form onSubmit={onSendMessage}>
              <div className="input-group">
                <input
                  className="form-control bg-light border-0"
                  id="message"
                  placeholder="Type your message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
                <button type="submit" className="btn text-white bg-blue">
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="chat-menu col-9 d-flex flex-column">
          <div className="chat-menu-blank p-4">
            <h5 className="text-secondary">
              Please select a chat to start messaging
            </h5>
          </div>
        </div>
      )}
    </>
  );
}
