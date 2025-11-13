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
    console.log('🔄 Iniciando seed...');
    
    // Limpiar datos anteriores
    await sequelize.sync({ force: true });
    console.log('✅ Base de datos limpiada');

    // Crear usuarios
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = await User.create({
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
      apellido: 'Pérez',
      email: 'juan@gmail.com',
      password: hashedUserPass,
      telefono: '1122334455',
      rol: 'cliente',
      estado: 'activo'
    });

    console.log('✅ Usuarios creados');

    // Crear marcas
    const bosch = await Brand.create({ nombre: 'Bosch', descripcion: 'Marca líder en autopartes' });
    const mann = await Brand.create({ nombre: 'Mann Filter', descripcion: 'Filtros premium' });
    const ngk = await Brand.create({ nombre: 'NGK', descripcion: 'Bujías de alta calidad' });
    
    console.log('✅ Marcas creadas');

    // Crear categorías
    const filtros = await Category.create({ nombre: 'Filtros', descripcion: 'Filtros de aceite, aire y combustible' });
    const frenos = await Category.create({ nombre: 'Frenos', descripcion: 'Pastillas y discos de freno' });
    const motor = await Category.create({ nombre: 'Motor', descripcion: 'Componentes del motor' });
    
    console.log('✅ Categorías creadas');

    // Crear productos
    await Product.bulkCreate([
      {
        sku: 'F001',
        nombre: 'Filtro de Aceite W 712/75',
        descripcion: 'Filtro de aceite compatible con motores VW/Audi 1.6-2.0 TDI',
        precio: 3500.00,
        costo: 2100.00,
        imagen_url: 'https://via.placeholder.com/200x150/9ca3af?text=F001',
        stock: 25,
        estado: 'activo',
        brand_id: mann.id,
        category_id: filtros.id
      },
      {
        sku: 'F002',
        nombre: 'Filtro de Aire C 25 114',
        descripcion: 'Filtro de aire de alto flujo para motores gasolina',
        precio: 2800.00,
        costo: 1680.00,
        imagen_url: 'https://via.placeholder.com/200x150/9ca3af?text=F002',
        stock: 30,
        estado: 'activo',
        brand_id: mann.id,
        category_id: filtros.id
      },
      {
        sku: 'B001',
        nombre: 'Bujía Iridium IX BKR6EIX',
        descripcion: 'Bujía de iridio de larga duración',
        precio: 4200.00,
        costo: 2520.00,
        imagen_url: 'https://via.placeholder.com/200x150/9ca3af?text=B001',
        stock: 40,
        estado: 'activo',
        brand_id: ngk.id,
        category_id: motor.id
      },
      {
        sku: 'FR001',
        nombre: 'Pastillas de Freno Delanteras',
        descripcion: 'Pastillas de freno cerámicas de alta performance',
        precio: 8500.00,
        costo: 5100.00,
        imagen_url: 'https://via.placeholder.com/200x150/9ca3af?text=FR001',
        stock: 20,
        estado: 'activo',
        brand_id: bosch.id,
        category_id: frenos.id
      },
      {
        sku: 'FR002',
        nombre: 'Disco de Freno Ventilado',
        descripcion: 'Disco de freno ventilado 280mm',
        precio: 12000.00,
        costo: 7200.00,
        imagen_url: 'https://via.placeholder.com/200x150/9ca3af?text=FR002',
        stock: 15,
        estado: 'activo',
        brand_id: bosch.id,
        category_id: frenos.id
      }
    ]);

    console.log('✅ Productos creados');
    console.log('\n🎉 Seed completado exitosamente!');
    console.log('\n📝 Credenciales de acceso:');
    console.log('   Admin: admin@repuestos.com / admin123');
    console.log('   Usuario: juan@gmail.com / user123\n');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error en seed:', error);
    process.exit(1);
  }
};

seed();
