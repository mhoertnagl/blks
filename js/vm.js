const vm = {
  env: {},
  cmds: {},
  plugins: [],
  
  init(canvas) {
    this.initCanvas(canvas);
    this.initPlugins();
  },

  initCanvas(canvas) {
    canvas.height = canvas.offsetHeight;
    canvas.width = canvas.offsetWidth;
    this.env.width = canvas.width;
    this.env.height = canvas.height;
    this.env.ctx = canvas.getContext("2d");
  },

  initPlugins() {
    for (const plugin of this.plugins) {
      plugin.init(this.env);
    }
  },

  install(plugin) {
    this.cmds = Object.assign(this.cmds, plugin.cmds);
    this.plugins.push(plugin);
  },
    
  runSeq(blocks) {
    for (const block of blocks) {
      if (block.hasAttribute('data-cmd')) {
        this.run(block);
      }     
    }
  },

  run(block) {
    const cmd = block.getAttribute('data-cmd');
    const params = this.cmds[cmd].params || [];
    const args = [];
    for (const param of params) {
      const elem = block.querySelector(`[data-param-id="${param.id}"]`)
      switch (param.type) {
        case 'input':
          args.push(param.conv(elem.value));
          break;
        case 'color':
          args.push(elem.value);
          break;
        case 'slot':
          args.push(childBlocks(elem))
          break;
      }
    }
    this.cmds[cmd].run(this, ...args);
  }
};