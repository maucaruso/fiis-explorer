
var reorderArray = function reorderArr(arr){
    var obja = arr
    
    var sorto = {
        vacancia:"asc", dividendYeald12m:"desc", p_vpa:"asc", liquidez: "desc", diversificacao: "desc", patrimonio_liquido: "desc"
    }; 
    
    Array.prototype.keySort = function(keys) {
    
        keys = keys || {};
    
        var obLen = function(obj) {
            var size = 0, key;
            for (key in obj) {
                if (obj.hasOwnProperty(key))
                    size++;
            }
            return size;
        };
    
        var obIx = function(obj, ix) {
            var size = 0, key;
            for (key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (size == ix)
                        return key;
                    size++;
                }
            }
            return false;
        };
    
        var keySort = function(a, b, d) {
            d = d !== null ? d : 1;
    
            if (a == b)
                return 0;
            return a > b ? 1 * d : -1 * d;
        };
    
        var KL = obLen(keys);
    
        if (!KL) return this.sort(keySort);
    
        for ( var k in keys) {
            
            keys[k] = 
                    keys[k] == 'desc' || keys[k] == -1  ? -1 
                    : (keys[k] == 'skip' || keys[k] === 0 ? 0 
                    : 1);
        }
    
        this.sort(function(a, b) {
            var sorted = 0, ix = 0;
    
            while (sorted === 0 && ix < KL) {
                var k = obIx(keys, ix);
                if (k) {
                    var dir = keys[k];
                    sorted = keySort(a[k], b[k], dir);
                    ix++;
                }
            }
            return sorted;
        });
        return this;
    };
    
    var print = function(obj, delp, delo, ind){
        delp = delp!=null ? delp : "\t"; // property delimeter
        delo = delo!=null ? delo : "\n"; // object delimeter
        ind = ind!=null ? ind : " "; // indent; ind+ind geometric addition not great for deep objects
        var str='';
        
        for(var prop in obj){
            if(typeof obj[prop] == 'string' || typeof obj[prop] == 'number'){
                var q = typeof obj[prop] == 'string' ? "" : ""; // make this "'" to quote strings
                str += ind + prop + ': ' + q + obj[prop] + q + '; ' + delp;
            }else{
                str += ind + prop + ': {'+ delp + print(obj[prop],delp,delo,ind+ind) + ind + '}' + delo;
            }
        }
        return str;
    };
    
    obja.keySort(sorto);
    return obja;
}

module.exports = reorderArray;