// Configuração do Google Sheets
// Usando o ID original da planilha (não o ID publicado)
const SHEET_ID = '1QL9hka6P8SG_2un3JAsQWgs8mu7E44K3SXZOhTjF69k';
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=Sheet1`;

// URL do Google Apps Script para salvar reservas
// IMPORTANTE: Substitua pela URL do seu Apps Script após implantação
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxZorbhSbSMyGoCN_VqYWvpeaYh-1_NhC2YIP6AvrGiui0yp6RiAhv7J7p88idvSzrY/exec';

// Configuração da meta e preços
const GOAL_AMOUNT = 1000; // Meta em reais
const PRICE_PER_NUMBER = 5; // Preço por número: R$ 5,00
const PROMO_PRICE = 10; // Promoção: 3 números por R$ 10,00
const PROMO_QUANTITY = 3;

// Estado da aplicação
let allNumbers = [];
let currentFilter = 'all';

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    setupModalListeners();
    setupReserveForm();
    loadNumbersFromSheet();
    loadLocalReservations();
}

function setupEventListeners() {
    // Botões de filtro
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter = e.target.dataset.filter;
            filterNumbers();
        });
    });

    // Busca de número específico
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchNumber');
    
    searchBtn.addEventListener('click', searchNumber);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchNumber();
        }
    });

    // Permitir apenas números no campo de busca
    searchInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
    });

    // Botão copiar PIX
    const copyPixBtn = document.getElementById('copyPixBtn');
    if (copyPixBtn) {
        copyPixBtn.addEventListener('click', copyPixKey);
    }
}

async function loadNumbersFromSheet() {
    const loadingMessage = document.getElementById('loadingMessage');
    const errorMessage = document.getElementById('errorMessage');
    const numbersGrid = document.getElementById('numbersGrid');

    try {
        loadingMessage.style.display = 'block';
        errorMessage.style.display = 'none';
        numbersGrid.innerHTML = '';

        console.log('Carregando dados do Google Sheets...');
        console.log('URL:', SHEET_URL);

        // Fazer requisição ao Google Sheets (formato JSON via gviz)
        const response = await fetch(SHEET_URL);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const text = await response.text();
        console.log('Resposta recebida, tamanho:', text.length);
        
        // Remover o prefixo do Google Visualization API
        const match = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\);?/);
        
        if (!match) {
            throw new Error('Formato de resposta inválido');
        }
        
        const jsonText = match[1];
        const data = JSON.parse(jsonText);
        
        console.log('Dados parseados com sucesso');
        processGoogleSheetsData(data);

    } catch (error) {
        console.error('Erro detalhado ao carregar números:', error);
        console.error('Tipo de erro:', error.name);
        console.error('Mensagem:', error.message);
        
        errorMessage.style.display = 'block';
        errorMessage.innerHTML = `
            <p>Não foi possível carregar os dados da planilha.</p>
            <p style="font-size: 14px; margin-top: 10px;">
                <strong>Solução:</strong> O site precisa estar hospedado online para acessar o Google Sheets.<br>
                Hospede gratuitamente em: GitHub Pages, Netlify ou Vercel.
            </p>
            <p style="font-size: 14px; margin-top: 10px;">
                Carregando dados de exemplo para demonstração...
            </p>
        `;
        loadingMessage.style.display = 'none';
        
        // Em caso de erro, carregar dados de exemplo
        setTimeout(() => {
            errorMessage.style.display = 'none';
            loadExampleData();
        }, 3000);
    }
}

function processGoogleSheetsData(data) {
    allNumbers = [];
    
    console.log('Processando dados do Google Sheets...');
    
    if (data.table && data.table.rows && data.table.rows.length > 0) {
        // Processar cada linha
        data.table.rows.forEach(row => {
            if (row.c && row.c[0] && row.c[0].v) {
                const numero = row.c[0].v;
                const nome = row.c[1] && row.c[1].v ? String(row.c[1].v) : '';
                const telefone = row.c[2] && row.c[2].v ? String(row.c[2].v) : '';
                const vendedor = row.c[3] && row.c[3].v ? String(row.c[3].v) : '';
                
                const hasName = nome.trim() !== '';
                
                allNumbers.push({
                    number: String(numero).padStart(3, '0'),
                    status: hasName ? 'sold' : 'available',
                    buyer: nome,
                    buyerPhone: telefone,
                    seller: vendedor,
                    sellerPhone: ''
                });
            }
        });
    }
    
    console.log('Números processados:', allNumbers.length);
    
    // Se não houver dados, criar números de 001 a 300
    if (allNumbers.length === 0) {
        for (let i = 1; i <= 300; i++) {
            allNumbers.push({
                number: String(i).padStart(3, '0'),
                status: 'available',
                buyer: '',
                buyerPhone: '',
                seller: '',
                sellerPhone: ''
            });
        }
    }
    
    renderNumbers();
    updateStats();
}


function loadExampleData() {
    // Criar números de 001 a 300 com alguns vendidos aleatoriamente
    allNumbers = [];
    const soldNumbers = new Set();
    
    // Nomes de exemplo
    const buyerNames = ['João Silva', 'Maria Santos', 'Pedro Oliveira', 'Ana Costa', 'Carlos Souza', 'Juliana Lima', 'Roberto Alves', 'Fernanda Rocha'];
    const sellerNames = ['Paulo Martins', 'Lucia Ferreira', 'Marcos Pereira', 'Beatriz Gomes', 'Ricardo Dias'];
    
    // Marcar alguns números como vendidos (exemplo)
    const numSold = Math.floor(Math.random() * 50) + 20; // Entre 20 e 70 vendidos
    while (soldNumbers.size < numSold) {
        soldNumbers.add(Math.floor(Math.random() * 300) + 1);
    }

    for (let i = 1; i <= 300; i++) {
        const isSold = soldNumbers.has(i);
        allNumbers.push({
            number: String(i).padStart(3, '0'),
            status: isSold ? 'sold' : 'available',
            buyer: isSold ? buyerNames[Math.floor(Math.random() * buyerNames.length)] : '',
            buyerPhone: isSold ? `119${Math.floor(Math.random() * 90000000) + 10000000}` : '',
            seller: isSold ? sellerNames[Math.floor(Math.random() * sellerNames.length)] : '',
            sellerPhone: isSold ? `119${Math.floor(Math.random() * 90000000) + 10000000}` : ''
        });
    }

    renderNumbers();
    updateStats();
}

function renderNumbers() {
    const numbersGrid = document.getElementById('numbersGrid');
    const loadingMessage = document.getElementById('loadingMessage');
    
    loadingMessage.style.display = 'none';
    numbersGrid.innerHTML = '';

    allNumbers.forEach(item => {
        const numberCard = document.createElement('div');
        numberCard.className = `number-card ${item.status}`;
        numberCard.textContent = item.number;
        numberCard.dataset.number = item.number;
        numberCard.dataset.status = item.status;

        if (item.status === 'available') {
            numberCard.title = `Número ${item.number} - Disponível - Clique para ver detalhes`;
        } else {
            numberCard.title = `Número ${item.number} - Vendido - Clique para ver detalhes`;
        }

        // Adicionar evento de clique para abrir modal
        numberCard.addEventListener('click', () => {
            openModal(item);
        });

        numbersGrid.appendChild(numberCard);
    });

    filterNumbers();
}

function updateStats() {
    const total = allNumbers.length;
    const sold = allNumbers.filter(n => n.status === 'sold').length;
    const available = total - sold;

    document.getElementById('totalNumbers').textContent = total;
    document.getElementById('availableNumbers').textContent = available;
    document.getElementById('soldNumbers').textContent = sold;
    
    // Atualizar barra de progresso da meta
    updateGoalProgress(sold);
}

function updateGoalProgress(soldCount) {
    const currentAmount = soldCount * PRICE_PER_NUMBER;
    const percentage = Math.min((currentAmount / GOAL_AMOUNT) * 100, 100);
    
    // Atualizar valor atual
    const currentAmountElement = document.getElementById('currentAmount');
    if (currentAmountElement) {
        currentAmountElement.textContent = currentAmount.toFixed(2).replace('.', ',');
    }
    
    // Atualizar barra de progresso
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    
    if (progressBar && progressText) {
        progressBar.style.width = percentage + '%';
        progressText.textContent = percentage.toFixed(1).replace('.', ',') + '%';
        
        // Adicionar classe de sucesso se atingir a meta
        if (percentage >= 100) {
            progressBar.style.background = 'linear-gradient(90deg, #f39c12 0%, #e67e22 100%)';
            progressText.textContent = 'Meta Atingida!';
        }
    }
}

function filterNumbers() {
    const cards = document.querySelectorAll('.number-card');
    
    cards.forEach(card => {
        const status = card.dataset.status;
        
        if (currentFilter === 'all') {
            card.classList.remove('hidden');
        } else if (currentFilter === 'available' && status === 'available') {
            card.classList.remove('hidden');
        } else if (currentFilter === 'sold' && status === 'sold') {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

function searchNumber() {
    const searchInput = document.getElementById('searchNumber');
    const searchValue = searchInput.value.trim().padStart(3, '0');
    
    if (searchValue.length === 0) {
        // Se vazio, mostrar todos
        currentFilter = 'all';
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === 'all');
        });
        filterNumbers();
        return;
    }

    const cards = document.querySelectorAll('.number-card');
    let found = false;

    cards.forEach(card => {
        if (card.dataset.number === searchValue) {
            card.classList.remove('hidden');
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Destacar temporariamente
            card.style.transform = 'scale(1.2)';
            setTimeout(() => {
                card.style.transform = '';
            }, 1000);
            
            found = true;
        } else {
            card.classList.add('hidden');
        }
    });

    if (!found) {
        alert(`Número ${searchValue} não encontrado.`);
        searchInput.value = '';
    }
}

// Atualizar dados a cada 30 segundos
setInterval(() => {
    if (SHEET_URL !== 'SUA_URL_DO_GOOGLE_SHEETS_AQUI') {
        loadNumbersFromSheet();
    }
}, 30000);

// Made with Bob


// Funções do Modal
function setupModalListeners() {
    const modal = document.getElementById('infoModal');
    const closeBtn = document.querySelector('.modal-close');

    // Fechar modal ao clicar no X
    closeBtn.addEventListener('click', closeModal);

    // Fechar modal ao clicar fora dele
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Fechar modal com tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
}

function openModal(numberData) {
    const modal = document.getElementById('infoModal');
    const modalNumber = document.getElementById('modalNumber');
    const modalStatus = document.getElementById('modalStatus');
    const buyerInfo = document.getElementById('buyerInfo');
    const sellerInfo = document.getElementById('sellerInfo');
    const availableInfo = document.getElementById('availableInfo');

    // Preencher número
    modalNumber.textContent = numberData.number;

    // Preencher status
    modalStatus.textContent = numberData.status === 'sold' ? 'Vendido' : 'Disponível';
    modalStatus.className = `info-value status-${numberData.status}`;

    if (numberData.status === 'sold') {
        // Mostrar informações de comprador e vendedor
        buyerInfo.style.display = 'block';
        sellerInfo.style.display = 'block';
        availableInfo.style.display = 'none';

        // Preencher dados do comprador
        document.getElementById('modalBuyer').textContent = numberData.buyer || 'Não informado';
        document.getElementById('modalBuyerPhone').textContent = formatPhone(numberData.buyerPhone) || 'Não informado';

        // Preencher dados do vendedor (sem telefone)
        document.getElementById('modalSeller').textContent = numberData.seller || 'Não informado';
        // Ocultar linha do telefone do vendedor
        document.getElementById('modalSellerPhone').parentElement.style.display = 'none';
    } else {
        // Mostrar mensagem de disponível
        buyerInfo.style.display = 'none';
        sellerInfo.style.display = 'none';
        availableInfo.style.display = 'block';
    }

    // Mostrar modal
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('infoModal');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function formatPhone(phone) {
    if (!phone) return '';
    
    // Remove tudo que não é número
    const cleaned = phone.replace(/\D/g, '');
    
    // Formata conforme o tamanho
    if (cleaned.length === 11) {
        // Celular: (XX) XXXXX-XXXX
        return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
    } else if (cleaned.length === 10) {
        // Fixo: (XX) XXXX-XXXX
        return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
    }
    
    return phone;
}


// Função para copiar chave PIX
function copyPixKey() {
    const pixInput = document.getElementById('pixKey');
    const copyBtn = document.getElementById('copyPixBtn');
    const copyText = copyBtn.querySelector('.copy-text');
    
    // Selecionar e copiar o texto
    pixInput.select();
    pixInput.setSelectionRange(0, 99999); // Para mobile
    
    // Copiar para área de transferência
    navigator.clipboard.writeText(pixInput.value).then(() => {
        // Feedback visual
        copyBtn.classList.add('copied');
        copyText.textContent = 'Copiado!';
        
        // Voltar ao estado original após 2 segundos
        setTimeout(() => {
            copyBtn.classList.remove('copied');
            copyText.textContent = 'Copiar';
        }, 2000);
    }).catch(err => {
        // Fallback para navegadores antigos
        try {
            document.execCommand('copy');
            copyBtn.classList.add('copied');
            copyText.textContent = 'Copiado!';
            
            setTimeout(() => {
                copyBtn.classList.remove('copied');
                copyText.textContent = 'Copiar';
            }, 2000);
        } catch (e) {
            alert('Não foi possível copiar. Por favor, copie manualmente.');
        }
    });
}


// Funções de Reserva de Números
function setupReserveForm() {
    const form = document.getElementById('reserveForm');
    const selectedNumbersInput = document.getElementById('selectedNumbers');
    const buyerPhoneInput = document.getElementById('buyerPhone');
    
    // Formatar telefone automaticamente
    buyerPhoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length <= 11) {
            if (value.length > 6) {
                value = value.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, '($1) $2-$3');
            } else if (value.length > 2) {
                value = value.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
            } else if (value.length > 0) {
                value = value.replace(/^(\d*)/, '($1');
            }
        }
        e.target.value = value;
    });
    
    // Atualizar resumo ao digitar números
    selectedNumbersInput.addEventListener('input', updateReserveSummary);
    
    // Processar formulário
    form.addEventListener('submit', handleReserveSubmit);
}

function updateReserveSummary() {
    const selectedNumbersInput = document.getElementById('selectedNumbers');
    const totalNumbersElement = document.getElementById('totalNumbersSelected');
    const totalPriceElement = document.getElementById('totalPrice');
    
    const numbersText = selectedNumbersInput.value.trim();
    if (!numbersText) {
        totalNumbersElement.textContent = '0';
        totalPriceElement.textContent = 'R$ 0,00';
        return;
    }
    
    const numbers = numbersText.split(',').map(n => n.trim()).filter(n => n);
    const count = numbers.length;
    
    // Calcular valor com promoção: a cada 3 números = R$ 10,00
    const promoSets = Math.floor(count / 3); // Quantos conjuntos de 3
    const remaining = count % 3; // Números restantes
    const total = (promoSets * PROMO_PRICE) + (remaining * PRICE_PER_NUMBER);
    
    totalNumbersElement.textContent = count;
    totalPriceElement.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

function handleReserveSubmit(e) {
    e.preventDefault();
    
    const sellerName = document.getElementById('sellerName').value.trim();
    const buyerName = document.getElementById('buyerName').value.trim();
    const buyerPhone = document.getElementById('buyerPhone').value.trim();
    const selectedNumbersInput = document.getElementById('selectedNumbers').value.trim();
    
    // Validar campos obrigatórios
    if (!sellerName) {
        alert('Por favor, informe o nome do vendedor.');
        return;
    }
    
    if (!buyerName) {
        alert('Por favor, informe o nome do comprador.');
        return;
    }
    
    if (!buyerPhone) {
        alert('Por favor, informe o telefone do comprador.');
        return;
    }
    
    if (!selectedNumbersInput) {
        alert('Por favor, informe os números vendidos.');
        return;
    }
    
    // Validar e processar números
    const numbersArray = selectedNumbersInput.split(',').map(n => n.trim()).filter(n => n);
    const validNumbers = [];
    const invalidNumbers = [];
    const alreadySoldNumbers = [];
    
    numbersArray.forEach(num => {
        const paddedNum = num.padStart(3, '0');
        const numberData = allNumbers.find(n => n.number === paddedNum);
        
        if (!numberData) {
            invalidNumbers.push(num);
        } else if (numberData.status === 'sold') {
            alreadySoldNumbers.push(paddedNum);
        } else {
            validNumbers.push(paddedNum);
        }
    });
    
    // Verificar erros
    if (invalidNumbers.length > 0) {
        alert(`Números inválidos: ${invalidNumbers.join(', ')}\nOs números devem estar entre 001 e 300.`);
        return;
    }
    
    if (alreadySoldNumbers.length > 0) {
        alert(`Os seguintes números já foram vendidos: ${alreadySoldNumbers.join(', ')}\nPor favor, escolha outros números.`);
        return;
    }
    
    if (validNumbers.length === 0) {
        alert('Por favor, selecione pelo menos um número válido.');
        return;
    }
    
    // Calcular valor total com promoção: a cada 3 números = R$ 10,00
    const count = validNumbers.length;
    const promoSets = Math.floor(count / 3); // Quantos conjuntos de 3
    const remaining = count % 3; // Números restantes
    const totalValue = (promoSets * PROMO_PRICE) + (remaining * PRICE_PER_NUMBER);
    
    // Salvar reserva
    saveReservation({
        numbers: validNumbers,
        buyer: buyerName,
        buyerPhone: buyerPhone,
        seller: sellerName,
        totalValue: totalValue,
        timestamp: new Date().toISOString()
    });
    
    // Mostrar modal de confirmação
    showReservationConfirmation(validNumbers, buyerName, sellerName, totalValue);
    
    // Limpar formulário
    document.getElementById('reserveForm').reset();
    updateReserveSummary();
}

async function saveReservation(reservation) {
    // Verificar se a URL do Apps Script está configurada
    if (APPS_SCRIPT_URL === 'SUA_URL_DO_APPS_SCRIPT_AQUI') {
        alert('⚠️ Configure a URL do Google Apps Script primeiro!\n\nVeja o arquivo CONFIGURAR_APPS_SCRIPT.md para instruções.');
        
        // Salvar localmente como fallback
        saveReservationLocally(reservation);
        return;
    }
    
    try {
        // Mostrar loading
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'loading-overlay';
        loadingDiv.innerHTML = '<div class="loading-spinner">Salvando na planilha...</div>';
        document.body.appendChild(loadingDiv);
        
        console.log('Enviando dados para Google Sheets:', {
            numbers: reservation.numbers,
            buyer: reservation.buyer,
            buyerPhone: reservation.buyerPhone,
            seller: reservation.seller
        });
        
        // Enviar para o Google Apps Script
        const response = await fetch(APPS_SCRIPT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain',
            },
            body: JSON.stringify({
                numbers: reservation.numbers,
                buyer: reservation.buyer,
                buyerPhone: reservation.buyerPhone,
                seller: reservation.seller
            })
        });
        
        // Remover loading
        document.body.removeChild(loadingDiv);
        
        // Tentar ler a resposta
        const result = await response.text();
        console.log('Resposta do servidor:', result);
        
        // Verificar se foi bem-sucedido
        if (response.ok) {
            console.log('✅ Dados salvos com sucesso na planilha!');
            
            // Atualizar números como vendidos localmente
            reservation.numbers.forEach(num => {
                const numberData = allNumbers.find(n => n.number === num);
                if (numberData) {
                    numberData.status = 'sold';
                    numberData.buyer = reservation.buyer;
                    numberData.buyerPhone = reservation.buyerPhone;
                    numberData.seller = reservation.seller;
                }
            });
            
            // Salvar também localmente como backup
            saveReservationLocally(reservation);
            
            // Atualizar interface
            renderNumbers();
            updateStats();
            
            // Recarregar dados da planilha após 3 segundos
            setTimeout(() => {
                console.log('Recarregando dados da planilha...');
                loadNumbersFromSheet();
            }, 3000);
        } else {
            throw new Error('Erro ao salvar: ' + result);
        }
        
    } catch (error) {
        console.error('❌ Erro ao salvar reserva:', error);
        
        // Remover loading se ainda estiver visível
        const loadingDiv = document.querySelector('.loading-overlay');
        if (loadingDiv) {
            document.body.removeChild(loadingDiv);
        }
        
        alert('⚠️ Erro ao salvar na planilha.\n\nVerifique:\n1. Se o Apps Script está implantado corretamente\n2. Se a URL está correta\n3. O console do navegador (F12) para mais detalhes\n\nOs dados foram salvos localmente como backup.');
        
        // Salvar localmente como fallback
        saveReservationLocally(reservation);
    }
}

function saveReservationLocally(reservation) {
    // Obter reservas existentes
    let reservations = JSON.parse(localStorage.getItem('rifaReservations') || '[]');
    
    // Adicionar nova reserva
    reservations.push(reservation);
    
    // Salvar no localStorage
    localStorage.setItem('rifaReservations', JSON.stringify(reservations));
    
    // Atualizar números como vendidos localmente
    reservation.numbers.forEach(num => {
        const numberData = allNumbers.find(n => n.number === num);
        if (numberData) {
            numberData.status = 'sold';
            numberData.buyer = reservation.buyer;
            numberData.buyerPhone = reservation.buyerPhone;
            numberData.seller = reservation.seller;
        }
    });
    
    // Atualizar interface
    renderNumbers();
    updateStats();
}

function loadLocalReservations() {
    const reservations = JSON.parse(localStorage.getItem('rifaReservations') || '[]');
    
    reservations.forEach(reservation => {
        reservation.numbers.forEach(num => {
            const numberData = allNumbers.find(n => n.number === num);
            if (numberData && numberData.status === 'available') {
                numberData.status = 'sold';
                numberData.buyer = reservation.buyer;
                numberData.buyerPhone = reservation.buyerPhone;
                numberData.seller = reservation.seller;
            }
        });
    });
}

function showReservationConfirmation(numbers, buyerName, sellerName, totalValue) {
    const modal = document.getElementById('confirmationModal');
    const numbersList = document.getElementById('confirmedNumbers');
    const buyerNameElement = document.getElementById('confirmedBuyer');
    const sellerNameElement = document.getElementById('confirmedSeller');
    const totalValueElement = document.getElementById('confirmedTotal');
    
    numbersList.textContent = numbers.join(', ');
    buyerNameElement.textContent = buyerName;
    sellerNameElement.textContent = sellerName;
    totalValueElement.textContent = `R$ ${totalValue.toFixed(2).replace('.', ',')}`;
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeConfirmationModal() {
    const modal = document.getElementById('confirmationModal');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}
