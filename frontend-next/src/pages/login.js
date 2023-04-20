import { UserContextData } from '@/context/user-context';
import { useContext } from 'react';
import config from '@/config';
import { useRouter } from 'next/router';

import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser,
} from 'amazon-cognito-identity-js';

export default function LoginPage() {
  const { isAuthenticated, setIsAuthenticated } = useContext(UserContextData);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await login(event.target.email.value, event.target.password.value);
      setIsAuthenticated(true);
      router.push('/');
    } catch (e) {
      alert(e);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input type="text" id="email" name="email" required />
      <br />
      <label htmlFor="password">Password</label>
      <input type="text" id="password" name="password" required />
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

function login(email, password) {
  const userPool = new CognitoUserPool({
    UserPoolId: config.cognito.USER_POOL_ID,
    ClientId: config.cognito.APP_CLIENT_ID,
  });

  const user = new CognitoUser({ Username: email, Pool: userPool });
  const authenticationData = { Username: email, Password: password };
  const authenticationDetails = new AuthenticationDetails(authenticationData);

  return new Promise((resolve, reject) =>
    user.authenticateUser(authenticationDetails, {
      onSuccess: (result) => resolve(),
      onFailure: (err) => reject(err),
    })
  );
}
