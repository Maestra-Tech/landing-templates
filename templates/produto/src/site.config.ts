/**
 * ============================================================
 *  CONFIGURAÇÃO DO SITE — é aqui que você troca TODO o conteúdo.
 * ============================================================
 *
 * Como usar:
 *  1. Troque os textos entre aspas pelos seus.
 *  2. Para esconder uma seção, mude `enabled: true` para `enabled: false`.
 *     Uma seção com a lista de itens vazia também some sozinha.
 *  3. Nos títulos, `title` é o texto normal e `titleAccent` é o trecho que
 *     aparece com brilho colorido logo depois dele. `titleEnd` (opcional) é o
 *     que vem depois do brilho, como um ponto de interrogação.
 *  4. Cores, fontes e cantos arredondados NÃO ficam aqui: ficam em
 *     `src/styles/tokens.css`.
 *
 * Todo o conteúdo abaixo é de DEMONSTRAÇÃO: "Aurora" é um produto fictício,
 * e os números e preços são inventados só para preencher a página.
 */

/* ------------------------------------------------------------
   Os "moldes" do conteúdo. Você não precisa editar esta parte:
   ela só avisa quando algum campo é esquecido ou escrito errado.
   ------------------------------------------------------------ */

/** Um link simples: o texto que aparece e para onde ele leva. */
export interface LinkItem {
  label: string
  href: string
}

/** Uma imagem: caminho dentro da pasta `public/`, descrição e tamanho em pixels. */
export interface ImageItem {
  src: string
  alt: string
  width: number
  height: number
}

/** Título com trecho de destaque. */
export interface TitleParts {
  title: string
  titleAccent?: string
  titleEnd?: string
}

/** Os desenhos disponíveis para os botões de rede social do rodapé. */
export type SocialIconName =
  | 'camera' // fotos (ex.: Instagram)
  | 'chat' // conversa (ex.: WhatsApp, Telegram)
  | 'play' // vídeos (ex.: YouTube, TikTok)
  | 'users' // comunidade (ex.: Facebook, grupos)
  | 'briefcase' // profissional (ex.: LinkedIn)
  | 'mail' // e-mail
  | 'phone' // telefone
  | 'globe' // outro site

/** A "prova" que aparece no pé de um card de funcionalidade. */
export type FeatureProof =
  | { kind: 'stat'; label: string; value: string }
  | { kind: 'chips'; items: string[] }
  | { kind: 'cite'; label: string; text: string }

/** Liga e desliga cada efeito visual da página. */
export interface Effects {
  reveal: boolean
  wordReveal: boolean
  shimmer: boolean
  heroVideo: boolean
  heroAtmosphere: boolean
  marquee: boolean
  spotlight: boolean
  cardGlow: boolean
  magneticCta: boolean
  ctaShine: boolean
  ctaGlow: boolean
  borderBeam: boolean
  cardHalo: boolean
  pillSweep: boolean
  demoScrollSync: boolean
  demoAutoAdvance: boolean
  stickyDemo: boolean
  stackedCards: boolean
  timeline: boolean
  railTracking: boolean
  stickyRail: boolean
  headerScroll: boolean
  textures: boolean
}

