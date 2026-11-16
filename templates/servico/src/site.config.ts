/* ==========================================================================
   CONTEÚDO DO SITE
   --------------------------------------------------------------------------
   Tudo o que aparece escrito na página (textos, links, imagens) está aqui.
   Para editar, troque o que está entre aspas. Não precisa mexer em mais
   nenhum arquivo para mudar o conteúdo.

   - Cada seção opcional tem "enabled": true mostra, false esconde.
   - Uma seção sem itens também some sozinha, sem deixar buraco.
   - Nos títulos, "title" é a parte normal e "titleAccent" é o trecho que
     aparece em itálico colorido logo depois ("titleAfter", se existir, vem
     depois do destaque).
   - Em alguns textos longos dá para destacar trechos: **assim** fica em
     negrito e *assim* fica em itálico de serifa.
   - Imagens: coloque o arquivo na pasta "public" e escreva o caminho
     começando com barra, ex.: "/fotos/sala.jpg".
   - "mock" é a ilustração desenhada em código que aparece dentro dos cards
     (uma conversa, uma linha do tempo, um diagrama). Quer usar uma foto no
     lugar? Troque o mock inteiro por:
       { kind: 'image', src: '/fotos/sala.jpg', alt: 'Descrição da foto' }

   TODO O CONTEÚDO ABAIXO É FICTÍCIO (um estúdio de interiores inventado).
   ========================================================================== */

/** Imagem: caminho do arquivo + descrição para quem usa leitor de tela. */
export interface SiteImage {
  src: string;
  alt: string;
}

/** Cabeçalho comum das seções. */
export interface SectionHeading {
  /** Texto pequeno acima do título. */
  eyebrow: string;
  /** Parte normal do título. */
  title: string;
  /** Trecho em destaque (itálico colorido), logo após o título. */
  titleAccent: string;
  /** Continuação do título depois do destaque (opcional). */
  titleAfter?: string;
  /** Frase de apoio abaixo do título. Deixe "" para não mostrar. */
  text: string;
}

/** Tom de um aviso: bom (verde), ruim (rosa), informativo (azul) ou neutro. */
export type Tone = 'good' | 'bad' | 'info' | 'neutral';

/** Uma mensagem de conversa. "side": 'right' = quem pergunta, 'left' = quem responde. */
export interface ChatMessage {
  side: 'left' | 'right';
  text: string;
  time?: string;
  /** Lista de itens com ✓ abaixo da mensagem (opcional). */
  checks?: string[];
}

/** Ilustrações em código para os cards. Escolha uma pelo campo "kind". */
export type Mock =
  /** Foto ou ilustração sua. Com "src" vazio aparece um espaço reservado. */
  | { kind: 'image'; src: string; alt: string }
  /** Conversa estilo aplicativo de mensagens. */
  | {
      kind: 'chat';
      name: string;
      avatar: string;
      status?: string;
      messages: ChatMessage[];
      /** Mostra os três pontinhos de "digitando". */
      typing?: boolean;
      footer?: string;
      footerTone?: Tone;
    }
  /** Conversa estilo página de atendimento (linhas com avatar). */
  | {
      kind: 'thread';
      name: string;
      tag?: string;
      rows: { avatar: string; text: string; highlight?: boolean }[];
      footer?: string;
      footerTone?: Tone;
    }
  /** Linha do tempo de etapas, com um selo no canto. */
  | {
      kind: 'timeline';
      label: string;
      badge?: string;
      steps: { tag?: string; text: string; meta?: string }[];
    }
  /** Organograma: um item principal e os itens ligados a ele. */
  | {
      kind: 'tree';
      label: string;
      meta?: string;
      root: { label: string; status?: string };
      nodes: { label: string; status?: string; state?: 'active' | 'queued' | 'watching' }[];
    }
  /** Diagrama de fluxo, de cima para baixo. */
  | {
      kind: 'flow';
      label: string;
      rows: { items: string[]; style?: 'outline' | 'highlight' | 'plain' | 'dashed' }[];
    };

