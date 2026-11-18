/**    || upd || v1.0.3 || FourSoda8545 || Pendientes docs, act, fix web ||    **/

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const CATALOG_DB = {
  'dell-e5570': {
    modelName: 'DELL LATITUDE E5570 (15.6" Skylake)',
    chassisScale: { x: 1, y: 1, z: 1 }
  },
  'dell-e5470': {
    modelName: 'DELL LATITUDE E5470 (14.0" Compact)',
    chassisScale: { x: 0.88, y: 1, z: 0.92 }
  }
};

/**
 * BASE DE DATOS TÉCNICA - CORRECCIÓN DE VECTORES DE EXPLOSIÓN (EVITA TRASLAPES)
 * Cada capa tiene una altura Y independiente y vectores de separación ortogonales limpios.
 */
const HARDWARE_DB = [
  {
    id: 'bottom_case',
    fru: 'DP/N: 07PKT1',
    name: 'Tapa Inferior del Chasis (Bottom Case)',
    subtitle: 'Cubierta inferior con 8 tornillos cautivos M2.5x5',
    screws: '8x Tornillos cautivos Phillips M2.5x5',
    stage: 'ETAPA 01',
    basePos: { x: 0, y: -0.8, z: 0 },
    explodeVec: { x: 0, y: -4.8, z: -0.5 }, // Se desplaza limpiamente hacia abajo
    camOffset: { x: 0, y: 8, z: 11 },
    screwLiftHeight: 1.4,
    screwCoords: [
      { x: -5.3, y: 0.14, z: -3.5, label: 'M2.5x5 [Sup-Izq]' },
      { x: 0.0,  y: 0.14, z: -3.5, label: 'M2.5x5 [Sup-Centro]' },
      { x: 5.3,  y: 0.14, z: -3.5, label: 'M2.5x5 [Sup-Der]' },
      { x: -5.3, y: 0.14, z: 0.0,  label: 'M2.5x5 [Medio-Izq]' },
      { x: 5.3,  y: 0.14, z: 0.0,  label: 'M2.5x5 [Medio-Der]' },
      { x: -5.3, y: 0.14, z: 3.5,  label: 'M2.5x5 [Inf-Izq]' },
      { x: 0.0,  y: 0.14, z: 3.5,  label: 'M2.5x5 [Inf-Centro]' },
      { x: 5.3,  y: 0.14, z: 3.5,  label: 'M2.5x5 [Inf-Der]' }
    ],
    warning: 'Afloje los 8 tornillos cautivos en patrón diagonal antes de retirar la tapa inferior.',
    steps: [
      'Apague el equipo y desconecte el cargador.',
      'Afloje los 8 tornillos cautivos de la base inferior.',
      'Use una púa plástica para liberar los clips de presión traseros.',
      'Separe la tapa inferior hacia abajo.'
    ]
  },
  {
    id: 'battery',
    fru: 'DP/N: 06MT4T (62Wh)',
    name: 'Batería de Iones de Litio (4 Celdas)',
    subtitle: 'Polímero de Litio 7.6V / 62Wh',
    screws: '3x Tornillos Phillips M2.0x3',
    stage: 'ETAPA 02',
    basePos: { x: -1.6, y: 0.15, z: 2.2 },
    explodeVec: { x: -1.2, y: 2.2, z: 3.2 },
    camOffset: { x: -3.5, y: 6, z: 8 },
    screwLiftHeight: 1.1,
    screwCoords: [
      { x: -3.1, y: 0.24, z: -0.95, label: 'M2x3 [Batería Izq]' },
      { x: 0.0,  y: 0.24, z: -0.95, label: 'M2x3 [Batería Centro]' },
      { x: 3.1,  y: 0.24, z: 0.95,  label: 'M2x3 [Batería Der]' }
    ],
    warning: 'CRÍTICO: Desconecte el cable de la batería BATT1 antes de manipular componentes internos.',
    steps: [
      'Desconecte el conector de alimentación BATT1 de la placa base.',
      'Retire los 3 tornillos M2x3 que sujetan el chasis de la batería.',
      'Extraiga la batería hacia arriba y hacia el frente.'
    ]
  },
  {
    id: 'storage',
    fru: 'SATA3 2.5" + M.2 2280',
    name: 'Unidades de Almacenamiento (HDD 2.5" y M.2 NVMe)',
    subtitle: 'Bahía SATA III 2.5" + Ranura M.2 PCIe NVMe',
    screws: '4x M2x3 (Caddy 2.5") + 1x M2x3 (SSD M.2)',
    stage: 'ETAPA 03',
    basePos: { x: 3.2, y: 0.15, z: 2.1 },
    explodeVec: { x: 3.0, y: 2.4, z: 2.5 },
    camOffset: { x: 5.5, y: 5, z: 7 },
    screwLiftHeight: 1.0,
    screwCoords: [
      { x: -1.2, y: 0.22, z: -0.95, label: 'M2x3 [Caddy Sup-Izq]' },
      { x: 1.75, y: 0.22, z: -0.95, label: 'M2x3 [Caddy Sup-Der]' },
      { x: -1.2, y: 0.22, z: 1.05,  label: 'M2x3 [Caddy Inf-Izq]' },
      { x: 1.75, y: 0.22, z: 1.05,  label: 'M2x3 [Caddy Inf-Der]' },
      { x: -1.95, y: 0.1, z: 1.18,  label: 'M2x3 [SSD M.2]' }
    ],
    warning: 'Evite doblar el cable interposer SATA al extraer el disco de 2.5 pulgadas.',
    steps: [
      'Retire el tornillo M2x3 del SSD M.2 y deslícelo fuera de la ranura.',
      'Retire los 4 tornillos del caddy de 2.5" y levántelo con cuidado.',
      'Desconecte el cable plano ZIF de la placa base.'
    ]
  },
  {
    id: 'ram',
    fru: '2x SODIMM (DDR4 / DDR3L)',
    name: 'Módulos de Memoria RAM (Dual-Channel SODIMM)',
    subtitle: '2x Zócalos SODIMM 260-pin',
    screws: '0 Tornillos (Pestañas de retención por muelle)',
    stage: 'ETAPA 03',
    basePos: { x: 0.4, y: 0.18, z: 0.2 },
    explodeVec: { x: 0.2, y: 2.8, z: 0.3 },
    camOffset: { x: 2, y: 4.5, z: 5 },
    screwLiftHeight: 0.9,
    screwCoords: [],
    warning: 'Mantenga los módulos por los cantos y evite tocar los pines dorados.',
    steps: [
      'Separe hacia afuera los pestillos metálicos laterales de cada slot.',
      'El módulo se elevará automáticamente a 45 grados.',
      'Deslice el módulo hacia afuera.'
    ]
  },
  {
    id: 'wifi',
    fru: 'INTEL 8260NGW (M.2 2230)',
    name: 'Tarjeta de Red Inalámbrica Wi-Fi / WLAN',
    subtitle: 'Intel Dual Band Wireless-AC 8260',
    screws: '1x Tornillo Phillips M2.0x3 (Abrazadera)',
    stage: 'ETAPA 03',
    basePos: { x: 4.1, y: 0.18, z: -1.5 },
    explodeVec: { x: 3.5, y: 2.1, z: -1.8 },
    camOffset: { x: 5.5, y: 4, z: -3 },
    screwLiftHeight: 0.95,
    screwCoords: [
      { x: 0.0, y: 0.14, z: -0.52, label: 'M2x3 [Abrazadera Wi-Fi]' }
    ],
    warning: 'Desconecte los conectores coaxiales U.FL levantándolos verticalmente.',
    steps: [
      'Retire el tornillo M2x3 que sujeta la placa de protección de antenas.',
      'Desconecte los cables coaxial blanco y negro.',
      'Extraiga la tarjeta WLAN de la ranura M.2.'
    ]
  },
  {
    id: 'cooling',
    fru: 'DP/N: 085M9F',
    name: 'Sistema de Refrigeración (Heatsink & Blower Fan)',
    subtitle: 'Disipador de cobre y ventilador centrífugo PWM',
    screws: '4x Tornillos CPU (1-4) + 2x Tornillos M2x3 Ventilador',
    stage: 'ETAPA 04',
    basePos: { x: -2.2, y: 0.22, z: -1.6 },
    explodeVec: { x: -2.5, y: 3.5, z: -2.2 },
    camOffset: { x: -5, y: 5, z: -4 },
    screwLiftHeight: 1.1,
    screwCoords: [
      { x: 0.65,  y: 0.08, z: -0.35, label: 'CPU #1 (Cautivo)' },
      { x: 2.05,  y: 0.08, z: 0.75,  label: 'CPU #2 (Cautivo)' },
      { x: 0.65,  y: 0.08, z: 0.75,  label: 'CPU #3 (Cautivo)' },
      { x: 2.05,  y: 0.08, z: -0.35, label: 'CPU #4 (Cautivo)' },
      { x: -2.55, y: 0.22, z: -0.65, label: 'M2x3 [Ventilador Sup]' },
      { x: -0.25, y: 0.22, z: 1.25,  label: 'M2x3 [Ventilador Inf]' }
    ],
    warning: 'Afloje los 4 tornillos de la CPU en orden inverso (4 → 3 → 2 → 1).',
    steps: [
      'Desconecte el cable de 4 pines del ventilador de la placa base.',
      'Retire los 2 tornillos del ventilador.',
      'Afloje los 4 tornillos con resorte del bloque de la CPU en orden inverso.'
    ]
  },
  {
    id: 'motherboard',
    fru: 'DP/N: 0N8J4R (LA-C841P)',
    name: 'Placa Base Principal (System Motherboard)',
    subtitle: 'PCB con CPU Intel Skylake BGA1356 y PCH',
    screws: '6x Tornillos Phillips M2.0x3',
    stage: 'ETAPA 05',
    basePos: { x: 0, y: 0.0, z: -0.4 },
    explodeVec: { x: 0, y: 4.8, z: 0 }, // Se eleva limpiamente en el eje Y central
    camOffset: { x: 0, y: 7.5, z: 5 },
    screwLiftHeight: 1.2,
    screwCoords: [
      { x: -4.6, y: 0.12, z: -2.1, label: 'M2x3 [PCB Sup-Izq]' },
      { x: 0.2,  y: 0.12, z: -2.1, label: 'M2x3 [PCB Sup-Centro]' },
      { x: 4.6,  y: 0.12, z: -2.1, label: 'M2x3 [PCB Sup-Der]' },
      { x: -4.6, y: 0.12, z: 1.9,  label: 'M2x3 [PCB Inf-Izq]' },
      { x: 1.8,  y: 0.12, z: 1.9,  label: 'M2x3 [PCB Inf-Centro]' },
      { x: 4.6,  y: 0.12, z: 1.9,  label: 'M2x3 [PCB Inf-Der]' }
    ],
    warning: 'Asegúrese de haber desconectado el cable de video eDP y todos los buses ZIF.',
    steps: [
      'Desconecte el cable de pantalla eDP y los conectores auxiliares.',
      'Retire los 6 tornillos M2x3 de sujeción del circuito impreso.',
      'Incline la placa base desde el lado derecho para liberarla de los puertos I/O.'
    ]
  },
  {
    id: 'palmrest',
    fru: 'DP/N: 019X5P',
    name: 'Teclado y Reposamuñecas (Palmrest & Keyboard Deck)',
    subtitle: 'Chasis estructural de aleación de magnesio',
    screws: '4x Tornillos micro M1.6x2',
    stage: 'ETAPA 06',
    basePos: { x: 0, y: -0.4, z: 0 },
    explodeVec: { x: 0, y: -2.2, z: 0.8 },
    camOffset: { x: 0, y: 5, z: 9 },
    screwLiftHeight: 1.0,
    screwCoords: [
      { x: -3.8, y: 0.18, z: -2.6, label: 'M1.6x2 [Teclado Izq]' },
      { x: -1.2, y: 0.18, z: -2.6, label: 'M1.6x2 [Teclado C-Izq]' },
      { x: 1.2,  y: 0.18, z: -2.6, label: 'M1.6x2 [Teclado C-Der]' },
      { x: 3.8,  y: 0.18, z: -2.6, label: 'M1.6x2 [Teclado Der]' }
    ],
    warning: 'El palmrest constituye la estructura principal del equipo.',
    steps: [
      'Retire el marco superior del teclado con una espátula plástica.',
      'Desatornille los 4 microtornillos inferiores del teclado.',
      'Separe el teclado y deje el chasis de magnesio expuesto.'
    ]
  }
];

