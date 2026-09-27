# Mega Man X4 - preparacao do detonado

Status: publicado na home e em `detonado-x4.html`.

## Estrutura

- Reutilizar fichas expansiveis, navegacao e galeria horizontal de X3.
- Separar estrategias de X e Zero; nao tratar as campanhas como equivalentes.
- Conferir visualmente cada retrato com seu nome antes de integrar nas duas paginas.
- Preservar proporcao e transparencias, com cor somente atras do personagem.
- Itens de X4: oito Heart Tanks, dois Energy Tanks, Weapon Tank e EX Tank. Nao copiar a lista de quatro Sub-Tanks dos jogos anteriores.
- Incluir Fourth Armor de X, confrontos exclusivos Double/Iris e sequencia final.

## Referencia inicial das fraquezas de X

| Maverick | Arma |
| --- | --- |
| Frost Walrus | Rising Fire; Buster na primeira visita |
| Jet Stingray | Frost Tower |
| Slash Beast | Ground Hunter |
| Web Spider | Twin Slasher |
| Split Mushroom | Lightning Web |
| Cyber Peacock | Soul Body |
| Storm Owl | Aiming Laser |
| Magma Dragoon | Double Cyclone |

Esta corrente serve como ponto inicial; a rota de coleta e as tecnicas de Zero ainda precisam ser detalhadas antes da publicacao.

## Fontes

Consultadas em 2026-09-20:
- https://megaman.retropixel.net/mmx/4/bosses.php
- https://megaman.retropixel.net/mmx/4/items.php

Referencias encontradas para aprofundamento:
- https://megaman.retropixel.net/mmx/4/xbosses.php
- https://megaman.retropixel.net/mmx/4/zbosses.php
- https://megaman.retropixel.net/mmx/4/xweapons.php

## Imagens

- Fonte: imagem 3x3 fornecida pelo usuario em `assets/img/x4/mavericks-double-reference.jpg`.
- O background foi extraido com a ferramenta integrada de edicao de imagens, preservando os nove retratos e convertendo o branco em alfa real.
- Prompt final: remover apenas o fundo branco e as divisorias, preservar desenho, cores, proporcao, escala, enquadramento e posicao dos nove quadros; sem redesenho, texto, sombras ou fundo quadriculado.
- Mapeamento: Web Spider / Magma Dragoon / Frost Walrus; Cyber Peacock / Double / Slash Beast; Split Mushroom / Storm Owl / Jet Stingray.
- Recorte deterministico: `tools/crop-x4.cjs`, gerando PNGs 440x385 em `assets/img/x4/bosses/`.
