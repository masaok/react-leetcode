import { Routes, Route, Navigate, BrowserRouter as Router } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'

// Containers
import DesktopGridContainer from 'containers/DesktopGridContainer'
import ProblemContainer from 'containers/ProblemContainer'

// Two Sum
import TwoSum from 'problems/TwoSum/TwoSum'
import TwoSumTwoPassHashTable from 'problems/TwoSum/TwoSumTwoPassHashTable'

const App = () => {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/two-sum-two-pass" />} />
          <Route path="/">
            <Route element={<DesktopGridContainer />}>
              <Route element={<ProblemContainer />}>
                <Route path="two-sum" element={<TwoSum />} />
                <Route path="two-sum-two-pass" element={<TwoSumTwoPassHashTable />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </Router>
    </HelmetProvider>
  )
}

export default App
