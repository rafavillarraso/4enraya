var numCol = 7; //numero de columnas del juego

function dimeColumna(n) { //devuelve la columna en que esta el numero(con la operación de resto)
    var col;
    col= n % numCol;
    if (col == 0) {
        return 7;
    } else {
        return col;
    }
}

function dimeAlturaColumna(col) {
    var altura = numCol;
    for (i=col; altura>0; i=i+7) {
        if ((getContenido(i) == "X") || (getContenido(i) == "O") ) return altura;
        altura--;
    }
    return altura;
/*
    var i = col;
    for (altura=numCol; altura>0; altura--) {
        if ((getContenido(i) == "X") || (getContenido(i) == "O") ) return altura;
        i=i+7;
    }
    return altura;
*/
} 

function tiradaMaquina() {
    var col;
    max=8;  min=1;
    do {
        col = Math.floor(Math.random() * (max - min)) + min;
        var altura;
        altura=dimeAlturaColumna(col);
    } while (altura == 7);
   
    document.getElementById(dimeCasilla(col, altura)).innerHTML="O";
}

function getContenido(casilla) {
    return document.getElementById(casilla).textContent;
}

//Para comprobar el ganador

function cuatroEnRaya (num1,num2,num3,num4) {
    var contenido1;
    contenido1=getContenido(num1);
    var contenido2;
    contenido2=getContenido(num2);
    var contenido3;
    contenido3=getContenido(num3);
    var contenido4;
    contenido4=getContenido(num4);

    if (contenido1==contenido2 && contenido1==contenido3 && contenido1==contenido4 && contenido1 != "") return true;
    else return false;
}

//comprobar filas
function comprobarFila (nFila) {
    a=crearFila (nFila);
    for (i=0; i<4; i++) {
        if (cuatroEnRaya(a[i],a[i+1],a[i+2],a[i+3])) return true;
    }
    return false;
}

function crearFila (n) {
    var n2;
    n2 = (numCol*(n-1))+1;
    return [n2,n2+1,n2+2,n2+3,n2+4,n2+5,n2+6];
    }

//comprobar columnas
function comprobarColumna (nCol) {
    a = crearColumna(nCol);
    for (i=0; i<4; i++) {
        if (cuatroEnRaya(a[i],a[i+1],a[i+2],a[i+3])) return true;
    }
    return false;
}

/*
function crearColumna (n) {
    return [n,n+numCol,n+(numCol*2),n+(numCol*3),n+(numCol*4),n+(numCol*5),n+(numCol*6)];
}
*/

function crearColumna (n) {
    return [n,n+7,n+14,n+21,n+28,n+35,n+42];
}

// comprobar diagonales hay 2 diagonales de 7, 4 de 6, 4 de 5 y 4 de 4

function comprobarDiagonal (n) {
    if (n==4) {
        a=diagonalIzda(n);
        b=diagonalDcha(n);
        if (cuatroEnRaya (a[0],a[1],a[2],a[3])) return true;
        if (cuatroEnRaya (b[0],b[1],b[2],b[3])) return true;
    } else if (n==1 || n==2 || n==3 || n==8 || n==15 || n==22) {
        c=diagonalIzda(n);
        for (i=0;i<c.length-3;i++) {
            if (cuatroEnRaya(c[i],c[i+1],c[i+2],c[i+3])) return true;
        }
    } else if (n==5 || n==6 || n==7 || n==14 || n==21 || n==28) {
        d=diagonalDcha(n);
        for (i=0;i<d.length-3;i++) {
            if (cuatroEnRaya(d[i],d[i+1],d[i+2],d[i+3])) return true;
        }
    } 
    return false;
}

function diagonalIzda (ini) {
    if (ini==1) return [ini,ini+8,ini+16,ini+24,ini+32,ini+40,ini+48];
    else if (ini==2 || ini==8) return [ini,ini+8,ini+16,ini+24,ini+32,ini+40];
    else if (ini==3 || ini==15) return [ini,ini+8,ini+16,ini+24,ini+32];
    else if (ini==4 || ini==22) return [ini,ini+8,ini+16,ini+24];
    return null;
}

function diagonalDcha (ini) {
    if (ini==7) return [ini,ini+6,ini+12,ini+18,ini+24,ini+30,ini+36];
    else if (ini==6 || ini==14) return [ini,ini+6,ini+12,ini+18,ini+24,ini+30];
    else if (ini==5 || ini==21) return [ini,ini+6,ini+12,ini+18,ini+24];
    else if (ini==4 || ini==28) return [ini,ini+6,ini+12,ini+18];
    return null;

}


//comprobar el ganador
function comprobarGanador() {
    for (j=1; j<8; j++) {
        if (comprobarFila(j)) return true;
        else if (comprobarColumna(j)) return true;
    }
    var inicios = [1,2,3,4,5,6,7,8,14,15,21,22,28];
    for (l=0; l<inicios.length-1;l++) {
        if (comprobarDiagonal(inicios[l])) return true;
    }
    return false;
}



function dimeCasilla (col,fil) {
    aux=(numCol-(fil+1));
    return aux*numCol+col;
}

function tirada (numero) {
    var columna;
    columna=dimeColumna(numero);
    var altura;
    altura=dimeAlturaColumna(columna);
    document.getElementById(dimeCasilla(columna, altura)).innerHTML="X";
    
    if (comprobarGanador()) {
        alert("Has ganado");
    } else {
    
        tiradaMaquina();
        if (comprobarGanador()) alert("Has perdido");
    }
    
}

function borrarTodo() {
    for (k=1; k<50; k++) {
        document.getElementById(k).innerHTML="";
    }
}