var el=new function(){
    this.toperaciones = 0;
    this.ttests=0;    
    this.ntest=0;
    this.noperacion=0;

    this.setTOperaciones=function(t){
        this.toperaciones = document.getElementById('noperaciones'+t).value;
    }

    this.nmatrizyoperaciones=function(){
        
    };
    this.selectActions=function(){
        var retorno = '';  
        
        if(this.noperacion<this.toperaciones){            
            var numero = this.noperacion+1;
            retorno+='<div class="bloque3" name="test+'+this.ntest+this.noperacion+'" id="test'+this.ntest+this.noperacion+'">';
            retorno+='<label for="selectaction'+this.ntest+this.noperacion+'">Operacion #'+numero+'</label>';
            retorno += '<select name="selectaction'+this.ntest+this.noperacion+'" id="selectaction'+this.ntest+this.noperacion+'">';
            retorno += '<option value="update">UPDATE</option>';
            retorno += '<option value="query">QUERY</option>';
            retorno += '</select>';
            retorno+='<button id="btnoperacion'+this.ntest+this.noperacion+'" onclick="el.setAction('+this.ntest+','+this.noperacion+');">Aceptar</button>';
            retorno+='<div name="datos'+this.ntest+this.noperacion+'" id="datos'+this.ntest+this.noperacion+'">';
            retorno+='</div>';     
            retorno+='</div>';            
        }else{
            if(this.ntest<this.ttests){

                $.ajax({
                   type:'POST',
                   data:{accion:'clearSave'},
                   url:'admins/adminactions.jsp',
                   success:function(){
                       
                        el.ntest= el.ntest+1;
                        el.noperacion=0;                       
                        el.setTests();
                   }
                });                
                
            }
        }

        document.getElementById('acciones'+this.ntest).innerHTML=retorno;               
    };
    
    this.setAction=function(ntest,nop){
        var datos = '';
        
        var accion = document.getElementById('selectaction'+ntest+nop).value;
        switch(accion){
            case 'update':
                datos+='<label for="x1">x1</label>';
                datos+='<input type="text" id="x1" name="x1"/>';
                datos+='<label for="y1">y1</label>';
                datos+='<input type="text" id="y1" name="y1"/>';
                datos+='<label for="z1">z1</label>';
                datos+='<input type="text" id="z1" name="z1"/>';
                datos+='<label for="w">Valor</label>';
                datos+='<input type="text" id="w" name="w"/>';
                datos+='<button id="btnupdate'+ntest+nop+'" onclick="el.update('+ntest+','+nop+');">Aceptar</button>';
                datos+='</div>';                
                document.getElementById('datos'+ntest+nop).innerHTML=datos;
                break;                
            case 'query':
                datos+='<div class="rc1">(<label for="x1">x1</label>';
                datos+='<input type="text" id="x1" name="x1"/>';
                datos+='<label for="y1">y1</label>';
                datos+='<input type="text" id="y1" name="y1"/>';
                datos+='<label for="z1">z1</label>';
                datos+='<input type="text" id="z1" name="z1"/>)</div></br>';
                
                datos+='<div class="rc2">(<label for="x2">x2</label>';
                datos+='<input type="text" id="x2" name="x2"/>';
                datos+='<label for="y2">y2</label>';
                datos+='<input type="text" id="y2" name="y2"/>';
                datos+='<label for="z2">z2</label>';
                datos+='<input type="text" id="z2" name="z2"/>)</div></br>';
                datos+='<button id="btnquery'+ntest+nop+'" onclick="el.query('+ntest+','+nop+');">Aceptar</button>';
                datos+='</div>';                 
                document.getElementById('datos'+ntest+nop).innerHTML=datos;                
                break;
        }
    };
    
    this.update=function(ntest,nop){
        var x1 = $('#x1').val();
        var y1 = $('#y1').val();
        var z1 = $('#z1').val();
        var w = $('#w').val();
        var t = this;
        $.ajax({
           type:'POST',
           data:{accion:'update',x1:x1,y1:y1,z1:z1,w:w},
           url:'admins/adminactions.jsp',
           success:function(){
               $('#test'+ntest+nop).hide();               
               el.noperacion=el.noperacion+1;                                  
               el.selectActions();
           }
        });        
    };
    
    this.query=function(ntest,nop){
        var x1 = $('#x1').val();
        var y1 = $('#y1').val();
        var z1 = $('#z1').val();
        var x2 = $('#x2').val();
        var y2 = $('#y2').val();
        var z2 = $('#z2').val();        
        
        $.ajax({
           type:'POST',
           data:{accion:'query',x1:x1,y1:y1,z1:z1,x2:x2,y2:y2,z2:z2},
           url:'admins/adminactions.jsp',
           success:function(response){
               alert(response);
                $('#test'+ntest+nop).hide();   
               el.noperacion=el.noperacion+1;                                  
               el.selectActions();               
           }
        });        
    };    
    
    this.setTests=function(){
        var divs = '' ;
    
        if(el.ntest<el.ttests){
            var numero = el.ntest+1;
            divs+='<div class="bloque2" name="test+'+el.ntest+'" id="test'+el.ntest+'">';
            divs+='<label>Test #'+numero+': </label>';
            divs+='<label for="nmatriz'+el.ntest+'">N (dimension de la matriz)</label>';
            divs+='<input type="text" id="nmatriz'+el.ntest+'" name="nmatriz'+el.ntest+'">';
            divs+='<label for="noperaciones'+el.ntest+'"># de operaciones</label>';
            divs+='<input type="text" id="noperaciones'+el.ntest+'" name="noperaciones'+el.ntest+'">';
            divs+='<button id="btnoperaciones'+el.ntest+'" onclick="el.setTOperaciones('+el.ntest+');el.selectActions('+el.ttests+','+el.ntest+');">Aceptar</button>';
            divs+='<div name="acciones'+el.ntest+'" id="acciones'+el.ntest+'">';
            divs+='</div>';
            divs+='</div>';
        }
        document.getElementById('desarrollo').innerHTML=divs;        
    }
};

document.getElementById('btntests').addEventListener('click',function(){  
    el.ttests=document.getElementById('tests').value;   

    el.setTests();
});

