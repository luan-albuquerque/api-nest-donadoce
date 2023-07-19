import { PartialType } from '@nestjs/swagger';
import { CreateCategoryMenuItemDto } from './create-category_menu_item.dto';

export class UpdateCategoryMenuItemDto extends PartialType(CreateCategoryMenuItemDto) {}
