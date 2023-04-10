import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import config from '@/config';
import { UserContextData } from '@/context/user-context';

import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser,
} from 'amazon-cognito-identity-js';

export default function SignupPage() {
  const { isAuthenticated, setIsAuthenticated } = useContext(UserContextData);
  const [user, setUser] = useState(null);
  const [credentials, setCredentials] = useState(null);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setCredentials({
      email: event.target.email.value,
      password: event.target.password.value,
    });

    try {
      const newUser = await signup(credentials.email, credentials.password);
      setUser(newUser);
    } catch (e) {
      alert(e);
    }
  };

  const handleConfirmationSubmit = async (event) => {
    event.preventDefault();

    try {
      await confirm(user, event.target.confirmationCode.value);
      await authenticate(user, credentials.email, credentials.password);
      setIsAuthenticated(true);
      router.push('/');
    } catch (e) {
      alert(e);
    }
  };
  function renderConfirmationForm() {
    return (
      <form onSubmit={handleConfirmationSubmit}>
        <label htmlFor="confirmationCode">Confirmation code</label>
        <input
          defaultValue=""
          type="text"
          id="confirmationCode"
          name="confirmationCode"
          required
        />
        <button type="submit">Submit</button>
      </form>
    );
  }

  function renderSignupForm() {
    return (
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type="text" id="email" name="email" required />
        <label htmlFor="password">Password</label>
        <input type="text" id="password" name="password" required />
        <label htmlFor="confirmPassword">Confirm password</label>
        <input
          type="text"
          id="confirmPassword"
          name="confirmPassword"
          required
        />
        <button type="submit">Submit</button>
      </form>
    );
  }

  return (
    <div>{user === null ? renderSignupForm() : renderConfirmationForm()}</div>
  );
}

function signup(email, password) {
  const userPool = new CognitoUserPool({
    UserPoolId: config.cognito.USER_POOL_ID,
    ClientId: config.cognito.APP_CLIENT_ID,
  });

  return new Promise((resolve, reject) =>
    userPool.signUp(email, password, [], null, (err, result) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(result.user);
    })
  );
}

function confirm(user, confirmationCode) {
  return new Promise((resolve, reject) =>
    user.confirmRegistration(confirmationCode, true, function (err, result) {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    })
  );
}

function authenticate(user, email, password) {
  const authenticationData = {
    Username: email,
    Password: password,
  };
  const authenticationDetails = new AuthenticationDetails(authenticationData);

  return new Promise((resolve, reject) =>
    user.authenticateUser(authenticationDetails, {
      onSuccess: (result) => resolve(),
      onFailure: (err) => reject(err),
    })
  );
}
