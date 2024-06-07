
import Header from './Components/Header';
import MainDisplay from './Components/MainDisplay';
import Footer from './Components/Footer';

function App() {
  return (
    <div className="App flex flex-col justify-between h-[100vh]">
      <Header/>
      <MainDisplay />
      <Footer />
    </div>
  );
}

export default App;
