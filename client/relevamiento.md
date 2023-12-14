## Componentes

1. En los productos, si no hay productos, mostrar un mensaje
2. En las tiendas, si no hay tiendas, mostrar un mensaje
3. En las ordenes, si no hay ordenes, mostrar un mensaje
4. En todos los forms, mejorar validaciones

## Paginas

- Crear onboarding para tiendas
- Verificar responsive mayor a 1536px

1. **Home (/)** **CAMI**
   - Eliminar sistema de auto slice y crear un componente ProductFlex y ShopFlex (tipo carrousel)
2. **Products (/shops/products)** **CAMI**
   - Paginar los productos
   - Agregar filtros, ordenamiento y búsqueda (si sobra tiempo)
3. **Products (/shops)** **CAMI**
   - Paginar los productos
   - Búsqueda (si sobra tiempo)
4. **Shop (/shops/:id/active-orders)** **CAMI**
   - Si no hay ordenes activas, mostrar un mensaje
   - La tarjeta de ordenes no es responsive
   - Ordernar por mas nuevo primero
5. **Shop (/shops/:id/create-product)**
   - Descripcion debe ser un text area de por defecto un row
6. **Account (/account)**
   - Resolver bug con SWR
7. **Account (/account/order-history)** **CAMI**
   - Titulo debe ser condicional
   - Limitar cantidad de paginas a 4
   - Ordenar por mas nuevo primero
8. **Login (/auth/login)** **THOMAS**
   - Arreglar el responsive (OK)
   - Agregar header (OK)
   - Manejar errores
   - Agregar link a register (OK)
9. **Register (/auth/register)** **THOMAS**
   - Arreglar el responsive (OK)
   - Agregar header (OK)
   - Manejar errores
   - Agregar link a login (OK)
   - Agregar campos para tienda
   - Hacer multi step form (si sobra tiempo)
10. **Create Shop (/allies)** **THOMAS**
    - Cambiar ruta a `merchants` (ver middleware y archivo routes) (OK)
    - Hacer interfaz
11. **Checkout (/checkout)** **THOMAS**
    - Si no hay productos, mostrar un mensaje
    - Integrar con sistema de pagos (esperar backend) (OK)
12. **Order tracking (/order-tracking/:id)** **THOMAS**
    - Arreglar layout (header) (OK)
    - Responsive (OK)
13. **Dealer landing (/dealer)**
    - Hacer interfaz
14. **Dealer order (/dealer/order/:id)** **THOMAS**
    - Mejorar diseño,
    - integrap mapa (OK)
    - Overflow (OK)
15. **Hacer pagina de ordenes activas para el cliente** **THOMAS**
    - Hacer interfaz
