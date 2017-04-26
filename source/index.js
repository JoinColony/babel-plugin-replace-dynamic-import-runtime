import babelTemplate from 'babel-template';
import dynamicImportSyntax from 'babel-plugin-syntax-dynamic-import';
import * as types from 'babel-types';

const IMPORT = 'Import';
const AWAIT = 'AwaitExpression';
const CALL = 'CallExpression';

const generateSourceNode = node => {
  const astNode = node[0];
  let path = types.templateLiteral(
    [
      types.templateElement({ raw: '' }),
      types.templateElement({ raw: '' }, true)
    ],
    node,
  );
  if (types.isStringLiteral(astNode) || types.isTemplateLiteral(astNode)) {
    path = node;
  }
  return path;
};



const buildImport = babelTemplate(`
  require(sourcePath)
`);

export default () => ({
  inherits: dynamicImportSyntax,
  visitor: {
    Program: {
      enter(path) {
        path.traverse({
          [AWAIT]: path => {
            if (path.node.argument.type === CALL && path.node.argument.callee.type === IMPORT) {
              const sourcePath = generateSourceNode(path.node.argument.arguments);
              path.replaceWith(buildImport({ sourcePath }));
            }
          },
          [CALL]: path => {
            if (path.node.callee.type === IMPORT) {
              const sourcePath = generateSourceNode(path.node.arguments);
              path.replaceWith(buildImport({ sourcePath }));
            }
          },
        });
      },
    },
  },
});
