import '../assets/styles/home.css';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ListUser from '../components/ListUser';
import Chat from '../components/Chat';

export default function Home() {
  const [queryParams] = useSearchParams();
  const [tab, setTab] = useState('');

  useEffect(() => {
    setTab('');
    if (queryParams.get('tab')) {
      setTab(queryParams.get('tab'));
    }
  }, [queryParams]);

  useEffect(() => {
    document.title = `${process.env.REACT_APP_APP_NAME} - Home`;
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        {
          tab === 'profile' ? <h1>Asw</h1> : <ListUser setTab={setTab} />
        }
        <Chat />
      </div>
    </div>
  );
}