class OpenTeardownManualApp {
  constructor() {
    this.container = document.getElementById('webgl-container');
    this.slider = document.getElementById('teardown-slider');
    this.sliderReadout = document.getElementById('slider-readout');
    this.tooltip = document.getElementById('hover-tooltip');
    this.toastBanner = document.getElementById('toast-banner');

    this.componentGroups = new Map();
    this.interactiveMeshes = [];
    this.screwObjects = [];

    this.selectedId = null;
    this.hoveredObject = null;
    this.explodeProgress = 0;
    this.targetExplodeProgress = 0;
    this.isWireframe = false;
    this.requireScrewLock = true;

    this.camTargetPos = null;
    this.controlsTarget = new THREE.Vector3(0, 0, 0);

    this.initScene();
    this.buildSharedScrewGeometries();
    this.buildHardwareGeometry();
    this.initUI();
    this.initSearchCatalog();
    this.initEvents();
    this.updateGlobalScrewCounter();
    this.animate();
  }

  initScene() {
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x070a0f, 0.018);

    this.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 200);
    this.camera.position.set(14, 12, 18);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.25;
    this.container.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.maxDistance = 45;
    this.controls.minDistance = 4;

    // Iluminación profesional de laboratorio CAD
    this.scene.add(new THREE.AmbientLight(0xdbeafe, 0.85));

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.9);
    keyLight.position.set(15, 25, 16);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(2048, 2048);
    this.scene.add(keyLight);

    const cyanRim = new THREE.DirectionalLight(0x00f0ff, 1.2);
    cyanRim.position.set(-16, 8, -14);
    this.scene.add(cyanRim);

    // Cuadrícula CAD de suelo
    const grid = new THREE.GridHelper(40, 40, 0x00f0ff, 0x141e2c);
    grid.position.y = -6.2;
    grid.material.opacity = 0.3;
    grid.material.transparent = true;
    this.scene.add(grid);

    this.rootLaptopGroup = new THREE.Group();
    this.scene.add(this.rootLaptopGroup);

    this.guideLinesGroup = new THREE.Group();
    this.rootLaptopGroup.add(this.guideLinesGroup);

    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();
  }

  buildSharedScrewGeometries() {
    this.screwHeadGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.07, 16);
    this.screwShaftGeo = new THREE.CylinderGeometry(0.065, 0.055, 0.28, 12);
    this.screwSlotGeo1 = new THREE.BoxGeometry(0.22, 0.03, 0.04);
    this.screwSlotGeo2 = new THREE.BoxGeometry(0.04, 0.03, 0.22);
    this.washerRingGeo = new THREE.RingGeometry(0.17, 0.24, 16);
    this.washerRingGeo.rotateX(-Math.PI / 2);
  }

  createScrewAssembly(compId, screwDef, index) {
    const screwGroup = new THREE.Group();
    screwGroup.position.set(screwDef.x, screwDef.y, screwDef.z);

    const headMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      roughness: 0.2,
      metalness: 0.92,
      emissive: 0xffb800,
      emissiveIntensity: 0.2
    });
    const slotMat = new THREE.MeshBasicMaterial({ color: 0x070a0f });
    const shaftMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.35, metalness: 0.85 });

    const headMesh = new THREE.Mesh(this.screwHeadGeo, headMat);
    headMesh.position.y = 0.04;
    screwGroup.add(headMesh);

    const slot1 = new THREE.Mesh(this.screwSlotGeo1, slotMat);
    slot1.position.y = 0.075;
    const slot2 = new THREE.Mesh(this.screwSlotGeo2, slotMat);
    slot2.position.y = 0.075;
    screwGroup.add(slot1, slot2);

    const shaftMesh = new THREE.Mesh(this.screwShaftGeo, shaftMat);
    shaftMesh.position.y = -0.12;
    screwGroup.add(shaftMesh);

    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xffb800,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.6
    });
    const locatorRing = new THREE.Mesh(this.washerRingGeo, ringMat);
    locatorRing.position.set(screwDef.x, screwDef.y - 0.01, screwDef.z);

    const trailGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(screwDef.x, screwDef.y, screwDef.z),
      new THREE.Vector3(screwDef.x, screwDef.y, screwDef.z)
    ]);
    const trailMat = new THREE.LineDashedMaterial({
      color: 0xff3366,
      dashSize: 0.12,
      gapSize: 0.06,
      transparent: true,
      opacity: 0.9
    });
    const trailLine = new THREE.Line(trailGeo, trailMat);
    trailLine.computeLineDistances();

    const screwRecord = {
      uid: `${compId}_screw_${index}`,
      compId,
      label: screwDef.label,
      baseLocalPos: new THREE.Vector3(screwDef.x, screwDef.y, screwDef.z),
      group: screwGroup,
      headMesh,
      locatorRing,
      trailLine,
      unscrewedManual: false,
      currentProgress: 0,
      targetProgress: 0
    };

    screwGroup.traverse((child) => {
      if (child.isMesh) {
        child.userData.isScrew = true;
        child.userData.screwRecord = screwRecord;
        this.interactiveMeshes.push(child);
      }
    });

    this.screwObjects.push(screwRecord);
    return { screwGroup, locatorRing, trailLine, screwRecord };
  }

  buildHardwareGeometry() {
    const mats = {
      chassisDark: new THREE.MeshStandardMaterial({ color: 0x1e242b, roughness: 0.5, metalness: 0.4 }),
      magnesium: new THREE.MeshStandardMaterial({ color: 0x2a313c, roughness: 0.38, metalness: 0.7 }),
      pcbBlue: new THREE.MeshStandardMaterial({ color: 0x0b4f6c, roughness: 0.32, metalness: 0.3 }),
      pcbGreen: new THREE.MeshStandardMaterial({ color: 0x0f5e36, roughness: 0.32, metalness: 0.25 }),
      pcbBlack: new THREE.MeshStandardMaterial({ color: 0x14171d, roughness: 0.4, metalness: 0.3 }),
      copper: new THREE.MeshStandardMaterial({ color: 0xd97736, roughness: 0.22, metalness: 0.9 }),
      gold: new THREE.MeshStandardMaterial({ color: 0xf5b700, roughness: 0.18, metalness: 0.95 }),
      aluminum: new THREE.MeshStandardMaterial({ color: 0xadb5bd, roughness: 0.28, metalness: 0.88 }),
      icChip: new THREE.MeshStandardMaterial({ color: 0x111317, roughness: 0.22, metalness: 0.45 }),
      batteryBlack: new THREE.MeshStandardMaterial({ color: 0x12151a, roughness: 0.6, metalness: 0.2 }),
      siliconDie: new THREE.MeshStandardMaterial({ color: 0x3b82f6, roughness: 0.08, metalness: 0.95 })
    };

    HARDWARE_DB.forEach((item) => {
      const group = new THREE.Group();
      group.userData = {
        id: item.id,
        info: item,
        screwRecords: [],
        manualExtracted: false,
        localExtractOffset: 0
      };
      group.position.set(item.basePos.x, item.basePos.y, item.basePos.z);

      switch (item.id) {
        case 'bottom_case': this.createBottomCase(group, mats); break;
        case 'battery':     this.createBattery(group, mats); break;
        case 'storage':     this.createStorage(group, mats); break;
        case 'ram':         this.createRAM(group, mats); break;
        case 'wifi':        this.createWiFi(group, mats); break;
        case 'cooling':     this.createCooling(group, mats); break;
        case 'motherboard': this.createMotherboard(group, mats); break;
        case 'palmrest':    this.createPalmrest(group, mats); break;
      }

      group.traverse((child) => {
        if (child.isMesh && !child.userData.isScrew) {
          child.material = child.material.clone();
          child.userData.parentGroup = group;
          child.castShadow = true;
          child.receiveShadow = true;
          this.interactiveMeshes.push(child);

          const edges = new THREE.EdgesGeometry(child.geometry, 35);
          const line = new THREE.LineSegments(
            edges,
            new THREE.LineBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.2 })
          );
          child.add(line);
        }
      });

      item.screwCoords.forEach((sDef, idx) => {
        const { screwGroup, locatorRing, trailLine, screwRecord } = this.createScrewAssembly(item.id, sDef, idx);
        group.add(screwGroup);
        group.add(locatorRing);
        group.add(trailLine);
        group.userData.screwRecords.push(screwRecord);
      });

      this.rootLaptopGroup.add(group);
      this.componentGroups.set(item.id, group);

      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(item.basePos.x, item.basePos.y, item.basePos.z),
        new THREE.Vector3(item.basePos.x, item.basePos.y, item.basePos.z)
      ]);
      const guideLine = new THREE.Line(
        lineGeo,
        new THREE.LineDashedMaterial({ color: 0x00ff9d, dashSize: 0.25, gapSize: 0.15, transparent: true, opacity: 0.65 })
      );
      guideLine.computeLineDistances();
      guideLine.userData.compId = item.id;
      this.guideLinesGroup.add(guideLine);
    });
  }

  createBottomCase(group, mats) {
    group.add(new THREE.Mesh(new THREE.BoxGeometry(11.6, 0.22, 7.8), mats.chassisDark));
    for (let i = -3.8; i <= 0.5; i += 0.35) {
      const vent = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.25, 2.2), mats.pcbBlack);
      vent.position.set(i, 0.02, -1.6);
      group.add(vent);
    }
    const footGeo = new THREE.BoxGeometry(1.4, 0.12, 0.35);
    [[-4.5, -3.4], [4.5, -3.4], [-4.5, 3.4], [4.5, 3.4]].forEach(([x, z]) => {
      const foot = new THREE.Mesh(footGeo, mats.batteryBlack);
      foot.position.set(x, 0.14, z);
      group.add(foot);
    });
  }

  createBattery(group, mats) {
    group.add(new THREE.Mesh(new THREE.BoxGeometry(6.8, 0.42, 2.3), mats.batteryBlack));
    for (let i = 0; i < 4; i++) {
      const cell = new THREE.Mesh(new THREE.BoxGeometry(1.55, 0.46, 2.05), mats.chassisDark);
      cell.position.set(-2.47 + i * 1.65, 0, 0);
      group.add(cell);
    }
    const label = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.48, 0.8), mats.pcbBlue);
    label.position.set(0, 0.01, 0);
    group.add(label);
  }

  createStorage(group, mats) {
    const hddCaddy = new THREE.Mesh(new THREE.BoxGeometry(3.3, 0.38, 2.4), mats.aluminum);
    hddCaddy.position.set(0.3, 0, 0.1);
    group.add(hddCaddy);
    const hddBody = new THREE.Mesh(new THREE.BoxGeometry(3.1, 0.4, 2.2), mats.pcbBlack);
    hddBody.position.set(0.3, 0.02, 0.1);
    group.add(hddBody);

    const m2Pcb = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.12, 2.6), mats.pcbGreen);
    m2Pcb.position.set(-1.95, -0.05, 0.0);
    group.add(m2Pcb);
    for (let z = -0.8; z <= 0.7; z += 0.75) {
      const nand = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.16, 0.55), mats.icChip);
      nand.position.set(-1.95, 0.02, z);
      group.add(nand);
    }
  }

  createRAM(group, mats) {
    [-0.75, 0.75].forEach((zOffset) => {
      const stick = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.1, 1.05), mats.pcbGreen);
      stick.position.set(0, 0, zOffset);
      group.add(stick);
      for (let i = 0; i < 4; i++) {
        const dram = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.15, 0.65), mats.icChip);
        dram.position.set(-0.85 + i * 0.56, 0.02, zOffset);
        group.add(dram);
      }
      const edgePins = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.11, 0.12), mats.gold);
      edgePins.position.set(0, 0, zOffset + (zOffset < 0 ? -0.52 : 0.52));
      group.add(edgePins);
    });
  }

  createWiFi(group, mats) {
    group.add(new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.12, 1.35), mats.pcbGreen));
    const rfShield = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.18, 0.8), mats.aluminum);
    rfShield.position.set(0, 0.04, -0.1);
    group.add(rfShield);
  }

  createCooling(group, mats) {
    const fanHousing = new THREE.Mesh(new THREE.CylinderGeometry(1.35, 1.35, 0.38, 28), mats.chassisDark);
    fanHousing.position.set(-1.35, 0, 0.25);
    group.add(fanHousing);
    const rotor = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 0.42, 20), mats.aluminum);
    rotor.position.set(-1.35, 0.02, 0.25);
    group.add(rotor);
    const finBlock = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.42, 0.75), mats.copper);
    finBlock.position.set(-1.35, 0, -1.35);
    group.add(finBlock);
    const coldPlate = new THREE.Mesh(new THREE.BoxGeometry(1.75, 0.18, 1.55), mats.copper);
    coldPlate.position.set(1.35, -0.05, 0.2);
    group.add(coldPlate);
    const pipe1 = new THREE.Mesh(new THREE.BoxGeometry(3.1, 0.16, 0.38), mats.copper);
    pipe1.position.set(0.1, 0.06, -0.55);
    pipe1.rotation.y = 0.42;
    group.add(pipe1);
  }

  createMotherboard(group, mats) {
    group.add(new THREE.Mesh(new THREE.BoxGeometry(10.6, 0.14, 5.2), mats.pcbBlue));
    const cpuPackage = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.18, 1.3), mats.pcbGreen);
    cpuPackage.position.set(-0.85, 0.08, -0.9);
    group.add(cpuPackage);
    const cpuDie = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.22, 0.55), mats.siliconDie);
    cpuDie.position.set(-1.05, 0.1, -0.9);
    group.add(cpuDie);
    const cmos = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 0.15, 20), mats.gold);
    cmos.position.set(2.4, 0.12, -1.4);
    group.add(cmos);
  }

  createPalmrest(group, mats) {
    group.add(new THREE.Mesh(new THREE.BoxGeometry(11.6, 0.25, 7.8), mats.magnesium));
    const kbWell = new THREE.Mesh(new THREE.BoxGeometry(9.8, 0.28, 3.6), mats.pcbBlack);
    kbWell.position.set(0, -0.02, -1.1);
    group.add(kbWell);
    const touchpad = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.28, 2.1), mats.pcbBlack);
    touchpad.position.set(-0.4, -0.02, 2.25);
    group.add(touchpad);
  }

  initSearchCatalog() {
    const input = document.getElementById('model-search');
    const dropdown = document.getElementById('search-results');

    const renderList = (query = '') => {
      dropdown.innerHTML = '';
      Object.entries(CATALOG_DB).forEach(([key, model]) => {
        if (model.modelName.toLowerCase().includes(query.toLowerCase())) {
          const li = document.createElement('li');
          li.innerHTML = `<span>${model.modelName}</span> <span style="color:var(--neon-cyan)">[CARGAR CAD]</span>`;
          li.addEventListener('click', () => {
            this.loadLaptopProfile(key);
            dropdown.classList.add('hidden');
            input.value = '';
          });
          dropdown.appendChild(li);
        }
      });
    };

    input.addEventListener('focus', () => { renderList(input.value); dropdown.classList.remove('hidden'); });
    input.addEventListener('input', () => { renderList(input.value); dropdown.classList.remove('hidden'); });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.search-catalog-box')) dropdown.classList.add('hidden');
    });
  }

  loadLaptopProfile(profileKey) {
    const profile = CATALOG_DB[profileKey];
    if (!profile) return;
    document.getElementById('current-model-title').innerHTML = `${profile.modelName} <span class="accent-text">SERVICE MANUAL</span>`;
    this.rootLaptopGroup.scale.set(profile.chassisScale.x, profile.chassisScale.y, profile.chassisScale.z);
    this.resetAllScrewsAndLayers();
    this.showToast(`Manual cargado: ${profile.modelName}`);
  }

  initUI() {
    this.renderLayerList();

    this.slider.addEventListener('input', (e) => {
      this.setExplodeLevel(parseFloat(e.target.value));
    });

    document.querySelectorAll('.stage-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const val = parseFloat(btn.dataset.val);
        this.slider.value = val;
        this.setExplodeLevel(val);
      });
    });

    const btnScrewMode = document.getElementById('btn-screw-mode');
    btnScrewMode.addEventListener('click', () => {
      this.requireScrewLock = !this.requireScrewLock;
      btnScrewMode.classList.toggle('active', this.requireScrewLock);
      btnScrewMode.textContent = this.requireScrewLock ? '[ MODO DESTORNILLADOR: ON ]' : '[ MODO DESTORNILLADOR: OFF ]';
      this.showToast(this.requireScrewLock ? 'Modo Manual Activo: Desatornille primero.' : 'Modo Libre activo.');
      if (this.selectedId) this.updateInspectorScrewUI(this.selectedId);
    });

    const btnWire = document.getElementById('btn-wireframe');
    btnWire.addEventListener('click', () => {
      this.isWireframe = !this.isWireframe;
      btnWire.classList.toggle('active', this.isWireframe);
      this.interactiveMeshes.forEach((mesh) => {
        if (!mesh.userData.isScrew) mesh.material.wireframe = this.isWireframe;
      });
    });

    document.getElementById('btn-reset-cam').addEventListener('click', () => this.resetAllScrewsAndLayers());
    document.getElementById('btn-close-inspector').addEventListener('click', () => {
      this.selectedId = null;
      document.getElementById('inspector-panel').classList.add('collapsed');
      this.refreshHighlights();
    });

    document.getElementById('btn-unscrew-part').addEventListener('click', () => {
      if (!this.selectedId) return;
      const group = this.componentGroups.get(this.selectedId);
      const records = group.userData.screwRecords;
      if (records.length === 0) {
        this.showToast('Este módulo utiliza clips sin tornillos.');
        return;
      }
      const allUnscrewed = records.every((r) => r.unscrewedManual);
      records.forEach((r, idx) => {
        setTimeout(() => {
          r.unscrewedManual = !allUnscrewed;
          r.targetProgress = r.unscrewedManual ? 1 : 0;
          this.updateGlobalScrewCounter();
          this.updateInspectorScrewUI(this.selectedId);
          this.renderLayerList();
        }, idx * 100);
      });
    });

    document.getElementById('btn-extract-part').addEventListener('click', () => {
      if (!this.selectedId) return;
      const group = this.componentGroups.get(this.selectedId);
      group.userData.manualExtracted = !group.userData.manualExtracted;
      this.updateInspectorScrewUI(this.selectedId);
    });
  }

  renderLayerList() {
    const listEl = document.getElementById('component-list');
    listEl.innerHTML = '';

    HARDWARE_DB.forEach((item, idx) => {
      const group = this.componentGroups.get(item.id);
      const records = group ? group.userData.screwRecords : [];
      const doneCount = records.filter((r) => r.unscrewedManual || r.currentProgress > 0.8).length;
      const isUnlocked = records.length === 0 || doneCount === records.length;

      const li = document.createElement('li');
      li.className = `comp-item ${this.selectedId === item.id ? 'active' : ''}`;
      li.dataset.id = item.id;
      li.innerHTML = `
        <span>0${idx + 1}. ${item.name.split('(')[0].trim()}</span>
        <span class="screw-status-mini ${isUnlocked ? 'unlocked' : 'locked'}">
          ${records.length === 0 ? 'CLIP' : `🔩 ${doneCount}/${records.length}`}
        </span>
      `;
      li.addEventListener('click', () => this.selectComponent(item.id));
      listEl.appendChild(li);
    });
  }

  updateGlobalScrewCounter() {
    const total = this.screwObjects.length;
    const removed = this.screwObjects.filter((s) => s.unscrewedManual || s.currentProgress > 0.85).length;
    document.getElementById('global-screw-counter').textContent = `🔩 ${removed}/${total}`;
  }

  setExplodeLevel(percent) {
    this.targetExplodeProgress = percent / 100;
    this.sliderReadout.textContent = `${Math.round(percent)}%`;

    document.querySelectorAll('.stage-btn').forEach((btn) => {
      const bVal = parseFloat(btn.dataset.val);
      btn.classList.toggle('active', Math.abs(percent - bVal) < 10);
    });
  }

  toggleSingleScrew(screwRecord) {
    screwRecord.unscrewedManual = !screwRecord.unscrewedManual;
    screwRecord.targetProgress = screwRecord.unscrewedManual ? 1 : 0;

    if (this.selectedId !== screwRecord.compId) {
      this.selectComponent(screwRecord.compId, false);
    } else {
      this.updateInspectorScrewUI(screwRecord.compId);
    }

    this.updateGlobalScrewCounter();
    this.renderLayerList();
  }

  initEvents() {
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });

    this.renderer.domElement.addEventListener('pointermove', (e) => {
      this.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;

      this.raycaster.setFromCamera(this.pointer, this.camera);
      const intersects = this.raycaster.intersectObjects(this.interactiveMeshes, false);

      if (intersects.length > 0) {
        const hitMesh = intersects[0].object;
        this.renderer.domElement.style.cursor = 'pointer';
        this.tooltip.classList.remove('hidden');
        this.tooltip.style.left = `${e.clientX}px`;
        this.tooltip.style.top = `${e.clientY}px`;

        if (hitMesh.userData.isScrew) {
          const sRec = hitMesh.userData.screwRecord;
          this.setHoveredObject(sRec);
          document.getElementById('tooltip-badge').textContent = '🔩 TORNILLO';
          document.getElementById('tooltip-text').textContent = `${sRec.label}`;
        } else {
          const group = hitMesh.userData.parentGroup;
          this.setHoveredObject(group);
          document.getElementById('tooltip-badge').textContent = `[${group.userData.info.fru}]`;
          document.getElementById('tooltip-text').textContent = group.userData.info.name;
        }
      } else {
        this.setHoveredObject(null);
        this.renderer.domElement.style.cursor = 'grab';
        this.tooltip.classList.add('hidden');
      }
    });

    let downPos = { x: 0, y: 0 };
    this.renderer.domElement.addEventListener('pointerdown', (e) => {
      downPos = { x: e.clientX, y: e.clientY };
    });

    this.renderer.domElement.addEventListener('pointerup', (e) => {
      if (Math.hypot(e.clientX - downPos.x, e.clientY - downPos.y) > 6) return;

      this.raycaster.setFromCamera(this.pointer, this.camera);
      const intersects = this.raycaster.intersectObjects(this.interactiveMeshes, false);

      if (intersects.length > 0) {
        const hitMesh = intersects[0].object;
        if (hitMesh.userData.isScrew) {
          this.toggleSingleScrew(hitMesh.userData.screwRecord);
        } else {
          const group = hitMesh.userData.parentGroup;
          this.selectComponent(group.userData.id, true);
        }
      }
    });
  }

  setHoveredObject(obj) {
    if (this.hoveredObject === obj) return;
    this.hoveredObject = obj;
    this.refreshHighlights();
  }

  selectComponent(id, focusCamera = true) {
    this.selectedId = id;
    const group = this.componentGroups.get(id);
    if (!group) return;
    const info = group.userData.info;

    document.getElementById('insp-id').textContent = info.fru;
    document.getElementById('insp-title').textContent = info.name;
    document.getElementById('insp-subtitle').textContent = info.subtitle;
    document.getElementById('insp-screws').textContent = info.screws;
    document.getElementById('insp-warning').textContent = info.warning;

    const stepsContainer = document.getElementById('insp-steps');
    stepsContainer.innerHTML = '';
    info.steps.forEach((stepText) => {
      const li = document.createElement('li');
      li.textContent = stepText;
      stepsContainer.appendChild(li);
    });

    this.updateInspectorScrewUI(id);
    document.getElementById('inspector-panel').classList.remove('collapsed');
    this.renderLayerList();

    if (focusCamera) {
      const currentWorldPos = group.position.clone();
      this.controlsTarget.copy(currentWorldPos);
      this.camTargetPos = new THREE.Vector3(
        currentWorldPos.x + info.camOffset.x,
        currentWorldPos.y + info.camOffset.y,
        currentWorldPos.z + info.camOffset.z
      );
    }
    this.refreshHighlights();
  }

  updateInspectorScrewUI(id) {
    const group = this.componentGroups.get(id);
    if (!group) return;
    const records = group.userData.screwRecords;
    const removedCount = records.filter((r) => r.unscrewedManual || this.targetExplodeProgress > 0.25).length;
    const total = records.length;
    const allCleared = total === 0 || removedCount === total || !this.requireScrewLock;

    const badge = document.getElementById('insp-screw-progress');
    badge.textContent = total === 0 ? 'SIN TORNILLOS' : `${removedCount} / ${total} EXTRAÍDOS`;
    badge.classList.toggle('complete', allCleared);

    const btnUnscrew = document.getElementById('btn-unscrew-part');
    btnUnscrew.textContent = removedCount === total && total > 0 ? '🔩 RE-ATORNILLAR' : `🔩 DESATORNILLAR (${total})`;

    const btnExtract = document.getElementById('btn-extract-part');
    btnExtract.disabled = !allCleared;
    btnExtract.textContent = group.userData.manualExtracted ? '⬇ INSTALAR' : '⬆ EXTRAER PIEZA';
  }

  resetAllScrewsAndLayers() {
    this.selectedId = null;
    this.slider.value = 0;
    this.setExplodeLevel(0);
    this.screwObjects.forEach((s) => { s.unscrewedManual = false; s.targetProgress = 0; });
    this.componentGroups.forEach((group) => { group.userData.manualExtracted = false; });
    document.getElementById('inspector-panel').classList.add('collapsed');
    this.controlsTarget.set(0, 0, 0);
    this.camTargetPos = new THREE.Vector3(14, 12, 18);
    this.updateGlobalScrewCounter();
    this.renderLayerList();
    this.refreshHighlights();
  }

  showToast(msg) {
    document.getElementById('toast-msg').textContent = msg;
    this.toastBanner.classList.remove('hidden');
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => this.toastBanner.classList.add('hidden'), 3200);
  }

  refreshHighlights() {
    this.componentGroups.forEach((group, id) => {
      const isSelected = id === this.selectedId;
      const isHoveredGroup = this.hoveredObject === group;
      group.traverse((child) => {
        if (child.isMesh && !child.userData.isScrew) {
          if (isSelected) {
            child.material.emissive.setHex(0x00ff9d);
            child.material.emissiveIntensity = 0.35;
          } else if (isHoveredGroup) {
            child.material.emissive.setHex(0x00f0ff);
            child.material.emissiveIntensity = 0.22;
          } else {
            child.material.emissive.setHex(0x000000);
            child.material.emissiveIntensity = 0;
          }
        }
      });
    });

    this.screwObjects.forEach((sRec) => {
      const isHovered = this.hoveredObject === sRec;
      if (isHovered) {
        sRec.headMesh.material.emissive.setHex(0x00f0ff);
        sRec.headMesh.material.emissiveIntensity = 0.9;
      } else if (sRec.unscrewedManual) {
        sRec.headMesh.material.emissive.setHex(0x00ff9d);
        sRec.headMesh.material.emissiveIntensity = 0.6;
      } else {
        sRec.headMesh.material.emissive.setHex(0xffb800);
        sRec.headMesh.material.emissiveIntensity = 0.22;
      }
    });
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    this.explodeProgress += (this.targetExplodeProgress - this.explodeProgress) * 0.08;

    const sliderScrewFactor = THREE.MathUtils.clamp(this.explodeProgress / 0.28, 0, 1);
    const sliderLayerFactor = THREE.MathUtils.clamp((this.explodeProgress - 0.28) / 0.72, 0, 1);

    this.screwObjects.forEach((sRec) => {
      const compInfo = this.componentGroups.get(sRec.compId).userData.info;
      const desiredScrewState = Math.max(sRec.targetProgress, sliderScrewFactor);
      sRec.currentProgress += (desiredScrewState - sRec.currentProgress) * 0.12;

      const liftY = sRec.currentProgress * compInfo.screwLiftHeight;
      sRec.group.position.y = sRec.baseLocalPos.y + liftY;
      sRec.group.rotation.y = sRec.currentProgress * Math.PI * 6;

      const posAttr = sRec.trailLine.geometry.attributes.position;
      posAttr.setXYZ(0, sRec.baseLocalPos.x, sRec.baseLocalPos.y, sRec.baseLocalPos.z);
      posAttr.setXYZ(1, sRec.baseLocalPos.x, sRec.baseLocalPos.y + liftY, sRec.baseLocalPos.z);
      posAttr.needsUpdate = true;
      sRec.trailLine.computeLineDistances();
      sRec.trailLine.visible = sRec.currentProgress > 0.04;
    });

    this.componentGroups.forEach((group) => {
      const info = group.userData.info;
      const targetLocalExtract = group.userData.manualExtracted ? 0.75 : 0;
      group.userData.localExtractOffset += (targetLocalExtract - group.userData.localExtractOffset) * 0.09;

      const effectiveExplosion = Math.max(sliderLayerFactor, group.userData.localExtractOffset);

      group.position.x = info.basePos.x + info.explodeVec.x * effectiveExplosion;
      group.position.y = info.basePos.y + info.explodeVec.y * effectiveExplosion;
      group.position.z = info.basePos.z + info.explodeVec.z * effectiveExplosion;
    });

    this.guideLinesGroup.children.forEach((line) => {
      const compGroup = this.componentGroups.get(line.userData.compId);
      if (compGroup) {
        const info = compGroup.userData.info;
        const posAttr = line.geometry.attributes.position;
        posAttr.setXYZ(0, info.basePos.x, info.basePos.y, info.basePos.z);
        posAttr.setXYZ(1, compGroup.position.x, compGroup.position.y, compGroup.position.z);
        posAttr.needsUpdate = true;
        line.computeLineDistances();
        line.visible = compGroup.position.distanceTo(new THREE.Vector3(info.basePos.x, info.basePos.y, info.basePos.z)) > 0.12;
      }
    });

    if (this.selectedId) {
      const activeGroup = this.componentGroups.get(this.selectedId);
      if (activeGroup) this.controlsTarget.copy(activeGroup.position);
    }

    this.controls.target.lerp(this.controlsTarget, 0.08);
    if (this.camTargetPos) {
      this.camera.position.lerp(this.camTargetPos, 0.06);
      if (this.camera.position.distanceTo(this.camTargetPos) < 0.18) this.camTargetPos = null;
    }

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  new OpenTeardownManualApp();
});


