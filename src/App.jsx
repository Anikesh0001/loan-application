import Wizard from './components/wizard/Wizard';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="mb-6 text-2xl font-bold text-primary">LendSwift</h1>
        <Wizard />
      </main>
    </div>
  );
}

export default App;