export interface SiteConfig {
  exemplo: boolean
  url: string
  lang: string
  brand: {
    name: string
    logo: { src: string; srcOnDark: string; width: number; height: number }
    themeColor: string
  }
  seo: {
    title: string
    description: string
    image: string
    imageAlt: string
    jsonLd: boolean
  }
  effects: Effects
  cta: { label: string; href: string; note: string }
  nav: {
    links: LinkItem[]
    login: { enabled: boolean; label: string; href: string }
    announcement: { enabled: boolean; text: string; href: string }
  }
  hero: TitleParts & {
    support: string
    proofs: { enabled: boolean; items: { value: string; label: string }[] }
    media: {
      poster: string
      video: { webm: string; mp4: string; mobileMp4: string }
    }
  }
  logos: {
    enabled: boolean
    label: string
    items: { name: string; image?: ImageItem }[]
    note: string
  }
  problem: TitleParts & { enabled: boolean; lead: string; closing: string }
  compare: TitleParts & {
    enabled: boolean
    them: { title: string; items: { term: string; text: string }[] }
    us: { title: string; items: { term: string; text: string }[] }
    strip: { enabled: boolean; text: string; ctaLabel: string }
  }
  demo: TitleParts & {
    enabled: boolean
    lead: string
    pillsLabel: string
    autoAdvanceSeconds: number
    items: {
      key: string
      pill: string
      title: string
      text: string
      image: ImageItem
      video?: { desktop: string; mobile: string }
    }[]
  }
  features: TitleParts & {
    enabled: boolean
    lead: string
    items: { title: string; text: string; wide?: boolean; proof?: FeatureProof }[]
  }
  steps: TitleParts & {
    enabled: boolean
    items: { title: string; text?: string }[]
  }
  inside: TitleParts & {
    enabled: boolean
    kicker: string
    lead: string[]
    highlight: {
      enabled: boolean
      quote: string
      sourceLabel: string
      source: string
      note: string
    }
    railTitle: string
    items: {
      term: string
      title: string
      paragraphs: string[]
      note?: { lead: string; text: string }
      chips?: { label: string; items: string[] }
    }[]
    closing: { enabled: boolean; title: string; lead: string; paragraphs: string[] }
    sample: {
      enabled: boolean
      label: string
      value: string
      sourceLabel: string
      source: string
      caption: string
    }
  }
  beforeAfter: TitleParts & {
    enabled: boolean
    before: { title: string; items: string[] }
    after: { title: string; items: string[] }
  }
  showcase: TitleParts & {
    enabled: boolean
    lead: string
    stackTitle: string
    note: { text: string; emphasis: string }
    items: { title: string; image: ImageItem; imageMobile?: ImageItem }[]
    band: { enabled: boolean; title: string; text: string }
    closing: { enabled: boolean; icon: SocialIconName; text: string }
  }
  testimonials: TitleParts & {
    enabled: boolean
    items: { quote: string; name: string; role: string }[]
  }
  pricing: TitleParts & {
    enabled: boolean
    kicker: string
    lead: string
    plans: {
      name: string
      headline?: string
      description: string
      badge?: string
      badgeDetail?: string
      listPrice?: string
      price: string
      unit: string
      condition?: string
      terms?: string
      cta: LinkItem
      primary?: boolean
      featured?: boolean
      includesTitle: string
      includes: string[]
      finePrint?: string
    }[]
    options: {
      enabled: boolean
      title: string
      lead: string
      band: { enabled: boolean; title: string; paragraphs: string[] }
      items: {
        label: string
        badge?: string
        tag?: string
        price: string
        unit: string
        strong: string
        note?: string
        cta: LinkItem
        ctaNote?: string
        featured?: boolean
      }[]
      footer: string
    }
    note: string
  }
  faq: TitleParts & {
    enabled: boolean
    items: { question: string; answer: string }[]
  }
  finalCta: TitleParts & {
    enabled: boolean
    lead: string
    invitation: string
    note: string
  }
  footer: {
    tagline: string
    links: LinkItem[]
    social: { icon: SocialIconName; label: string; href: string }[]
    company: { enabled: boolean; lines: string[] }
    note: string
  }
}

/* ------------------------------------------------------------
   O CONTEÚDO. Daqui para baixo é tudo seu para editar.
   ------------------------------------------------------------ */

