import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'
import 'dotenv/config'

const prisma = new PrismaClient()

const allImages = [
  "/images/products/product-1.svg",
  "/images/products/product-2.svg",
  "/images/products/product-3.svg",
  "/images/products/product-4.svg",
  "/images/products/product-5.svg",
  "/images/products/product-6.svg",
  "/images/products/product-7.svg",
  "/images/products/product-8.svg",
  "/images/products/product-9.svg",
  "/images/products/product-10.svg",
  "/images/products/product-11.svg",
  "/images/products/product-12.svg",
]

const categories = ['dining', 'living', 'bedroom'] as const

const colors = ['#000000', '#FFFFFF', '#8B4513', '#808080', '#F5F5DC', '#C0C0C0']
const sizes = ['XS','S','M','L','XL']

function truncate(text: string, limit: number) {
  return text.length > limit ? text.substring(0, limit) : text
}

async function main() {
  await prisma.product.deleteMany()

  const products = Array.from({ length: 30 }).map((_, i) => {
    const name = faker.commerce.productName().split(' ').slice(0, 2).join(' ')
    const category = categories[i % 3] as string

    return {
      name,
      slug: `${name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}-${i}`,
      isNew: faker.datatype.boolean(),
      description: faker.lorem.paragraphs(3),
      shortDescription: truncate(faker.commerce.productDescription(), 100),
      price: parseFloat(faker.commerce.price({ min: 500, max: 5000 })),
      discountPrice: faker.datatype.boolean()
        ? faker.number.int({ min: 5, max: 50 })
        : null,
      category,
      rating: parseFloat((Math.random() * 2 + 3).toFixed(1)),
      reviewCount: faker.number.int({ min: 0, max: 200 }),
      stock: faker.number.int({ min: 1, max: 50 }),
      colors: faker.helpers.arrayElements(colors, { min: 1, max: 3 }),
      sizes: faker.helpers.arrayElements(sizes, { min: 1, max: 3 }),
      images: faker.helpers.arrayElements(allImages, { min: 2, max: 5 }),
      sku: `PRD-${String(i + 1).padStart(3, '0')}`,
      additionalInfo: faker.lorem.paragraphs(2),
    }
  })

  await prisma.product.createMany({ data: products })
  console.log('Produtos inseridos com sucess')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })