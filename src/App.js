import "./App.css";
import Header from "./components/header";
import Banner from "./components/banner";
import { InfoCard } from "./components/InfoCard";

function App() {
  return (
    <div className="App">
      <Header />
      <Banner />
      <InfoCard />
    </div>
  );
}

export default App;
