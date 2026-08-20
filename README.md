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
- [Backend](#backend)
  - [Tecnologias](#tecnologias-backend)
  - [Estrutura](#estrutura-backend)
  - [Rotas](#rotas)
  - [Middlewares](#middlewares)
  - [Seed do banco](#seed-do-banco)
- [Docker](#docker)
- [Como rodar](#como-rodar)
- [Links](#links)

---

## Preview

A aplicação é composta por quatro páginas principais:

- **Home** — landing page com Hero, Categories, Our Products, Inspiration, Mosaic e Footer
- **Shop** — listagem completa de produtos com filtros, paginação e categorias
- **Product** — página dinâmica de produto individual via slug
- **Cart** — carrinho de compras persistido no localStorage

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

### Funcionalidades

- **Responsivo** — layout adaptado para mobile, tablet e desktop
- **Menu mobile** — hamburguer menu para telas menores
- **Show More** — botão na Home que redireciona para a página Shop com todos os produtos
- **Newsletter** — validação de e-mail com feedback via toast
- **Badges** — produtos marcados com desconto (ex: `-30%`) ou `New`, renderizados dinamicamente a partir dos dados da API
- **Hover nos cards** — overlay com ações de compartilhar, comparar e favoritar
- **Filtros na Shop** — ordenação por preço, limite de itens por página e filtro por categoria
- **Carrinho persistido** — estado do carrinho salvo no localStorage via Zustand `persist`

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
