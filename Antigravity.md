# Antigravity + n8n Workflow Automation

Este documento serve como a base de contexto e diretrizes para as interações da **Antigravity** (IA) focadas na criação e automação de fluxos de trabalho no **n8n** para o projeto **Atendimento Pro**.

## 🛠 Ferramentas e Integração

Foi definido que a IA receberá acesso a ferramentas externas avançadas para otimizar o desenvolvimento de fluxos:

1. **Servidor MCP do n8n**
   - **Repositório:** [czlonkowski/n8n-mcp](https://github.com/czlonkowski/n8n-mcp)
   - **Objetivo:** Permitir que a Antigravity acesse, crie, ative e edite workflows diretamente na instância local ou em nuvem do n8n que gerencia o *Atendimento Pro*.

2. **Skills do n8n**
   - **Repositório:** [czlonkowski/n8n-skills](https://github.com/czlonkowski/n8n-skills)
   - **Objetivo:** Fornecer à IA um conjunto testado de *skills* (habilidades), padrões de design e melhores práticas de mercado para garantir a criação de fluxos de alta qualidade.

## 🎯 Fluxos Focados no Atendimento Pro

Combinando os requisitos de um SaaS multi-módulo (Pizzaria, Hamburgueria, Açaiteria, Hostel) com o n8n, os fluxos de trabalho deverão abranger:

- **Atendimento Omnichannel:** Recepção e envio contínuo de mensagens pelo WhatsApp (API Oficial).
- **Gerenciamento de Pedidos e Reservas:** Webhooks que disparam sempre que houver mudanças de status no banco de dados (Supabase) ou criação de um novo pedido/reserva via canal de atendimento.
- **Controle Financeiro:** Processamento e confirmação assíncrona de pagamentos automáticos no painel do administrador.

## 🤖 Diretrizes de Execução (Para mim, a Antigravity)

Quando o usuário iniciar a fase de automação do n8n e conceder o acesso ao MCP, aplicarei as seguintes regras de desenvolvimento:

1. **Uso de Skills como Base:** Sempre consultarei o `n8n-skills` antes de criar um workflow do zero, construindo fluxos com base nos *templates* de alta qualidade já validados.
2. **Modularidade:** Os workflows devem ser enxutos e modulares (usando sub-workflows / `Execute Workflow` node) para melhor legibilidade e reaproveitamento entre os diferentes tipos de negócio do SaaS.
3. **Tratamento de Erros Profissional:** Todo fluxo crucial deve contar com controle de falhas (Error Trigger) comunicando problemas aos administradores pela plataforma ou via log.
4. **Alinhamento com o Banco de Dados:** Mapear rigorosamente os IDs e as regras multi-tenant (filtros por `company_id`) em integração direta com as credenciais do Supabase.
