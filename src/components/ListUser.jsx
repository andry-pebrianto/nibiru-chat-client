import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { getListUser } from '../redux/actions/user';

export default function ListUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { listUser } = useSelector((state) => state);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(getListUser(search, navigate));

    return 0;
  }, []);

  const submitSearch = (e) => {
    e.preventDefault();

    dispatch(getListUser(search, navigate));
  };

  return (
    <div className="left-menu col-3 p-4">
      <div className="d-flex justify-content-between">
        <h3 className="color-blue fw-bold">Nibiru Chat</h3>
        <div className="dropdown">
          <div
            role="button"
            id="dropdownMenuLink"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <div className="hamburger-item" />
            <div className="hamburger-item" style={{ width: '25px' }} />
            <div className="hamburger-item" />
          </div>
          <ul className="dropdown-menu mt-2" aria-labelledby="dropdownMenuLink">
            <li>
              <Link to="?tab=profile" type="button" className="dropdown-item my-3 text-white">
                Profile
              </Link>
            </li>
            <li>
              <button
                type="button"
                className="dropdown-item my-3 text-white"
                href="#"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
      <form onSubmit={submitSearch}>
        <div className="d-flex mt-4 align-items-center">
          <h5 className="me-2">
            <BsSearch />
          </h5>
          <input
            type="text"
            className="input-search form-control"
            placeholder="Search for any user"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </form>
      <div className="mt-4">
        {listUser.isLoading ? (
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <div>
            {listUser.isError ? <h5>{listUser.error}</h5> : (
              <div>
                {listUser.data.length ? (
                  <>
                    {listUser.data.map((user) => (
                      <div key={user.id}>
                        {user.id !== localStorage.getItem('id') && (
                        <button type="button" className="btn text-dark">
                          <div className="user-item">
                            {user.photo ? (
                              <img
                                className="profile-rounded"
                                src={`https://drive.google.com/uc?export=view&id=${user.photo}`}
                                alt="Gambar Profile"
                              />
                            ) : (
                              <img
                                className="profile-rounded"
                                src="https://images227.netlify.app/mernuas/default.jpg"
                                alt="Gambar Profile"
                              />
                            )}
                            <div className="w-100 mx-3">
                              <p className="fw-bold">{user.username}</p>
                            </div>
                            <small className="text-end">12.20</small>
                          </div>
                        </button>
                        )}
                      </div>
                    ))}
                  </>
                ) : <h5>User tidak ditemukan</h5>}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
