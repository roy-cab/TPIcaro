DROP DATABASE IF EXISTS tpIcaro;
CREATE DATABASE tpIcaro;
USE tpIcaro;


CREATE TABLE tpIcaro.Usuarios (
IdUsuario INT PRIMARY KEY AUTO_INCREMENT NOT NUll,
NombreUsuario VARCHAR(255),
PassUsuario CHAR (15),
IdCiudad INT,
IdPais INT
);
CREATE TABLE tpIcaro.Memorandos (
IdMemorando INT PRIMARY KEY AUTO_INCREMENT NOT NUll,
IdDetalle INT
);
CREATE TABLE tpIcaro.DetalleMemorandos (
Id INT PRIMARY KEY AUTO_INCREMENT NOT NUll,
IdDetalle INT,
UsuarioRemitente INT,
UsuarioDestinatario INT,
Mensaje CHAR (144),
FechaEnvio DATETIME
);
CREATE TABLE Paises (
IdPais INT PRIMARY KEY AUTO_INCREMENT NOT NUll,
NombrePais VARCHAR (255)
);
CREATE TABLE Ciudades (
IdCiudad INT PRIMARY KEY AUTO_INCREMENT NOT NUll,
NombreCiudad VARCHAR (255),
Pais INT
);

ALTER TABLE Usuarios ADD FOREIGN KEY(IdPais) REFERENCES Paises(IdPais);
ALTER TABLE Usuarios ADD FOREIGN KEY(IdCiudad) REFERENCES Ciudades(IdCiudad);

ALTER TABLE DetalleMemorandos ADD FOREIGN KEY(UsuarioRemitente) REFERENCES Usuarios(IdUsuario);
ALTER TABLE DetalleMemorandos ADD FOREIGN KEY(UsuarioDestinatario) REFERENCES Usuarios(IdUsuario);
ALTER TABLE Ciudades ADD FOREIGN KEY(Pais) REFERENCES Paises(IdPais);

INSERT INTO Paises (IdPais,NombrePais) VALUES ('1','Argentina');
INSERT INTO Paises (IdPais,NombrePais) VALUES ('2','Brasil');
INSERT INTO Paises (IdPais,NombrePais) VALUES ('3','Chile');
INSERT INTO Paises (IdPais,NombrePais) VALUES ('4','Peru');

INSERT INTO Ciudades (IdCiudad,NombreCiudad,Pais) VALUES ('1','Cordoba','1');
INSERT INTO Ciudades (IdCiudad,NombreCiudad,Pais) VALUES ('2','Buenos Aires','1');
INSERT INTO Ciudades (IdCiudad,NombreCiudad,Pais) VALUES ('3','Santa Fe','1');

INSERT INTO Usuarios (NombreUsuario,PassUsuario,IdPais,IdCiudad) VALUES ('rodrigo.haquin','Rodri123','1','1');
INSERT INTO Usuarios (NombreUsuario,PassUsuario,IdPais,IdCiudad) VALUES ('matias.carrion','Mati2020','1','2');
INSERT INTO Usuarios (NombreUsuario,PassUsuario,IdPais,IdCiudad) VALUES ('federico.arias','federicoarias','1','3');

INSERT INTO Memorandos (IdMemorando,IdDetalle) VALUES ('1','1');

INSERT INTO DetalleMemorandos (Id,IdDetalle,UsuarioRemitente,UsuarioDestinatario,Mensaje,FechaEnvio) VALUES ('1','1','1','2','Prueba Primer Memorando','2021-08-09 12:20:00');
INSERT INTO DetalleMemorandos (Id,IdDetalle,UsuarioRemitente,UsuarioDestinatario,Mensaje,FechaEnvio) VALUES ('2','1','1','3','Prueba Primer Memorando','2021/08/09 12:20:00');

 