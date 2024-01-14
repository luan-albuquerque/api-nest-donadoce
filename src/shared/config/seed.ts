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
        description: "Dejejum",
        time: '2023-09-04T15:00:00.000Z',
        order_type: "programmed",
      },
      {
        id: "518a6828-1c69-11ee-be56-0242ac120002",
        description: "Lanche 1",
        time: '2023-09-04T07:00:00.000Z',
        order_type: "programmed",
        
      },
      {
        id: "57c25f34-1c69-11ee-be56-0242ac120002",
        description: "Lanche 2",
        time: '2023-09-04T10:00:00.000Z',
        order_type: "programmed",
      },
      ,
      {
        id: "coffe-be56-11ee-sdsd-024dca12034542",
        description: "Coffe",
        time: '2023-09-04T00:00:00.000Z',
        order_type: "coffe",
      }
    ]
  })

  const orderStatus = await prisma.orderStatus.createMany({
    skipDuplicates: true,
    data: [
      {
        id: "022ac120002-1c69-11ee-be56-0242ac120002",
        description: "Solicitado"
      },
      {
        id: "11ee6828-1c69-11ee-be56-c691200020241",
        description: "Agendado"
      },
      {
        id: "314e2828-1c69-11ee-be56-c691200020241",
        description: "Pré-Produção"
      },
      {
        id: "45690813-1c69-11ee-be56-c691200020241",
        description: "Em Processamento"
      },
      {
        id: "789850813-1c69-11ee-be56-c691200020241",
        description: "Em Entrega"
      },
      {
        id: "1c69c120002-575f34-1c69-be56-0242ac1201c69",
        description: "Entregue"
      },
      {
        id: "016b9c84-4e7f-81ee-be56-0242ac1200022fe2af",
        description: "Revisão Admin"
      },
      {
        id: "22afa4e4-4e7f-14ee-be56-0222afa2d22afb092",
        description: "Revisão Cliente"
      },
      {
        id: "55b4c3a6-4e7f-31ee-be56-0242ac12000224fe4",
        description: "Cancelado"
      },
      {
        id: "fer762d-erjr345d4s5f-dfkj3kd-39dsu49dshn3",
        description: "Finalizado"
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