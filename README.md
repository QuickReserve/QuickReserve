# QuickReserve

QuickReserve é uma API REST desenvolvida para permitir a reserva de salas de maneira distribuída. Este projeto foi criado como parte do curso de Sistemas Distribuídos na Universidade Federal Rural do Rio de Janeiro (UFRRJ), no Instituto Multidisciplinar.

## Tecnologias Utilizadas

- Java
- Jakarta
- React
- Chakra UI
- TypeScript

## Funcionalidades
A API possui cinco funcionalidades principais:

- Cadastrar Reserva
- Consultar Reserva
- Remover Reserva
- Consultar Reservas de uma Sala
- Consultar Reservas de um Usuário

## Estrutura do Projeto
O projeto é dividido em três camadas principais:

Modules: Classes responsáveis por armazenar e manipular os dados das salas e reservas.

Services: Contêm a lógica de negócio da aplicação, como a criação e remoção de reservas.

Controllers: Lida com as requisições HTTP e interage com as camadas de Service e Module.

## Iniciando o Projeto
Para iniciar o servidor da aplicação, execute a classe Main, que inicializa a aplicação e coloca a API no ar. A aplicação também possui um frontend desenvolvido em React, acessível através do mesmo servidor.

