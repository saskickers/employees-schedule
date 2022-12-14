-- CreateTable
CREATE TABLE "dias" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dia" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "eventos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "desc" TEXT NOT NULL,
    "veiculo" TEXT NOT NULL,
    "responsavel" TEXT NOT NULL,
    "dataEvento" TEXT NOT NULL,
    "dataRegistrado" TEXT NOT NULL,
    "diaId" INTEGER NOT NULL,
    "diaOrdem" INTEGER NOT NULL,
    "titulo" TEXT NOT NULL,
    "funcionarios" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "carros" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "funcionarios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "responsaveis" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "dias_dia_key" ON "dias"("dia");
