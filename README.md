# Furniro

Desafio Full Stack que recria a **Furniro**, uma loja de móveis e decoração. O projeto foi desenvolvido como parte do programa de bolsa da **Compass UOL**.

## Sumário

- [Preview](#preview)
- [Frontend](#frontend)
  - [Tecnologias](#tecnologias-frontend)
  - [Estrutura](#estrutura-frontend)
  - [Páginas](#páginas)
  - [Funcionalidades](#funcionalidades)
  - [Como funciona o Mosaico Animado](#como-funciona-o-mosaico-animado)
  - [Como funciona o Carrinho](#como-funciona-o-carrinho)
  - [Como funciona o SideCart](#como-funciona-o-sidecart)
- [Autenticação JWT](#autenticação-jwt)
- [Backend](#backend)
  - [Tecnologias](#tecnologias-backend)
  - [Estrutura](#estrutura-backend)
  - [Rotas](#rotas)
  - [Middlewares](#middlewares)
  - [Seed do banco](#seed-do-banco)
  - [Entidade ProductCart](#entidade-productcart)
- [Docker](#docker)
- [Como rodar](#como-rodar)
- [Links](#links)

---

## Preview

A aplicação é composta por oito páginas principais:

- **Home** — landing page com Hero, Categories, Our Products, Inspiration, Mosaic e Footer
- **Shop** — listagem completa de produtos com filtros, paginação e categorias
- **Product** — página dinâmica de produto individual via slug
- **Cart** — carrinho de compras persistido no localStorage e sincronizado com o banco
- **Login** — autenticação de usuário com JWT
- **Register** — cadastro de novo usuário
- **Checkout** — formulário de finalização de compra (protegido por autenticação)
- **Contact** — formulário de contato (protegido por autenticação)

---

## Frontend

### Tecnologias Frontend

| Tecnologia | Versão |
|---|---|
| React | 19 |
| TypeScript | 6 |
| Tailwind CSS | 4 |
| Vite | 8 |
| React Router DOM | 7 |
| Zustand | 5 |

| Libs externas | Versão | Objetivo |
|---|---|---|
| clsx | 2 | Organização do Tailwind |
| react-hot-toast | 2 | Toast de validação e feedback |
| react-icons | 5 | Ícone do menu hambúrguer no mobile |
| lucide-react | 1 | Ícones gerais da interface |

### Estrutura Frontend

```
frontend/src/
├── components/
│   ├── Header/               # Navbar fixa com menu responsivo
│   ├── Hero/                 # Banner principal
│   ├── Categories/           # Seção de categorias
│   ├── OurProducts/          # Grid de produtos com "Show More"
│   ├── Inspiration/          # Seção de inspiração com carrossel
│   ├── Mosaic/               # Galeria em mosaico animado
│   ├── Footer/               # Rodapé com newsletter
│   ├── FilterBar/            # Barra de filtros da Shop
│   ├── SingleProductCard/    # Card principal do produto individual
│   ├── SingleProductImages/  # Galeria de imagens do produto
│   ├── BannerCard/           # Banner de topo das páginas internas
│   ├── BreadCrumb/           # Navegação de breadcrumb (usado internamente pelo BannerCard)
│   └── ...                   # Demais componentes auxiliares
├── context/
│   ├── cartStore.ts          # Store Zustand do carrinho
│   └── useCart.ts            # Hook de acesso ao carrinho
├── interface/                # Tipos TypeScript compartilhados
├── pages/
│   ├── Home/page.tsx
│   ├── Shop/page.tsx
│   ├── Product/page.tsx
│   ├── Cart/page.tsx
│   ├── Login/page.tsx
│   ├── Register/page.tsx
│   ├── Checkout/page.tsx      # Protegida por JWT
│   ├── Contact/page.tsx       # Protegida por JWT
│   └── NotFoundPage/
├── services/
│   ├── api.ts                # Instância Axios configurada
│   └── product.service.ts    # Chamadas à API de produtos
└── utils/                    # Funções utilitárias
```

### Páginas

#### Shop (`/shop/:category?`)

A página de Shop consome a API do backend e exibe todos os produtos com suporte a filtros via query string. A rota aceita uma categoria opcional diretamente no path (`/shop/dining`, `/shop/living`, `/shop/bedroom`).

Quando uma categoria inválida é passada, o componente detecta isso com a função `isValidCategory`, exibe um toast de erro e redireciona para `/shop` automaticamente:

```tsx
const categoryIsValid = !category || isValidCategory(category);

useEffect(() => {
    if (!categoryIsValid) {
        toast.error("Category not found. Showing all products.");
        navigate("/shop", { replace: true });
    }
}, [categoryIsValid, navigate]);
```

Os parâmetros `page`, `limit` e `sort` são lidos da query string via `useSearchParams` e repassados diretamente para o serviço de produtos. A `FilterBar` controla esses parâmetros sem precisar de estado local — ela apenas atualiza a URL.

#### Product (`/product/:slug`)

Página dinâmica que busca o produto pelo slug diretamente na API. O slug é extraído da URL com `useParams` e enviado para o endpoint `GET /products/:slug`.

```tsx
const { slug } = useParams();

useEffect(() => {
    fetch(`${API_URL}/products/${slug}`)
        .then(res => {
            if (!res.ok) { setNotFound(true); return null; }
            return res.json();
        })
        .then(data => { if (data) setProduct(data); });
}, [slug]);

if (notFound) return <NotFound />;
if (!product) return <LoadingSpinner />;
```

Enquanto o produto carrega, exibe um spinner. Se o slug não existir no banco, renderiza o componente `NotFound` inline, sem redirecionar. A página exibe galeria de imagens, informações do produto, seleção de cor/tamanho/quantidade, aba de descrição adicional e uma seção de "Related Products" reutilizando o componente `OurProducts`.

#### Cart (`/cart`)

Página de carrinho que lê o estado global do Zustand. Exibe os itens com controle de quantidade, remoção individual e o resumo com subtotal e total. O preço final já considera o `discountPrice` caso o produto tenha desconto.

#### Login (`/login`) e Register (`/register`)

Formulários de autenticação validados com **Zod** + **React Hook Form**. Após login bem-sucedido, o token JWT retornado pelo backend é salvo no `localStorage` e o usuário é redirecionado para a página anterior ou para `/`. O Register cria a conta e já autentica o usuário automaticamente.

#### Checkout (`/checkout`)

Formulário de finalização de compra com campos de endereço e pagamento, validado com Zod. A página verifica a autenticação via `GET /user/authToken` antes de renderizar — usuários não autenticados são redirecionados para `/login`.

#### Contact (`/contact`)

Formulário de contato com campos de nome, e-mail, assunto e mensagem, validado com Zod. Também protegida por autenticação JWT com o mesmo padrão de verificação do Checkout.

### Funcionalidades

- **Responsivo** — layout adaptado para mobile, tablet e desktop
- **Menu mobile** — hamburguer menu para telas menores
- **Show More** — botão na Home que redireciona para a página Shop com todos os produtos
- **Newsletter** — validação de e-mail com feedback via toast
- **Badges** — produtos marcados com desconto (ex: `-30%`) ou `New`, renderizados dinamicamente a partir dos dados da API
- **Hover nos cards** — overlay com ações de compartilhar, comparar e favoritar
- **Filtros na Shop** — ordenação por preço, limite de itens por página e filtro por categoria
- **Carrinho persistido** — estado do carrinho salvo no localStorage via Zustand `persist`
- **SideCart** — painel lateral de carrinho sincronizado com localStorage e banco em tempo real
- **Autenticação JWT** — login/registro com token armazenado no localStorage e validado pelo backend
- **Rotas protegidas** — Checkout e Contact exigem autenticação, redirecionando para `/login` se não autenticado

### Como funciona o Mosaico Animado

A seção **Mosaic** exibe uma galeria de fotos que desliza horizontalmente de forma contínua e infinita.

**A animação** é feita com uma keyframe CSS customizada definida no `index.css` via `@theme` do Tailwind 4:

```css
--animate-slide-loop: loop 40s linear infinite;

@keyframes loop {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
```

**O truque do loop infinito** está em duplicar o conteúdo. O componente `MosaicContent` é renderizado duas vezes lado a lado dentro de um container com largura fixa (`w-728`):

```tsx
<div className="animate-slide-loop w-728 flex gap-4">
  <MoscaiContent />
  <MoscaiContent />
</div>
```

A animação desloca o container até `-50%` da sua largura, que é exatamente o ponto onde a segunda cópia começa — criando a ilusão de um scroll infinito e sem cortes.

### Como funciona o Carrinho

O carrinho é gerenciado com **Zustand** e persiste no `localStorage` automaticamente via middleware `persist`. O ID de cada item no carrinho é composto por `productId:color:size`, o que permite que o mesmo produto com cores ou tamanhos diferentes seja tratado como itens distintos:

```ts
const createItemId = (item: AddCartItem) =>
  `${item.productId}:${item.color}:${item.size}`;
```

Ao adicionar um item que já existe (mesmo produto, cor e tamanho), a quantidade é somada ao invés de criar uma entrada duplicada.

### Como funciona o SideCart

O **SideCart** é um painel lateral que abre sobre o conteúdo da página sem redirecionar o usuário. Ele exibe em tempo real os itens do carrinho e se mantém sincronizado com duas fontes de verdade simultaneamente: o **localStorage** (via Zustand `persist`) e o **banco de dados** (via API).

**Sincronização dupla:** quando o usuário está autenticado, qualquer alteração no carrinho (adicionar, remover, alterar quantidade) é refletida imediatamente no estado local do Zustand e também enviada para o backend. Ao fazer login, o carrinho salvo no banco é carregado e mesclado com o estado local, garantindo que itens adicionados sem autenticação não sejam perdidos.

**Abertura e fechamento:** o SideCart é controlado por um estado global no Zustand (`isOpen`). Qualquer componente pode abri-lo chamando `openCart()`, e ele fecha ao clicar fora do painel ou no botão de fechar.

**Exibição:** dentro do SideCart cada item mostra imagem, nome, cor, tamanho, quantidade e preço unitário. O subtotal é calculado dinamicamente. Um link direto leva para a página `/cart` com o resumo completo e o botão de checkout.

---

## Autenticação JWT

As páginas **Checkout** e **Contact** são protegidas — o usuário precisa estar autenticado para acessá-las. A autenticação é feita com **JWT (JSON Web Token)**.

**Fluxo de autenticação:**

1. O usuário se cadastra em `/register` ou faz login em `/login`.
2. O backend valida as credenciais, gera um token JWT assinado e o retorna na resposta.
3. O frontend armazena o token no `localStorage` e o inclui no header `Authorization: Bearer <token>` em todas as requisições autenticadas.
4. O backend expõe o endpoint `GET /user/authToken` que valida o token e retorna `200 OK` se for válido ou `401` se estiver expirado/inválido.

**Proteção de rotas no frontend:** as páginas protegidas verificam o token antes de renderizar o conteúdo. A verificação é assíncrona — enquanto aguarda a resposta do backend, exibe um `LoadingSpinner`. Se o token for inválido ou ausente, redireciona para `/login` via `<Navigate replace>`:

```tsx
const existsAuth = async () => {
  const token = localStorage.getItem("token");
  if (!token) return false;
  const result = await fetch(`${API_URL}/user/authToken`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return result.ok;
};

// No componente:
if (isAuthenticated === null) return <LoadingSpinner />;
if (!isAuthenticated) return <Navigate to="/login" replace />;
```

**Rotas de usuário no backend:**

| Método | Rota | Descrição | Auth |
|---|---|---|---|
| `POST` | `/user/register` | Cadastro de novo usuário | Não |
| `POST` | `/user/login` | Login e geração do JWT | Não |
| `GET` | `/user/authToken` | Validação do token | Sim |

---

## Backend

### Tecnologias Backend

| Tecnologia | Versão |
|---|---|
| Node.js / Express | 5 |
| TypeScript | 7 |
| Prisma ORM | 5 |
| MongoDB | 8 |
| Winston | 3 |

| Libs | Objetivo |
|---|---|
| @faker-js/faker | Geração de dados para o seed |
| nodemon + tsx | Hot reload em desenvolvimento |
| cors | Liberação de CORS para o frontend |

### Estrutura Backend

```
backend/src/
├── controllers/
│   └── product.controller.ts   # Recebe req/res, chama o service
├── services/
│   └── products.service.ts     # Regras de negócio e validações
├── repositories/
│   ├── product.repository.ts   # Interface do repositório
│   └── prisma.product.repository.ts  # Implementação com Prisma
├── routes/
│   └── products.routes.ts      # Definição das rotas
├── middlewares/
│   ├── error.middleware.ts         # Tratamento global de erros
│   ├── http-exception.middleware.ts # Classes de exceção HTTP
│   └── validation.middleware.ts    # Validação de slug e id
├── db/seed/
│   └── seed.ts                 # Script de seed com Faker
├── utils/logger/
│   └── logger.ts               # Logger com Winston
├── app.ts                      # Configuração do Express
└── server.ts                   # Inicialização do servidor
```

### Rotas

Todas as rotas estão sob o prefixo `/products`.

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/products` | Lista produtos com filtros e paginação |
| `GET` | `/products/:slug` | Busca produto pelo slug |
| `GET` | `/products/id/:id` | Busca produto pelo ID MongoDB _(implementada por requisito do desafio, não utilizada pelo frontend)_ |

**Query params disponíveis em `GET /products`:**

| Param | Tipo | Descrição |
|---|---|---|
| `category` | string | Filtra por categoria (case-insensitive) |
| `page` | number | Página atual (padrão: 1) |
| `limit` | number | Itens por página (padrão: 16) |
| `sort` | string | `price_asc` ou `price_desc` |

**Exemplo de resposta paginada:**

```json
{
  "products": [...],
  "total": 30,
  "page": 1,
  "limit": 16,
  "totalPages": 2
}
```

### Middlewares

**Validação de entrada** — antes de chegar no controller, o slug e o ID passam por middlewares de validação com regex:

```ts
// Slug: nome-do-produto-0
const slugRegex = /^[a-z0-9-]+-\d+$/

// ID: ObjectId do MongoDB (24 caracteres hex)
const uuidRegex = /^[a-f0-9]{24}$/i
```

Se a validação falhar, um `BadRequestException` é lançado antes mesmo de consultar o banco.

**Tratamento de erros** — o `errorMiddleware` captura qualquer erro lançado nas camadas abaixo. Se for uma instância de `HttpException`, retorna o status e a mensagem correspondente. Caso contrário, retorna 500:

```ts
export const errorMiddleware = (error: Error, _req, res, _next) => {
    if (error instanceof HttpException) {
        return res.status(error.statusCode).json(error.toJSON())
    }
    return res.status(500).json(new InternalServerErrorException().toJSON())
}
```

As exceções são classes que estendem `HttpException`: `BadRequestException` (400), `NotFoundException` (404), `ConflictException` (409) e `InternalServerErrorException` (500).

### Seed do banco

O seed usa **Faker.js** para gerar 30 produtos com dados realistas. Cada produto recebe um slug único no formato `nome-do-produto-{index}`, garantindo compatibilidade com a validação de slug do backend:

```ts
slug: `${name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}-${i}`
```

As imagens são servidas como arquivos estáticos pelo próprio Express (`/images/products/product-N.svg`) e referenciadas no banco apenas pelo path relativo. O frontend monta a URL completa concatenando com `VITE_API_URL`.

### Entidade ProductCart

Um dos desafios do carrinho foi que a entidade `Product` do banco contém muitos campos (imagens, descrição, categorias, tags, variantes, etc.) que são desnecessários para representar um item no carrinho. Salvar o produto inteiro em cada entrada do carrinho geraria redundância e acoplamento — qualquer alteração no produto quebraria os dados históricos do carrinho.

**A solução** foi criar uma entidade separada `ProductCart`, que contém apenas os campos necessários para exibir e calcular o item no carrinho:

```ts
type ProductCart = {
  productId: string;   // referência ao produto original
  name: string;
  image: string;       // apenas a imagem principal
  price: number;
  discountPrice?: number;
  color: string;
  size: string;
  quantity: number;
};
```

Essa entidade é criada no momento em que o usuário adiciona o produto ao carrinho — o frontend extrai apenas os campos relevantes do `Product` completo e envia somente esses dados para o backend. O banco armazena `ProductCart` vinculado ao usuário, sem duplicar a entidade `Product`. Isso mantém o carrinho leve, independente de alterações futuras no catálogo e compatível tanto com a persistência no `localStorage` quanto com a sincronização no banco.

---

## Docker

O projeto sobe com um único comando via `docker-compose`. São quatro serviços:

| Serviço | Imagem | Porta |
|---|---|---|
| `mongodb` | mongo:8 | 27017 |
| `mongo-init` | mongo:8 | — |
| `backend` | dockerfile.dev | 3000 |
| `frontend` | dockerfile.dev | 5173 |

O MongoDB é configurado com **Replica Set** (`rs0`), necessário para o Prisma funcionar com transações. O serviço `mongo-init` roda uma vez após o MongoDB estar saudável e inicializa o replica set:

```yaml
entrypoint: >
  mongosh --host mongodb:27017
  --eval "try { rs.initiate({_id:'rs0',members:[{_id:0,host:'mongodb:27017'}]}) }
          catch(e) { if(e.codeName !== 'AlreadyInitialized') throw e }"
```

O backend só sobe após o `mongo-init` completar (`condition: service_completed_successfully`), e o frontend só sobe após o backend estar de pé.

Os volumes mapeiam o código local para dentro dos containers (`./backend:/app`), então qualquer alteração no código reflete imediatamente sem precisar rebuildar a imagem.

---

## Como rodar

**Pré-requisitos:** Docker e Docker Compose instalados.

### Com Docker (recomendado)

```bash
# Clonar o repositório
git clone https://github.com/ErosFranklin/furniro-web2
cd Desafio

# Subir todos os serviços
docker compose up

# Rodar o seed (em outro terminal, com os containers rodando)
docker compose exec backend npx tsx src/db/seed/seed.ts
```

A aplicação estará disponível em:
- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:3000

### Sem Docker (desenvolvimento local)

**Pré-requisitos:** Node.js e uma instância MongoDB com Replica Set acessível.

**Backend:**

```bash
cd backend

# Copiar e configurar as variáveis de ambiente
cp .env.example .env
# Editar .env com a sua DATABASE_URL

# Instalar dependências
npm install

# Gerar o Prisma Client
npx prisma generate

# Rodar o seed
npx tsx src/db/seed/seed.ts

# Rodar em desenvolvimento
npm run dev
```

**Frontend:**

```bash
cd frontend

# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev
```

> O frontend espera o backend em `http://localhost:3000` por padrão. Para alterar, defina a variável `VITE_API_URL` no ambiente.

---

## Links

- [Facebook Compass UOL](https://www.facebook.com/compass.uol/?locale=pt_BR)
- [Instagram Compass UOL](https://www.instagram.com/compass.uol/)
- [Twitter Compass UOL](https://x.com/compassuol)
- [LinkedIn Compass UOL](https://www.linkedin.com/company/compass-uol/posts/?feedView=all)

## Autores

- Eros Franklin - https://github.com/ErosFranklin
- Filipe Wanderley - https://github.com/filipe-wanderley
- João Victor - https://github.com/VictorM-Dev
- Lucas Trindade - https://github.com/lucastrdd
- Vitória Medeiros - https://github.com/Vivimdrs
