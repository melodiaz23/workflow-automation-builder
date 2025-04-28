# WORKFLOW AUTOMATION BUILDER

Aplicación de editor visual de flujos de trabajo construida como parte de una prueba técnica. Permite a los usuarios diseñar procesos de automatización mediante una interfaz drag & drop, conectando diferentes tipos de nodos para crear flujos lógicos.

La aplicación permite crear, conectar y configurar diferentes tipos de nodos (inicio, email, espera, condición), establecer relaciones entre ellos y exportar el flujo completo en formato JSON para su potencial integración con sistemas de automatización.

## Stack Tecnológico

- React 19 / React Flow (@xyflow/react)
- TypeScript
- TailwindCSS

## Funcionalidades Implementadas

### Nodos

- **Start**: Nodo de inicio del flujo
- **Email**: Para envío de emails con título y contenido configurable
- **Wait**: Permite establecer una espera (en horas) para realizar una acción
- **Condition**: Bifurcaciones condicionales con resultados true/false
- **Result** (True/False): Nodos de finalización para diferentes resultados

### Interacciones

- **Drag & Drop**: Añadir nodos arrastrándolos desde la Toolbar
- **Conexiones dinámicas**: Entre puntos de entrada/salida (handles) de los nodos
- **Edición Inline**: Configurar propiedades en los nodos Email, Wait y Condition
- **Eliminación inteligente**: Al eliminar un nodo Condition se eliminan también sus nodos de resultado asociados
- **Exportación a JSON**: Mediante botón dedicado, con formato específico para automatizaciones (al dar clic en `export` también se visualiza la información en consola).
- **Opción de guardado en localStorage**: Permite guardar el flujo en el localStorage del usuario por lo que la información persiste entre renderizados.

### Estructura del Proyecto

La aplicación sigue una arquitectura por features, incorporando principios de la arquitectura SCREAM:

```bash
src/
├── constants/           # Constantes globales
│   └── editorConstants.ts
├── features/
│   ├── editor/          # Feature de edición de flujos
│   │   ├── components/  # Componentes de UI
│   │   │   ├── buttons/ # Botones reutilizables
│   │   │   │   ├── ExportButton.tsx
│   │   │   │   ├── SaveButton.tsx
│   │   │   │   └── DeleteNodeButton.tsx
│   │   │   ├── FlowEditor.tsx
│   │   │   └── Toolbar.tsx
│   │   ├── hooks/      # Custom hooks
│   │   │   ├── useDnD.tsx
│   │   │   ├── useDragDrop.tsx
│   │   │   ├── useFlowOperations.tsx
│   │   │   ├── useLocalStorage.tsx
│   │   │   └── useNodeDeletion.tsx
│   │   └── providers/  # Contextos y proveedores
│   │       └── DnDProvider.tsx
│   └── nodes/          # Componentes de nodos
│       ├── ConditionNode.tsx
│       ├── EmailNode.tsx
│       ├── ResultNode.tsx
│       ├── StartNode.tsx
│       └── WaitNode.tsx
├── types/              # Tipos e interfaces
│   ├── editorTypes.ts
│   └── nodeTypes.ts
├── utils/              # Utilidades
│   └── exportUtils.ts
├── App.tsx             # Componente raíz
└── main.tsx            # Punto de entrada
```

### Requisitos previos

- Node.js v18+
- npm o yarn

### Pasos

1. Clona el repositorio o descomprime el archivo ZIP

```bash
git clone https://github.com/melodiaz23/workflow-automation-builder.git
```

2. Navega al directorio del proyecto

```bash
cd workflow-automation-builder
```

3. Instala las dependencias

```bash
npm install
# o
yarn install
```

4. Inicia el servidor de desarrollo

```bash
npm run dev
# o
yarn dev
```

5. Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

## Cómo Usar

La aplicación tiene un vista inicial para efectos de que se visualice de forma previa cómo podrían verse los nodos. Puedes eliminarlos y adicionar nuevos según la necesidad.

1. **Añadir nodos**: Arrastra componentes desde la barra de herramientas inferior al lienzo, o haz clic sobre ellos para añadirlos al centro.
2. **Conectar nodos**: Haz clic en un punto de conexión (handle) de un nodo y arrastra hasta el handle de otro nodo para crear una conexión.
3. **Configurar nodos**:
   - **Email**: Edita el título y contenido del email
   - **Wait**: Establece la duración en horas
   - **Condition**: Define la condición lógica para bifurcar el flujo
4. **Eliminar nodos**: Utiliza el botón X en cada nodo (en el caso de "condition" eliminará también conexiones relacionadas).
5. **Guardar**: Opción de guardado del flujo de trabajo.
6. **Exportar**: Haz clic en el botón "Export" en la esquina superior derecha para descargar el flujo como archivo JSON.

## Tiempo Estimado Invertido

- Desarrollo del core y componentes base: 8 horas
- Implementación de interacciones avanzadas: 5 horas
- Estilizado y mejoras de UI: 3 horas
- Solución de bugs y testing: 3 horas
- **Total aproximado**: 19 horas

Desarrollado como parte de una prueba técnica por: **Melissa Díaz**.