export const site: SiteConfig = {
  // Deixe `true` enquanto o conteúdo ainda for o de demonstração.
  // Quando terminar de trocar tudo pelo seu, mude para `false`.
  exemplo: true,

  // O endereço final do seu site (com https:// e sem barra no fim).
  // É usado nos dados que o Google e as redes sociais leem.
  url: 'https://example.com',

  // O idioma da página.
  lang: 'pt-BR',

  // A MARCA: nome e logo.
  // Sem imagem de logo (campos `src` vazios), o nome aparece escrito com um
  // pequeno símbolo colorido ao lado. Se tiver logo, coloque o arquivo em
  // `public/` e escreva o caminho, por exemplo '/logo.svg'.
  // `src` é a versão para fundo claro (barra do topo) e `srcOnDark` a versão
  // para fundo escuro (rodapé).
  brand: {
    name: 'Aurora',
    logo: { src: '', srcOnDark: '', width: 120, height: 32 },
    // A cor da barra do navegador no celular. Use a mesma cor de fundo
    // escuro que estiver em `--bg` no arquivo `src/styles/tokens.css`.
    themeColor: 'oklch(0.135 0.018 280)',
  },

  // O QUE APARECE NO GOOGLE E AO COMPARTILHAR O LINK.
  // `image` é a imagem do compartilhamento (ideal: 1200 x 630 pixels, PNG ou JPG).
  // `jsonLd: true` adiciona dados extras para buscadores entenderem a página.
  seo: {
    title: 'Aurora — agenda online para pequenos negócios (exemplo)',
    description:
      'Aurora é um produto fictício de demonstração: uma agenda online que confirma horários, lembra clientes e organiza o dia de pequenos negócios.',
    image: '/og-placeholder.png',
    imageAlt: 'Aurora, agenda online para pequenos negócios',
    jsonLd: true,
  },

  // OS EFEITOS VISUAIS. Todos vêm ligados (`true`). Mude para `false` o que
  // quiser desligar. Quem pede "reduzir movimento" no aparelho já recebe a
  // página sem animação, independentemente do que estiver aqui.
  effects: {
    reveal: true, // seções entram suavemente ao rolar a página
    wordReveal: true, // alguns títulos acendem palavra por palavra
    shimmer: true, // brilho colorido que desliza nos trechos de destaque
    heroVideo: true, // toca o vídeo de fundo do começo da página (se houver)
    heroAtmosphere: true, // fundo animado do começo (luzes e feixes) quando não há vídeo
    marquee: true, // faixa de logos andando sozinha
    spotlight: true, // holofote suave que segue o mouse pela página
    cardGlow: true, // a borda dos cards acende perto do mouse
    magneticCta: true, // o botão principal é levemente atraído pelo mouse
    ctaShine: true, // feixe na borda e varredura de luz no botão principal
    ctaGlow: true, // brilho colorido atrás do botão principal
    borderBeam: true, // feixe de luz correndo pela borda dos cards
    cardHalo: true, // luz colorida vazando por trás dos cards
    pillSweep: true, // varredura metálica na pílula ativa da demonstração
    demoScrollSync: true, // no computador, rolar os capítulos troca a tela do celular
    demoAutoAdvance: true, // a demonstração avança sozinha de tela em tela
    stickyDemo: true, // no computador, o celular fica fixo enquanto os capítulos rolam
    stackedCards: true, // no celular, os cards de funcionalidade se empilham como cartas
    timeline: true, // a linha do passo a passo se preenche e os números acendem
    railTracking: true, // o índice lateral do "Por dentro" marca o item que está sendo lido
    stickyRail: true, // no computador, o índice lateral do "Por dentro" fica fixo
    headerScroll: true, // a barra do topo ganha sombra depois de rolar
    textures: true, // grão e grade fina no fundo
  },

  // O BOTÃO PRINCIPAL. O mesmo texto e o mesmo destino se repetem na barra do
  // topo, no começo e no fim da página. `note` é a frase pequena embaixo dele.
  cta: {
    label: 'Começar teste grátis',
    href: '#precos',
    note: 'Teste de 14 dias. Sem cartão de crédito. (Condições de exemplo.)',
  },

  // A BARRA DO TOPO.
  // `links` são os atalhos para as seções (aparecem em telas grandes). Um
  // atalho para uma seção desligada some sozinho.
  // `login` é o botão discreto para quem já é cliente.
  // `announcement` é a faixa fina de aviso embaixo da barra.
  nav: {
    links: [
      { label: 'Demonstração', href: '#demo' },
      { label: 'Funcionalidades', href: '#funcionalidades' },
      { label: 'Como funciona', href: '#como-funciona' },
      { label: 'Preços', href: '#precos' },
      { label: 'Dúvidas', href: '#faq' },
    ],
    login: { enabled: true, label: 'Entrar', href: '#' },
    announcement: {
      enabled: true,
      text: 'Esta é uma página de demonstração. Troque este aviso pela sua novidade ou promoção.',
      href: '',
    },
  },

  // O COMEÇO DA PÁGINA (a primeira coisa que o visitante vê).
  // `proofs` são três números curtos que dão confiança.
  // O fundo é um efeito animado feito por código. Se quiser uma foto ou um
  // vídeo no lugar, coloque os arquivos em `public/` e preencha `media`:
  //   `poster`  → a imagem de fundo (ex.: '/fundo.jpg'). Sozinha, vira fundo fixo.
  //   `video`   → o vídeo que toca por cima da imagem. Preencha `mp4` (e, se
  //               tiver, `webm`); `mobileMp4` é uma versão menor para celular.
  //   O vídeo só funciona junto com um `poster`: é ele que aparece primeiro.
  hero: {
    title: 'Sua agenda cheia,',
    titleAccent: 'sem trocar mensagens o dia inteiro.',
    support:
      'A Aurora deixa seus clientes marcarem horário sozinhos, confirma cada atendimento e avisa quando alguém desmarca. Você cuida do serviço; a agenda se cuida.',
    proofs: {
      enabled: true,
      items: [
        { value: '2 min', label: 'para criar sua agenda (número de exemplo)' },
        { value: '24 h', label: 'de marcação aberta, todos os dias' },
        { value: '14 dias', label: 'de teste grátis (condição de exemplo)' },
      ],
    },
    media: {
      poster: '',
      video: { webm: '', mp4: '', mobileMp4: '' },
    },
  },

  // FAIXA DE LOGOS (clientes, parceiros, "saiu na mídia"), andando sozinha.
  // Os nomes abaixo são marcas de mentira, só para mostrar a faixa em
  // movimento. Troque por logos que você tem permissão de usar, ou desligue.
  // Cada item precisa de `name`. Para usar a imagem do logo, acrescente
  //   image: { src: '/logos/parceiro.svg', alt: 'Parceiro', width: 120, height: 32 }
  // Sem `image`, o nome sai escrito ao lado de um símbolo genérico.
  logos: {
    enabled: true,
    label: 'Negócios que poderiam usar (marcas de exemplo)',
    items: [
      { name: 'Estúdio Lume' },
      { name: 'Ateliê Norte' },
      { name: 'Casa Pétala' },
      { name: 'Barbearia Seis' },
      { name: 'Espaço Brisa' },
      { name: 'Oficina Ponto' },
      { name: 'Studio Maré' },
      { name: 'Clube Trilha' },
    ],
    note: 'Marcas fictícias, apenas para demonstração. Use somente logos de quem autorizou.',
  },

  // O PROBLEMA: a dor que o seu produto resolve, dita em poucas palavras.
  problem: {
    enabled: true,
    title: 'Marcar um horário não deveria levar dez mensagens.',
    titleAccent: 'Mas leva.',
    lead: 'Cliente pergunta se tem vaga, você responde horas depois, ele já não pode mais. No fim do dia, sobram buracos na agenda e conversas pela metade.',
    closing: 'O problema não é falta de cliente. É o vai e vem para encaixar cada um.',
  },

  // O COMPARATIVO: o jeito comum de um lado, o seu produto do outro.
  // Cada linha tem um termo em negrito (`term`) e uma explicação (`text`).
  // `strip` é a faixa escura que fecha a seção com uma frase e um botão.
  compare: {
    enabled: true,
    title: 'Caderno e mensagens',
    titleAccent: 'ou uma agenda que trabalha por você?',
    them: {
      title: 'Do jeito de sempre',
      items: [
        { term: 'Marcação', text: 'só quando você consegue responder.' },
        { term: 'Confirmação', text: 'você lembra de mandar, ou não.' },
        { term: 'Faltas', text: 'descobre na hora, com a cadeira vazia.' },
        { term: 'Visão do dia', text: 'espalhada entre caderno e conversas.' },
      ],
    },
    us: {
      title: 'Com a Aurora',
      items: [
        { term: 'Marcação', text: 'o cliente escolhe o horário livre, a qualquer hora.' },
        { term: 'Confirmação', text: 'lembrete automático um dia antes.' },
        { term: 'Faltas', text: 'o horário desmarcado volta a ficar disponível.' },
        { term: 'Visão do dia', text: 'tudo em uma tela, no celular ou no computador.' },
      ],
    },
    strip: {
      enabled: true,
      text: 'Você continua no controle: nada é marcado fora dos horários que você liberar.',
      ctaLabel: 'Quero organizar minha agenda',
    },
  },

  // A DEMONSTRAÇÃO: um celular que troca de tela, com um botão (pílula) e
  // um texto (capítulo) para cada tela.
  //   `key`   → um apelido curto, sem espaços nem acentos, diferente em cada item.
  //   `pill`  → o texto do botão.
  //   `image` → a tela (imagem em pé; coloque em `public/demo/`).
  //   `video` → opcional: uma gravação da tela, que toca por cima da imagem.
  //             Ex.: video: { desktop: '/demo/marcar.mp4', mobile: '/demo/marcar-pequeno.mp4' }
  // `autoAdvanceSeconds` é o tempo, em segundos, que cada tela sem vídeo fica
  // no ar antes de passar para a próxima (no celular).
  demo: {
    enabled: true,
    title: 'Como a Aurora entra no seu',
    titleAccent: 'dia a dia',
    titleEnd: '?',
    lead: 'Quatro momentos de uma semana comum, do pedido de horário ao resumo do dia.',
    pillsLabel: 'Escolha um momento para ver a tela',
    autoAdvanceSeconds: 6,
    items: [
      {
        key: 'marcar',
        pill: 'marcar',
        title: 'O cliente marca sozinho',
        text: 'Ele abre o seu link, vê os horários livres e marca em poucos toques, sem esperar resposta.',
        image: {
          src: '/demo/tela-marcar.svg',
          alt: 'Ilustração de exemplo: tela de escolha de horário no celular',
          width: 780,
          height: 1600,
        },
      },
      {
        key: 'agenda',
        pill: 'agenda',
        title: 'O dia inteiro em uma tela',
        text: 'Quem vem, a que horas e para qual serviço. Os buracos da agenda ficam visíveis de relance.',
        image: {
          src: '/demo/tela-agenda.svg',
          alt: 'Ilustração de exemplo: tela com a agenda do dia no celular',
          width: 780,
          height: 1600,
        },
      },
      {
        key: 'lembrete',
        pill: 'lembrete',
        title: 'O lembrete sai sem você lembrar',
        text: 'Um dia antes, o cliente recebe a confirmação. Se desmarcar, o horário reabre na hora.',
        image: {
          src: '/demo/tela-lembrete.svg',
          alt: 'Ilustração de exemplo: tela de lembrete enviado ao cliente',
          width: 780,
          height: 1600,
        },
      },
      {
        key: 'resumo',
        pill: 'resumo',
        title: 'O resumo fecha o dia',
        text: 'Atendimentos feitos, faltas e horários que ficaram vagos, prontos ao encerrar o expediente.',
        image: {
          src: '/demo/tela-resumo.svg',
          alt: 'Ilustração de exemplo: tela com o resumo do dia',
          width: 780,
          height: 1600,
        },
      },
    ],
  },

  // AS FUNCIONALIDADES, em cards de tamanhos variados.
  // `wide: true` deixa o card mais largo (use em um ou dois, os principais).
  // `proof` é o detalhe no pé do card e é opcional. Três formatos:
  //   { kind: 'stat', label: '...', value: '...' }   → um dado em destaque
  //   { kind: 'chips', items: ['...', '...'] }        → etiquetas
  //   { kind: 'cite', label: '...', text: '...' }     → uma citação ou observação
  features: {
    enabled: true,
    title: 'Tudo o que a sua agenda precisa.',
    titleAccent: 'Nada além disso.',
    lead: 'Funções pensadas para quem atende sozinho ou com uma equipe pequena.',
    items: [
      {
        title: 'Link de agendamento',
        text: 'Um endereço seu para colocar no perfil das redes e enviar a quem pergunta por horário.',
        wide: true,
        proof: { kind: 'chips', items: ['perfil', 'mensagem', 'cartão de visita'] },
      },
      {
        title: 'Lembretes automáticos',
        text: 'Confirmação um dia antes e aviso na manhã do atendimento.',
        wide: true,
        proof: { kind: 'stat', label: 'Envio do lembrete', value: '24 h antes (exemplo)' },
      },
      {
        title: 'Serviços e durações',
        text: 'Cada serviço ocupa o tempo certo na agenda, sem encaixe manual.',
        proof: { kind: 'stat', label: 'Corte + barba', value: '50 min (exemplo)' },
      },
      {
        title: 'Equipe',
        text: 'Uma agenda por profissional, e uma visão geral para quem coordena.',
        proof: { kind: 'chips', items: ['por pessoa', 'visão geral'] },
      },
      {
        title: 'Histórico do cliente',
        text: 'O que ele já fez, quando voltou e o que ficou combinado.',
        proof: {
          kind: 'cite',
          label: 'Exemplo de anotação',
          text: 'Prefere horários de manhã. Última visita há três semanas.',
        },
      },
    ],
  },

  // O PASSO A PASSO: como começar a usar, em ordem.
  // `text` é opcional; só com título a linha do tempo fica mais enxuta.
  steps: {
    enabled: true,
    title: 'Pronta em',
    titleAccent: 'quatro passos',
    titleEnd: '.',
    items: [
      { title: 'Crie sua conta', text: 'Nome do negócio, e-mail e uma senha.' },
      { title: 'Cadastre seus serviços', text: 'Diga quanto tempo cada um leva.' },
      { title: 'Libere seus horários', text: 'Escolha os dias e os intervalos em que você atende.' },
      { title: 'Compartilhe seu link', text: 'A partir daqui, os clientes marcam sozinhos.' },
    ],
  },

  // POR DENTRO: a parte de leitura, para quem quer entender como funciona.
  //   `kicker`    → a etiqueta pequena acima do título.
  //   `lead`      → um ou mais parágrafos de abertura.
  //   `highlight` → caixa de destaque ao lado do título: uma frase, a origem
  //                 dela e um comentário. Só use frases e fontes verdadeiras.
  //   `items`     → os pontos. Cada um vira um card e uma linha no índice
  //                 lateral. `note` (ressalva) e `chips` (etiquetas) são opcionais.
  //   `closing`   → card de fecho, com a borda animada.
  //   `sample`    → uma amostra: um dado em destaque e de onde ele vem.
  inside: {
    enabled: true,
    kicker: 'Por dentro',
    title: 'Simples por fora,',
    titleAccent: 'cuidadosa por dentro.',
    lead: [
      'Uma agenda só ajuda se você confiar nela. Por isso a Aurora segue poucas regras, e segue sempre.',
      'Abaixo, as quatro que mais importam no dia a dia.',
    ],
    highlight: {
      enabled: true,
      quote: 'Um horário só aparece como livre se ele estiver livre de verdade.',
      sourceLabel: 'Regra da casa',
      source: 'Princípio de funcionamento da Aurora (texto de exemplo)',
      note: 'Parece óbvio, mas é o que evita dois clientes na mesma cadeira.',
    },
    railTitle: 'As quatro regras',
    items: [
      {
        term: 'Sem choque',
        title: 'Dois clientes nunca caem no mesmo horário',
        paragraphs: [
          'Quando alguém começa a marcar, aquele horário fica reservado por alguns minutos.',
          'Se a pessoa desistir, ele volta a aparecer para os outros. Se concluir, some da lista na hora.',
        ],
        note: {
          lead: 'Vale também para a equipe.',
          text: 'Cada profissional tem a própria agenda, e um não ocupa o horário do outro.',
        },
      },
      {
        term: 'Seus limites',
        title: 'Ninguém marca fora do que você liberou',
        paragraphs: [
          'Você define os dias, os intervalos e a antecedência mínima.',
          'Almoço, folga e feriado ficam bloqueados até você dizer o contrário.',
        ],
        chips: { label: 'O que dá para ajustar', items: ['dias', 'intervalos', 'antecedência', 'folgas'] },
      },
      {
        term: 'Lembrete',
        title: 'O cliente é avisado, e você também',
        paragraphs: [
          'O lembrete sai um dia antes, com um botão para confirmar ou desmarcar.',
          'Quando alguém desmarca, você recebe o aviso e o horário reabre sozinho.',
        ],
      },
      {
        term: 'Seus dados',
        title: 'A lista de clientes é sua',
        paragraphs: [
          'Você pode baixar clientes e atendimentos quando quiser, em um arquivo de planilha.',
          'Se um dia sair, leva tudo junto.',
        ],
        note: {
          lead: 'Sem letra miúda.',
          text: 'A Aurora não vende nem compartilha a sua lista de clientes.',
        },
      },
    ],
    closing: {
      enabled: true,
      title: 'E se eu já uso um caderno que funciona?',
      lead: 'Então a Aurora só precisa fazer o que o caderno não faz.',
      paragraphs: [
        'O caderno guarda, mas não responde cliente às dez da noite nem lembra ninguém do horário de amanhã.',
        'Você pode usar os dois por um tempo. A maioria percebe sozinha quando parar de anotar.',
      ],
    },
    sample: {
      enabled: true,
      label: 'Exemplo de aviso',
      value: 'Horário das 15h reaberto: cliente desmarcou.',
      sourceLabel: 'De onde vem',
      source: 'Gerado pela Aurora no momento do cancelamento (exemplo)',
      caption: 'Uma amostra do tipo de aviso que chega para você. O texto é ilustrativo.',
    },
  },

  // ANTES E DEPOIS: a rotina sem o produto e a rotina com ele.
  beforeAfter: {
    enabled: true,
    title: 'A semana',
    titleAccent: 'antes e depois',
    titleEnd: ' da Aurora.',
    before: {
      title: 'Antes',
      items: [
        'Responder pedido de horário no meio do atendimento.',
        'Conferir o caderno para ver se tem vaga.',
        'Descobrir a falta com o cliente já atrasado.',
        'Fechar o dia sem saber quantos atendimentos fez.',
      ],
    },
    after: {
      title: 'Depois',
      items: [
        'O cliente marca sozinho pelo link.',
        'A agenda mostra as vagas na hora.',
        'O lembrete reduz o esquecimento.',
        'O resumo do dia fica pronto ao fechar.',
      ],
    },
  },

  // A VITRINE: uma sequência de imagens grandes (telas, relatórios, modelos),
  // cada uma com o título acima.
  //   `image`       → a imagem para telas grandes.
  //   `imageMobile` → opcional: uma versão mais estreita, feita para ser lida
  //                   no celular (se não tiver, apague a linha).
  //   `band`        → a faixa escura de reforço depois das imagens.
  //   `closing`     → a frase grande que fecha a seção, com um ícone
  //                   (os mesmos desenhos das redes do rodapé).
  showcase: {
    enabled: true,
    title: 'Ela não só agenda.',
    titleAccent: 'Ela lembra do cliente.',
    lead: 'Cada atendimento vira histórico: o que foi feito, quando e o que ficou combinado para a próxima vez.',
    stackTitle: 'Tudo pronto para enviar',
    note: {
      text: 'Dois exemplos do que a Aurora monta para você.',
      emphasis: 'São modelos ilustrativos; os seus saem com o nome e os dados do seu negócio.',
    },
    items: [
      {
        title: 'Resumo do mês',
        image: {
          src: '/vitrine/resumo-mes.svg',
          alt: 'Ilustração de exemplo: relatório com o resumo do mês',
          width: 1000,
          height: 770,
        },
        imageMobile: {
          src: '/vitrine/resumo-mes-celular.svg',
          alt: 'Ilustração de exemplo: relatório com o resumo do mês',
          width: 600,
          height: 800,
        },
      },
      {
        title: 'Comprovante de agendamento',
        image: {
          src: '/vitrine/comprovante.svg',
          alt: 'Ilustração de exemplo: comprovante de agendamento',
          width: 1000,
          height: 770,
        },
        imageMobile: {
          src: '/vitrine/comprovante-celular.svg',
          alt: 'Ilustração de exemplo: comprovante de agendamento',
          width: 600,
          height: 800,
        },
      },
    ],
    band: {
      enabled: true,
      title: 'Isto é só uma amostra.',
      text: 'Recibo, lista de espera e ficha do cliente seguem o mesmo padrão, prontos em poucos toques.',
    },
    closing: {
      enabled: true,
      icon: 'chat',
      text: 'Tudo isso chega pelo link que o seu cliente já usa.',
    },
  },

  // DEPOIMENTOS. Vem desligada e vazia de propósito: só ligue quando tiver
  // depoimentos REAIS, de clientes que autorizaram a publicação.
  // Modelo de item: { quote: 'O que a pessoa disse.', name: 'Nome', role: 'Profissão ou negócio' }
  testimonials: {
    enabled: false,
    title: 'Quem usa,',
    titleAccent: 'recomenda.',
    items: [],
  },

  // OS PREÇOS.
  // `plans` são os cards grandes, um por plano. Em cada um:
  //   `badge` + `badgeDetail` → o selo colorido e a frase ao lado (opcionais).
  //   `listPrice` → o preço "de", que aparece riscado (opcional).
  //   `price` + `unit` → o preço que vale, em destaque, e a unidade ("por mês").
  //   `condition` → uma condição do preço (opcional).
  //   `terms` → a frase em negrito acima do botão (opcional).
  //   `primary: true` → o botão do card usa a pele do botão principal.
  //   `featured: true` → o card ganha um brilho mais forte.
  //   `includes` → a lista do que vem no plano; `finePrint` → a letra miúda.
  // `options` são cards menores para comparar formas de pagamento (mensal,
  // anual...). É opcional: desligue em `enabled` se o seu preço for um só.
  //   `band` é a faixa escura que explica as opções.
  // `note` é a observação no fim da seção.
  pricing: {
    enabled: true,
    kicker: 'Planos',
    title: 'Planos simples,',
    titleAccent: 'sem letra miúda.',
    lead: 'Comece pelo teste grátis e escolha a forma de pagamento quando o movimento pedir.',
    plans: [
      {
        name: 'Aurora Estúdio',
        description: 'Para quem atende sozinho ou com até três profissionais.',
        badge: '20% de desconto',
        badgeDetail: 'no lançamento (condição de exemplo)',
        listPrice: 'R$ 59',
        price: 'R$ 47',
        unit: 'por mês',
        condition: 'Preço de lançamento, mantido enquanto a assinatura estiver ativa. (Exemplo.)',
        terms: 'Teste por 14 dias. Sem cartão de crédito para começar.',
        cta: { label: 'Começar teste grátis', href: '#' },
        primary: true,
        featured: true,
        includesTitle: 'O que está incluído',
        includes: [
          'Até 3 agendas',
          'Marcações ilimitadas',
          'Lembretes automáticos',
          'Histórico do cliente',
          'Resumo do mês',
        ],
        finePrint: 'Você pode cancelar quando quiser, direto na sua conta.',
      },
      {
        name: 'Aurora Equipe',
        headline: 'Para quem coordena vários profissionais.',
        description: 'Uma agenda por pessoa e uma visão geral para quem organiza o dia de todos.',
        price: 'R$ 29',
        unit: 'por profissional, por mês',
        terms: 'A partir de 4 profissionais. O valor acompanha o tamanho da equipe.',
        cta: { label: 'Montar plano da equipe', href: '#' },
        primary: true,
        includesTitle: 'Tudo do Estúdio, mais',
        includes: ['Agendas ilimitadas', 'Visão geral da equipe', 'Relatórios por profissional', 'Suporte prioritário'],
        finePrint: 'Valores fictícios, apenas para demonstração do modelo.',
      },
    ],
    options: {
      enabled: true,
      title: 'Escolha como pagar o Aurora Estúdio',
      lead: 'O plano é o mesmo. Quanto maior o período, menor o valor por mês.',
      band: {
        enabled: true,
        title: 'O desconto de lançamento soma com o do período.',
        paragraphs: [
          'No anual, o valor por mês cai de R$ 59 para R$ 35 (números de exemplo).',
          'A condição de lançamento vale para quem assinar durante a fase inicial.',
        ],
      },
      items: [
        {
          label: 'Mensal',
          price: 'R$ 47',
          unit: 'por mês',
          strong: 'Cobrança de R$ 47 a cada mês.',
          note: 'Sem compromisso de período.',
          cta: { label: 'Assinar mensal', href: '#' },
          ctaNote: 'Você cria a conta antes de pagar.',
        },
        {
          label: 'Trimestral',
          tag: '10% de desconto',
          price: 'R$ 42',
          unit: 'por mês',
          strong: 'Cobrança de R$ 126 a cada 3 meses.',
          note: 'Bom para testar uma temporada.',
          cta: { label: 'Assinar trimestral', href: '#' },
          ctaNote: 'Você cria a conta antes de pagar.',
        },
        {
          label: 'Semestral',
          tag: '15% de desconto',
          price: 'R$ 40',
          unit: 'por mês',
          strong: 'Cobrança de R$ 240 a cada 6 meses.',
          note: 'Meio ano de agenda organizada.',
          cta: { label: 'Assinar semestral', href: '#' },
          ctaNote: 'Você cria a conta antes de pagar.',
        },
        {
          label: 'Anual',
          badge: 'Mais escolhido',
          tag: '25% de desconto',
          price: 'R$ 35',
          unit: 'por mês',
          strong: 'Cobrança de R$ 420 uma vez por ano.',
          note: 'O menor valor por mês entre as quatro opções.',
          cta: { label: 'Assinar anual', href: '#' },
          ctaNote: 'Você cria a conta antes de pagar.',
          featured: true,
        },
      ],
      footer: 'Em qualquer opção, o teste grátis de 14 dias vem antes da primeira cobrança. (Condições de exemplo.)',
    },
    note: 'Todos os preços desta página são fictícios e servem apenas para demonstrar o modelo.',
  },

  // AS DÚVIDAS FREQUENTES. Cada item abre e fecha ao clicar.
  faq: {
    enabled: true,
    title: 'Dúvidas sobre a Aurora',
    titleEnd: '?',
    items: [
      {
        question: 'Preciso instalar alguma coisa?',
        answer:
          'Não. A Aurora abre direto no navegador do celular ou do computador. Seus clientes também não precisam instalar nada para marcar.',
      },
      {
        question: 'Meus clientes precisam criar conta?',
        answer: 'Não. Para marcar, basta informar o nome e um contato para receber o lembrete.',
      },
      {
        question: 'Posso bloquear horários de almoço e folgas?',
        answer:
          'Sim. Você define os dias e os intervalos em que atende. Fora deles, ninguém consegue marcar.',
      },
      {
        question: 'Como funciona o teste grátis?',
        answer:
          'Você usa todas as funções por 14 dias. Ao final, escolhe um plano ou continua no plano gratuito. (Condições de exemplo.)',
      },
      {
        question: 'Posso cancelar quando quiser?',
        answer: 'Pode. O cancelamento é feito na própria conta, sem precisar falar com ninguém.',
      },
    ],
  },

  // O CONVITE FINAL: o último empurrão antes do rodapé.
  finalCta: {
    enabled: true,
    title: 'Sua próxima semana pode começar',
    titleAccent: 'com a agenda organizada.',
    lead: 'Crie sua agenda agora e compartilhe o link ainda hoje.',
    invitation: 'Leva dois minutos.',
    note: 'A Aurora é um produto fictício, criado para demonstrar este modelo de página.',
  },

  // O RODAPÉ.
  // `links`: páginas legais e de contato.
  // `social`: botões redondos com um desenho genérico. Veja os desenhos
  //   disponíveis em `SocialIconName`, no começo deste arquivo.
  // `company`: dados da empresa (razão social, registro, cidade). Vem desligado.
  // `note`: a frase pequena no canto, como um aviso legal.
  footer: {
    tagline: 'Agenda online para pequenos negócios.',
    links: [
      { label: 'Termos de uso', href: '#' },
      { label: 'Privacidade', href: '#' },
      { label: 'Contato', href: '#' },
    ],
    social: [
      { icon: 'camera', label: 'Perfil de fotos da Aurora', href: 'https://example.com/fotos' },
      { icon: 'play', label: 'Canal de vídeos da Aurora', href: 'https://example.com/videos' },
      { icon: 'chat', label: 'Conversar com a Aurora', href: 'https://example.com/conversa' },
    ],
    company: {
      enabled: false,
      lines: ['Nome da sua empresa Ltda.', 'Número de registro da empresa', 'Cidade — Estado'],
    },
    note: 'Página de demonstração. Marca, números e preços são fictícios.',
  },
}
