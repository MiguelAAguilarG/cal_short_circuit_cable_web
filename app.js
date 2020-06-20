const calibres_string_array = ['14', '12', '10', '8', '6', '4', '3', '2', '1', '1/0', '2/0', '3/0', '4/0', '250', '300', '350', '400', '500', '600', '700', '750', '800', '900', '1000', '1250', '1500', '1750', '2000'];

const calibres_number_array = [14, 12, 10, 8, 6, 4, 3, 2, 1, 0, -1, -2, -3, 250, 300, 350, 400, 500, 600, 700, 750, 800, 900, 1000, 1250, 1500, 1750, 2000];

const calibres_area_mm_array =[2.08, 3.31, 5.26, 8.37, 13.3, 21.2, 26.7, 33.6, 42.4, 53.49, 67.43, 85.01, 107.2, 127, 152.0, 177, 203, 253, 304, 355, 380, 405, 456, 507, 633, 700, 887, 1013];

window.addEventListener("load",calculo_principal,false);
document.getElementById("formulario").addEventListener("change", calculo_principal);

function calculo_principal () {
    document.getElementById("lista_desplegable_calibre").disabled = true;

    var $calibre_aux = document.getElementById("lista_desplegable_calibre").value;
    if ($calibre_aux == '0') {
        var $calibre_mayor_aux = document.getElementById("calibre_calibre_mayor").textContent;
        document.getElementById("lista_desplegable_calibre").value = $calibre_mayor_aux;
    }
    
    var object_variables = obtener_variables();
    var $material = object_variables.$material;
    if ($material == 'aluminio') {
        document.getElementById("aislamiento_termoplastico").disabled = true;
        document.getElementById("aislamiento_termoplastico").selected = false;
    }
    else{
        document.getElementById("aislamiento_termoplastico").disabled = false;
    }
    var $T1 = Number(object_variables.$T1);
    var $T2 = Number(object_variables.$T2);

    document.getElementById("corriente_number").disabled = false;
    document.getElementById("lista_desplegable_calibre").disabled = false;
    document.getElementById("tiempo_number").disabled = false;

    document.getElementById("corriente_calibre_menor").innerHTML = "";
    document.getElementById("calibre_calibre_menor").innerHTML = "";
    document.getElementById("area_mm_calibre_menor").innerHTML = "";
    document.getElementById("area_cmil_calibre_menor").innerHTML = "";
    document.getElementById("tiempo_calibre_menor").innerHTML = "";

    document.getElementById("corriente_calibre_aprox").innerHTML = "";
    document.getElementById("tiempo_calibre_aprox").innerHTML = "";
    document.getElementById("area_mm_calibre_aprox").innerHTML = "";
    document.getElementById("area_cmil_calibre_aprox").innerHTML = "";
    document.getElementById("tiempo_calibre_aprox").innerHTML = "";

    document.getElementById("corriente_calibre_mayor").innerHTML = "";
    document.getElementById("calibre_calibre_mayor").innerHTML = "";
    document.getElementById("area_mm_calibre_mayor").innerHTML = "";
    document.getElementById("area_cmil_calibre_mayor").innerHTML = "";
    document.getElementById("tiempo_calibre_mayor").innerHTML = "";

    if (object_variables.$opcion_formula == 'corriente') {
        document.getElementById("corriente_number").disabled = true;

        var $tiempo = Number(object_variables.$tiempo);
        var $calibre = object_variables.$calibre;

        for (let index = 0; index < calibres_string_array.length; index++) {
            if (calibres_string_array[index] == $calibre) {
                var $calibre_number_mayor = calibres_number_array[index+1];
                var $calibre_number_menor = calibres_number_array[index-1];
                var $calibre_number = calibres_number_array[index];

                var $calibre_mayor = calibres_string_array[index+1];
                var $calibre_menor = calibres_string_array[index-1];
                break;
            }
        }

        var $area_circular_mil = calibre_a_cmil($calibre_number);
        var $corriente_calculada = formula_corriente($material, $T2, $T1, $tiempo, $area_circular_mil);

        document.getElementById("corriente_calibre_aprox").innerHTML = $corriente_calculada;
        document.getElementById("calibre_calibre_aprox").innerHTML = $calibre;
        document.getElementById("area_mm_calibre_aprox").innerHTML = cmil_a_mm_cuadrados($area_circular_mil);
        document.getElementById("area_cmil_calibre_aprox").innerHTML = $area_circular_mil;
        document.getElementById("tiempo_calibre_aprox").innerHTML = $tiempo;

        document.getElementById("corriente_number").value = $corriente_calculada;

        console.log($corriente_calculada);
        
    }else if (object_variables.$opcion_formula == 'calibre') {
        document.getElementById("lista_desplegable_calibre").disabled = true;
        document.getElementById("lista_desplegable_calibre").selectedIndex = 0;

        var $tiempo = Number(object_variables.$tiempo);
        var $corriente = Number(object_variables.$corriente);

        var $area_circular_mil = formula_area_circular_mil($material, $T2, $T1, $corriente, $tiempo);
        var $calibre = cmil_a_calibre($area_circular_mil);

        document.getElementById("corriente_calibre_aprox").innerHTML = $corriente;
        document.getElementById("calibre_calibre_aprox").innerHTML = "";
        document.getElementById("area_mm_calibre_aprox").innerHTML = cmil_a_mm_cuadrados($area_circular_mil);
        document.getElementById("area_cmil_calibre_aprox").innerHTML = $area_circular_mil;
        document.getElementById("tiempo_calibre_aprox").innerHTML = $tiempo;

        for (let index = 0; index < calibres_string_array.length; index++) {
            if (calibres_string_array[index] == $calibre) {
                var $calibre_number_mayor = calibres_number_array[index];
                var $calibre_number_menor = calibres_number_array[index-1];
                var $calibre_menor = calibres_string_array[index-1];

                var $calibre_mayor = calibres_string_array[index];
                var $calibre_menor = calibres_string_array[index-1];
                break;
            }
        }

        console.log($area_circular_mil);
        console.log($calibre);
        
    }else if ( object_variables.$opcion_formula  == 'tiempo') {
        document.getElementById("tiempo_number").disabled = true;

        var $corriente = Number(object_variables.$corriente);
        var $calibre = object_variables.$calibre;

        for (let index = 0; index < calibres_string_array.length; index++) {
            if (calibres_string_array[index] == $calibre) {
                var $calibre_number_mayor = calibres_number_array[index+1];
                var $calibre_number_menor = calibres_number_array[index-1];
                var $calibre_number = calibres_number_array[index];

                var $calibre_mayor = calibres_string_array[index+1];
                var $calibre_menor = calibres_string_array[index-1];
                break;
            }
        }

        var $area_circular_mil = calibre_a_cmil($calibre_number);
        var $tiempo = formula_tiempo($material, $T2, $T1, $corriente, $area_circular_mil);

        document.getElementById("corriente_calibre_aprox").innerHTML = $corriente;
        document.getElementById("calibre_calibre_aprox").innerHTML = $calibre;
        document.getElementById("area_mm_calibre_aprox").innerHTML = cmil_a_mm_cuadrados($area_circular_mil);
        document.getElementById("area_cmil_calibre_aprox").innerHTML = $area_circular_mil;
        document.getElementById("tiempo_calibre_aprox").innerHTML = $tiempo;
        
        document.getElementById("tiempo_number").value = $tiempo;

        console.log($tiempo);
        
    }else {

    }

    var $area_circular_mil_mayor = calibre_a_cmil($calibre_number_mayor);
    var $corriente_calculada_mayor = formula_corriente($material, $T2, $T1, $tiempo, $area_circular_mil_mayor);

    document.getElementById("corriente_calibre_mayor").innerHTML = $corriente_calculada_mayor;
    document.getElementById("calibre_calibre_mayor").innerHTML = $calibre_mayor;
    document.getElementById("area_mm_calibre_mayor").innerHTML = cmil_a_mm_cuadrados($area_circular_mil_mayor);
    document.getElementById("area_cmil_calibre_mayor").innerHTML = $area_circular_mil_mayor;
    document.getElementById("tiempo_calibre_mayor").innerHTML = $tiempo;

    var $area_circular_mil_menor = calibre_a_cmil($calibre_number_menor);
    var $corriente_calculada_menor = formula_corriente($material, $T2, $T1, $tiempo, $area_circular_mil_menor);
    
    document.getElementById("corriente_calibre_menor").innerHTML = $corriente_calculada_menor;
    document.getElementById("calibre_calibre_menor").innerHTML = $calibre_menor;
    document.getElementById("area_mm_calibre_menor").innerHTML = cmil_a_mm_cuadrados($area_circular_mil_menor);
    document.getElementById("area_cmil_calibre_menor").innerHTML = $area_circular_mil_menor;
    document.getElementById("tiempo_calibre_menor").innerHTML = $tiempo;
}

