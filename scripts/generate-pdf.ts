import { spawn, ChildProcess, execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import puppeteer from 'puppeteer';

const PORT        = 4321;
const ROUTE       = '/propuesta/punta-cana';
const URL         = `http://localhost:${PORT}${ROUTE}`;
const OUTPUT_PATH = 'public/Propuesta-PuntaCana-AntonioVila.pdf';

function waitForServer(server: ChildProcess, needle: string, timeoutMs = 30_000): Promise<void> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`Timed out waiting for "${needle}"`)), timeoutMs);

    const onData = (data: Buffer) => {
      if (data.toString().includes(needle)) {
        clearTimeout(timer);
        resolve();
      }
    };

    server.stdout?.on('data', onData);
    server.stderr?.on('data', onData);
    server.on('error', (err) => {
      clearTimeout(timer);
      reject(err);
    });
  });
}

async function main() {
  // 1. Build the site if needed (provides dist/ for vite preview).
  if (!existsSync('dist/index.html')) {
    console.log('→ Building site (dist/ not found)...');
    execSync('npx vite build', { stdio: 'inherit' });
  } else {
    console.log('→ dist/ exists, skipping build. Run `npm run build` to rebuild.');
  }

  // 2. Start vite preview.
  console.log(`→ Starting preview server on port ${PORT}...`);
  const server = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], {
    stdio: 'pipe',
  });
  try {
    await waitForServer(server, `localhost:${PORT}`);
  } catch (err) {
    server.kill();
    throw err;
  }

  // 3. Puppeteer → PDF.
  console.log('→ Launching Puppeteer...');
  const browser = await puppeteer.launch({ headless: true });

  try {
    const page = await browser.newPage();

    // Desktop viewport so Tailwind's md: / lg: breakpoints kick in.
    await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 2 });

    // Emulate print media so @media print rules apply (hides the download button, etc).
    await page.emulateMediaType('print');

    console.log(`→ Navigating to ${URL}...`);
    await page.goto(URL, { waitUntil: 'networkidle0', timeout: 30_000 });

    // Give fonts a beat to settle (Google Fonts may race with navigation).
    await page.evaluateHandle('document.fonts.ready');

    // Measure the full scroll height so the PDF is a single continuous page.
    const { width, height } = await page.evaluate(() => ({
      width:  document.documentElement.scrollWidth,
      height: document.documentElement.scrollHeight,
    }));

    console.log(`→ Writing PDF (${width}×${height}px, single page) → ${OUTPUT_PATH}...`);
    await page.pdf({
      path:            OUTPUT_PATH,
      width:           `${width}px`,
      height:          `${height}px`,
      printBackground: true,
      margin:          { top: '0', right: '0', bottom: '0', left: '0' },
    });

    console.log('✓ PDF generated.');
  } finally {
    await browser.close();
    server.kill();
  }
}

main().catch((err) => {
  console.error('PDF generation failed:', err);
  process.exit(1);
});
