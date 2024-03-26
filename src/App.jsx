import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { HomePage } from "./pages/HomePage"
import { ToyIndex } from "./pages/ToyIndex"
import { UserMsg } from './cmps/UserMsg'
import { Provider } from 'react-redux'
import { ToyEdit } from './pages/ToyEdit'
import { ToyDetails } from './pages/ToyDetails'

import { store } from './store/store'

export function App() {
  return (
    <Provider store={store}>
      <Router>
        <section className="app">
          {/* <AppHeader /> */}
          <main className='main-layout'>
            <Routes>
              <Route element={<HomePage />} path="/" />
              <Route element={<ToyIndex />} path="/toy" />
              <Route element={<ToyEdit />} path="/toy/edit" />
              <Route element={<ToyEdit />} path="/toy/edit/:toyId" />
              <Route element={<ToyDetails />} path="/toy/:toyId" />
            </Routes>
            <UserMsg />
          </main>
          {/* <AppFooter /> */}
        </section>
      </Router>
    </Provider>
  )
}