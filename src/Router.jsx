import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import socket from 'socket.js';
const HomePage = lazy(() => import('./pages/home'));
const Game = lazy(()=> import('./pages/game'))
const GameOver = lazy(()=> import('./pages/over'))

export default function Router() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/game" element={<Game />}/>
          <Route path="/gameover" element={<GameOver/>}/>
        </Routes>
    </BrowserRouter>
  );
}