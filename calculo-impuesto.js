/**
 * ============================================================
 * MÓDULO DE CÁLCULO DE IMPUESTOS REGIONALES
 * ============================================================
 * 
 * Este módulo calcula el monto final después de aplicar:
 * - Un descuento fijo del 15% sobre una tasa base
 * - Un ajuste adicional para la región de El Salvador (SV)
 * 
 * @author [Tu nombre]
 * @version 1.0.0
 * @date 30/06/2026
 */

// ============================================================
// CONFIGURACIÓN
// ============================================================

/**
 * Configuración de impuestos
 * Valores fijos que pueden ser modificados fácilmente
 */
const CONFIG = {
    PORCENTAJE_DESCUENTO: 0.15,      // 15% de descuento
    AJUSTES_REGIONALES: {
        SV: 13,                       // Ajuste para El Salvador
        MX: 0,                        // Ajuste para México (por defecto 0)
        US: 0,                        // Ajuste para USA (por defecto 0)
        AR: 5,                        // Ajuste para Argentina
        CO: 3                         // Ajuste para Colombia
    }
};

// ============================================================
// FUNCIÓN PRINCIPAL
// ============================================================

/**
 * Calcula el monto final después de aplicar descuentos y ajustes regionales
 * 
 * @param {number} montoBase - Monto base o ingreso bruto
 * @param {number} tasaBase - Tasa de referencia para calcular el 15% de descuento
 * @param {string} region - Código de país/región (ej. "SV" para El Salvador)
 * @returns {number} Monto final calculado
 * @throws {Error} Si los parámetros no son válidos
 * 
 * @example
 * // Calcular para El Salvador
 * calcularImpuesto(100, 10, "SV") // 111.5
 * 
 * @example
 * // Calcular para México
 * calcularImpuesto(100, 10, "MX") // 98.5
 */
function calcularImpuesto(montoBase, tasaBase, region) {
    // ============================================================
    // 1. VALIDACIÓN DE PARÁMETROS
    // ============================================================
    
    // Validar que montoBase sea un número
    if (typeof montoBase !== 'number') {
        throw new TypeError(`montoBase debe ser un número. Recibido: ${typeof montoBase}`);
    }
    
    // Validar que tasaBase sea un número
    if (typeof tasaBase !== 'number') {
        throw new TypeError(`tasaBase debe ser un número. Recibido: ${typeof tasaBase}`);
    }
    
    // Validar que region sea un string
    if (typeof region !== 'string') {
        throw new TypeError(`region debe ser un string. Recibido: ${typeof region}`);
    }
    
    // Validar que la región esté en mayúsculas (recomendación)
    if (region !== region.toUpperCase()) {
        console.warn(`⚠️ La región "${region}" debería estar en mayúsculas. Usando "${region.toUpperCase()}"`);
        region = region.toUpperCase();
    }
    
    // ============================================================
    // 2. CÁLCULO DEL DESCUENTO
    // ============================================================
    
    // Calcular el descuento del 15%
    const descuento = tasaBase * CONFIG.PORCENTAJE_DESCUENTO;
    
    // ============================================================
    // 3. APLICAR DESCUENTO BASE
    // ============================================================
    
    // Restar el descuento al monto base
    const resultadoParcial = montoBase - descuento;
    
    // ============================================================
    // 4. APLICAR AJUSTE REGIONAL
    // ============================================================
    
    // Obtener el ajuste para la región (si existe, sino 0)
    const ajuste = CONFIG.AJUSTES_REGIONALES[region] || 0;
    
    // Aplicar el ajuste al resultado
    const resultadoFinal = resultadoParcial + ajuste;
    
    // ============================================================
    // 5. LOG Y RETORNO
    // ============================================================
    
    // Registrar el cálculo (útil para debugging)
    console.log(`📊 Cálculo: ${montoBase} - (${tasaBase} × 15%) + ${ajuste} = ${resultadoFinal}`);
    
    return resultadoFinal;
}

// ============================================================
// FUNCIONES AUXILIARES
// ============================================================

/**
 * Formatea un número como moneda
 * @param {number} valor - El valor a formatear
 * @param {string} moneda - Símbolo de la moneda (por defecto "$")
 * @returns {string} Valor formateado como moneda
 */
function formatearMoneda(valor, moneda = '$') {
    return `${moneda}${valor.toFixed(2)}`;
}

/**
 * Muestra un resumen detallado del cálculo
 * @param {number} montoBase - Monto base
 * @param {number} tasaBase - Tasa base
 * @param {string} region - Código de región
 */
