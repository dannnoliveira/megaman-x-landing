document.addEventListener('DOMContentLoaded', () => {
    initAccessibilityStandard();
    initBossCards();

    // 1. Navbar dinâmico durante o scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        const updateNavbar = () => {
            if (document.body.classList.contains('home-page')) {
                navbar.classList.toggle('is-scrolled', window.scrollY > 80);
                return;
            }

            if (window.scrollY > 80) {
                navbar.style.background = 'rgba(7, 11, 20, 0.95)';
                navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.6)';
                navbar.style.padding = '1rem 8%';
            } else {
                navbar.style.background = 'rgba(7, 11, 20, 0.6)';
                navbar.style.boxShadow = 'none';
                navbar.style.padding = '1.5rem 8%';
            }
        };

        updateNavbar();
        window.addEventListener('scroll', updateNavbar, { passive: true });
    }

    // 2. Partículas Dinâmicas do "Mundo Digital" (Matrix Effect Code)
    const container = document.getElementById('particles-container');
    const particleCount = 60; // Numero de particulas voadoras

    if (container && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        for (let i = 0; i < particleCount; i++) {
            createParticle();
        }
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
                target.focus({ preventScroll: true });
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

    // 6. Galeria horizontal dos Mavericks
    document.querySelectorAll('.maverick-carousel').forEach(maverickCarousel => {
    const carouselPosition = document.getElementById(maverickCarousel.dataset.positionId || (maverickCarousel.id === 'maverick-carousel' ? 'maverick-position' : 'maverick-x2-position'));
    const carouselButtons = Array.from(document.querySelectorAll('[data-carousel-direction]')).filter(button =>
        (button.dataset.carouselTarget || 'maverick-carousel') === maverickCarousel.id);

    if (maverickCarousel) {
        const maverickCards = Array.from(maverickCarousel.querySelectorAll('.file-item'));
        let activeMaverick = 0;

        const updateCarousel = () => {
            activeMaverick = maverickCards.reduce((closest, card, index) => {
                const currentDistance = Math.abs(card.offsetLeft - maverickCards[0].offsetLeft - maverickCarousel.scrollLeft);
                const closestDistance = Math.abs(maverickCards[closest].offsetLeft - maverickCards[0].offsetLeft - maverickCarousel.scrollLeft);
                return currentDistance < closestDistance ? index : closest;
            }, 0);

            if (carouselPosition) {
                carouselPosition.textContent = String(activeMaverick + 1).padStart(2, '0');
            }

            carouselButtons.forEach(button => {
                const direction = button.getAttribute('data-carousel-direction');
                button.disabled = direction === 'prev'
                    ? maverickCarousel.scrollLeft <= 1
                    : maverickCarousel.scrollLeft >= maverickCarousel.scrollWidth - maverickCarousel.clientWidth - 1;
            });
        };

        carouselButtons.forEach(button => {
            button.addEventListener('click', () => {
                const step = button.getAttribute('data-carousel-direction') === 'next' ? 1 : -1;
                const targetIndex = Math.max(0, Math.min(maverickCards.length - 1, activeMaverick + step));
                maverickCarousel.scrollTo({
                    left: maverickCards[targetIndex].offsetLeft - maverickCards[0].offsetLeft,
                    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
                });
            });
        });

        maverickCards.forEach(card => {
            card.addEventListener('focus', () => {
                card.scrollIntoView({
                    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
                    block: 'nearest',
                    inline: 'center'
                });
            });
        });

        maverickCarousel.addEventListener('scroll', updateCarousel, { passive: true });
        window.addEventListener('resize', updateCarousel, { passive: true });
        updateCarousel();
    }
    });

    const walkthroughMenu = document.querySelector('.detonado-menu');
    document.addEventListener('click', event => {
        if (walkthroughMenu && !walkthroughMenu.contains(event.target)) walkthroughMenu.open = false;
    });
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && walkthroughMenu?.open) {
            walkthroughMenu.open = false;
            walkthroughMenu.querySelector('summary').focus();
        }
    });

});