/** Uma tela do celular da seção de case. */
export interface PhoneScreen {
  /** Texto da pílula que troca a tela. */
  label: string;
  /** Imagem da tela (print). Vazio = usa a conversa em "messages". */
  image?: string;
  /** Vídeo da tela (opcional, .mp4). Roda sozinho e sem som. */
  video?: string;
  /** Versão menor do vídeo para celular (opcional). */
  videoMobile?: string;
  /** Descrição da tela para leitores de tela. */
  alt: string;
  /** Conversa desenhada em código, usada quando não há imagem nem vídeo. */
  messages?: ChatMessage[];
}

export interface SiteConfig {
  exemplo: boolean;
  name: string;
  description: string;
  url: string;
  locale: string;
  logo: SiteImage;
  ogImage: string;
  whatsapp: { number: string; message: string };
  ctaHref: string;
  effects: {
    spotlight: boolean;
    magneticCta: boolean;
    ctaBeam: boolean;
    ctaSheen: boolean;
    holoFlow: boolean;
    heroIntro: boolean;
    railShimmer: boolean;
    navGlass: boolean;
    reveal: boolean;
    wordReveal: boolean;
    stickyStack: boolean;
    parallax: boolean;
    cardGlow: boolean;
    phoneFloat: boolean;
    phoneAutoplay: boolean;
    faqAccordion: boolean;
  };
  nav: { ctaLabel: string; links: { label: string; href: string }[] };
  hero: {
    title: string;
    titleAccent: string;
    leadAccent: string;
    lead: string;
    text: string;
    ctaLabel: string;
    ctaNote: string;
    glow: 'holo' | 'cta' | 'a' | 'b';
    image: SiteImage;
    rail: { enabled: boolean; items: { term: string; description: string }[] };
  };
  stats: SectionHeading & {
    enabled: boolean;
    items: {
      prefix?: string;
      value: string;
      label: string;
      source: string;
      sourceUrl?: string;
      bars?: { label: string; percent: number; highlight?: boolean }[];
    }[];
    closing: string;
    bridge: string;
    bridgeAccent: string;
    sources: string;
  };
  compare: SectionHeading & {
    enabled: boolean;
    items: { name: string; badge?: string; mock: Mock; text: string }[];
    note: string;
    bridge: string;
    bridgeAccent: string;
  };
  offers: SectionHeading & {
    enabled: boolean;
    items: { step: string; title: string; text: string; mock: Mock }[];
    closing: string;
    ctaLabel: string;
    ctaNote: string;
  };
  process: SectionHeading & {
    enabled: boolean;
    items: { label: string; title: string; text: string }[];
    diagram: Mock | null;
    sheet: { label: string; lines: { comment?: string; keyword?: string; text?: string }[] } | null;
    statement: { accent: string; text: string };
    bridge: string;
    bridgeAccent: string;
  };
  caseStudy: SectionHeading & {
    enabled: boolean;
    logo: SiteImage;
    intro: string;
    features: { title: string; text: string }[];
    phone: { autoplaySeconds: number; caption: string; screens: PhoneScreen[] };
    quote: string;
    ctaLabel: string;
    ctaNote: string;
  };
  testimonials: SectionHeading & {
    enabled: boolean;
    items: { quote: string; name: string; role: string }[];
  };
  faq: SectionHeading & {
    enabled: boolean;
    items: { question: string; answer: string }[];
    note: { accent: string; text: string };
  };
  finalCta: SectionHeading & { manifesto: string; ctaLabel: string; ctaNote: string };
  footer: { text: string; links: { label: string; href: string }[] };
}