function mostrarDetalleCalculo(montoBase, tasaBase, region) {
    const descuento = tasaBase * CONFIG.PORCENTAJE_DESCUENTO;
    const ajuste = CONFIG.AJUSTES_REGIONALES[region] || 0;
    const resultado = calcularImpuesto(montoBase, tasaBase, region);
    
    console.log('\n' + '='.repeat(50));
    console.log('📋 DETALLE DEL CÁLCULO');
    console.log('='.repeat(50));
    console.log(`💰 Monto base:      ${formatearMoneda(montoBase)}`);
    console.log(`📊 Tasa base:       ${tasaBase}`);
    console.log(`📍 Región:          ${region}`);
    console.log(`🔽 Descuento (15%): ${formatearMoneda(descuento)}`);
    console.log(`➕ Ajuste regional: ${formatearMoneda(ajuste)}`);
    console.log(`✅ Resultado final: ${formatearMoneda(resultado)}`);
    console.log('='.repeat(50) + '\n');
}

// ============================================================
// EJEMPLOS DE USO
// ============================================================

console.log('\n🚀 EJECUTANDO EJEMPLOS DE CÁLCULO DE IMPUESTOS\n');

// Ejemplo 1: El Salvador
console.log('📌 EJEMPLO 1: El Salvador');
const resultado1 = calcularImpuesto(100, 10, "SV");
console.log(`Resultado: ${resultado1}\n`);

// Ejemplo 2: México
console.log('📌 EJEMPLO 2: México');
const resultado2 = calcularImpuesto(100, 10, "MX");
console.log(`Resultado: ${resultado2}\n`);

// Ejemplo 3: Argentina
console.log('📌 EJEMPLO 3: Argentina');
const resultado3 = calcularImpuesto(100, 10, "AR");
console.log(`Resultado: ${resultado3}\n`);

// Ejemplo 4: Montos grandes en SV
console.log('📌 EJEMPLO 4: Monto grande en El Salvador');
const resultado4 = calcularImpuesto(500, 20, "SV");
console.log(`Resultado: ${resultado4}\n`);

// Ejemplo 5: Región no soportada
console.log('📌 EJEMPLO 5: Región no soportada');
const resultado5 = calcularImpuesto(100, 10, "XX");
console.log(`Resultado: ${resultado5}\n`);

// ============================================================
// DEMOSTRACIÓN CON DETALLES
// ============================================================

console.log('\n📊 DEMOSTRACIÓN CON DETALLES\n');

// Mostrar cálculo detallado para SV
mostrarDetalleCalculo(100, 10, "SV");

// Mostrar cálculo detallado para MX
mostrarDetalleCalculo(100, 10, "MX");

// Mostrar cálculo detallado para AR
mostrarDetalleCalculo(200, 15, "AR");

// ============================================================
// PRUEBAS CON DIFERENTES ESCENARIOS
// ============================================================

console.log('\n🧪 PRUEBAS CON DIFERENTES ESCENARIOS\n');

const pruebas = [
    { monto: 100, tasa: 10, region: "SV", descripcion: "Caso normal SV" },
    { monto: 100, tasa: 10, region: "MX", descripcion: "Caso normal MX" },
    { monto: 0, tasa: 10, region: "SV", descripcion: "Monto base cero" },
    { monto: 100, tasa: 0, region: "SV", descripcion: "Tasa base cero" },
    { monto: -50, tasa: 10, region: "SV", descripcion: "Monto negativo" },
    { monto: 100, tasa: 10, region: "sv", descripcion: "Región en minúsculas" },
    { monto: 1000, tasa: 50, region: "CO", descripcion: "Monto grande en Colombia" }
];

pruebas.forEach((prueba, index) => {
    console.log(`Prueba ${index + 1}: ${prueba.descripcion}`);
    try {
        const resultado = calcularImpuesto(prueba.monto, prueba.tasa, prueba.region);
        console.log(`  ✅ Resultado: ${resultado}\n`);
    } catch (error) {
        console.log(`  ❌ Error: ${error.message}\n`);
    }
});

// ============================================================
// EXPORTAR FUNCIONES (para usar en otros archivos)
// ============================================================

// Si usas Node.js con módulos ES6
// export { calcularImpuesto, formatearMoneda, mostrarDetalleCalculo };

// Si usas Node.js con CommonJS
// module.exports = {
//     calcularImpuesto,
//     formatearMoneda,
//     mostrarDetalleCalculo
// };

console.log('\n✅ ¡Todas las pruebas completadas!');
console.log('📝 El código está listo para producción.\n');