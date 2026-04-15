document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar dinâmico durante o scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            navbar.style.background = 'rgba(7, 11, 20, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.6)';
            navbar.style.padding = '1rem 8%';
        } else {
            navbar.style.background = 'rgba(7, 11, 20, 0.6)';
            navbar.style.boxShadow = 'none';
            navbar.style.padding = '1.5rem 8%';
        }
    });

    // 2. Partículas Dinâmicas do "Mundo Digital" (Matrix Effect Code)
    const container = document.getElementById('particles-container');
    const particleCount = 60; // Numero de particulas voadoras

    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }

    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Tamanhos Variados de 2px a 5px
        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // Posição Horizontal Randômica
        particle.style.left = `${Math.random() * 100}vw`;

        // Cores Dinâmicas da Paleta do Tema (Cyber-Reploid MMX)
        const colors = ['#00ccff', '#ff2a55', '#ffffff', '#0055ff', '#9d00ff'];
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

        // Variando Efeito de Sombra Baseado na Cor
        particle.style.boxShadow = `0 0 ${size * 2}px ${particle.style.backgroundColor}`;

        // Velocidade da Animação (FloatUp) e Delay
        particle.style.animationDuration = `${Math.random() * 12 + 6}s`; // de 6s a 18s
        particle.style.animationDelay = `${Math.random() * 5}s`;

        container.appendChild(particle);

        // Reciclar partícula quando a animação terminar (Para animação contínua e imersiva)
        particle.addEventListener('animationend', () => {
            particle.remove();
            createParticle();
        });
    }

    // 3. Smooth Scroll para navegação
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 4. Parallax Simple Effect no Hero (Ao Mover o Mouse)
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
        document.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth / 2 - e.pageX) / 30;
            const y = (window.innerHeight / 2 - e.pageY) / 30;
            heroVisual.style.transform = `translate(${x}px, ${y}px)`;
        });
    }

    // 5. Interactive Lore Hologram Logic
    const loreData = {
        'x': {
            title: 'MEGA MAN X',
            text: 'Descendo da mais avançada tecnologia do ano 20XX, X foi o primeiro robô da história com um sistema verdadeiro de emoção e livre-arbítrio. Seu nome remete ao "fator X", a imprevisibilidade do potencial. Ele odeia o combate e se angustia a cada Maverick abatido, mas luta incansavelmente como Hunter Classe-B, sempre superando limites com as peças e armaduras deixadas pelo seu criador.',
            img: 'https://static.wikia.nocookie.net/murderseries/images/a/a5/X.png/revision/latest?cb=20150312040005',
            glow: 'rgba(0, 204, 255, 0.8)'
        },
        'zero': {
            title: 'ZERO',
            text: 'Uma máquina brutal concebida pelo perverso Dr. Wily para ser o destruidor de X, Zero foi o portador original do Maverick Virus, que despertou durante seu massacre indiscriminado da antiga geração de Mavericks Hunters (incluindo o Comandante Sigma, o que levou à corrupção de Sigma). Curado em um momento de amnésia, Zero ascendeu até Hunter Classe-SA, usando a sua suprema *Z-Saber* não mais para aniquilar, mas para defender a humanidade, forjando uma irmandade eterna ao lado de X.',
            img: 'https://upload.wikimedia.org/wikipedia/pt/8/8d/Zero-mmx.png',
            glow: 'rgba(255, 42, 85, 0.8)'
        },
        'light': {
            title: 'DR. THOMAS LIGHT',
            text: 'O pai da robótica moderna. Ao perceber que não viveria para testemunhar as consequências imprevisíveis da inteligência artificial plena, ele escondeu a cápsula de teste de X para uma quarentena diagnóstica de no mínimo 30 anos. Além disso, ocultou múltiplas cápsulas contendo projeções holográficas de si mesmo e *Light Armors* (peças avançadas), garantindo que, mesmo um século depois da sua morte, estaria guiando Mega Man X.',
            img: 'https://static.wikia.nocookie.net/megaman/images/4/4a/MM11_Doctor_Light.png/revision/latest?cb=20190127075642',
            /* glow: 'rgba(0, 255, 170, 0.8)'*/
        }
    };

    const loreTitle = document.getElementById('lore-title');
    const loreContent = document.getElementById('lore-content');
    const nodes = document.querySelectorAll('.orbital-node');
    const lorePanel = document.getElementById('lore-display');
    const activeImage = document.getElementById('active-character-img');

    if (nodes && lorePanel) {
        nodes.forEach(node => {
            node.addEventListener('click', () => {
                const target = node.getAttribute('data-target');

                // Opacity fade out
                lorePanel.style.opacity = 0;
                if (activeImage) activeImage.style.opacity = 0;

                setTimeout(() => {
                    // Update Content
                    if (loreData[target]) {
                        loreTitle.textContent = loreData[target].title;
                        loreTitle.style.color = getComputedStyle(node).color;
                        loreTitle.style.textShadow = `0 0 15px ${getComputedStyle(node).color}`;
                        loreContent.innerHTML = loreData[target].text;

                        // Atualizar Imagem
                        if (activeImage) {
                            activeImage.src = loreData[target].img;
                            activeImage.style.filter = 'none';
                        }
                    }

                    // Fade In
                    lorePanel.style.opacity = 1;
                    if (activeImage) activeImage.style.opacity = 1;
                }, 400);
            });
        });
    }

});
