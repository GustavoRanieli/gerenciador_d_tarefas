-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 20-Set-2023 às 05:20
-- Versão do servidor: 10.4.27-MariaDB
-- versão do PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `gerenciador_d_sistemas`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `tarefas`
--

CREATE TABLE `tarefas` (
  `id_tarefa` int(11) NOT NULL,
  `dia_semana` enum('Segunda','Terça','Quarta','Quinta','Sexta','Sábado','Domingo') DEFAULT NULL,
  `descricao_tarefa` varchar(900) NOT NULL,
  `condominio` varchar(255) NOT NULL,
  `concluido` tinyint(1) DEFAULT NULL,
  `justificativa` varchar(255) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `dia_da_tarefa` date DEFAULT NULL,
  `hora_da_tarefa` time DEFAULT NULL,
  `nome_tarefa` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `tarefas`
--

INSERT INTO `tarefas` (`id_tarefa`, `dia_semana`, `descricao_tarefa`, `condominio`, `concluido`, `justificativa`, `id_usuario`, `dia_da_tarefa`, `hora_da_tarefa`, `nome_tarefa`) VALUES
(30, 'Segunda', 'Comer cu', 'Alphavile', 0, '', 17, '0000-00-00', '20:27:00', ''),
(31, 'Segunda', 'Teste', 'Condominio', 0, '', 13, '0000-00-00', '20:28:00', ''),
(32, 'Quinta', 'Comer cu', 'Testa', 1, 'Testando', 17, '0000-00-00', '20:29:00', ''),
(53, 'Terça', '', 'Justificativa gay', 0, 'Testando', 1, '0000-00-00', '21:43:00', 'Quer ler é gay');

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `senha` varchar(500) NOT NULL,
  `funcao` varchar(500) NOT NULL,
  `cpf` varchar(900) NOT NULL,
  `idade` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `usuario`
--

INSERT INTO `usuario` (`id`, `nome`, `senha`, `funcao`, `cpf`, `idade`) VALUES
(1, 'João', '123', 'user', '666', '35'),
(13, 'Corno', '666', 'admin', '666', '23'),
(17, 'Pedro', '123', 'user', '555', '555'),
(20, 'José', '456', 'user', '456', '70'),
(22, 'tet', 'sad', 'user', 'asd', 'ada'),
(29, 'João da silva sauro', 'dasd', 'user', 'asd', 'ad');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `tarefas`
--
ALTER TABLE `tarefas`
  ADD PRIMARY KEY (`id_tarefa`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Índices para tabela `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `tarefas`
--
ALTER TABLE `tarefas`
  MODIFY `id_tarefa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT de tabela `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `tarefas`
--
ALTER TABLE `tarefas`
  ADD CONSTRAINT `tarefas_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
