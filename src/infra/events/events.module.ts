import { Module } from "@nestjs/common";
import { OnUserCreated } from "@/domain/audit/application/subscribers/on-user-created";
import { DatabaseModule } from "../database/database.module";

@Module({
	imports: [DatabaseModule],
	providers: [OnUserCreated],
})
export class EventsModule {}
