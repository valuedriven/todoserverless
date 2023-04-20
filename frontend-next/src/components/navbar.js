import Link from 'next/link';
import { useRouter } from 'next/router';
import { UserContextData } from '@/context/user-context';
import { useContext } from 'react';

export default function Navbar({ children }) {
  const { isAuthenticated, setIsAuthenticated } = useContext(UserContextData);
  const router = useRouter();
  function logout() {
    e.preventDefault();
    setIsAuthenticated(false);
    router.push('/');
  }
  return (
    <>
      <Link href="/">Home</Link>
      <Link href="/notes" hidden={!isAuthenticated}>
        Notes
      </Link>
      <Link href="/signup" hidden={isAuthenticated}>
        Signup
      </Link>
      <Link href="/login" hidden={isAuthenticated}>
        Login
      </Link>
      <Link href="/" hidden={!isAuthenticated} onClick={logout}>
        Logout
      </Link>
    </>
  );
}