export const site: SiteConfig = {
  /* Enquanto estiver "true", o site avisa no rodapé que o conteúdo é de
     exemplo e pede ao Google para não indexar a página. Depois de trocar
     os textos pelos seus, mude para "false". */
  exemplo: true,

  /* ---------- DADOS GERAIS ---------------------------------------------- */
  /* Nome do negócio (aparece no topo, no rodapé e na aba do navegador). */
  name: 'Estúdio Norte',
  /* Resumo de uma ou duas frases. Aparece no Google e ao compartilhar o link. */
  description:
    'Estúdio fictício de design de interiores: projetos sob medida para casas e apartamentos, da primeira conversa à entrega.',
  /* Endereço final do site, com https:// e sem barra no fim. */
  url: 'https://exemplo.com.br',
  /* Idioma da página. */
  locale: 'pt-BR',
  /* Logo: se tiver um arquivo, informe o caminho em "src". Com "src" vazio,
     o nome do negócio aparece escrito. */
  logo: { src: '', alt: 'Estúdio Norte' },
  /* Imagem que aparece ao compartilhar o link (1200 x 630 pixels). */
  ogImage: '/og.png',

  /* ---------- CONTATO ---------------------------------------------------- */
  /* Todos os botões da página levam para o seu WhatsApp.
     "number": só números, com 55 + DDD + telefone. O número abaixo é falso.
     "message": texto que já chega escrito na conversa. */
  whatsapp: {
    number: '5500000000000',
    message: 'Olá! Vi o site e quero conversar sobre um projeto.',
  },
  /* Não usa WhatsApp? Coloque aqui outro link (agenda, formulário, e-mail
     no formato "mailto:voce@seudominio.com"). Preenchido, ele substitui o
     WhatsApp em todos os botões. */
  ctaHref: '',

  /* ---------- EFEITOS ---------------------------------------------------- */
  /* Cada linha liga (true) ou desliga (false) uma animação. Todos vêm
     ligados. Quem configurou o aparelho para "reduzir movimento" não vê
     as animações, mesmo com tudo ligado. */
  effects: {
    spotlight: true, // luz suave que segue o mouse (só em computador)
    magneticCta: true, // o botão principal é "puxado" pelo mouse quando ele chega perto
    ctaBeam: true, // feixe de luz girando na borda do botão principal
    ctaSheen: true, // reflexo que atravessa o botão principal
    holoFlow: true, // gradiente correndo nos títulos e nas bordas coloridas
    heroIntro: true, // textos do topo entram subindo ao abrir a página
    railShimmer: true, // brilho nos termos da régua do topo ao passar o mouse
    navGlass: true, // menu ganha fundo de vidro ao rolar a página
    reveal: true, // blocos aparecem conforme você rola
    wordReveal: true, // alguns parágrafos acendem palavra por palavra ao rolar
    stickyStack: true, // cards empilhados encolhem e escurecem atrás do próximo
    parallax: true, // alguns cards se movem um pouco mais devagar que a página
    cardGlow: true, // brilho colorido atrás dos cards de números e empilhados
    phoneFloat: true, // o celular do case flutua devagar
    phoneAutoplay: true, // as telas do celular trocam sozinhas
    faqAccordion: true, // perguntas abrem e fecham com animação
  },

  /* ---------- MENU DO TOPO ----------------------------------------------- */
  /* "links" são atalhos para as seções. Links de seções desligadas somem
     sozinhos. Deixe a lista vazia ([]) para mostrar só o botão. */
  nav: {
    ctaLabel: 'Chamar no WhatsApp',
    links: [
      { label: 'Serviços', href: '#servicos' },
      { label: 'Como funciona', href: '#como-funciona' },
      { label: 'Projeto', href: '#case' },
      { label: 'Dúvidas', href: '#duvidas' },
    ],
  },

  /* ---------- TOPO (HERO) ------------------------------------------------ */
  /* A primeira coisa que a pessoa vê. Diga o que você faz e para quem. */
  hero: {
    title: 'Sua casa não precisa parecer',
    titleAccent: 'saída de um catálogo.',
    /* "leadAccent" aparece colorido; "lead" continua a frase em branco. */
    leadAccent: 'Projetamos interiores sob medida:',
    lead: 'do cômodo que você quer resolver agora à casa inteira, pensada do jeito que você vive.',
    text: 'Você conta como é a sua rotina, a gente desenha o projeto, organiza o orçamento e acompanha cada etapa até o último detalhe estar no lugar.',
    ctaLabel: 'Quero conversar sobre meu projeto',
    ctaNote: 'É só chamar no WhatsApp. Sem formulário, sem compromisso.',
    /* Cor do destaque e do brilho do botão: 'holo' (todas as cores),
       'cta', 'a' (dupla fria) ou 'b' (dupla quente). */
    glow: 'holo',
    /* Foto de fundo (opcional). Vazio = fundo em gradiente animado. */
    image: { src: '', alt: '' },
    /* "Régua": faixa com até 4 termos explicados, no pé do topo. */
    rail: {
      enabled: true,
      items: [
        { term: 'Projeto sob medida', description: 'cada ambiente desenhado para a sua casa e para a sua rotina' },
        { term: 'Imagens em 3D', description: 'você vê como vai ficar antes de comprar ou quebrar qualquer coisa' },
        { term: 'Orçamento organizado', description: 'lista de compras e de serviços com prioridades claras' },
        { term: 'Obra acompanhada', description: 'visitas e conferência do que foi combinado com cada fornecedor' },
      ],
    },
  },

  /* ---------- NÚMEROS ---------------------------------------------------- */
  /* ATENÇÃO: OS NÚMEROS ABAIXO SÃO INVENTADOS, só para mostrar o desenho da
     seção. No seu site, só entra número REAL, com a fonte informada em
     "source" (pesquisa, relatório ou "dados internos" que você consiga
     comprovar). Se não tiver números assim, mude "enabled" para false.
     - "prefix": palavra pequena antes do número (opcional).
     - "bars": barras de comparação dentro do card (opcional), de 0 a 100. */
  stats: {
    enabled: true,
    eyebrow: 'Em números (ilustrativos)',
    title: 'Projeto antes da obra evita',
    titleAccent: 'o retrabalho depois.',
    text: 'Os números desta seção são de exemplo. Troque pelos seus, com fonte.',
    items: [
      {
        value: '00%',
        label: 'aqui entra o seu dado principal, explicado em uma linha',
        source: 'Exemplo · número fictício',
      },
      {
        value: '72%',
        label: 'um dado de comparação: o seu resultado ao lado da média do mercado',
        source: 'Exemplo · número fictício',
        bars: [
          { label: 'VOCÊ', percent: 72, highlight: true },
          { label: 'MÉDIA', percent: 54 },
        ],
      },
      {
        prefix: 'Só',
        value: '1 em 4',
        label: 'um dado que mostre o tamanho do problema que você resolve',
        source: 'Exemplo · número fictício',
      },
    ],
    /* Parágrafo que acende palavra por palavra. Deixe "" para não mostrar. */
    closing:
      'Quem reforma sem projeto costuma descobrir os problemas quando já estão pagos. Quem desenha antes decide com calma, compara com clareza e compra uma vez só.',
    /* Frase de passagem para a próxima seção. */
    bridge: 'Mas antes: o que é, afinal, um projeto de interiores?',
    bridgeAccent: 'Não é comprar móvel bonito. E não é só escolher cor de parede.',
    /* Linha de fontes, em letra pequena. */
    sources: 'Fontes: números ilustrativos, sem valor estatístico. Substitua pelas suas fontes reais.',
  },

  /* ---------- COMPARATIVO ------------------------------------------------ */
  /* Três caminhos lado a lado: duas alternativas e a sua (a última ganha
     destaque e pode ter um selo em "badge"). Seja justo com as alternativas. */
  compare: {
    enabled: true,
    eyebrow: 'Loja pronta ≠ Fazer por conta ≠ Projeto',
    title: 'Comprar pronto, contratar avulso e ter um projeto',
    titleAccent: 'não são a mesma coisa.',
    text: 'Entenda a diferença em 30 segundos. É ela que separa a casa que funciona da casa que dá retrabalho.',
    items: [
      {
        name: 'Loja de móveis prontos',
        mock: {
          kind: 'chat',
          name: 'Atendimento da loja',
          avatar: 'L',
          messages: [
            { side: 'right', text: 'Esse sofá cabe numa sala de 3,10 m?', time: '14:02' },
            { side: 'left', text: 'Temos nos tamanhos 2,30 m e 2,60 m.' },
            { side: 'right', text: 'Mas e a porta do corredor?', time: '14:03' },
            { side: 'left', text: 'Temos nos tamanhos 2,30 m e 2,60 m…' },
          ],
          footer: 'medida padrão · sem olhar o espaço',
          footerTone: 'bad',
        },
        text: 'Resolve rápido e tem preço claro. Mas a medida é padrão e ninguém olha o conjunto: é a sua casa que precisa se adaptar ao móvel.',
      },
      {
        name: 'Contratar cada profissional por conta',
        mock: {
          kind: 'thread',
          name: 'Grupo da obra',
          tag: 'você no meio',
          rows: [
            { avatar: 'V', text: 'O marceneiro pode instalar antes da pintura?' },
            { avatar: '✦', text: 'Pode, mas aí depende do eletricista. Você combinou a altura das tomadas com ele?', highlight: true },
          ],
          footer: 'você vira o gerente da obra',
          footerTone: 'bad',
        },
        text: 'Dá para fazer, e você escolhe cada fornecedor. Mas sem um projeto único, cada um decide de um jeito, e é você quem precisa fazer tudo combinar.',
      },
      {
        name: 'Projeto com o Estúdio Norte',
        badge: 'resolve',
        mock: {
          kind: 'chat',
          name: 'Estúdio · seu projeto',
          avatar: 'N',
          status: 'online',
          messages: [
            { side: 'right', text: 'Dá para caber sofá e mesa de jantar?', time: '14:02' },
            {
              side: 'left',
              text: 'Dá. Já está desenhado e medido.',
              checks: ['planta atualizada', 'imagem 3D enviada', 'lista de compras pronta'],
            },
          ],
          footer: 'decisão tomada',
          footerTone: 'good',
        },
        text: 'Um projeto único guia todas as compras e todos os profissionais. Você vê antes, aprova antes e executa uma vez só, com alguém responsável pelo conjunto.',
      },
    ],
    /* Recado em caixa, com palavras que acendem ao rolar. "" esconde. */
    note: 'É isso que chamamos de **projeto de interiores**: um plano único, desenhado para o seu espaço, que decide medidas, materiais e ordem de execução antes de qualquer compra.',
    bridge: 'E o que dá para fazer com isso na sua casa?',
    bridgeAccent: 'Mais do que você imagina.',
  },

  /* ---------- SERVIÇOS / NÍVEIS ------------------------------------------ */
  /* Seus serviços em degraus (o ideal são 3), do mais simples ao mais
     completo. Cada um tem uma ilustração ("mock") ao lado. */
  offers: {
    enabled: true,
    eyebrow: 'O que fazemos',
    title: 'De um ambiente à',
    titleAccent: 'casa inteira.',
    text: 'Você não precisa começar grande. Precisa começar certo.',
    items: [
      {
        step: 'degrau 01',
        title: 'Consultoria de um ambiente',
        text: 'Para quem quer resolver um cômodo sem reforma. Uma visita, um plano claro do que mudar e uma lista de compras para executar no seu ritmo.',
        mock: {
          kind: 'chat',
          name: 'Estúdio · consultoria',
          avatar: 'N',
          status: 'online',
          messages: [
            { side: 'right', text: 'Minha sala parece apertada. Tem jeito?', time: '09:12' },
            { side: 'left', text: 'Tem. Posso visitar na terça ou na quinta.', time: '09:12' },
            { side: 'right', text: 'Quinta', time: '09:13' },
            { side: 'left', text: 'Combinado ✓ Levo a trena e as amostras.', time: '09:13' },
          ],
          typing: true,
        },
      },
      {
        step: 'degrau 02',
        title: 'Projeto completo de interiores',
        text: 'Planta, marcenaria, iluminação e acabamentos de um ou mais ambientes, com imagens em 3D para você aprovar antes de qualquer compra.',
        mock: {
          kind: 'timeline',
          label: 'projeto · etapas',
          badge: '6 semanas',
          steps: [
            { text: 'briefing aprovado', meta: 'sem. 1' },
            { tag: 'planta', text: 'layout e medidas', meta: 'sem. 2' },
            { tag: '3D', text: 'imagens dos ambientes', meta: 'sem. 3' },
            { tag: 'lista', text: 'materiais e móveis', meta: 'sem. 5' },
            { text: 'caderno entregue ✓', meta: 'sem. 6' },
          ],
        },
      },
      {
        step: 'degrau 03',
        title: 'Projeto e acompanhamento de obra',
        text: 'Além do projeto, acompanhamos a execução: visitas periódicas, conversa com os fornecedores e conferência do que foi combinado.',
        mock: {
          kind: 'tree',
          label: 'obra · equipe',
          meta: 'semana 4',
          root: { label: 'estúdio', status: 'coordenando' },
          nodes: [
            { label: 'marcenaria', status: 'em produção', state: 'active' },
            { label: 'elétrica', status: 'concluída', state: 'active' },
            { label: 'pintura', status: 'em andamento', state: 'active' },
            { label: 'iluminação', status: 'na fila', state: 'queued' },
            { label: 'conferência final', status: 'agendada', state: 'watching' },
          ],
        },
      },
    ],
    /* Parágrafo e botão no fim da seção. Deixe "" para não mostrar. */
    closing: 'Em todos os casos, *sob medida*. A gente estuda a sua casa e desenha o que ela pede, nem mais, nem menos.',
    ctaLabel: 'Qual desses a minha casa precisa?',
    ctaNote: 'Chame no WhatsApp e converse direto com quem projeta. Sem script de vendas.',
  },

  /* ---------- COMO FUNCIONA (BASTIDORES) --------------------------------- */
  /* À esquerda, os princípios do seu jeito de trabalhar. À direita, três
     cards: um diagrama, uma "ficha" em letra de máquina e uma frase forte.
     Para esconder um card, use null (diagrama e ficha) ou "" (frase). */
  process: {
    enabled: true,
    eyebrow: 'Por dentro do método',
    title: 'Para quem gosta de olhar',
    titleAccent: 'atrás da parede.',
    text: 'Os detalhes de como cada projeto é feito. Com tradução junto, porque termo técnico sozinho não resolve a vida de ninguém.',
    items: [
      {
        label: 'levantamento',
        title: 'Medida conferida, não estimada',
        text: 'Todo projeto começa com medição no local: paredes, pontos de luz, tomadas e aberturas. O desenho nasce do espaço real, não de uma planta antiga.',
      },
      {
        label: 'layout',
        title: 'A circulação vem antes da decoração',
        text: 'Primeiro definimos por onde você passa e como usa cada ambiente. Só depois entram móveis, cores e acabamentos.',
      },
      {
        label: 'especificação',
        title: 'Cada item com nome, medida e quantidade',
        text: 'O que precisa ser comprado ou fabricado entra numa lista única, que qualquer fornecedor consegue seguir sem interpretação.',
      },
      {
        label: 'conferência',
        title: 'O que foi combinado é o que se entrega',
        text: 'Na obra, conferimos a execução contra o projeto. Divergência aparece cedo, quando ainda é barato corrigir.',
      },
    ],
    diagram: {
      kind: 'flow',
      label: 'esquema · do pedido à entrega',
      rows: [
        { items: ['entrada: conversa · visita · medidas'], style: 'outline' },
        { items: ['projeto'], style: 'highlight' },
        { items: ['planta', '3D', 'detalhes'], style: 'plain' },
        { items: ['marcenaria', 'elétrica', 'compras → lojas · fornecedores'], style: 'dashed' },
      ],
    },
    sheet: {
      label: 'onde errar custa caro',
      lines: [
        { comment: 'a ideia inspira. a trena decide.' },
        { keyword: 'sofá', text: '= 2,10 m · parede = 3,40 m' },
        { keyword: 'circulação', text: 'livre ≥ 0,90 m' },
        { comment: 'conferido no local antes de comprar' },
      ],
    },
    statement: {
      accent: 'Nenhum projeto prevê tudo.',
      text: 'Por isso cada etapa tem um ponto de conferência, antes de a próxima começar e antes de qualquer gasto grande.',
    },
    bridge: 'Método bonito todo mundo tem.',
    bridgeAccent: 'A gente prefere mostrar como fica na prática.',
  },

  /* ---------- CASE EM DESTAQUE ------------------------------------------- */
  /* Um trabalho contado em detalhe, com um celular que troca de tela pelas
     pílulas. O CASE ABAIXO É INVENTADO. Só publique um caso verdadeiro, com
     autorização do cliente; se não tiver, mude "enabled" para false.
     - "logo": marca do projeto/cliente (opcional).
     - "features": o primeiro item ocupa a largura toda.
     - "phone.screens": cada tela pode ser uma imagem ("image"), um vídeo
       ("video") ou uma conversa desenhada em código ("messages"). */
  caseStudy: {
    enabled: true,
    logo: { src: '', alt: '' },
    eyebrow: 'projeto de exemplo · conteúdo fictício',
    title: 'A gente prefere mostrar um projeto inteiro,',
    titleAccent: 'do começo ao fim.',
    text: 'Apartamento Aurora é um projeto inventado para este modelo. No seu site, conte aqui um trabalho real.',
    intro:
      'Um apartamento de 68 m² para um casal que trabalha em casa. O pedido: caber dois escritórios, uma sala para receber e nenhuma parede derrubada.',
    features: [
      {
        title: 'Dois escritórios onde antes havia um corredor.',
        text: 'A marcenaria planejada aproveitou um trecho sem uso do apartamento e transformou em duas estações de trabalho com porta de correr.',
      },
      { title: 'Tudo aprovado em imagem.', text: 'O casal viu cada ambiente em 3D e pediu os ajustes antes de qualquer compra.' },
      { title: 'Uma lista só.', text: 'Móveis, iluminação e acabamentos em um único documento, com medida e quantidade.' },
      { title: 'Obra sem parede no chão.', text: 'O projeto resolveu o espaço com marcenaria e luz, sem demolição.' },
      { title: 'Conferência na entrega.', text: 'Cada item instalado foi comparado com o projeto antes do aceite.' },
    ],
    phone: {
      /* Segundos em cada tela antes de trocar sozinha. */
      autoplaySeconds: 6,
      caption: 'telas de exemplo · conteúdo fictício',
      screens: [
        {
          label: 'briefing',
          alt: 'Tela de exemplo: conversa de briefing entre cliente e estúdio',
          messages: [
            { side: 'right', text: 'Somos dois trabalhando em casa e a sala virou escritório.', time: '10:02' },
            { side: 'left', text: 'Entendi. Vocês fazem chamadas ao mesmo tempo?', time: '10:03' },
            { side: 'right', text: 'Quase todo dia.', time: '10:03' },
            { side: 'left', text: 'Então são dois postos separados, com porta. Vou medir o corredor na visita.', time: '10:04' },
          ],
        },
        {
          label: 'planta',
          alt: 'Tela de exemplo: envio da planta com o novo layout',
          messages: [
            { side: 'left', text: 'Planta nova no anexo. O corredor virou dois escritórios.', time: '16:20', checks: ['layout com medidas', 'circulação de 0,90 m'] },
            { side: 'right', text: 'E a mesa de jantar continua?', time: '16:24' },
            { side: 'left', text: 'Continua, com 6 lugares. Só mudou de parede.', time: '16:25' },
          ],
        },
        {
          label: '3D',
          alt: 'Tela de exemplo: aprovação das imagens em 3D',
          messages: [
            { side: 'left', text: 'Imagens em 3D dos três ambientes enviadas.', time: '11:10', checks: ['sala', 'escritórios', 'quarto'] },
            { side: 'right', text: 'A madeira pode ser mais clara?', time: '11:32' },
            { side: 'left', text: 'Pode. Mando a versão nova amanhã cedo.', time: '11:33' },
          ],
        },
        {
          label: 'compras',
          alt: 'Tela de exemplo: lista de compras organizada',
          messages: [
            { side: 'left', text: 'Lista fechada, separada por loja e por prioridade.', time: '09:05', checks: ['marcenaria', 'iluminação', 'móveis soltos'] },
            { side: 'right', text: 'Dá para comprar em duas etapas?', time: '09:18' },
            { side: 'left', text: 'Dá. A etapa 1 já deixa os escritórios prontos.', time: '09:19' },
          ],
        },
        {
          label: 'entrega',
          alt: 'Tela de exemplo: conferência final na entrega',
          messages: [
            { side: 'left', text: 'Conferência final feita hoje.', time: '17:40', checks: ['portas alinhadas', 'tomadas na altura', 'luz regulada'] },
            { side: 'right', text: 'Primeira reunião de cada um no seu canto. Funcionou!', time: '18:02' },
          ],
        },
      ],
    },
    /* Frase de fechamento, em caixa, com palavras que acendem ao rolar. */
    quote:
      'Se dá para caber dois escritórios e uma sala de jantar em 68 m² sem derrubar parede, organizar a sua casa é *um problema que a gente já sabe resolver.*',
    ctaLabel: 'Quero um projeto nesse nível na minha casa',
    ctaNote: 'Chame no WhatsApp. A primeira conversa é diagnóstico, não venda.',
  },

  /* ---------- DEPOIMENTOS ------------------------------------------------ */
  /* Só depoimentos REAIS, com autorização de quem falou. Desligado e vazio
     por padrão. Modelo de item:
     { quote: 'O que a pessoa disse.', name: 'Nome', role: 'Cidade ou cargo' } */
  testimonials: {
    enabled: false,
    eyebrow: 'Quem já contratou',
    title: 'O que dizem',
    titleAccent: 'os clientes.',
    text: '',
    items: [],
  },

  /* ---------- PERGUNTAS FREQUENTES --------------------------------------- */
  /* As dúvidas que você mais ouve antes de fechar. Responda direto. */
  faq: {
    enabled: true,
    eyebrow: 'Perguntas que você deve estar se fazendo',
    title: 'As perguntas que todo mundo faz',
    titleAccent: 'antes de chamar.',
    text: 'Respondidas sem enrolação.',
    items: [
      {
        question: '"Meu espaço é pequeno demais para isso?"',
        answer:
          'Não. Em espaço pequeno cada centímetro conta, e é justamente onde um erro de medida custa mais caro. Dá para começar pela consultoria de um ambiente.',
      },
      {
        question: '"Quanto custa?"',
        answer:
          'Depende do tamanho e do que será feito. Não trabalhamos com tabela pronta porque nenhum espaço é igual a outro. Na primeira conversa você já sai com uma noção honesta de escopo e valor.',
      },
      {
        question: '"Quanto tempo leva?"',
        answer:
          'O prazo depende do número de ambientes e do nível de detalhe. Ele é definido na proposta, por etapa, antes de você decidir.',
      },
      {
        question: '"Vocês atendem fora da cidade?"',
        answer:
          'Parte do trabalho pode ser feita a distância, com medidas e fotos enviadas por você. Conte onde fica o imóvel e a gente diz o que é possível.',
      },
      {
        question: '"Sou obrigado a comprar com os fornecedores que vocês indicam?"',
        answer: 'Não. O projeto é seu. A gente indica quem conhece e confia, mas você executa com quem preferir.',
      },
    ],
    /* Caixa de recado no fim (opcional). Deixe os dois campos "" para esconder.
       "accent" aparece grande e colorido; "text" aceita **negrito**. */
    note: {
      accent: 'Um combinado nosso:',
      text: '**se o seu caso não precisar de um projeto completo, você vai ouvir isso também.** Preferimos uma conversa honesta a um contrato maior.',
    },
  },

  /* ---------- CHAMADA FINAL ---------------------------------------------- */
  /* Último convite antes do rodapé. "manifesto" é o parágrafo que acende
     palavra por palavra; use **negrito** nos trechos-chave. */
  finalCta: {
    eyebrow: 'vamos conversar',
    title: 'A',
    titleAccent: 'casa',
    titleAfter: 'que você imagina começa numa conversa.',
    text: 'Conte o que você quer mudar. A gente diz com sinceridade por onde vale começar.',
    manifesto:
      'A gente acredita que casa boa é a que **funciona para quem mora nela**, e não a que fica bonita só na foto. Projetar é **decidir antes de gastar**: cada medida conferida, cada compra com motivo. E isso começa com **uma conversa simples**: como você vive e o que te incomoda hoje?',
    ctaLabel: 'Descobrir o que um projeto faria pela minha casa',
    ctaNote: 'WhatsApp, resposta de gente, diagnóstico honesto. Se a gente achar que você ainda não precisa de um projeto, você vai ouvir isso também.',
  },

  /* ---------- RODAPÉ ----------------------------------------------------- */
  /* "text" aparece ao lado do ano. "links": redes sociais, política de
     privacidade etc. Deixe a lista vazia ([]) se não tiver. */
  footer: {
    text: 'Estúdio Norte. Projeto de interiores sob medida.',
    links: [],
  },
};
