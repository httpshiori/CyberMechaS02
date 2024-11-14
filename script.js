// Função de busca de FAQs
function searchFAQ() {
    let input = document.getElementById('searchBar').value.toLowerCase();
    let faqs = document.getElementsByClassName('faq');

    for (let i = 0; i < faqs.length; i++) {
        let question = faqs[i].getElementsByClassName('question')[0];
        let answer = faqs[i].getElementsByClassName('answer')[0];
        if (question.innerHTML.toLowerCase().indexOf(input) > -1 || answer.innerHTML.toLowerCase().indexOf(input) > -1) {
            faqs[i].style.display = '';
        } else {
            faqs[i].style.display = 'none';
        }
    }
}

// Carousel e miniaturas
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-images img');
const thumbnailImages = document.querySelectorAll('.thumbnails img'); // Renomear para evitar conflitos

// Função para mostrar o slide atual
function showSlide(index) {
    currentSlide = index;
    const offset = -100 * currentSlide;
    document.querySelector('.carousel-images').style.transform = `translateX(${offset}%)`;
    updateThumbnails();
}

// Função para atualizar as miniaturas
function updateThumbnails() {
    thumbnailImages.forEach((thumbnail, index) => {
        thumbnail.style.opacity = index === currentSlide ? '1' : '0.6';
    });
}

// Função para mostrar o próximo slide
function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Função para mostrar o slide anterior
function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

// Função para abrir o modal e exibir a imagem clicada
function openModal(src) {
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modalImg');
    modal.style.display = "block";
    modalImg.src = src;
    modalImg.classList.remove('zoomed'); // Remove o zoom quando o modal é aberto
}

// Função para fechar o modal
function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = "none";
}

// Função para alternar o zoom da imagem
function toggleZoom() {
    const modalImg = document.getElementById('modalImg');
    modalImg.classList.toggle('zoomed'); // Alterna a classe de zoom
}

// Inicializa o carousel
showSlide(currentSlide);

// Implementação do arrasto para miniaturas com mouse
const thumbnailWrapper = document.querySelector('.thumbnail-wrapper');

let isMouseDragging = false;
let mouseStartX;
let mouseScrollLeft;

// Iniciar o evento de arraste com o mouse
thumbnailWrapper.addEventListener('mousedown', (e) => {
    isMouseDragging = true;
    mouseStartX = e.pageX - thumbnailWrapper.offsetLeft;
    mouseScrollLeft = thumbnailWrapper.scrollLeft;
    thumbnailWrapper.style.cursor = 'grabbing'; // Mostra o ícone de "arraste" durante o movimento
});

// Continuar o arraste enquanto o mouse se move
thumbnailWrapper.addEventListener('mousemove', (e) => {
    if (!isMouseDragging) return; // Se não estiver arrastando, não faça nada
    e.preventDefault();
    const x = e.pageX - thumbnailWrapper.offsetLeft;
    const walk = (x - mouseStartX) * 2; // Aumenta a velocidade do arraste
    thumbnailWrapper.scrollLeft = mouseScrollLeft - walk; // Move as thumbnails horizontalmente
});

// Parar o arraste quando o mouse é solto
thumbnailWrapper.addEventListener('mouseup', () => {
    isMouseDragging = false;
    thumbnailWrapper.style.cursor = 'grab'; // Volta para o ícone de "grab"
});

// Parar o arraste quando o mouse sai da área das thumbnails
thumbnailWrapper.addEventListener('mouseleave', () => {
    isMouseDragging = false;
    thumbnailWrapper.style.cursor = 'grab'; // Garante que o ícone volte ao estado original
});

// Implementação do arrasto para o carousel com toque (mobile)
const carouselImages = document.querySelector('.carousel-images');

let isTouchDragging = false;
let touchStartX;
let touchScrollLeft;

carouselImages.addEventListener('touchstart', (e) => {
    isTouchDragging = true;
    touchStartX = e.touches[0].clientX;  // Pega a posição inicial do toque
    touchScrollLeft = carouselImages.scrollLeft;  // Pega a posição atual do scroll
});

carouselImages.addEventListener('touchmove', (e) => {
    if (!isTouchDragging) return;
    const currentX = e.touches[0].clientX;  // Pega a posição atual do dedo
    const diffX = touchStartX - currentX;  // Calcula a diferença do toque
    carouselImages.scrollLeft = touchScrollLeft + diffX;  // Muda o scroll do carousel
});

carouselImages.addEventListener('touchend', () => {
    isTouchDragging = false;  // Para o arraste quando o toque termina
});