function obtener_variables() {
    var $corriente = document.getElementById("corriente_number").value;
    if ($corriente == 0) {
        alert('Corriente no puede ser igual a 0');
        document.getElementById("corriente_number").value = 0.5;
        $corriente = 0.5;  
    }

    var $calibre = document.getElementById("lista_desplegable_calibre").value;

    var $tiempo = document.getElementById("tiempo_number").value;
    if ($tiempo == 0) {
        alert('Tiempo no puede ser igual a 0');
        document.getElementById("tiempo_number").value = 0.000001;
        $tiempo = 0.000001;  
    }

    var $material = document.getElementById("lista_desplegable_material_cable").value;

    var $T1 = document.getElementById("temperatura_1").value;

    var $T2 = document.getElementById("lista_desplegable_temperatura_2_aislamiento").value;

    var opcion_formula_array = document.getElementsByName("opcion_formula");
              
    for(i = 0; i < opcion_formula_array.length; i++) { 
        if(opcion_formula_array[i].checked) {
            $opcion_formula = opcion_formula_array[i].value;
        }
    }

    return {$corriente: $corriente, $calibre: $calibre, $tiempo: $tiempo, $material: $material, $T1: $T1, $T2: $T2, $opcion_formula: $opcion_formula}
    
}

function formula_corriente($material, $T2, $T1, $tiempo, $area_circular_mil) {
    if ($material == "cobre") {
        var $corriente_calculada = $area_circular_mil*Math.sqrt(0.0297*Math.log10(($T2+234)/($T1+234))/$tiempo);
    }
    else if ($material == "aluminio") {
        var $corriente_calculada = $area_circular_mil*Math.sqrt(0.0125*Math.log10(($T2+228)/($T1+228))/$tiempo);
    } else {
        alert("Error_$corriente_calculada");
    }

    return $corriente_calculada
}

