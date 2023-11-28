import Footer from "./components/Footer";
import Header from "./components/Header";
import TaskList from "./components/TaskList";

function App() {
  return (
    <>
      <Header />
      <main>
        <TaskList />
      </main>
      <Footer />
    </>
  );
}

export default App;
