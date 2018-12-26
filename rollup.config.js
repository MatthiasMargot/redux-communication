import babel       from 'rollup-plugin-babel'
import nodeResolve from 'rollup-plugin-node-resolve'

export default [
  {
    input:   'index.js',
    output:  {
      file:   'build/redux-communication.js',
      format: 'cjs',
      indent: false,
    },
    plugins: [
      babel(),
      nodeResolve({ jsnext: true }),
    ],
  },
]
