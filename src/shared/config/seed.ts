import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'
const prisma = new PrismaClient()
async function main() {
  const admin = await prisma.user.upsert({
    where: { email: 'dona.doce2021@gmail.com' },
    update: {},
    create: {
      email: 'dona.doce2021@gmail.com',
      password: await hash("doce123", 8),
      is_enabled: true,
      is_admin: true,
      Person: {
        create: {
          cep: "69088-399",
          address: "Rua Boldo",
          name: "Dona Doce",
          createdAt: new Date(),
          fone: "929999-9999",

        }
      }
    },
  })



  const categoryMenuItem = await prisma.categoryOrderItem.createMany({
    skipDuplicates: true,
    data: [
      {
        id: "491aebc2-1c69-11ee-be56-0242ac120002",
        description: "Dejejum"
      },
      {
        id: "518a6828-1c69-11ee-be56-0242ac120002",
        description: "Lanche 1"
      },
      {
        id: "57c25f34-1c69-11ee-be56-0242ac120002",
        description: "Lanche 2"
      }
    ]
  })

  const orderStatus = await prisma.orderStatus.createMany({
    skipDuplicates: true,
    data: [
      {
        id: "022ac120002-1c69-11ee-be56-0242ac120002",
        description: "Em processamento"
      },
      {
        id: "11ee6828-1c69-11ee-be56-c691200020241",
        description: "Em rota de entrega"
      },
      {
        id: "1c69c120002-575f34-1c69-be56-0242ac1201c69",
        description: "Entregue"
      }
    ]
  })


  console.log({ admin, orderStatus, categoryMenuItem })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })