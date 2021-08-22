module.exports = {
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@/api': './src/api',
          '@/config': './src/config',
          '@/interfaces': './src/interfaces',
          '@/loaders': './src/loaders',
          '@/models': './src/models',
          '@/services': './src/services',
          '@/types': './src/types',
          '@/': './src',
        },
      },
    ],
  ],
};
