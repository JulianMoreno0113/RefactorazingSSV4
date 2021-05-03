
-- --------------------------------------------------
-- Entity Designer DDL Script for SQL Server 2005, 2008, 2012 and Azure
-- --------------------------------------------------
-- Date Created: 04/27/2021 13:30:01
-- Generated from EDMX file: C:\Users\luis.amado\Desktop\SSV4\SSV4\Models\Model1.edmx
-- --------------------------------------------------

SET QUOTED_IDENTIFIER OFF;
GO
USE [SSBDV4];
GO
IF SCHEMA_ID(N'dbo') IS NULL EXECUTE(N'CREATE SCHEMA [dbo]');
GO

-- --------------------------------------------------
-- Dropping existing FOREIGN KEY constraints
-- --------------------------------------------------


-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------


-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------

-- Creating table 'TDoc'
CREATE TABLE [dbo].[TDoc] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Tipo] nvarchar(max)  NOT NULL
);
GO

-- Creating table 'TipoPersona'
CREATE TABLE [dbo].[TipoPersona] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Rol] nvarchar(max)  NOT NULL
);
GO

-- Creating table 'Persona'
CREATE TABLE [dbo].[Persona] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Nombres] nvarchar(max)  NOT NULL,
    [Apellidos] nvarchar(max)  NOT NULL,
    [TDoc_Id] int  NOT NULL,
    [NDoc] nvarchar(max)  NOT NULL,
    [Activo] nvarchar(max)  NOT NULL,
    [Tp_Id] int  NOT NULL
);
GO

-- Creating table 'PersonaMateria'
CREATE TABLE [dbo].[PersonaMateria] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Materia_Id] int  NOT NULL,
    [Persona_Id] int  NOT NULL
);
GO

-- Creating table 'Materia'
CREATE TABLE [dbo].[Materia] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Nombre] nvarchar(max)  NOT NULL
);
GO

-- Creating table 'NotasMateria'
CREATE TABLE [dbo].[NotasMateria] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Notas] nvarchar(max)  NOT NULL,
    [PersonaMateriaId] int  NOT NULL,
    [Periodo_Id] int  NOT NULL
);
GO

-- Creating table 'Periodo'
CREATE TABLE [dbo].[Periodo] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [NombreP] nvarchar(max)  NOT NULL,
    [Porcentaje] float  NOT NULL
);
GO

-- --------------------------------------------------
-- Creating all PRIMARY KEY constraints
-- --------------------------------------------------

-- Creating primary key on [Id] in table 'TDoc'
ALTER TABLE [dbo].[TDoc]
ADD CONSTRAINT [PK_TDoc]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'TipoPersona'
ALTER TABLE [dbo].[TipoPersona]
ADD CONSTRAINT [PK_TipoPersona]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Persona'
ALTER TABLE [dbo].[Persona]
ADD CONSTRAINT [PK_Persona]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'PersonaMateria'
ALTER TABLE [dbo].[PersonaMateria]
ADD CONSTRAINT [PK_PersonaMateria]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Materia'
ALTER TABLE [dbo].[Materia]
ADD CONSTRAINT [PK_Materia]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'NotasMateria'
ALTER TABLE [dbo].[NotasMateria]
ADD CONSTRAINT [PK_NotasMateria]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Periodo'
ALTER TABLE [dbo].[Periodo]
ADD CONSTRAINT [PK_Periodo]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- --------------------------------------------------
-- Creating all FOREIGN KEY constraints
-- --------------------------------------------------

-- Creating foreign key on [TDoc_Id] in table 'Persona'
ALTER TABLE [dbo].[Persona]
ADD CONSTRAINT [FK_TDocPersona]
    FOREIGN KEY ([TDoc_Id])
    REFERENCES [dbo].[TDoc]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_TDocPersona'
CREATE INDEX [IX_FK_TDocPersona]
ON [dbo].[Persona]
    ([TDoc_Id]);
GO

-- Creating foreign key on [Tp_Id] in table 'Persona'
ALTER TABLE [dbo].[Persona]
ADD CONSTRAINT [FK_TipoPersonaPersona]
    FOREIGN KEY ([Tp_Id])
    REFERENCES [dbo].[TipoPersona]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_TipoPersonaPersona'
CREATE INDEX [IX_FK_TipoPersonaPersona]
ON [dbo].[Persona]
    ([Tp_Id]);
GO

-- Creating foreign key on [Materia_Id] in table 'PersonaMateria'
ALTER TABLE [dbo].[PersonaMateria]
ADD CONSTRAINT [FK_MateriaPersonaMateria]
    FOREIGN KEY ([Materia_Id])
    REFERENCES [dbo].[Materia]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_MateriaPersonaMateria'
CREATE INDEX [IX_FK_MateriaPersonaMateria]
ON [dbo].[PersonaMateria]
    ([Materia_Id]);
GO

-- Creating foreign key on [Persona_Id] in table 'PersonaMateria'
ALTER TABLE [dbo].[PersonaMateria]
ADD CONSTRAINT [FK_PersonaPersonaMateria]
    FOREIGN KEY ([Persona_Id])
    REFERENCES [dbo].[Persona]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_PersonaPersonaMateria'
CREATE INDEX [IX_FK_PersonaPersonaMateria]
ON [dbo].[PersonaMateria]
    ([Persona_Id]);
GO

-- Creating foreign key on [PersonaMateriaId] in table 'NotasMateria'
ALTER TABLE [dbo].[NotasMateria]
ADD CONSTRAINT [FK_PersonaMateriaNotasMateria]
    FOREIGN KEY ([PersonaMateriaId])
    REFERENCES [dbo].[PersonaMateria]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_PersonaMateriaNotasMateria'
CREATE INDEX [IX_FK_PersonaMateriaNotasMateria]
ON [dbo].[NotasMateria]
    ([PersonaMateriaId]);
GO

-- Creating foreign key on [Periodo_Id] in table 'NotasMateria'
ALTER TABLE [dbo].[NotasMateria]
ADD CONSTRAINT [FK_PeriodoNotasMateria]
    FOREIGN KEY ([Periodo_Id])
    REFERENCES [dbo].[Periodo]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_PeriodoNotasMateria'
CREATE INDEX [IX_FK_PeriodoNotasMateria]
ON [dbo].[NotasMateria]
    ([Periodo_Id]);
GO

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------