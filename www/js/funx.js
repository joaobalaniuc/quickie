//===================================
// FAZER DEBUG DE FUNÇÃO
// -
// function teste(id, fav) {
// 
//   this.scope [id,fav]; // repetir variaveis do escopo
//   debug(this); // inicio debug
//   ...
//   debug(this,1); // fim do debug
// 
// }
// -
//===================================
function debug(parent, end) {
    //
    if (sessionStorage.debug === 0) {
        return false;
    }
    // inicio ou fim da função?
    if (end === undefined)
        var pre = "*** [RUN]";
    else
        var pre = "--- [END]";
    // retorno
    var echo = pre + " ";
    // corpo da função
    var f = arguments.callee.caller.toString();
    // nome da função
    var myName = f.substr('function '.length);
    myName = myName.substr(0, myName.indexOf('(')); // separa nome da função
    echo += myName + " (";
    // variaveis
    if (parent !== undefined) { // tem variaveis?
        var strRem = 'function ' + myName + '('; // define string function <nome>
        var myVar = f.substr(strRem.length); // remove function <nome>
        myVar = myVar.substr(0, myVar.indexOf(')')); // separa string var1,var2,var3
        // separa variaveis
        var split = myVar.split(", ");
        for (var i = 0; i < split.length; i++) {
            var key = split[i];
            //var val = parent.window[split[i]];
            var val = parent.scope[i];
            echo += key + "=" + val;
            if (parseInt(i + 1) < split.length)
                echo += ", ";
        }
    }
    echo += ")";
    console.log(echo); // window["string"] lê variavel de nome "string"
    //alert(myName + "/" + myVar);
}


//-----------------------------------
// INSERIR ARRAY EM SESSION STORAGE
//-----------------------------------
// array antes de chegar aqui deve ser definida como array={}
// ao inves de [], para ter chave alfanumerica
//-
// storeSet: Define um novo array ou remove já existente
function storeSet(name, array) {
    //
    this.scope = [name, array];
    debug(this);
    //
    if (array === undefined || array === 0) {
        sessionStorage.removeItem(name);
        console.log("remove=" + name);
    }
    else {
        sessionStorage[name] = JSON.stringify(array);
    }
}
// storeAdd: Insere um novo array a um array ja existente
function storeAdd(name, array) {
    //
    this.scope = [name, array];
    debug(this);
    //
    var arr = {};
    if (sessionStorage[name] !== undefined) {
        arr = JSON.parse(sessionStorage[name]);
        // adiciona
        arr.push(array);
    }
    // cria
    else {
        arr = [array];
    }
    sessionStorage[name] = JSON.stringify(arr);
    console.log(sessionStorage[name]);
}
// storeInc: Adiciona ou altera chave de um array já existente
function storeInc(name, inc_key, inc_val) {
    //
    this.scope = [name, inc_key, inc_val];
    debug(this);
    //
    var array = {};
    if (sessionStorage[name] !== undefined)
        var array = JSON.parse(sessionStorage[name]);

    if (inc_val === undefined)
        delete array[inc_key];
    else
        array[inc_key] = inc_val;
    //
    sessionStorage[name] = JSON.stringify(array);
}
// storeGet: Obtém valor de array já existente
function storeGet(name, key) {
    if (sessionStorage[name] === undefined)
        return undefined;
    var array = JSON.parse(sessionStorage[name]);
    if (key !== undefined)
        return array[key];
    else
        return array;
}