function formula_area_circular_mil($material, $T2, $T1, $corriente, $tiempo) {
    if ($material == "cobre") {
        var $area_circular_mil = $corriente*Math.sqrt($tiempo/(0.0297*Math.log10(($T2+234)/($T1+234))));
    }
    else if ($material == "aluminio") {
        var $area_circular_mil = $corriente*Math.sqrt($tiempo/(0.0125*Math.log10(($T2+228)/($T1+228))));
    } else {
        alert("Error_$area_circular_mil");
    }

    return $area_circular_mil
}

function formula_tiempo($material, $T2, $T1, $corriente, $area_circular_mil) {
    if ($material == "cobre") {
        var $tiempo = Math.pow($area_circular_mil/$corriente,2)*0.0297*Math.log10(($T2+234)/($T1+234));
    }
    else if ($material == "aluminio") {
        var $tiempo = Math.pow($area_circular_mil/$corriente,2)*0.0125*Math.log10(($T2+228)/($T1+228));
    } else {
        alert("Error_$tiempo");
    }

    return $tiempo
}

function calibre_a_cmil($calibre_number) {
    if ($calibre_number <= 36) {
        var d_mil_pulg = 5*Math.pow(92,(36-$calibre_number)/(39));
        /*diametro del calibre en milesimas de pulgadas*/
        var area_mil_pulg = d_mil_pulg*d_mil_pulg*0.25*Math.PI;
        /*area del calibre en milesimas de pulgadas cuadradas*/
        var un_cmil = 0.25*Math.PI;
        /*definicion de circular mil en mil^2*/
        var cmil = area_mil_pulg/un_cmil;
        /*numero de cuantos cmil tiene el calibre*/
    }
    else{
        var cmil = $calibre_number*1000;
    }

    return cmil
}

function cmil_a_calibre($cmil) {
    if ($cmil < 250000) {
        for (let index = 0; index < calibres_number_array.length; index++) {

            var cmil_calculado = calibre_a_cmil(calibres_number_array[index]);
            if (cmil_calculado >= $cmil) {
                var $calibre = calibres_string_array[index];
                break;
            }

        }
    }
    else{
        var aux= $cmil/1000;
        for (let index = 0; index < calibres_number_array.length; index++) {

            if (calibres_number_array[index] >= aux) {
                var $calibre = calibres_string_array[index];
                break;
            }

        }

    }

    return $calibre
}

function cmil_a_mm_cuadrados($cmil) {
    return $cmil*0.25*Math.PI*25.4*25.4e-6
}
