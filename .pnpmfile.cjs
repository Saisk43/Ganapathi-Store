module.exports = {
  hooks: {
    readPackage(pkg, context) {
      if (pkg.name === '@swc/core' || pkg.name === 'esbuild') {
        delete pkg.scripts;
      }
      return pkg;
    },
  },
};
