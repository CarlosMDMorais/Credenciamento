document.addEventListener('DOMContentLoaded', () => {
    const searchBox = document.getElementById('searchBox');
    const clearButton = document.getElementById('clearButton');
    const exportButton = document.getElementById('exportButton');
    const detailedList = document.getElementById('detailedList');
    const totalInscritos = document.getElementById('totalInscritos');
    const totalPresentes = document.getElementById('totalPresentes');

    // Função para carregar os dados na lista
    function loadList() {
        const names = JSON.parse(localStorage.getItem('namesList')) || [];
        detailedList.innerHTML = names.map((name, index) => `<li data-index="${index}">${index + 1}. ${name}</li>`).join('');
        totalInscritos.textContent = names.length;
    }

    // Função para filtrar a lista com base na pesquisa
    function filterList() {
        const query = searchBox.value.toLowerCase();
        const items = detailedList.querySelectorAll('li');
        items.forEach(item => {
            const text = item.textContent.toLowerCase();
            item.style.display = text.includes(query) ? '' : 'none';
        });
    }

    // Função para alternar a seleção de itens
    function toggleSelection(event) {
        if (event.target.tagName === 'LI') {
            event.target.classList.toggle('selected');
            updateCounters();
        }
    }

    // Função para limpar a caixa de pesquisa
    function clearSearch() {
        searchBox.value = '';
        filterList(); // Atualiza a lista após limpar a pesquisa
    }

    // Função para exportar os itens selecionados para um arquivo CSV
    function exportSelected() {
        const selectedItems = Array.from(detailedList.querySelectorAll('li.selected'));
        const csvContent = "data:text/csv;charset=utf-8,"
            + selectedItems.map(item => item.textContent.replace(/^\d+\.\s*/, '')).join('\n');
        
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'selecionados.csv');
        document.body.appendChild(link); // Requerido para Firefox

        link.click();
    }

    // Função para atualizar os contadores
    function updateCounters() {
        const selectedCount = detailedList.querySelectorAll('li.selected').length;
        totalPresentes.textContent = selectedCount;
    }

    searchBox.addEventListener('input', filterList);
    detailedList.addEventListener('click', toggleSelection);
    clearButton.addEventListener('click', clearSearch);
    exportButton.addEventListener('click', exportSelected);

    loadList(); // Carrega a lista quando a página é carregada
});
