import { Navbar, Header, Categories } from './components'

function App() {
  return (
    <>
    <main className='App w-full max-w-480 h-full flex flex-col items-center px-20 gap-10 max-[640px]:px-10 max-[500px]:px-5'>
      <Navbar />
      <Header />
      <Categories />
    </main>
    </>
  );
}

export default App;
