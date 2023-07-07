import { BadRequestException, HttpException, HttpStatus, NotFoundException } from "@nestjs/common"
import { CategoryMenuItem } from "src/modules/category_menu_items/entities/category_menu_item.entity"
import { MenuItem } from "src/modules/menu_items/entities/menu_item.entity"

export function ItemsMenuCategoryUtils() {

     async function verifyCategory(category: CategoryMenuItem[], menuItem: MenuItem[]): Promise<void> {

          const possui = []
          const categoriaInexistente = []

          if (menuItem.length > category.length || menuItem.length < category.length) {


               throw new HttpException(
                    `Numero de itens inseridos menor com o de categoria criados`,
                    HttpStatus.BAD_REQUEST,
               );
          }

          await Promise.all(
               category.map((c) => {
                    const m2 = menuItem.filter(item => item.fk_category === c.id)

                    if (m2.length >= 2) {
                         throw new HttpException(
                              `Itens do tipo ${c.description} repetido`,
                              HttpStatus.BAD_REQUEST,
                         );

                    } else
                    if (m2.length == 1) {
                         possui.push(m2)

                    } else if (m2.length <= 0) {
                         categoriaInexistente.push(c);
                         throw new HttpException(
                              `É nescessario adicionar a categoria ${c.description}`,
                              HttpStatus.BAD_REQUEST,
                         );
                    }

               })
          )
     }
     return {
          verifyCategory,
     }


}


