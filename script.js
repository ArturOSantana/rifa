// Configuração do Google Sheets
// Usando o ID original da planilha (não o ID publicado)
const SHEET_ID = '1QL9hka6P8SG_2un3JAsQWgs8mu7E44K3SXZOhTjF69k';
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=Sheet1`;

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
    loadNumbersFromSheet();
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
