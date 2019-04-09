exports.config = {
  files: {
    stylesheets: {
      joinTo: 'css/app.css',
      order: {
        before: [
          'app/styles/fonts.styl',
          'app/styles/reset.css',
        ],
      },
    },
    javascripts: {
      joinTo: 'js/app.js',
    },
  },
  npm: {
    enabled: true,
    styles: {
      'react-draft-wysiwyg': ['dist/react-draft-wysiwyg.css']
    }
  },
  plugins: {
    postcss: {
      processors: [require('autoprefixer')],
    },
  },
  paths: {
    public: 'public',
  },
};
