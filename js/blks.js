// TODO: math expressions in input fields
// TODO: looping variables.
// TODO: https://developer.mozilla.org/de/docs/Web/API/CanvasRenderingContext2D/arc
// TODO: https://silentmatt.com/javascript-expression-evaluator/
// TODO: https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Function
// TODO: variables
// TODO: if expressions

const menu = document.getElementById('menu-contents');
const code = document.getElementById('code-contents');
const canvas = document.getElementById("canvas");

function setup(plugin) {
  addBlocks(menu, plugin.cmds);
  vm.install(plugin);
}

function run() {
  vm.init(canvas);
  vm.runSeq(code.children);
}

function purge() {
  code.innerHTML = '';
  code.appendChild(createDivider());
}

function purgeOnConfirm() {
  if (confirm('Clear script?')) {
    purge();
  }
}

purge();
setup(logo);