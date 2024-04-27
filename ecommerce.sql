-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 27/04/2024 às 06:33
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `ecommerce`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `carrinho`
--

CREATE TABLE `carrinho` (
  `cartId` int(11) NOT NULL,
  `quantidade` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `produtoId` int(11) DEFAULT NULL,
  `usuarioId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `produtos`
--

CREATE TABLE `produtos` (
  `productId` int(11) NOT NULL,
  `nome` varchar(255) DEFAULT NULL,
  `descricao` varchar(255) DEFAULT NULL,
  `preco` double DEFAULT NULL,
  `imagem` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `produtos`
--

INSERT INTO `produtos` (`productId`, `nome`, `descricao`, `preco`, `imagem`, `createdAt`, `updatedAt`) VALUES
(1, 'África Brasil', 'Álbum de Jorge Ben Jor, lançado em 1976.', 29.99, 'images/disc/1.jpg', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'Alucinação', 'Álbum de Belchior, lançado em 1976.', 24.99, 'images/disc/2.jpg', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 'Cartola', 'Álbum de Cartola, lançado em 1974.', 27.99, 'images/disc/3.jpg', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(4, 'Gal Costa', 'Álbum de Gal Costa, lançado em 1969.', 26.99, 'images/disc/4.jpg', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(5, 'A Tábua de Esmeralda', 'Álbum de Jorge Ben, lançado em 1974.', 23.99, 'images/disc/5.jpg', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(6, 'Secos e Molhados', 'Álbum da banda Secos & Molhados, lançado em 1973.', 28.99, 'images/disc/6.jpg', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(7, 'Secos e Molhados II', 'Segundo álbum da banda Secos & Molhados, lançado em 1974.', 22.99, 'images/disc/7.jpg', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(8, 'Tim Maia', 'Álbum de Tim Maia, lançado em 1970.', 25.99, 'images/disc/8.jpg', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(9, 'Tribalistas', 'Álbum da banda Tribalistas, lançado em 2002.', 24.99, 'images/disc/9.jpg', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(10, 'Fleetwood', 'Álbum da banda Fleetwood Mac, lançado em 1975.', 26.99, 'images/disc/10.jpg', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(11, 'Harry\'s House', 'Álbum de Harry Styles, lançado em 2019.', 27.99, 'images/disc/11.jpg', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(12, 'Good Kid M.A.A.D City', 'Álbum de Kendrick Lamar, lançado em 2012.', 23.99, 'images/disc/12.jpg', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(13, 'Sour', 'Álbum de Olivia Rodrigo, lançado em 2021.', 29.99, 'images/disc/13.jpg', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(14, 'Purple Rain', 'Álbum de Prince, lançado em 1984.', 30.99, 'images/disc/14.jpg', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(15, 'Folklore', 'Álbum de Taylor Swift, lançado em 2020.', 21.99, 'images/disc/15.jpg', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(16, 'Call Me If You Get Lost', 'Álbum de Tyler, The Creator, lançado em 2021.', 25.99, 'images/disc/16.jpg', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(17, 'Help!', 'Álbum dos Beatles, lançado em 1965.', 28.99, 'images/disc/17.jpg', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(18, 'Please Please Me', 'Álbum dos Beatles, lançado em 1963.', 29.99, 'images/disc/18.jpg', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(19, 'Revolver', 'Álbum dos Beatles, lançado em 1966.', 23.99, 'images/disc/19.jpg', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(20, 'Rubber Soul', 'Álbum dos Beatles, lançado em 1965.', 29.99, 'images/disc/20.jpg', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `usuarioId` int(11) NOT NULL,
  `nome` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `senha` varchar(255) DEFAULT NULL,
  `data_nascimento` date DEFAULT NULL,
  `cep` int(11) DEFAULT NULL,
  `numero` int(11) DEFAULT NULL,
  `complemento` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `carrinho`
--
ALTER TABLE `carrinho`
  ADD PRIMARY KEY (`cartId`),
  ADD KEY `produtoId` (`produtoId`),
  ADD KEY `usuarioId` (`usuarioId`);

--
-- Índices de tabela `produtos`
--
ALTER TABLE `produtos`
  ADD PRIMARY KEY (`productId`);

--
-- Índices de tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`usuarioId`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `carrinho`
--
ALTER TABLE `carrinho`
  MODIFY `cartId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `produtos`
--
ALTER TABLE `produtos`
  MODIFY `productId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `usuarioId` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `carrinho`
--
ALTER TABLE `carrinho`
  ADD CONSTRAINT `carrinho_ibfk_1` FOREIGN KEY (`produtoId`) REFERENCES `produtos` (`productId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `carrinho_ibfk_2` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios` (`usuarioId`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
