import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { editProfile, getDetailUser } from '../redux/actions/user';
import { createToast } from '../utils/createToast';

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { detailUser } = useSelector((state) => state);

  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    username: detailUser.data.username ? detailUser.data.username : '',
    phone: detailUser.data.phone ? detailUser.data.phone : '',
    bio: detailUser.data.bio ? detailUser.data.bio : '',
  });

  useEffect(() => {
    const id = localStorage.getItem('id');
    dispatch(getDetailUser(id, navigate));
  }, []);

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!form.username) {
      setErrors([{ msg: 'All field required (*) must be filled' }]);
    } else {
      setErrors([]);
      setIsLoading(true);

      const editProfileStatus = await editProfile(form, setErrors);
      if (editProfileStatus) {
        createToast('Edit Profile Success', 'success');
        const id = localStorage.getItem('id');
        dispatch(getDetailUser(id, navigate));
      }

      setIsLoading(false);
    }
  };

  return (
    <div className="left-menu col-3 p-4">
      <Link to="/">
        <div className="color-blue">
          <h3>
            <IoIosArrowBack />
          </h3>
        </div>
      </Link>
      <div className="profile mt-4 profile">
        {detailUser.data.photo ? (
          <img
            className="profile-rounded"
            src={`https://drive.google.com/uc?export=view&id=${detailUser.data.photo}`}
            alt="Gambar Profile"
          />
        ) : (
          <img
            className="profile-rounded"
            src="https://images227.netlify.app/mernuas/default.jpg"
            alt="Gambar Profile"
          />
        )}
        <h5 className="fw-bold mt-3">{detailUser.data.username}</h5>
      </div>
      <br />
      {errors.length > 0 && (
      <div className="alert alert-danger mx-0 py-2">
        <ul className="m-0">
          {errors.map((error, index) => (
            <li key={index}>{error.msg}</li>
          ))}
        </ul>
      </div>
      )}
      <form onSubmit={onSubmitHandler}>
        <div className="mb-4">
          <label htmlFor="username" className="form-label">
            * Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={form.username}
            onChange={onChangeHandler}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="form-label">
            * Email
          </label>
          <input
            readOnly
            type="email"
            className="form-control"
            id="email"
            value={detailUser.data.email}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            type="number"
            className="form-control"
            id="phone"
            value={form.phone}
            onChange={onChangeHandler}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="bio" className="form-label">
            Bio
          </label>
          <textarea
            type="text"
            className="form-control"
            id="bio"
            rows={3}
            value={form.bio}
            onChange={onChangeHandler}
          />
        </div>
        {isLoading ? (
          <button
            className="btn bg-blue text-light p-2 w-100 mb-4"
            disabled
            type="button"
          >
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            />
            {' '}
            Loading...
          </button>
        ) : (
          <button className="btn bg-blue text-light p-2 w-100 mb-4" type="submit">Update</button>
        )}
      </form>
    </div>
  );
}
