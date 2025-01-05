import Head from 'next/head';
import KommunicateChat from '@/components/Chat';

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>E-Cell Chatbot</title>
      </Head>
      <main>
        <h1>Welcome to E-Cell</h1>
        <KommunicateChat />
      </main>
    </>
  );
};

export default Home;
