/**
 * config.example.js — TEMPLATE de configuração da rifa.
 *
 * INSTRUÇÕES:
 *   1. Copie este arquivo para "config.js"  →  cp config.example.js config.js
 *   2. Edite o config.js com os valores reais.
 *   3. O config.js já está no .gitignore — nunca será enviado ao repositório.
 */

const CONFIG = {
  // ── Google Sheets / Apps Script ────────────────────────────────────────────
  SHEET_ID: 'SEU_SHEET_ID_AQUI',
  APPS_SCRIPT_URL: 'SUA_URL_DO_APPS_SCRIPT_AQUI',

  // ── Informações da rifa ────────────────────────────────────────────────────
  RAFFLE_NAME: 'Nome da Sua Rifa',
  RAFFLE_DATE: 'DD/MM/AAAA',
  RAFFLE_TOTAL_NUMBERS: 300,
  PRICE_PER_NUMBER: 10,
  GOAL_AMOUNT: 1000,
  PIX_KEY: 'sua@chavepix.com',

  // ── Senhas ─────────────────────────────────────────────────────────────────
  // Senha que os vendedores digitam para confirmar uma venda
  SELLER_PASSWORD: 'SENHA_VENDEDOR',
  // Senha de administrador (painel ADM + realizar sorteio)
  ADM_PASSWORD: 'SENHA_ADM',

  // ── Prêmios ────────────────────────────────────────────────────────────────
  // Cada entrada = um sorteio. O sorteio roda uma vez por prêmio.
  // Formato: { place: 'rótulo exibido', description: 'descrição do prêmio' }
  PRIZES: [
    { place: '1º Lugar', description: 'Smart TV 55 polegadas' },
    { place: '2º Lugar', description: 'Notebook Lenovo' },
    { place: '3º Lugar', description: 'Smartphone Samsung Galaxy' },
  ],
};
