import '@/styles/globals.css';
import UserContext from '@/context/user-context';
import Layout from '@/components/layout';

export default function App({ Component, pageProps }) {
  return (
    <div>
      <UserContext>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserContext>
    </div>
  );
}
