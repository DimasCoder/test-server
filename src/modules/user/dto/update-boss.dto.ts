import { IsNumber, IsNotEmpty } from "class-validator";

export class UpdateBossDto {
    @IsNumber()
    @IsNotEmpty()
    user_id: number
}