function initAccessibilityStandard() {
    const STORAGE_KEY = 'mmx-accessibility-preferences';
    const isDetonadoPage = document.body.classList.contains('detonado-page');
    const usesDockedAccessibility = isDetonadoPage || document.body.classList.contains('home-page');
    const defaults = {
        highContrast: false,
        narrator: false,
        keyboard: false,
        readable: false
    };

    const state = { ...defaults, ...readPreferences() };
    const liveRegion = document.createElement('div');
    liveRegion.className = 'sr-only';
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    document.body.appendChild(liveRegion);

    const widget = document.createElement('section');
    widget.className = `a11y-widget${usesDockedAccessibility ? ' a11y-widget--docked' : ''}`;
    widget.setAttribute('aria-label', 'Ferramentas de acessibilidade');
    widget.innerHTML = `
        <button class="a11y-toggle" type="button" aria-expanded="false" aria-controls="a11y-panel" aria-label="Abrir ferramentas de acessibilidade">
            <span class="a11y-toggle-icon" aria-hidden="true">&#9855;&#xfe0e;</span>
        </button>
        <div class="a11y-panel" id="a11y-panel" role="dialog" aria-modal="false" aria-labelledby="a11y-title" hidden>
            <div class="a11y-panel-header">
                <div>
                    ${usesDockedAccessibility ? '<p class="a11y-panel-kicker">Base Hunter · Suporte</p>' : ''}
                    <h2 class="a11y-panel-title" id="a11y-title">${usesDockedAccessibility ? 'Recursos de acesso' : 'Acessibilidade'}</h2>
                    <p class="a11y-panel-subtitle">${isDetonadoPage ? 'Personalize a leitura e a navegação deste detonado.' : 'Personalize sua navegação pela Base Hunter.'}</p>
                </div>
                <button class="a11y-close" type="button" aria-label="Fechar ferramentas de acessibilidade">×</button>
            </div>
            <div class="a11y-options" aria-label="Opções de acessibilidade">
                <button class="a11y-option" type="button" data-a11y-option="highContrast" aria-pressed="false">
                    ${usesDockedAccessibility ? '<span class="a11y-option-icon" aria-hidden="true">◐</span>' : ''}
                    <span><strong>Alto contraste</strong><span>Reforça texto, bordas e estados de foco.</span></span>
                    <span class="a11y-option-state" aria-hidden="true">OFF</span>
                </button>
                <button class="a11y-option" type="button" data-a11y-option="narrator" aria-pressed="false">
                    ${usesDockedAccessibility ? '<span class="a11y-option-icon a11y-option-icon--voice" aria-hidden="true">VOZ</span>' : ''}
                    <span><strong>Narração de tela</strong><span>Lê o elemento focado usando a voz do navegador.</span></span>
                    <span class="a11y-option-state" aria-hidden="true">OFF</span>
                </button>
                <button class="a11y-option" type="button" data-a11y-option="keyboard" aria-pressed="false">
                    ${usesDockedAccessibility ? '<span class="a11y-option-icon" aria-hidden="true">⌨</span>' : ''}
                    <span><strong>Guia de teclado</strong><span>Destaca o foco e explica Tab, Enter, Espaço e Esc.</span></span>
                    <span class="a11y-option-state" aria-hidden="true">OFF</span>
                </button>
                <button class="a11y-option" type="button" data-a11y-option="readable" aria-pressed="false">
                    ${usesDockedAccessibility ? '<span class="a11y-option-icon" aria-hidden="true">Aa</span>' : ''}
                    <span><strong>Texto ampliado</strong><span>Aumenta a leitura para conteúdo e controles.</span></span>
                    <span class="a11y-option-state" aria-hidden="true">OFF</span>
                </button>
            </div>
            <div class="a11y-helper" aria-label="Assistente Roll">
                <div class="a11y-helper-portrait" data-roll-pose="idle" aria-hidden="true">
                    <img src="assets/img/roll-assist/idle.png" alt="">
                </div>
                <div class="a11y-helper-message">
                    <p class="a11y-helper-name">Roll Assist</p>
                    <p class="a11y-helper-text" id="a11y-helper-text">${usesDockedAccessibility ? 'Escolha os ajustes que deixam sua missão mais confortável.' : 'Use Tab para navegar e Esc para fechar este painel.'}</p>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(widget);

    const panel = widget.querySelector('#a11y-panel');
    const toggle = widget.querySelector('.a11y-toggle');
    const close = widget.querySelector('.a11y-close');
    const optionButtons = widget.querySelectorAll('[data-a11y-option]');
    const helper = widget.querySelector('#a11y-helper-text');
    const helperPortrait = widget.querySelector('.a11y-helper-portrait');
    const helperPortraitImage = helperPortrait.querySelector('img');
    const readingStops = prepareReadingStops();
    const rollPoses = {
        idle: 'assets/img/roll-assist/idle.png',
        welcome: 'assets/img/roll-assist/welcome.png',
        guide: 'assets/img/roll-assist/guide.png',
        success: 'assets/img/roll-assist/success.png'
    };
    let helperPoseTimer;

    applyState();
    syncButtons();

    toggle.addEventListener('click', () => {
        const isOpen = !panel.hasAttribute('hidden');
        setPanelOpen(!isOpen);
    });

    close.addEventListener('click', () => setPanelOpen(false));

    optionButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const option = button.getAttribute('data-a11y-option');
            state[option] = !state[option];
            applyState();
            syncButtons();
            writePreferences();
            const message = optionMessage(option, state[option]);
            setHelperMessage(message, state[option] ? 'success' : 'guide');
            announce(message);
        });
    });

    optionButtons.forEach((button) => {
        button.addEventListener('focus', () => {
            const option = button.getAttribute('data-a11y-option');
            setHelperMessage(optionGuidance(option), 'guide', false);
        });
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !panel.hasAttribute('hidden')) {
            setPanelOpen(false);
            toggle.focus();
        }
    });

    document.addEventListener('focusin', (event) => {
        if (event.target.classList.contains('a11y-reading-stop')) {
            event.target.scrollIntoView({
                behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
                block: 'center'
            });
        }

        if (!state.narrator) return;
        const label = describeElement(event.target);
        if (label) announce(label, true);
    });

    function setPanelOpen(open) {
        panel.hidden = !open;
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Fechar ferramentas de acessibilidade' : 'Abrir ferramentas de acessibilidade');
        if (open) {
            const firstOption = panel.querySelector('.a11y-option');
            if (firstOption) firstOption.focus();
            setHelperMessage(
                usesDockedAccessibility
                    ? 'Estou por aqui. Ative somente os recursos que ajudam na sua leitura.'
                    : 'Olá! Sou a Roll. Use Tab para navegar e ative a narração para ouvir cada item.',
                'welcome'
            );
        } else {
            setHelperPose('idle');
        }
    }

    function setHelperMessage(message, pose = 'idle', resetPose = true) {
        helper.textContent = message;
        setHelperPose(pose);

        window.clearTimeout(helperPoseTimer);
        if (resetPose && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            helperPoseTimer = window.setTimeout(() => setHelperPose('idle'), 2400);
        }
    }

    function setHelperPose(pose) {
        helperPortrait.setAttribute('data-roll-pose', pose);
        helperPortraitImage.src = rollPoses[pose] || rollPoses.idle;
    }

    function applyState() {
        document.body.classList.toggle('a11y-high-contrast', state.highContrast);
        document.body.classList.toggle('a11y-keyboard-mode', state.keyboard);
        document.body.classList.toggle('a11y-readable', state.readable);
        syncReadingStops();
    }

    function prepareReadingStops() {
        const selectors = [
            'main h1',
            'main h2',
            'main h3',
            'main h4',
            'main p',
            'main blockquote',
            'main .ctrl-item',
            'main .item-chip',
            'main .emu-keymap-grid'
        ];
        const interactiveAncestor = 'a, button, input, select, textarea, [contenteditable="true"]';

        return Array.from(document.querySelectorAll(selectors.join(', '))).filter((element) => {
            const hasReadableText = element.textContent.replace(/\s+/g, ' ').trim().length > 0;
            return hasReadableText && !element.closest(interactiveAncestor);
        });
    }

    function syncReadingStops() {
        const readingEnabled = state.narrator || state.keyboard;

        readingStops.forEach((element) => {
            if (readingEnabled) {
                if (!element.hasAttribute('tabindex')) {
                    element.setAttribute('tabindex', '0');
                    element.setAttribute('data-a11y-tab-added', 'true');
                }
                element.classList.add('a11y-reading-stop');
                return;
            }

            element.classList.remove('a11y-reading-stop');
            if (element.getAttribute('data-a11y-tab-added') === 'true') {
                element.removeAttribute('tabindex');
                element.removeAttribute('data-a11y-tab-added');
            }
        });
    }

    function syncButtons() {
        optionButtons.forEach((button) => {
            const option = button.getAttribute('data-a11y-option');
            const active = Boolean(state[option]);
            button.setAttribute('aria-pressed', String(active));
            const optionState = button.querySelector('.a11y-option-state');
            if (optionState) {
                optionState.textContent = usesDockedAccessibility
                    ? (active ? 'Ativo' : 'Inativo')
                    : (active ? 'ON' : 'OFF');
            }
        });
    }

    function announce(message, speakOnly = false) {
        liveRegion.textContent = message;
        if (!speakOnly && !state.narrator) return;
        if (!('speechSynthesis' in window)) return;

        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(message);
        utterance.lang = 'pt-BR';
        utterance.rate = 0.95;
        window.speechSynthesis.speak(utterance);
    }

    function describeElement(element) {
        if (!element || element === document.body) return '';
        const explicitLabel = element.getAttribute('aria-label') || element.getAttribute('title');
        const text = explicitLabel || element.innerText || element.textContent || element.alt || '';
        const cleanText = text.replace(/\s+/g, ' ').trim();
        const tagName = element.tagName.toLowerCase();
        const roleNames = {
            h1: 'título nível 1',
            h2: 'título nível 2',
            h3: 'título nível 3',
            h4: 'título nível 4',
            p: 'texto',
            blockquote: 'citação'
        };
        const role = element.getAttribute('role') || roleNames[tagName] || tagName;

        if (!cleanText) return role;
        return `${cleanText.slice(0, 700)}. ${role}.`;
    }

    function optionMessage(option, active) {
        const status = active ? 'ativado' : 'desativado';
        const messages = {
            highContrast: `Alto contraste ${status}.`,
            narrator: `Narração de tela ${status}.`,
            keyboard: `Guia de teclado ${status}. Use Tab para avançar e Enter ou Espaço para ativar.`,
            readable: `Texto ampliado ${status}.`
        };
        return messages[option] || `Opção ${status}.`;
    }

    function optionGuidance(option) {
        const messages = {
            highContrast: 'Alto contraste reforça cores, bordas e estados de foco.',
            narrator: 'Narração de tela fala o nome do elemento que receber foco.',
            keyboard: 'Guia de teclado deixa o foco mais visível durante a navegação.',
            readable: 'Texto ampliado aumenta o conteúdo e os controles da página.'
        };
        return messages[option] || 'Escolha uma opção de acessibilidade.';
    }

    function readPreferences() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
        } catch (error) {
            return {};
        }
    }

    function writePreferences() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (error) {
            // Preferencias ficam apenas na sessão quando o navegador bloqueia armazenamento.
        }
    }
}

const x4RouteButtons = document.querySelectorAll('[data-x4-route]');
if (x4RouteButtons.length) {
    const weaknesses = [...document.querySelectorAll('.x4-stage .boss-weakness')];
    weaknesses.forEach((element) => {
        const match = element.textContent.match(/X:\s*(.*?)\s*·\s*Zero:\s*(.*)/);
        if (match) {
            element.dataset.xWeapon = match[1];
            element.dataset.zeroWeapon = match[2];
        }
    });

    const selectX4Route = (route) => {
        x4RouteButtons.forEach((button) => {
            const selected = button.dataset.x4Route === route;
            button.classList.toggle('is-active', selected);
            button.setAttribute('aria-pressed', String(selected));
        });
        document.querySelectorAll('[data-x4-route-panel]').forEach((panel) => {
            panel.hidden = panel.dataset.x4RoutePanel !== route;
        });
        weaknesses.forEach((element) => {
            const weapon = route === 'x' ? element.dataset.xWeapon : element.dataset.zeroWeapon;
            element.textContent = `${route === 'x' ? 'X' : 'Zero'}: ${weapon}`;
        });
        sessionStorage.setItem('x4-route', route);
    };

    x4RouteButtons.forEach((button) => button.addEventListener('click', () => selectX4Route(button.dataset.x4Route)));
    selectX4Route(sessionStorage.getItem('x4-route') === 'zero' ? 'zero' : 'x');
}

function initBossCards() {
    if (!document.body.classList.contains('detonado-page')) return;

    document.querySelectorAll('.boss-card').forEach((card, index) => {
        const trigger = card.querySelector('.boss-img-wrap');
        const details = card.querySelector('.boss-info');
        const name = card.querySelector('.boss-name')?.textContent.replace(/\s+/g, ' ').trim()
            || card.querySelector('.boss-img')?.alt
            || 'chefe';
        const expandableContent = card.querySelectorAll('.attacks-list, .strategy, .boss-note');

        if (!trigger || !details || !expandableContent.length) return;

        const detailsId = `boss-details-${index + 1}`;
        details.id = detailsId;
        card.classList.add('is-collapsible');
        trigger.setAttribute('role', 'button');
        trigger.setAttribute('tabindex', '0');
        trigger.setAttribute('aria-controls', detailsId);
        trigger.insertAdjacentHTML('beforeend', '<span class="boss-expand-marker" aria-hidden="true">+</span>');

        const setExpanded = (expanded) => {
            card.classList.toggle('is-expanded', expanded);
            trigger.setAttribute('aria-expanded', String(expanded));
            trigger.setAttribute('aria-label', `${expanded ? 'Ocultar' : 'Ver'} estratégia de ${name}`);
            expandableContent.forEach((element) => element.setAttribute('aria-hidden', String(!expanded)));
        };

        const toggleCard = () => setExpanded(!card.classList.contains('is-expanded'));
        trigger.addEventListener('click', toggleCard);
        trigger.addEventListener('keydown', (event) => {
            if (event.key !== 'Enter' && event.key !== ' ') return;
            event.preventDefault();
            toggleCard();
        });

        setExpanded(false);
    });
}
