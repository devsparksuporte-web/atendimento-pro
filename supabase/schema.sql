-- ATENDIMENTO PRO - BANCO DE DADOS (SUPABASE)
-- Script de Criação das Tabelas Principais com Multi-tenancy Real

-- 1. TABELA DE EMPRESAS
CREATE TABLE IF NOT EXISTS public.empresas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now(),
    nome TEXT NOT NULL,
    cnpj TEXT UNIQUE,
    telefone TEXT,
    email TEXT,
    endereco TEXT,
    whatsapp_number TEXT UNIQUE,
    whatsapp_api_key TEXT,
    tipo_negocio TEXT DEFAULT 'pizzaria',
    theme_config JSONB DEFAULT '{}'::jsonb,
    ativo BOOLEAN DEFAULT true,
    plano TEXT DEFAULT 'basico'
);

-- 2. TABELA DE PERFIS (Vínculo entre Auth e Empresas)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    empresa_id UUID REFERENCES public.empresas(id) ON DELETE CASCADE,
    full_name TEXT,
    avatar_url TEXT,
    role TEXT DEFAULT 'owner', -- admin (global), owner, employee
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. TABELA DE CLIENTES
CREATE TABLE IF NOT EXISTS public.clientes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    empresa_id UUID REFERENCES public.empresas(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT now(),
    nome TEXT,
    telefone TEXT NOT NULL,
    email TEXT,
    total_pedidos INTEGER DEFAULT 0,
    ultima_interacao TIMESTAMPTZ DEFAULT now(),
    UNIQUE(empresa_id, telefone)
);

-- 4. TABELA DE PEDIDOS
CREATE TABLE IF NOT EXISTS public.pedidos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    empresa_id UUID REFERENCES public.empresas(id) ON DELETE CASCADE,
    cliente_id UUID REFERENCES public.clientes(id),
    created_at TIMESTAMPTZ DEFAULT now(),
    numero_pedido SERIAL,
    status TEXT DEFAULT 'recebido',
    total NUMERIC(10, 2) NOT NULL,
    itens JSONB NOT NULL,
    endereco_entrega TEXT,
    metodo_pagamento TEXT,
    origem TEXT DEFAULT 'whatsapp'
);

-- 5. TABELA DE FINANCEIRO
CREATE TABLE IF NOT EXISTS public.financeiro (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    empresa_id UUID REFERENCES public.empresas(id) ON DELETE CASCADE,
    pedido_id UUID REFERENCES public.pedidos(id),
    created_at TIMESTAMPTZ DEFAULT now(),
    tipo TEXT NOT NULL,
    valor NUMERIC(10, 2) NOT NULL,
    descricao TEXT,
    metodo TEXT
);

-- 6. TABELA DE PRODUTOS
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

-- CONFIGURAÇÃO DE SEGURANÇA (RLS)

-- Habilitar RLS em todas as tabelas
ALTER TABLE public.empresas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pedidos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.financeiro ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.produtos ENABLE ROW LEVEL SECURITY;

-- FUNÇÃO AUXILIAR PARA VERIFICAR EMPRESA DO USUÁRIO
CREATE OR REPLACE FUNCTION public.get_user_empresa()
RETURNS uuid AS $$
  SELECT empresa_id FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER;

-- POLÍTICAS PARA EMPRESAS
-- Usuário só vê a empresa a qual pertence (exceto admins globais)
CREATE POLICY "Users can view their own company" ON public.empresas
    FOR SELECT USING (
        id = public.get_user_empresa() OR 
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
    );

-- POLÍTICAS PARA PROFILES
CREATE POLICY "Users can view their own profile" ON public.profiles
    FOR SELECT USING (id = auth.uid());

CREATE POLICY "Owners can view all profiles in their company" ON public.profiles
    FOR SELECT USING (empresa_id = public.get_user_empresa());

-- POLÍTICAS PARA CLIENTES, PEDIDOS, FINANCEIRO E PRODUTOS (Padrão Multi-tenant)
CREATE POLICY "Multi-tenant Access" ON public.clientes
    FOR ALL USING (empresa_id = public.get_user_empresa());

CREATE POLICY "Multi-tenant Access" ON public.pedidos
    FOR ALL USING (empresa_id = public.get_user_empresa());

CREATE POLICY "Multi-tenant Access" ON public.financeiro
    FOR ALL USING (empresa_id = public.get_user_empresa());

CREATE POLICY "Multi-tenant Access" ON public.produtos
    FOR ALL USING (empresa_id = public.get_user_empresa());
