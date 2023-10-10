import React, { createContext, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PaginaBase from './Pages/PaginaBase/PaginaBase';
import PaginaNovoVideo from './Pages/PaginaNovoVideo/PaginaNovoVideo';
import PaginaInicial from './Pages/PaginaInicial/PaginaInicial';
import Player from './Pages/Player/Player';
import PaginaNovaCategoria from './Pages/PaginaNovaCategoria/PaginaNovaCategoria';
import PaginaFavoritos from './Pages/PaginaFavoritos/PaginaFavoritos';
import FavoritosProvider from './context/FavoritadosContext';
import PainelDeControle from './Pages/PainelDeControle/PainelDeControle';


function AppRoutes() {

  return (
      <FavoritosProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PaginaBase />}>
            <Route index element={<PaginaInicial />} />
            <Route path="novovideo" element={<PaginaNovoVideo />} />
            <Route path="novaCategoria" element={<PaginaNovaCategoria />} />
            <Route path="favoritos" element={<PaginaFavoritos />} />
            <Route path="controle" element={<PainelDeControle />} />
            <Route path="/:id" element={<Player />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
      </FavoritosProvider>
  );
}

export default AppRoutes;
