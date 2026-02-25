import '@/styles/globals.css';

export const metadata = {
  title: 'Atendimento Pro — Automação de Atendimentos via WhatsApp',
  description: 'Sistema SaaS para automação de atendimentos via WhatsApp para pizzarias, hamburguerias e açaiterias.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
