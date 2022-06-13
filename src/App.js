import "./App.css";

import React, { useState } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoadingBar from "react-top-loading-bar";

export default function App() {
  const apiKey = process.env.REACT_APP_NEWS_API;

  const [progress, setProgress] = useState(0);

    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
            height={3}
            color="#f11946"
            progress={progress}
            onLoaderFinished={() => setProgress(0)}
          />
          <Routes>
            {/* passed unique keys so that component gets re-rendered properly*/}
            <Route
              exact
              path="/"
              element={
                <News
                  setProgress={setProgress}
                  apiKey={apiKey}
                  key="general"
                  country="in"
                  category="general"
                  pageSize={9}
                />
              }
            />
            <Route
              exact
              path="/business"
              element={
                <News
                  setProgress={setProgress}
                  apiKey={apiKey}
                  key="business"
                  country="in"
                  category="business"
                  pageSize={9}
                />
              }
            />
            <Route
              exact
              path="/entertainment"
              element={
                <News
                  setProgress={setProgress}
                  apiKey={apiKey}
                  key="entertainment"
                  country="in"
                  category="entertainment"
                  pageSize={9}
                />
              }
            />
            <Route
              exact
              path="/health"
              element={
                <News
                  setProgress={setProgress}
                  apiKey={apiKey}
                  key="health"
                  country="in"
                  category="health"
                  pageSize={9}
                />
              }
            />
            <Route
              exact
              path="/science"
              element={
                <News
                  setProgress={setProgress}
                  apiKey={apiKey}
                  key="science"
                  country="in"
                  category="science"
                  pageSize={9}
                />
              }
            />
            <Route
              exact
              path="/sports"
              element={
                <News
                  setProgress={setProgress}
                  apiKey={apiKey}
                  key="sports"
                  country="in"
                  category="sports"
                  pageSize={9}
                />
              }
            />
            <Route
              exact
              path="/technology"
              element={
                <News
                  setProgress={setProgress}
                  apiKey={apiKey}
                  key="technology"
                  country="in"
                  category="technology"
                  pageSize={9}
                />
              }
            />
          </Routes>
        </Router>
      </div>
    );
}
