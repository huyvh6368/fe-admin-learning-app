import { Routes, Route } from 'react-router-dom'
import { Fragment, useEffect } from 'react'
import "./layouts/index.jsx"
import RouterUrl from "./routes/index.js"
import DefaultLayout from './layouts/index.jsx'
import './App.css';

function App() {
  return (
    <Routes>
      {RouterUrl.map((item, index) => {
        const Layouts = item.layout === null ? Fragment : DefaultLayout;
        const Page = item.component;
        return (
          <Route key={index} path={item.path} element={
            <Layouts>
              <Page />
            </Layouts>
          } />
        )
      })}

    </Routes>
  );
}

export default App;
