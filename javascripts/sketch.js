import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.164.1/build/three.module.js';

function clamp(number, min, max) {
  return Math.max(min, Math.min(number, max));
}

const vertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform sampler2D uDataTexture;
uniform sampler2D uTexture;

varying vec2 vUv;

void main() {
  vec2 newUV = vUv;
  vec4 offset = texture2D(uDataTexture, vUv);

  gl_FragColor = texture2D(
    uTexture,
    newUV - 0.02 * offset.rg
  );
}
`;

class Sketch {
  constructor(options) {
    this.container = options.dom;
    this.img = this.container.querySelector('img');

    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;

    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });

    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(this.width, this.height);
    this.container.appendChild(this.renderer.domElement);

    this.camera = new THREE.OrthographicCamera(
      -0.5,
      0.5,
      0.5,
      -0.5,
      -1000,
      1000
    );

    this.camera.position.set(0, 0, 2);

    this.mouse = {
      x: 0,
      y: 0,
      prevX: 0,
      prevY: 0,
      vX: 0,
      vY: 0
    };

    this.settings();
    this.addObjects();
    this.resize();
    this.setupResize();
    this.mouseEvents();
    this.render();
  }

  getValue(value) {
    return parseFloat(
      this.container.getAttribute('data-' + value)
    );
  }

  settings() {
    this.settings = {
      grid: this.getValue('grid') || 45,
      mouse: this.getValue('mouse') || 0.18,
      strength: this.getValue('strength') || 0.7,
      relaxation: this.getValue('relaxation') || 0.88
    };
  }

  mouseEvents() {
    this.container.addEventListener('mousemove', (event) => {
      const rect = this.container.getBoundingClientRect();

      this.mouse.x = (event.clientX - rect.left) / rect.width;
      this.mouse.y = (event.clientY - rect.top) / rect.height;

      this.mouse.vX = this.mouse.x - this.mouse.prevX;
      this.mouse.vY = this.mouse.y - this.mouse.prevY;

      this.mouse.prevX = this.mouse.x;
      this.mouse.prevY = this.mouse.y;
    });

    this.container.addEventListener('mouseleave', () => {
      this.mouse.vX = 0;
      this.mouse.vY = 0;
    });
  }

  setupResize() {
    window.addEventListener('resize', this.resize.bind(this));
  }

  resize() {
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;

    this.renderer.setSize(this.width, this.height);

    if (this.material) {
      this.material.uniforms.resolution.value.set(
        this.width,
        this.height,
        1,
        1
      );
    }

    this.regenerateGrid();
  }

  regenerateGrid() {
    this.size = this.settings.grid;

    const width = this.size;
    const height = this.size;
    const size = width * height;

    const data = new Float32Array(size * 4);

    for (let i = 0; i < size; i++) {
      const index = i * 4;

      data[index] = 0;
      data[index + 1] = 0;
      data[index + 2] = 0;
      data[index + 3] = 1;
    }

    this.texture = new THREE.DataTexture(
      data,
      width,
      height,
      THREE.RGBAFormat,
      THREE.FloatType
    );

    this.texture.magFilter = THREE.NearestFilter;
    this.texture.minFilter = THREE.NearestFilter;
    this.texture.needsUpdate = true;

    if (this.material) {
      this.material.uniforms.uDataTexture.value = this.texture;
    }
  }

  addObjects() {
    this.regenerateGrid();

    const imageTexture = new THREE.Texture(this.img);
    imageTexture.needsUpdate = true;

    this.material = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      uniforms: {
        uTexture: {
          value: imageTexture
        },
        uDataTexture: {
          value: this.texture
        },
        resolution: {
          value: new THREE.Vector4()
        }
      },
      vertexShader,
      fragmentShader
    });

    this.geometry = new THREE.PlaneGeometry(1, 1, 1, 1);
    this.plane = new THREE.Mesh(this.geometry, this.material);

    this.scene.add(this.plane);
  }

  updateDataTexture() {
    const data = this.texture.image.data;

    const gridMouseX = this.size * this.mouse.x;
    const gridMouseY = this.size * (1 - this.mouse.y);

    const maxDist = this.size * this.settings.mouse;
    const maxDistSq = maxDist * maxDist;

    const aspect = this.height / this.width;

    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        const distance =
          ((gridMouseX - i) ** 2) / aspect +
          (gridMouseY - j) ** 2;

        if (distance < maxDistSq) {
          const index = 4 * (i + this.size * j);

          let power = maxDist / Math.sqrt(distance);
          power = clamp(power, 0, 10);

          data[index] +=
            this.settings.strength * 100 * this.mouse.vX * power;

          data[index + 1] -=
            this.settings.strength * 100 * this.mouse.vY * power;
        }
      }
    }

    for (let i = 0; i < data.length; i += 4) {
      data[i] *= this.settings.relaxation;
      data[i + 1] *= this.settings.relaxation;
    }

    this.mouse.vX *= 0.9;
    this.mouse.vY *= 0.9;

    this.texture.needsUpdate = true;
  }

  render() {
    this.updateDataTexture();
    this.renderer.render(this.scene, this.camera);

    requestAnimationFrame(this.render.bind(this));
  }
}

export { Sketch };