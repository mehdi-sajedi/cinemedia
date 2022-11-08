import { useState } from 'react';
import styles from './Auth.module.scss';
import { auth } from '../../config/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { loginUser } from '../../features/user/userSlice';
import { toast } from 'react-toastify';
import { toastConfig } from '../../utilities/toastConfig';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

const Auth = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useDocumentTitle(isLoginForm ? 'Login' : 'Register');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email === '' && password === '') return;

    const request = isLoginForm
      ? signInWithEmailAndPassword
      : createUserWithEmailAndPassword;

    try {
      const res = await request(auth, email, password);

      const userData = {
        userEmail: res.user.email,
        id: res.user.uid,
      };

      dispatch(loginUser(userData));
      isLoginForm
        ? toast.info('Logged in', toastConfig)
        : toast.success('Successfully created account', toastConfig);

      localStorage.setItem('user', JSON.stringify(userData));
      navigate({
        pathname: '/movies',
      });
    } catch (error: any) {
      let message = error.code.slice(5).replaceAll('-', ' ');
      message = message[0].toUpperCase() + message.slice(1).toLowerCase();
      toast.error(message, toastConfig);
      console.log(error);
    }
  };

  const toggleForm = () => {
    setIsLoginForm((prevState) => !prevState);
    setEmail('');
    setPassword('');
  };

  return (
    <div className={styles.auth}>
      <h1>{isLoginForm ? 'Login' : 'Register'}</h1>
      <form onSubmit={onSubmit} className={styles.authForm}>
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          className={styles.input}
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          className={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className={styles.submit} typeof="submit">
          {isLoginForm ? 'Login' : 'Register'}
        </button>
      </form>
      <a href="#0" className={styles.toggle} onClick={toggleForm}>
        {isLoginForm ? 'Create an account' : 'Login'}
      </a>
    </div>
  );
};

export default Auth;
