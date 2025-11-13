import {
  sequelize,
  User,
  Brand,
  Category,
  Product
} from './models/index.js';
import bcrypt from 'bcryptjs';

const seed = async () => {
  try {
    console.log('Iniciando seed extendido...');
    
    // Limpiar datos anteriores
    await sequelize.sync({ force: true });
    console.log('Base de datos limpiada');

    // Crear usuarios
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await User.create({
      nombre: 'Admin',
      apellido: 'Sistema',
      email: 'admin@repuestos.com',
      password: hashedPassword,
      telefono: '1234567890',
      rol: 'admin',
      estado: 'activo'
    });

    const hashedUserPass = await bcrypt.hash('user123', 10);
    await User.create({
      nombre: 'Juan',
      apellido: 'Perez',
      email: 'juan@gmail.com',
      password: hashedUserPass,
      telefono: '1122334455',
      rol: 'cliente',
      estado: 'activo'
    });

    console.log('Usuarios creados');

    // Crear marcas
    const bosch = await Brand.create({ nombre: 'Bosch', descripcion: 'Marca lider en autopartes' });
    const mann = await Brand.create({ nombre: 'Mann Filter', descripcion: 'Filtros premium' });
    const ngk = await Brand.create({ nombre: 'NGK', descripcion: 'Bujias de alta calidad' });
    const brembo = await Brand.create({ nombre: 'Brembo', descripcion: 'Sistemas de freno deportivos' });
    const monroe = await Brand.create({ nombre: 'Monroe', descripcion: 'Amortiguadores y suspension' });
    const castrol = await Brand.create({ nombre: 'Castrol', descripcion: 'Lubricantes de alto rendimiento' });
    const mobil = await Brand.create({ nombre: 'Mobil', descripcion: 'Aceites premium' });
    const mahle = await Brand.create({ nombre: 'Mahle', descripcion: 'Componentes del motor' });
    
    console.log('Marcas creadas');

    // Crear categorías
    const filtros = await Category.create({ nombre: 'Filtros', descripcion: 'Filtros de aceite, aire y combustible' });
    const frenos = await Category.create({ nombre: 'Frenos', descripcion: 'Pastillas y discos de freno' });
    const motor = await Category.create({ nombre: 'Motor', descripcion: 'Componentes del motor' });
    const suspension = await Category.create({ nombre: 'Suspension', descripcion: 'Amortiguadores y componentes' });
    const lubricantes = await Category.create({ nombre: 'Lubricantes', descripcion: 'Aceites y fluidos' });
    const electrica = await Category.create({ nombre: 'Electrica', descripcion: 'Sistema electrico' });
    const transmision = await Category.create({ nombre: 'Transmision', descripcion: 'Componentes de transmision' });
    
    console.log('Categorias creadas');

    // Crear productos con imagenes de autopartes
    await Product.bulkCreate([
      // Filtros
      {
        sku: 'F001',
        nombre: 'Filtro de Aceite W 712/75',
        descripcion: 'Filtro de aceite compatible con motores VW/Audi 1.6-2.0 TDI. Alta eficiencia de filtracion.',
        precio: 3500.00,
        costo: 2100.00,
        imagen_url: 'https://via.placeholder.com/300x200/4F46E5/FFFFFF?text=Filtro+Aceite',
        stock: 25,
        estado: 'activo',
        brand_id: mann.id,
        category_id: filtros.id
      },
      {
        sku: 'F002',
        nombre: 'Filtro de Aire C 25 114',
        descripcion: 'Filtro de aire de alto flujo para motores gasolina. Mejora el rendimiento del motor.',
        precio: 2800.00,
        costo: 1680.00,
        imagen_url: 'https://via.placeholder.com/300x200/10B981/FFFFFF?text=Filtro+Aire',
        stock: 30,
        estado: 'activo',
        brand_id: mann.id,
        category_id: filtros.id
      },
      {
        sku: 'F003',
        nombre: 'Filtro de Combustible',
        descripcion: 'Filtro de combustible diesel de alta presion. Compatible con sistemas Common Rail.',
        precio: 4200.00,
        costo: 2520.00,
        imagen_url: 'https://via.placeholder.com/300x200/F59E0B/FFFFFF?text=Filtro+Combustible',
        stock: 20,
        estado: 'activo',
        brand_id: bosch.id,
        category_id: filtros.id
      },
      {
        sku: 'F004',
        nombre: 'Filtro de Habitaculo',
        descripcion: 'Filtro de polen y particulas para sistema de climatizacion. Con carbon activado.',
        precio: 2100.00,
        costo: 1260.00,
        imagen_url: 'https://via.placeholder.com/300x200/06B6D4/FFFFFF?text=Filtro+Habitaculo',
        stock: 35,
        estado: 'activo',
        brand_id: mann.id,
        category_id: filtros.id
      },

      // Frenos
      {
        sku: 'FR001',
        nombre: 'Pastillas de Freno Delanteras',
        descripcion: 'Pastillas de freno ceramicas de alta performance. Bajo ruido y menor desgaste de discos.',
        precio: 8500.00,
        costo: 5100.00,
        imagen_url: 'https://via.placeholder.com/300x200/EF4444/FFFFFF?text=Pastillas+Freno',
        stock: 18,
        estado: 'activo',
        brand_id: brembo.id,
        category_id: frenos.id
      },
      {
        sku: 'FR002',
        nombre: 'Discos de Freno Ventilados',
        descripcion: 'Discos de freno ventilados perforados. Mejor disipacion de calor.',
        precio: 15000.00,
        costo: 9000.00,
        imagen_url: 'https://via.placeholder.com/300x200/DC2626/FFFFFF?text=Discos+Freno',
        stock: 12,
        estado: 'activo',
        brand_id: brembo.id,
        category_id: frenos.id
      },
      {
        sku: 'FR003',
        nombre: 'Pastillas Traseras Economicas',
        descripcion: 'Pastillas de freno traseras para uso urbano. Excelente relacion precio-calidad.',
        precio: 6200.00,
        costo: 3720.00,
        imagen_url: 'https://via.placeholder.com/300x200/F87171/FFFFFF?text=Pastillas+Traseras',
        stock: 22,
        estado: 'activo',
        brand_id: bosch.id,
        category_id: frenos.id
      },
      {
        sku: 'FR004',
        nombre: 'Liquido de Frenos DOT 4',
        descripcion: 'Liquido de frenos sintetico DOT 4. Alto punto de ebullicion.',
        precio: 1800.00,
        costo: 1080.00,
        imagen_url: 'https://via.placeholder.com/300x200/FCA5A5/FFFFFF?text=Liquido+Frenos',
        stock: 40,
        estado: 'activo',
        brand_id: castrol.id,
        category_id: frenos.id
      },

      // Motor
      {
        sku: 'B001',
        nombre: 'Bujia Iridium IX BKR6EIX',
        descripcion: 'Bujia de iridio de larga duracion. Mejor arranque en frio y mayor rendimiento.',
        precio: 4200.00,
        costo: 2520.00,
        imagen_url: 'https://via.placeholder.com/300x200/8B5CF6/FFFFFF?text=Bujia+Iridium',
        stock: 40,
        estado: 'activo',
        brand_id: ngk.id,
        category_id: motor.id
      },
      {
        sku: 'M001',
        nombre: 'Correa de Distribucion',
        descripcion: 'Correa de distribucion reforzada. Kit completo con tensor y rodillos.',
        precio: 12500.00,
        costo: 7500.00,
        imagen_url: 'https://via.placeholder.com/300x200/6366F1/FFFFFF?text=Correa+Distribucion',
        stock: 15,
        estado: 'activo',
        brand_id: bosch.id,
        category_id: motor.id
      },
      {
        sku: 'M002',
        nombre: 'Bomba de Agua',
        descripcion: 'Bomba de agua con rodamiento sellado. Compatible con motores 1.4-1.6.',
        precio: 8900.00,
        costo: 5340.00,
        imagen_url: 'https://via.placeholder.com/300x200/7C3AED/FFFFFF?text=Bomba+Agua',
        stock: 14,
        estado: 'activo',
        brand_id: mahle.id,
        category_id: motor.id
      },
      {
        sku: 'M003',
        nombre: 'Termostato',
        descripcion: 'Termostato de apertura graduada. Temperatura de apertura 88 grados.',
        precio: 2400.00,
        costo: 1440.00,
        imagen_url: 'https://via.placeholder.com/300x200/A78BFA/FFFFFF?text=Termostato',
        stock: 28,
        estado: 'activo',
        brand_id: mahle.id,
        category_id: motor.id
      },
      {
        sku: 'M004',
        nombre: 'Sensor de Oxigeno Lambda',
        descripcion: 'Sonda lambda original. Mejora consumo y rendimiento del motor.',
        precio: 7800.00,
        costo: 4680.00,
        imagen_url: 'https://via.placeholder.com/300x200/C4B5FD/FFFFFF?text=Sonda+Lambda',
        stock: 16,
        estado: 'activo',
        brand_id: bosch.id,
        category_id: motor.id
      },

      // Suspension
      {
        sku: 'S001',
        nombre: 'Amortiguador Delantero Monroe',
        descripcion: 'Amortiguador a gas de alto rendimiento. Mejor estabilidad y confort.',
        precio: 18500.00,
        costo: 11100.00,
        imagen_url: 'https://via.placeholder.com/300x200/3B82F6/FFFFFF?text=Amortiguador+Delantero',
        stock: 10,
        estado: 'activo',
        brand_id: monroe.id,
        category_id: suspension.id
      },
      {
        sku: 'S002',
        nombre: 'Amortiguador Trasero',
        descripcion: 'Amortiguador convencional para eje trasero. Durabilidad garantizada.',
        precio: 16000.00,
        costo: 9600.00,
        imagen_url: 'https://via.placeholder.com/300x200/60A5FA/FFFFFF?text=Amortiguador+Trasero',
        stock: 12,
        estado: 'activo',
        brand_id: monroe.id,
        category_id: suspension.id
      },
      {
        sku: 'S003',
        nombre: 'Espirales Delanteros',
        descripcion: 'Resortes helicoidales delanteros. Mantienen altura original del vehiculo.',
        precio: 9500.00,
        costo: 5700.00,
        imagen_url: 'https://via.placeholder.com/300x200/93C5FD/FFFFFF?text=Espirales',
        stock: 14,
        estado: 'activo',
        brand_id: monroe.id,
        category_id: suspension.id
      },
      {
        sku: 'S004',
        nombre: 'Rotulas de Suspension',
        descripcion: 'Rotulas de direccion reforzadas. Mayor precision en la direccion.',
        precio: 4800.00,
        costo: 2880.00,
        imagen_url: 'https://via.placeholder.com/300x200/DBEAFE/FFFFFF?text=Rotulas',
        stock: 20,
        estado: 'activo',
        brand_id: bosch.id,
        category_id: suspension.id
      },

      // Lubricantes
      {
        sku: 'L001',
        nombre: 'Aceite Motor 5W-30 Sintetico',
        descripcion: 'Aceite sintetico de alta performance. Proteccion superior del motor.',
        precio: 8500.00,
        costo: 5100.00,
        imagen_url: 'https://via.placeholder.com/300x200/10B981/FFFFFF?text=Aceite+5W30',
        stock: 45,
        estado: 'activo',
        brand_id: castrol.id,
        category_id: lubricantes.id
      },
      {
        sku: 'L002',
        nombre: 'Aceite Motor 10W-40 Semi-Sintetico',
        descripcion: 'Aceite semi-sintetico para motores gasolina y diesel. Uso general.',
        precio: 6200.00,
        costo: 3720.00,
        imagen_url: 'https://via.placeholder.com/300x200/34D399/FFFFFF?text=Aceite+10W40',
        stock: 50,
        estado: 'activo',
        brand_id: mobil.id,
        category_id: lubricantes.id
      },
      {
        sku: 'L003',
        nombre: 'Aceite Transmision Automatica ATF',
        descripcion: 'Fluido para transmisiones automaticas. Cambia cada 60.000 km.',
        precio: 7800.00,
        costo: 4680.00,
        imagen_url: 'https://via.placeholder.com/300x200/6EE7B7/FFFFFF?text=ATF+Transmision',
        stock: 30,
        estado: 'activo',
        brand_id: castrol.id,
        category_id: lubricantes.id
      },
      {
        sku: 'L004',
        nombre: 'Refrigerante Anticongelante',
        descripcion: 'Refrigerante concentrado. Protege hasta -35 grados. Diluir 50/50.',
        precio: 2200.00,
        costo: 1320.00,
        imagen_url: 'https://via.placeholder.com/300x200/A7F3D0/FFFFFF?text=Refrigerante',
        stock: 55,
        estado: 'activo',
        brand_id: castrol.id,
        category_id: lubricantes.id
      },

      // Electrica
      {
        sku: 'E001',
        nombre: 'Bateria 12V 65Ah',
        descripcion: 'Bateria de arranque libre de mantenimiento. 3 años de garantia.',
        precio: 45000.00,
        costo: 27000.00,
        imagen_url: 'https://via.placeholder.com/300x200/F59E0B/FFFFFF?text=Bateria+12V',
        stock: 8,
        estado: 'activo',
        brand_id: bosch.id,
        category_id: electrica.id
      },
      {
        sku: 'E002',
        nombre: 'Alternador Reconstruido',
        descripcion: 'Alternador 90A reconstruido. Calidad OEM. Garantia 6 meses.',
        precio: 28000.00,
        costo: 16800.00,
        imagen_url: 'https://via.placeholder.com/300x200/FBBF24/FFFFFF?text=Alternador',
        stock: 6,
        estado: 'activo',
        brand_id: bosch.id,
        category_id: electrica.id
      },
      {
        sku: 'E003',
        nombre: 'Motor de Arranque',
        descripcion: 'Burro de arranque reconstruido. 12V 1.4KW. Instalacion incluida.',
        precio: 32000.00,
        costo: 19200.00,
        imagen_url: 'https://via.placeholder.com/300x200/FCD34D/FFFFFF?text=Motor+Arranque',
        stock: 5,
        estado: 'activo',
        brand_id: bosch.id,
        category_id: electrica.id
      },
      {
        sku: 'E004',
        nombre: 'Juego de Cables de Bujia',
        descripcion: 'Cables de alta tension silicona. Baja resistencia electrica.',
        precio: 5400.00,
        costo: 3240.00,
        imagen_url: 'https://via.placeholder.com/300x200/FDE68A/FFFFFF?text=Cables+Bujia',
        stock: 24,
        estado: 'activo',
        brand_id: ngk.id,
        category_id: electrica.id
      },

      // Transmision
      {
        sku: 'T001',
        nombre: 'Kit de Embrague Completo',
        descripcion: 'Kit embrague disco, plato y collarin. Para motores 1.6.',
        precio: 35000.00,
        costo: 21000.00,
        imagen_url: 'https://via.placeholder.com/300x200/EC4899/FFFFFF?text=Kit+Embrague',
        stock: 7,
        estado: 'activo',
        brand_id: bosch.id,
        category_id: transmision.id
      },
      {
        sku: 'T002',
        nombre: 'Volante Motor Bimasa',
        descripcion: 'Volante bimasa original. Elimina vibraciones de transmision.',
        precio: 48000.00,
        costo: 28800.00,
        imagen_url: 'https://via.placeholder.com/300x200/F472B6/FFFFFF?text=Volante+Bimasa',
        stock: 4,
        estado: 'activo',
        brand_id: mahle.id,
        category_id: transmision.id
      },
      {
        sku: 'T003',
        nombre: 'Semieje Homocinetico',
        descripcion: 'Semieje completo con tripoide y homocinética. Lado derecho.',
        precio: 22000.00,
        costo: 13200.00,
        imagen_url: 'https://via.placeholder.com/300x200/F9A8D4/FFFFFF?text=Semieje',
        stock: 9,
        estado: 'activo',
        brand_id: bosch.id,
        category_id: transmision.id
      },
      {
        sku: 'T004',
        nombre: 'Aceite Caja Manual 75W-90',
        descripcion: 'Aceite sintetico para cajas manuales. Mejora cambios.',
        precio: 4800.00,
        costo: 2880.00,
        imagen_url: 'https://via.placeholder.com/300x200/FBB6CE/FFFFFF?text=Aceite+Caja',
        stock: 32,
        estado: 'activo',
        brand_id: castrol.id,
        category_id: transmision.id
      }
    ]);

    console.log('Productos creados - Total: 32 productos');
    console.log('');
    console.log('Seed completado exitosamente!');
    console.log('Usuarios: admin@repuestos.com / admin123');
    console.log('          juan@gmail.com / user123');

  } catch (error) {
    console.error('Error en seed:', error);
  } finally {
    await sequelize.close();
  }
};

seed();
