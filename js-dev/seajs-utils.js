define(function (require, exports, module){
    var httpClient=require("seajs-httpClient"),
        waiting = require("seajs-waiting"),
        myUtils=require("/seajs-myUtils");
    for(var o in myUtils){
        if(myUtils.hasOwnProperty(o))exports[o]=myUtils[o];
    }
    String.prototype.replaceAll = function(s1,s2){
        return this.replace(new RegExp(s1,"gm"),s2);
    };
    HTMLElement.prototype.removeClass=function(className){
        var r=new RegExp(className+" *","g");
        this.className=this.className.replace(r,"");
    };
    HTMLElement.prototype.addClass=function(className){
        if(new RegExp(" "+className+" ","g").test(" "+this.className+" "))return;
        this.className+=(" "+className);
    };
    Number.prototype.plusSign=function() {
        if(this>0){
            return "+"+this;
        }else{
            return this+"";
        }
    };
    String.prototype.plusSign=Number.prototype.plusSign;
    window.addEventListener("pageshow",function(e){
        if(e.persisted){
            location.reload();
        }
    });
    Date.prototype.format = function (format) {
        var date = {
            "M+": this.getMonth() + 1,
            "d+": this.getDate(),
            "h+": this.getHours(),
            "m+": this.getMinutes(),
            "s+": this.getSeconds(),
            "q+": Math.floor((this.getMonth() + 3) / 3),
            "S+": this.getMilliseconds()
        };
        if (/(y+)/i.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (var k in date) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
            }
        }
        return format;
    };
    var loadHtml=new function(){
        var tasks={};
        this.main=function(url,fuc){
            if(tasks.hasOwnProperty(url)){
                var task=tasks[url];
                if(task.isLoading){
                    if(!task.delayDo)task.delayDo=[];
                    task.delayDo.push(fuc);
                    return;
                }
                if(task.isLoadOver){
                    if(fuc)fuc();
                    return;
                }
            }
            tasks[url]={isLoading:true};
            httpClient.get(url,function(rs){
                var div=document.createElement("div");
                div.innerHTML=rs;
                for(var i= 0,l=div.childNodes.length;i<l;i++){
                    document.body.appendChild(div.childNodes[i]);
                }
                if(fuc)fuc();
                var task=tasks[url];
                if(task.delayDo){
                    for(var i= 0,l=task.delayDo.length;i<l;i++){
                        if(task.delayDo[i])task.delayDo[i]();
                    }
                    task.delayDo=null;
                }
                tasks[url].isLoading=false;
                tasks[url].isLoadOver=true;
            });
        };
    }();
    var newUse=function(array,fuc){
        this.num=array.length;
        this.fuc=fuc;
        waiting.show();
        for(var i=0;i<array.length;i++){
            this.loadFile(array[i]);
        }
        waiting.hide();
    };
    newUse.prototype.loadFile=function(array){
        var that=this;
        if (typeof(array) == "string") {
            array = [array]
        }
        var tmp=array[0].split(".");
        var loadFuc=((tmp.length>1&&tmp[tmp.length-1]=="html")?loadHtml.main:seajs.use);
        if (array.length == 1) {
            loadFuc(array[0],function(){
                if(--that.num==0){
                    if(that.fuc)that.fuc();
                }
            });
        } else {
            loadFuc(array[0], function () {
                array.shift();
                that.loadFile(array);
            })
        }
    };
    exports.use=function(array,fuc){
        seajs.use("seajs-css",function(){
            new newUse(array,fuc);
        });
    };
    exports.$id=function(id){
        return document.getElementById(id);
    };
    exports.$name=function(name){
        return document.getElementsByName(name);
    };
    exports.$tagName=function(name){
        return document.getElementsByTagName(name);
    };
    exports.go=function(url,mode){
        waiting.show();
        if(mode){
            location.replace(url);
        }else{
            location.href=url;
        }
    };
    if(sessionStorage.getItem("refresh")=="true"){
        sessionStorage.setItem("refresh",false);
        location.reload();
    };
    exports.back=function(index,mode){
        if(index===true){
            sessionStorage.setItem("refresh",true);
            history.go(-1);
            return;
        }
        if(mode){
            sessionStorage.setItem("refresh",true);
        }
        if(index){
            history.go(-Math.abs(index));
        }else{
            history.go(-1);
        }
    };
    exports.newInstance = function () {
        return exports;
    };
});