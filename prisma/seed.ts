import { PrismaClient, UserRole, PaymentType, OrderStatus, PaymentStatus } from "../generate/prisma"
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

async function main() {
    console.log('Cleaning database...')
    await prisma.payment.deleteMany()
    await prisma.orderItem.deleteMany()
    await prisma.order.deleteMany()
    await prisma.cartItem.deleteMany()
    await prisma.cart.deleteMany()
    await prisma.productImage.deleteMany()
    await prisma.product.deleteMany()
    await prisma.category.deleteMany()
    await prisma.paymentMethod.deleteMany()
    await prisma.address.deleteMany()
    await prisma.user.deleteMany()

    console.log('Creating users...')
    const users = await Promise.all(
        Array.from({ length: 3 }).map((_, i) =>
            prisma.user.create({
                data: {
                    email: `user${i + 1}@shop.com`,
                    password: 'hashed-password',
                    name: faker.person.fullName(),
                    phone: faker.phone.number(),
                    role: i === 0 ? UserRole.ADMIN : UserRole.CUSTOMER,
                },
            })
        )
    )

    console.log('Creating addresses...')
    const addresses = await Promise.all(
        users.map((user) =>
            prisma.address.create({
                data: {
                    userId: user.id,
                    street: faker.location.streetAddress(),
                    city: faker.location.city(),
                    country: faker.location.country(),
                    postalCode: faker.location.zipCode(),
                    isDefault: true,
                },
            })
        )
    )

    console.log('Creating payment methods...')
    const paymentMethods = await Promise.all(
        users.map((user) =>
            prisma.paymentMethod.create({
                data: {
                    userId: user.id,
                    type: PaymentType.CARD,
                    provider: 'VISA',
                    accountNo: faker.finance.accountNumber(12),
                    isDefault: true,
                },
            })
        )
    )

    console.log('Creating categories...')
    const electronics = await prisma.category.create({
        data: { name: 'Electronics', slug: 'electronics' },
    })
    const fashion = await prisma.category.create({
        data: { name: 'Fashion', slug: 'fashion' },
    })
    const books = await prisma.category.create({
        data: { name: 'Books', slug: 'books' },
    })

    console.log('Creating products...')
    const products = await Promise.all([
        prisma.product.create({
            data: {
                name: 'Smartphone Pro X',
                slug: 'smartphone-pro-x',
                description: faker.commerce.productDescription(),
                price: 899.99,
                stock: 50,
                categoryId: electronics.id,
                images: {
                    create: [
                        { url: faker.image.urlLoremFlickr({ category: 'tech' }), isPrimary: true },
                        { url: faker.image.urlLoremFlickr({ category: 'tech' }) },
                    ],
                },
            },
        }),
        prisma.product.create({
            data: {
                name: 'Classic Denim Jacket',
                slug: 'classic-denim-jacket',
                description: faker.commerce.productDescription(),
                price: 59.99,
                stock: 100,
                categoryId: fashion.id,
                images: {
                    create: [{ url: faker.image.urlLoremFlickr({ category: 'fashion' }), isPrimary: true }],
                },
            },
        }),
        prisma.product.create({
            data: {
                name: 'Learn TypeScript Book',
                slug: 'learn-typescript-book',
                description: faker.commerce.productDescription(),
                price: 29.99,
                stock: 200,
                categoryId: books.id,
                images: {
                    create: [{ url: faker.image.urlLoremFlickr({ category: 'books' }), isPrimary: true }],
                },
            },
        }),
    ])

    console.log('Creating carts...')
    const carts = await Promise.all(
        users.map((user, i) =>
            prisma.cart.create({
                data: {
                    userId: user.id,
                    items: {
                        create: [
                            {
                                productId: products[i % products.length].id,
                                quantity: faker.number.int({ min: 1, max: 3 }),
                            },
                        ],
                    },
                },
            })
        )
    )

    console.log('Creating payments...')
    const payments = await Promise.all(
        users.map((user, i) =>
            prisma.payment.create({
                data: {
                    methodId: paymentMethods[i].id,
                    amount: faker.finance.amount({ min: 50, max: 1000 }),
                    status: PaymentStatus.COMPLETED,
                    transactionId: faker.string.uuid(),
                },
            })
        )
    )

    console.log('Creating orders...')
    for (let i = 0; i < users.length; i++) {
        const user = users[i]
        const payment = payments[i]
        const address = addresses[i]
        const product = products[i % products.length]

        await prisma.order.create({
            data: {
                userId: user.id,
                addressId: address.id,
                totalAmount: product.price,
                status: OrderStatus.PAID,
                paymentId: payment.id,
                items: {
                    create: [
                        {
                            productId: product.id,
                            quantity: 1,
                            unitPrice: product.price,
                            totalPrice: product.price,
                        },
                    ],
                },
            },
        })
    }

    console.log('Seed completed successfully!')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
