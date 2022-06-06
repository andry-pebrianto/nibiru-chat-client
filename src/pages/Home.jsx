import '../assets/styles/home.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ListUser from '../components/ListUser';
import Profile from '../components/Profile';
import Chat from '../components/Chat';
import { getDetailReceiver, getDetailUser } from '../redux/actions/user';

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { detailUser, detailReceiver } = useSelector((state) => state);
  const [queryParams] = useSearchParams();
  const [tab, setTab] = useState('');

  const [socketio, setSocketio] = useState(null);
  const [message, setMessage] = useState('');
  const [listChat, setListChat] = useState([]);
  const [activeReceiver, setActiveReceiver] = useState('');

  useEffect(() => {
    document.title = `${process.env.REACT_APP_APP_NAME} - Home`;
    dispatch(getDetailUser(localStorage.getItem('id'), navigate));
  }, []);

  useEffect(() => {
    setTab('');
    if (queryParams.get('tab')) {
      setTab(queryParams.get('tab'));
    }
  }, [queryParams]);

  useEffect(() => {
    const socket = io(process.env.REACT_APP_API_URL);
    socket.on('send-message-response', (response) => {
      const receiver = detailReceiver.data.id;

      if (
        receiver === response[0].sender_id
        || receiver === response[0].receiver_id
      ) {
        setListChat(response);
      }
    });
    setSocketio(socket);
  }, []);

  const selectReceiver = (receiverId) => {
    setListChat([]);
    dispatch(getDetailReceiver(receiverId, navigate));
    setActiveReceiver(receiverId);
    socketio.emit('join-room', localStorage.getItem('id'));
    socketio.emit('chat-history', {
      sender: localStorage.getItem('id'),
      receiver: receiverId,
    });
  };

  const onSendMessage = (e) => {
    e.preventDefault();

    const data = {
      sender: localStorage.getItem('id'),
      receiver: detailReceiver.data.id,
      date: new Date(),
      chat: message,
    };
    socketio.emit('send-message', data);

    const payload = {
      sender_id: localStorage.getItem('id'),
      receiver_id: detailReceiver.data.id,
      photo: detailUser.data.photo,
      date: new Date(),
      chat: message,
    };
    setListChat([...listChat, payload]);

    setMessage('');
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {tab === 'profile' ? (
          <Profile />
        ) : (
          <ListUser setTab={setTab} selectReceiver={selectReceiver} />
        )}
        <Chat
          detailReceiver={detailReceiver}
          activeReceiver={activeReceiver}
          listChat={listChat}
          message={message}
          setMessage={setMessage}
          onSendMessage={onSendMessage}
        />
      </div>
    </div>
  );
}
