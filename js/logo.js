const logo = {

  init(env) {
    env.x = env.width / 2;
    env.y = env.height / 2;
    env.direction = 90;
    env.drawing = false;
    env.ctx.strokeStyle = '#ffffff';
    env.ctx.moveTo(env.x, env.y);
  },
  
  cmds: {
    repeat: {
      color: '#0ebeff',
      params: [
        {
          id: 'reps',
          type: 'input',
          conv: parseInt,
          label: 'repeat',
          val: 10,
          suffix: 'times',
        }, {
          id: 'body',
          type: 'slot',
        }
      ],
      run(vm, times, blocks) {
        for (let i = 0; i < times; i++) { 
          vm.runSeq(blocks); 
        }
      },
    },

    forward: {
      color: '#e9c46a',
      params: [
        {
          id: 'distance',
          type: 'input',
          conv: parseFloat,
          label: 'forward',
          val: 10,
          suffix: 'px',
        }
      ],
      run(vm, distance) {
        const sx = vm.env.x;
        const sy = vm.env.y;
        const rad = vm.env.direction * Math.PI / 180;
        vm.env.x += distance * Math.cos(rad);
        vm.env.y -= distance * Math.sin(rad);
        if (vm.env.drawing) {
          vm.env.ctx.beginPath();
          vm.env.ctx.moveTo(sx, sy);
          vm.env.ctx.lineTo(vm.env.x, vm.env.y);
          vm.env.ctx.stroke();
        }
      }
    },

    back: {
      color: '#e9c46a',
      params: [
        {
          id: 'distance',
          type: 'input',
          conv: parseFloat,
          label: 'back',
          val: 10,
          suffix: 'px',
        }
      ],
      run(vm, distance) {
        vm.cmds.forward.run(vm, -distance);
      }
    },

    left: {
      color: '#e76f51',
      params: [
        {
          id: 'angle',
          type: 'input',
          conv: parseFloat,
          label: 'left',
          val: 90,
          suffix: '°',
        }
      ],
      run(vm, angle) {
        vm.env.direction += angle;
      }
    },

    right: {
      color: '#e76f51',
      params: [
        {
          id: 'angle',
          type: 'input',
          conv: parseFloat,
          label: 'right',
          val: 90,
          suffix: '°',
        }
      ],
      run(vm, angle) {
        vm.env.direction -= angle;
      }
    },

    penUp: {
      color: '#e63946',
      params: [
        {
          label: 'pen up',
        }
      ],
      run(vm, distance) {
        vm.env.drawing = false;
      }
    },

    penDown: {
      color: '#e63946',
      params: [
        {
          type: 'label',
          label: 'pen down',
        }
      ],
      run(vm, distance) {
        vm.env.drawing = true;
      }
    },

    color: {
      color: '#2a9d8f',
      params: [
        {
          id: 'color',
          type: 'color',
          label: 'color',
          val: '#ffffff',
        }
      ],
      run(vm, color) {
        vm.env.ctx.strokeStyle = color;
      }
    },

    width: {
      color: '#2a9d8f',
      params: [
        {
          id: 'width',
          type: 'input',
          conv: parseFloat,
          label: 'width',
          val: 1.0,
          suffix: 'px',
        }
      ],
      run(vm, width) {
        vm.env.ctx.lineWidth = width;
      }
    },

    dash: {
      color: '#2a9d8f',
      params: [
        {
          id: 'dash',
          type: 'input',
          conv: parseFloat,
          label: 'dash',
          val: 5,
          suffix: 'px',
        }, {
          id: 'space',
          type: 'input',
          conv: parseFloat,
          label: 'space',
          val: 5,
          suffix: 'px',
        }
      ],
      run(vm, dash, space) {
        vm.env.ctx.setLineDash([dash, space]);
      }
    },
  }
};