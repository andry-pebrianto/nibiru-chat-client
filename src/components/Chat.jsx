/* eslint-disable react/prop-types */
import React from 'react';
import moment from 'moment';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';

export default function Chat({
  activeReceiver,
  detailReceiver,
  listChat,
  onSendMessage,
  message,
  setMessage,
  onDeleteMessage,
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <>
      {activeReceiver ? (
        <div className="chat-menu col-8 col-md-9 p-0 m-0 d-flex flex-column justify-content-between">
          <div className="chat-menu-header bg-white py-3 px-5">
            <div className="d-flex">
              {detailReceiver.isLoading ? (
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                <>
                  {detailReceiver.data.photo ? (
                    <img
                      className="profile-rounded pointer"
                      src={`https://drive.google.com/uc?export=view&id=${detailReceiver.data.photo}`}
                      alt="Gambar Profile"
                      onClick={toggleDrawer}
                    />
                  ) : (
                    <img
                      className="profile-rounded pointer"
                      src="https://images227.netlify.app/mernuas/default.jpg"
                      alt="Gambar Profile"
                      onClick={toggleDrawer}
                    />
                  )}
                  <div className="ms-3 pointer" onClick={toggleDrawer}>
                    <p className="fw-bold m-0 p-0">
                      {detailReceiver.data.username}
                    </p>
                    <p className="fw-bold color-blue m-0 p-0">
                      <small>Online</small>
                    </p>
                  </div>
                  <Drawer
                    open={isOpen}
                    onClose={toggleDrawer}
                    direction="right"
                    className="bla bla bla"
                    size={350}
                  >
                    <div className="p-3">
                      <div className="profile mt-4 profile">
                        <div className="position-relative">
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
                        </div>
                        <h5 className="fw-bold mt-3">
                          {detailReceiver.data.username}
                        </h5>
                        <p>{detailReceiver.data.email}</p>
                        <div className="w-100 mt-3">
                          {
                            detailReceiver.data.phone && (
                            <p>
                              <b>Phone:</b>
                              {' '}
                              {detailReceiver.data.phone}
                            </p>
                            )
                          }
                          {
                            detailReceiver.data.bio && (
                            <p>
                              <b>Bio:</b>
                              {' '}
                              {detailReceiver.data.bio}
                            </p>
                            )
                          }
                        </div>
                      </div>
                    </div>
                  </Drawer>
                </>
              )}
            </div>
          </div>
          <div className="chat-menu-message p-4" id="chatMenuMessage">
            {detailReceiver.isLoading ? (
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <>
                {listChat.length ? (
                  <>
                    {listChat.map((chat) => (
                      <div key={chat.id}>
                        {chat.sender_id === localStorage.getItem('id') ? (
                          <div>
                            <div className="d-flex justify-content-end align-items-end mt-4">
                              <div className="ballon-right me-2">
                                {chat.is_deleted ? (
                                  <p className="p-0 m-0 text-secondary">
                                    This message has been deleted
                                  </p>
                                ) : (
                                  <>
                                    <p className="p-0 m-0">{chat.chat}</p>
                                    <small
                                      className="text-secondary"
                                      style={{ fontSize: '13px' }}
                                    >
                                      {moment(chat.date).format('LLL')}
                                    </small>
                                  </>
                                )}
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
                            {!chat.is_deleted && (
                              <div
                                className="d-flex justify-content-end w-100"
                                style={{ marginTop: '-12px' }}
                              >
                                <span className="text-primary pointer mt-3 me-2">
                                  Edit
                                </span>
                                <span
                                  className="text-danger pointer mt-3"
                                  onClick={() => onDeleteMessage(chat)}
                                  style={{ marginRight: '65px' }}
                                >
                                  Delete
                                </span>
                              </div>
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
                              <small
                                className="text-light"
                                style={{ fontSize: '13px' }}
                              >
                                {moment(chat.date).format('LLL')}
                              </small>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </>
                ) : (
                  <p className="fs-5">No message yet</p>
                )}
              </>
            )}
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
