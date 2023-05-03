const esbuild = require('esbuild');
const fs = require('fs-extra');

esbuild
  .build({
    entryPoints: ['./src/background.ts', './src/pr-content-script.ts'],
    bundle: true,
    minify: true,
    sourcemap: process.env.NODE_ENV !== 'production',
    target: ['chrome58', 'firefox57'],
    outdir: './dist',
    define: {
      'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`,
    },
  })
  .then(() => {
    fs.copySync('./public', './dist');

    console.log('🎉 Build complete!');
  })
  .catch(() => process.exit(1));
