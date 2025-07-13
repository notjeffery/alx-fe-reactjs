import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import UserProfile from './components/UserProfile';
import './App.css';

function App() {
  return (
    <>
      <Header />
      <MainContent />
      <UserProfile name="Jeffery" age="27" bio="Loves football and music" />
      <Footer />
    </>
  );
}

export default App;
