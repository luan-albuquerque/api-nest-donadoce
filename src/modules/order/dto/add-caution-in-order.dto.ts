import { ApiProperty } from "@nestjs/swagger";

export class AddCautionInOrder {
    @ApiProperty({ type: 'string', format: 'binary', required: false })
    file_caution?: string

}

