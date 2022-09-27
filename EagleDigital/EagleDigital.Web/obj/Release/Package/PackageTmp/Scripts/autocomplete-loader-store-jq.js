
(function($,can,HP){if(!Object['keys']){Object.keys=function(obj){var keys=[];for(var i in obj){if(obj.hasOwnProperty(i)){keys.push(i);}}
return keys;};}
can.view.ejs('ACLoaderStoreEJS','    <ul>'+'        <% can.$.each(list, function( i, item ) { '+'          var key = Object.keys(this)[0]; %>'+'                <li>'+'                    <a id="i<%= i%>" href="javascript:void(0);" class="js_suggestion_text" data-suggestion="<%=key%>">'+'                        <%= key %>'+'                    </a>'+'                </li>'+'        <% }) %>'+'    </ul>');HP.StoreAutocompleteLoader=can.Control({defaults:{view:"ACLoaderStoreEJS",language:'',country:'',requestType:'jsonp',url:'',count:5,callbackParam:'cbf'}},{'init':function(element,options){this.type='hho-store';},'getSuggestions':function(query,callback){var params={term:query,lang:this.options.language};var result={'query':query,'html':'','itemsCount':0};var self=this;$.ajax({url:this.options.url,data:params,success:function(data){if(data){var items=data.terms;if(items&&items.length!=0){if(self.options.count<items.length){items=items.slice(0,self.options.count);}
result.html=can.view.render(self.options.view,{list:items});result.itemsCount=items.length;}}
callback(result);},error:function(){callback(null);},dataType:this.options.requestType,jsonp:this.options.callbackParam});},'getParams':function(){return this.options;},'setParams':function(params){this.options=$.extend(true,this.options,params);}});})(can.$,can,window.HP||(window.HP={}));window.autocompleteLoader.addLoader(new HP.StoreAutocompleteLoader(null,{}));

/*
Date: 3/15/2015 2:29:37 PM
All images published
*/