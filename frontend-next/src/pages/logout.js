import { UserContextData } from '@/context/user-context';
import { useContext } from 'react';

export function LogoutPage() {
  const { setIsAuthenticated } = useContext(UserContextData);
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await login(event.target.email.value, event.target.password.value);
      setIsAuthenticated(true);
    } catch (e) {
      alert(e);
    }
  };
}
