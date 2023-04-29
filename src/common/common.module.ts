import { Global, Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Global()
@Module({
    providers:[JwtService],
    exports:[JwtService]
})
export class CommonModule {}
