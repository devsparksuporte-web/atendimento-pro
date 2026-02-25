-- ATENDIMENTO PRO - BANCO DE DADOS (SUPABASE)
-- Script de Criação das Tabelas Principais

-- 1. TABELA DE EMPRESAS (Multi-tenant)
CREATE TABLE IF NOT EXISTS public.empresas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now(),
    nome TEXT NOT NULL,
    cnpj TEXT UNIQUE,
    telefone TEXT,
    email TEXT,
    endereco TEXT,
    whatsapp_number TEXT UNIQUE, -- Número do WhatsApp conectado
    whatsapp_api_key TEXT,       -- Chave da API (Evolution/etc)
    tipo_negocio TEXT DEFAULT 'pizzaria',
    theme_config JSONB DEFAULT '{}'::jsonb, -- Configurações visuais personalizadas
    ativo BOOLEAN DEFAULT true,
    plano TEXT DEFAULT 'basico'
);

-- 2. TABELA DE CLIENTES (Leads/Usuários WhatsApp)
CREATE TABLE IF NOT EXISTS public.clientes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    empresa_id UUID REFERENCES public.empresas(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT now(),
    nome TEXT,
    telefone TEXT NOT NULL, -- Número do WhatsApp do cliente
    email TEXT,
    total_pedidos INTEGER DEFAULT 0,
    ultima_interacao TIMESTAMPTZ DEFAULT now(),
    UNIQUE(empresa_id, telefone)
);

-- 3. TABELA DE PEDIDOS
CREATE TABLE IF NOT EXISTS public.pedidos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    empresa_id UUID REFERENCES public.empresas(id) ON DELETE CASCADE,
    cliente_id UUID REFERENCES public.clientes(id),
    created_at TIMESTAMPTZ DEFAULT now(),
    numero_pedido SERIAL,
    status TEXT DEFAULT 'recebido', -- recebido, preparando, entrega, entregue, cancelado
    total NUMERIC(10, 2) NOT NULL,
    itens JSONB NOT NULL, -- Lista de produtos, quantidades e preços
    endereco_entrega TEXT,
    metodo_pagamento TEXT,
    origem TEXT DEFAULT 'whatsapp' -- whatsapp, web, balcao
);

-- 4. TABELA DE FINANCEIRO (Lançamentos)
CREATE TABLE IF NOT EXISTS public.financeiro (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    empresa_id UUID REFERENCES public.empresas(id) ON DELETE CASCADE,
    pedido_id UUID REFERENCES public.pedidos(id),
    created_at TIMESTAMPTZ DEFAULT now(),
    tipo TEXT NOT NULL, -- entrada, saida
    valor NUMERIC(10, 2) NOT NULL,
    descricao TEXT,
    metodo TEXT -- pix, cartao, dinheiro
);

-- 5. TABELA DE CARDÁPIO (Produtos)
CREATE TABLE IF NOT EXISTS public.produtos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    empresa_id UUID REFERENCES public.empresas(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT now(),
    nome TEXT NOT NULL,
    descricao TEXT,
    preco NUMERIC(10, 2) NOT NULL,
    categoria TEXT,
    imagem_url TEXT,
    disponivel BOOLEAN DEFAULT true
);

-- Habilitar Row Level Security (RLS)
ALTER TABLE public.empresas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pedidos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.financeiro ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.produtos ENABLE ROW LEVEL SECURITY;

-- Exemplo de política básica (acesso via service_role ou autenticado)
-- Em produção, estas políticas devem ser refinadas para cada empresa ver apenas seus dados.
