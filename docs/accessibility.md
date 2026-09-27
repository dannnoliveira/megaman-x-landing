# Padrao de Acessibilidade - Mega Man X Platform

Este documento orienta os times de produto, desenvolvimento e suporte sobre os recursos de acessibilidade disponiveis na plataforma.

## Referencias internacionais

O padrao segue como base:

- WCAG 2.2, nivel AA, do W3C/WAI: https://www.w3.org/TR/WCAG22/
- WAI-ARIA Authoring Practices, para componentes interativos e navegacao por teclado: https://www.w3.org/WAI/ARIA/apg/
- Boas praticas de teclado do WebAIM: https://webaim.org/techniques/keyboard/

## Recursos implementados

### Botao de acessibilidade

O botao fixo com o icone internacional de PCD fica no canto inferior direito da tela. Ele abre o painel de acessibilidade com opcoes imediatas para o usuario.

Opcoes disponiveis:

- Alto contraste: reforca texto, bordas e estados de foco.
- Narracao de tela: usa a voz do navegador para ler o elemento em foco.
- Guia de teclado: destaca o foco e orienta uso de Tab, Shift + Tab, Enter, Espaco e Esc.
- Texto ampliado: aumenta o tamanho base do texto para melhorar leitura.

As preferencias ficam salvas no navegador do usuario.

### Navegacao por teclado

A plataforma pode ser usada sem mouse.

- Tab avanca entre links, botoes e campos.
- Shift + Tab volta para o item anterior.
- Enter ou Espaco ativa botoes e controles.
- Esc fecha o painel de acessibilidade.
- O link "Pular para o conteudo principal" aparece ao receber foco e leva direto ao conteudo.
- Com Narracao de tela ou Guia de teclado ativos, titulos, paragrafos, itens e estrategias entram na sequencia do Tab e rolam para o centro da tela ao receber foco.
- Antes dos controles do emulador, o atalho "Pular o emulador e continuar no detonado" aparece ao receber foco.

### Leitura de tela

A plataforma usa HTML semantico, nomes acessiveis e regioes ARIA para leitores como NVDA, JAWS, VoiceOver e Narrator.

A opcao "Narracao de tela" e um apoio extra: ela fala o elemento focado usando `speechSynthesis` do navegador. Ela nao substitui leitores de tela profissionais, mas ajuda usuarios que precisam de orientacao por audio sem instalar ferramentas.

### Assistente amigavel

O painel inclui a "Roll Assist", uma agente visual e textual que orienta o usuario sobre como navegar. As poses da personagem respondem a saudacao, orientacao e confirmacao, enquanto toda informacao importante permanece disponivel em texto para tecnologias assistivas. A linguagem deve ser simples, direta e acolhedora.

## Orientacao para suporte

Quando um usuario pedir ajuda de acessibilidade:

1. Oriente a abrir o botao com o icone PCD no canto inferior direito.
2. Para baixa visao, recomende ativar "Alto contraste" e "Texto ampliado".
3. Para uso sem mouse, recomende "Guia de teclado" e explique Tab, Shift + Tab, Enter e Esc.
4. Para apoio auditivo, recomende "Narracao de tela".
5. Se o usuario ja usa NVDA, JAWS, VoiceOver ou Narrator, explique que a plataforma tambem possui estrutura semantica para esses leitores.

## Checklist para novas telas

- Todo botao precisa ser um `<button>` ou ter nome acessivel claro.
- Todo link precisa informar para onde leva.
- Nao dependa apenas de cor para comunicar estado.
- Mantenha contraste minimo WCAG AA: 4.5:1 para texto normal e 3:1 para texto grande ou elementos graficos essenciais.
- Todo controle interativo deve funcionar por teclado.
- O foco visivel nunca deve ser removido.
- Imagens informativas precisam de `alt`; imagens decorativas devem ser ignoradas por tecnologia assistiva.
- Mudancas importantes na tela devem usar texto visivel ou regioes `aria-live`.
- Animacoes devem respeitar `prefers-reduced-motion`.

## Limitacoes conhecidas

- A narracao por voz depende do suporte do navegador a `speechSynthesis`.
- O emulador externo pode ter comportamentos proprios de teclado e leitor de tela. A pagina documenta o mapa de teclado, mas o conteudo interno do emulador depende da biblioteca carregada.
- Validacao completa deve incluir teste manual com teclado e pelo menos um leitor de tela real.
