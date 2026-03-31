CREATE database simulacao_saep;

CREATE TABLE usuario (
	id_usuario SERIAL PRIMARY KEY,
	nome_usuario VARCHAR(150) NOT NULL,
	email_usuario VARCHAR(150) UNIQUE NOT NULL
);

CREATE TABLE tarefa (
	id_tarefa SERIAL PRIMARY KEY, 
	usuario_id INT NOT NULL,
	descricao_tarefa VARCHAR(500) NOT NULL,
	setor_tarefa VARCHAR(100) NOT NULL,
	prioridade_tarefa VARCHAR(100) NOT NULL,
	data_cadastro_tarefa DATE NOT NULL,
	status_tarefa VARCHAR(100) NOT NULL, 
	FOREIGN KEY (usuario_id) REFERENCES usuario(id_usuario)
);


