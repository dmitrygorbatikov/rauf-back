import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as bodyParser from 'body-parser'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	const PORT = process.env.PORT || 5000

	const config = new DocumentBuilder()
		.setTitle(
			'Swagger documentation for program system for safe delivery of goods',
		)
		.setDescription('description ?')
		.setVersion('1.0')
		.addTag('goods')
		.build()
	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('api', app, document)

	app.use(bodyParser.json({ limit: '50mb' }))
	app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
	app.enableCors()

	await app.listen(PORT, () => {
		console.log(`App has been started on PORT ${PORT}`)
	})
}

bootstrap()


