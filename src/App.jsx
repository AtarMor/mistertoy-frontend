import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'

import { HomePage } from "./pages/HomePage"
import { AppHeader } from './cmps/AppHeader'
import { ToyIndex } from "./pages/ToyIndex"
import { ToyEdit } from './pages/ToyEdit'
import { ToyDetails } from './pages/ToyDetails'
import { UserMsg } from './cmps/UserMsg'

import { store } from './store/store'
import { PriceChart } from './cmps/PriceChart'

export function App() {
  return (
    <Provider store={store}>
      <Router>
        <section className="app main-layout">
          <AppHeader />
          <main>
            <Routes>
              <Route element={<HomePage />} path="/" />
              <Route element={<ToyIndex />} path="/toy" />
              <Route element={<ToyEdit />} path="/toy/edit" />
              <Route element={<ToyEdit />} path="/toy/edit/:toyId" />
              <Route element={<ToyDetails />} path="/toy/:toyId" />
              <Route element={<PriceChart />} path="/dashboard" />
            </Routes>
            <UserMsg />
          </main>
          {/* <AppFooter /> */}
        </section>
      </Router>
    </Provider>
  )
}