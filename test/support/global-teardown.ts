export default async function globalTeardown(): Promise<void> {
	if (global.container) await global.container.stop();
}
