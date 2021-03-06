const path = require(`path`); // Методе node.js позволяющий работать с путями

//* Подключение плагинов
const HTMLWebpackPlugin = require(`html-webpack-plugin`);
const { CleanWebpackPlugin } = require(`clean-webpack-plugin`);
const MiniCssExtractPlugin = require(`mini-css-extract-plugin`);
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require(`terser-webpack-plugin`);

//* Режимы сборки
const isDev = process.env.NODE_ENV === `development`; // Опеределяем находимся ли мы в режиме разработки
const isBuild = !isDev;
const publicPath = isBuild ? './' : '/'

//* Для поля optimization
const optimization = () => {
  const config = {
    splitChunks: { // Выносит общий код в отдельный файл vendors. Это нужно для оптимизации при подключении библиотек
      chunks: `all`
    },
  };

  if (isBuild) {
    config.minimizer = [
      new CssMinimizerPlugin(), // Минизация css
      new TerserPlugin() // Минимазция js
    ];
  }

  return config;
};

//* Обработчики сss для поля use в module
const cssLoaders = (extra) => {
  const loaders = [MiniCssExtractPlugin.loader, `css-loader`];

  if (extra) {
    loaders.push(extra);
  }

  return loaders;
};

//* Пресеты babel
const babelOption = (extra) => {
  const options = {
    presets: [`@babel/preset-env`]
  };

  if (extra) {
    options.presets.push(extra);
  }
  return options;
};


const jsLoaders = () => {
  const loaders = [{
    loader: `babel-loader`,
    options: babelOption()
  }];

  return loaders;
};

//* Объект с настройками webpack
module.exports = {

  //* Указывает на папку в которое лежат все исходники. В этом случае можно сократить пути
  context: path.resolve(__dirname, `src`),

  /*
    * Точка входа. Можно указать несколько точек входа, для получения нескольких бандлов.
    * Чтобы не возникало проблем с именованием файлов нужно указывать в output.filename динамические имена
    * [name].[contenthash].js
  */
  entry: {
    main: [`@babel/polyfill`, `./index.jsx`],
  },

  
  //* Как и куда складывать
  output: {
    filename: `js/[name].[contenthash].js`, // Название итогового файла js
    path: path.resolve(__dirname, `public`),
    publicPath: publicPath
  },

  //* Сокращения путей и расширений
  resolve: {
    extensions: [`.js`, `.jsx`, `.json`, `.png`, `.jpg`, `.svg`], // Какие расширения нужно понимать по умолчанию, чтобы их можно было не указывать при импорте
    alias: { // Сокращения для путей
      '@components': path.resolve(__dirname, `./src/components`),
      '@pages': path.resolve(__dirname, `./src/pages`),
      '@styles': path.resolve(__dirname, `./src/styles`),
      '@': path.resolve(__dirname, `./src`)
    }
  },

  //* Оптимизация всякого
  optimization: optimization(),

  //* Настройка dev сервера
  devServer: {
    port: 4200,
    historyApiFallback: true
  },

  //*  Нужны для конфигурирования выходных данных
  // devtool: isDev ? `source-map` : ``, // Позволяет корректно просмтаривать исходный код в интрументах разработчика

  //* Список всех плагинов. Плагины позволяют расширить функционал webpack
  plugins: [

    // ? Позволяет автоматически подключать скрипты в html
    new HTMLWebpackPlugin({
      template: `./index.html`, // Указывает на исходный файл
      minify: {
        collapseWhitespace: isBuild // Минифицирует html
      }
    }),

    // ? Очищает папку public
    new CleanWebpackPlugin(),


    new MiniCssExtractPlugin({
      filename: `css/[name].[contenthash].css`
    }),

  ],

  //* Добавляет в webpack  функционал, которые позволяет работать с различными типами файлов
  module: {

    rules: [ // Правила для обработки

      // ? Обработка css
      {
        test: /\.css$/, // Расширения файлов
        use: cssLoaders() // Способ обработки. Лоадеры применяются справо налево
      },

      // ? Обработка Препроцессора less
      {
        test: /\.less$/,
        use: cssLoaders(`less-loader`)
      },

      // ? Обработка изображений
      {
        test: /\.(png|jpg|svg|gif|jpeg)$/,
        use: {
          loader: `file-loader`,
          options: {
            outputPath: './assets/img'
          }
        }
      },

      // ? Обработка js с помощью babel
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: jsLoaders()
      },

      // ? Обработка jsx с помощью babel
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: `babel-loader`,
          options: babelOption(`@babel/preset-react`)
        }
      }
    ]
  }
};
