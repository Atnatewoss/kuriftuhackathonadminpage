import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { AIInsights } from './components/AIInsights';
import { Members } from './components/Members';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/ai-insights" element={<AIInsights />} />
          <Route path="/members" element={<Members />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;