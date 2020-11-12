// made by boon4681 
var boon = function(){
    let me = this;
    make = function(a,b){
        return {name:a,value:b}
    }
    let uu = {
        string:function(a){
            return (typeof a == "string")
        },
        stringNull:function(a){
            return !(typeof a == "string" && a != "")
        },
        function:function(a){
            return (typeof a == "function")
        },
        boolean:function(a){
            return (typeof a == "boolean")
        },
        object:function(a){
            return (typeof a == "object")
        },
        undefined:function(a){
            return (a==undefined || a==null)
        },
        number:function(a){
            return (typeof a == "number")
        }
    }
    let add = function(a,b,c){
        a.addEventListener(b,function(e){
            c(e,a)
        })
    }
    this.add = function(a,b,c){
        a.addEventListener(b,function(e){
            c(e,a)
        })
    }
    let remove = function(a,b,c){
        a.removeEventListener(b,function(e){
            c(e)
        })
    }
    let get = function(a,b){
        return a.querySelectorAll(b)
    }
    this.switchs = function(a){
        this.main = a
        this.value = []
        let m = this
        this.add = function(a,b,c=false){
            if(uu.string(a) && uu.function(b) && uu.boolean(c)){
                m.value.push({key:a,run:b,break:c})
            }
        }
        this.run = function(){
            for (let i = 0; i < this.value.length; i++) {
                const e = this.value[i];
                if(e.key==m.main){
                    e.run()
                    if(e.break==true) break
                }
            }
        }
    }
    this.forMe = function(a,b){
        for (let i = 0; i < a.length; i++) {
            const e = a[i];
            b(e,i)
        }
    }
    this.get = function(a,b){
        return a.querySelectorAll(b)
    }
    this.attr = function(a,b){
        return a.getAttribute(b)
    }
    this.create = {
        event : function(a,b,c){
            return {type:"event",name:a,event:b,run:c}
        },
        listener : function(a,b,c){
            return {type:"listener",name:a,event:b,run:c}
        },
        window :function(a,b){
            return {type:"window",event:a,run:b}
        },
        handler:{
            class:function(a){
                let m = this
                this.element = (a!= undefined && a.classList!= undefined) ? a : null
                this.add = function(a){
                    if(m.element.classList!=null){
                        m.element.classList.add(a)
                    }
                }
                this.remove = function(a){
                    if(m.element.classList!=null){
                        m.element.classList.remove(a)
                    }
                }
                this.toggle = function(a){
                    if(m.element.classList!=null){
                        m.element.classList.toggle(a)
                    }
                }
                this.has = function(a){
                    if(m.element.classList!=null){
                        return m.element.classList.contains(a)
                    }
                }
            },
            http:function(a){
                let m = this
                this.url = a
                this.get = function(callback){
                    try {
                        let c = (window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP"));
                        c.onreadystatechange = function()
                        {
                            if (c.readyState == 4 && c.status == 200)
                            {
                                callback(c.responseText);
                            }
                        }
                        c.onerror = function(){
                            callback("ERROR",c.status)
                        }
                        c.open("GET", m.url, true);
                        c.send();
                    } catch (error) {}
                }
            }
        }
    }
    this.arr = function(){
        let m = this
        this.value = {}
        this.add = function(a,b){
            if(!uu.stringNull(a)){
                m.value[a] = b
            }else{
                if(uu.stringNull(a)) console.error("error key name undefined")
            }
        }
    }
    this.task =  function(){
        this.value = []
        let m = this.value
        this.new = function(a){
            let c = new me.arr();
            c.add("type","task")
            c.add("run",a)
            return c
        }
        this.add = function(){
            me.forMe(arguments,function(a){
                m.push(a)
            })
        }
        this.run = function(){
            me.forMe(m,function(a){
                if(a.value!=undefined){
                    if(a.value.type=="task"){
                        if(uu.function(a.value.run)){
                            a.value.run()
                        }
                    }
                }
            })
        }
    }
    this.events = function(){
        this.value = []
        let m = this.value
        this.add = function(){
            me.forMe(arguments,function(a){
                m.push(a)
            })
        }
        this.run = function(){
            me.forMe(m,function(a){
                let x = new me.switchs(a.type)
                x.add("event",function(){
                    me.forMe(get(document,'[event="'+a.name+'"]'),function(b){
                        add(b,a.event,a.run)
                    })
                },true)
                x.add("listener",function(){
                    me.forMe(get(document,a.name),function(b){
                        add(b,a.event,a.run)
                    })
                },true)
                x.add("window",function(){
                    add(window,a.event,a.run)
                },true)
                x.run()
            })
        }
        this.reALL = function(){
            me.forMe(m,function(a){
                let x = new me.switchs(a.type)
                x.add("event",function(){
                    me.forMe(get(document,'[event="'+a.name+'"]'),function(b){
                        remove(b,a.event,a.run)
                        add(b,a.event,a.run)
                    })
                },true)
                x.add("listener",function(){
                    me.forMe(get(document,a.name),function(b){
                        remove(b,a.event,a.run)
                        add(b,a.event,a.run)
                    })
                },true)
                x.add("window",function(){
                    remove(window,a.event,a.run)
                    add(window,a.event,a.run)
                },true)
                x.run()
            })
        }
    }
    this.tick = function(a){
        setInterval(() => {
            a()
        }, 1);
    }
    this.st = function(a,b){
        setTimeout(function(){
            a()
        },b*1000)
    }
    this.debug = {
        value:{
            string:function(a){
                return (a instanceof String) || (typeof a == String)
            },
            function:function(a){
                return (a instanceof Function) || (typeof a == Function)
            },
            boolean:function(a){
                return (a instanceof Boolean) || (typeof a == Boolean)
            }
        }
    }
    this.forMe = function(a,b){
        for (let i = 0; i < a.length; i++) {
            b(a[i],i)
        }
    }
    this.token = function(){
        let m = this
        this.value = []
        this.add = function(){
            me.forMe(arguments,(a) => {
                m.value.push(a)
            })
        }
        this.make = function(a,b){
            return {name:a,value:b}
        }
    }
    this.rule = function(){
        let m = this
        this.value = []
        this.make = function(){
            let a = arguments
            let b = []
            me.forMe(a,(e,i)=>{
                if(i!=0) b.push(e)
            })
            return make(a[0],b)
        }
        this.add = function(){
            me.forMe(arguments,(a) => {
                m.value.push(a)
            })
        }
    }
    this.lexer1 = function(a,b){
        // made by boon4681 
        let list = []
        me.forMe(a,(e1) => {
            for (let i = 0; i < b.length; i++) {
                const e2 = b[i];
                if(e1.search(e2.value)==0 || e2.name == "unknown"){
                    list.push(make(e2.name,e1))
                    break
                }   
            }
        })
        console.log(list)
        return list
    }
    this.lexer2 = function(a,b){
        // made by boon4681 
        let nameSave = ""
        let word = ""
        let list = []
        for (let i = 0; i < a.length; i++) {
            const c = a[i];
            if(c.name=="NEWLINE"){
                for (let n = 0; n < b.length; n++) {
                    const d = b[n];
                    if(word.search(d.value)==0){
                        list.push(make(d.name,word))
                        break
                    }
                }
                word=""
                nameSave=""
                list.push(c)
            }else if(nameSave == c.name){
                word+=c.value
            }else{
                for (let n = 0; n < b.length; n++) {
                    const d = b[n];
                    if(word.search(d.value)==0){
                        list.push(make(d.name,word))
                        break
                    }
                }
                nameSave = c.name
                word = c.value
            }
        }
        for (let n = 0; n < b.length; n++) {
            const d = b[n];
            if(word.search(d.value)==0){
                list.push(make(d.name,word))
                break
            }
        }
        console.log(list)
        return list
    }
    this.lexer3 = function(a){
        // made by boon4681 
        let list = []
        let word = ""
        for (let i = 0; i < a.length; i++) {
            let e1 = a[i];
            let i2 = i+1
            let e2 = e1
            if(e1.value=="") continue
            if(i2<a.length) e2 = a[i2]
            if((e1.name=="TEXT" && e2.name=="NUMBER") || (e1.name=="TEXT" && e2.name=="TEXT") || (e1.name=="TEXT" && e2.name=="SUBFUNC")){
                list.push(make(e1.name,e1.value+e2.value))
                i=i+1
            }else{
                if(word!=""){
                    list.push(make(e1.name,word))
                    word=""
                    continue
                }
                list.push(e1)
            }
        }
        console.log(list)
        return list
    }
    this.cmp = function(a){
        // made by boon4681 
        let x = a
        let i=0
        while (true) {
            if(x.length==this.lexer3(x).length || i>20000){
                break
            }
            i++
            x=this.lexer3(x)
        }
        return x
    }
    this.mmp = function(a){
        // made by boon4681 
        let list = []
        let start = false
        let m=""
        let dir = ""
        for (let i = 0; i < a.length; i++) {
            const e = a[i];
            if(e.name=="MORE"){
                list.push({"HEAD":e.value.replace("#@#","").replace("#@#",""),"value":a[i+1].value})
                continue
            }
            if(dir == e.value){
                continue
            }
            if(i-1>0) if(dir == a[i-1].value) continue
            if(e.name=="START" && start==false){
                start=true
                dir=a[i+1].value
                continue
            }
            if(e.name=="STOP" && start==true){
                start=false
                list.push({"path":dir.replace(" ",""),"value":m})
                m=""
            }
            if(start==true){
                m+=e.value
            }
        }
        console.log(list)
        return list
    }
    this.getQ = function(){
        let match
        pl     = /\+/g
        search = /([^&=]+)=?([^&]*)/g
        ww = function (s) { return decodeURIComponent(s.replace(pl, " "))}
        query  = window.location.search.substring(1)
        let urlParams = {}
        while (match = search.exec(query)){
            urlParams[ww(match[1])] = ww(match[2])
        }
        return urlParams
    }
    this.render = {
        // made by boon4681 
        code:function(a,b){
            let e = document.getElementById(a).children[0]
            let color = ""
            let td1 = document.createElement("td")
            let l = 1
            for (let i = 0; i < b.length; i++) {
                const v = b[i];
                switch(v.name){
                    case "MAIN":
                    case "START":
                        color="p-k"
                        break
                    case "SUBFUNC":
                        color="p-s"
                        break
                    case "NUMBER":
                    case "EQUAL":
                    case "BRACKET":
                    case "ENTITIES":
                    case "STOP":
                        color="p-c"
                        break
                    case "MORE":
                        color="p-g"
                        break
                    default:
                        color="p-n"
                }
                let span = document.createElement("span")
                span.classList.add(color)
                span.innerHTML = v.value
                td1.appendChild(span)
                if(v.name=="NEWLINE"){
                    let tr = document.createElement("tr")
                    let td = document.createElement("td")
                    td.innerText = l
                    td.classList.add("l-num")
                    l++;
                    tr.appendChild(td)
                    tr.appendChild(td1)
                    e.appendChild(tr)
                    td1 = document.createElement("td")
                }
            }
        },
        folder:function(a,b,c){
            let icon = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" ><path fill="currentColor" d="M464 128H272l-64-64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V176c0-26.51-21.49-48-48-48z"></path></svg>','<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M369.9 97.9L286 14C277 5 264.8-.1 252.1-.1H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V131.9c0-12.7-5.1-25-14.1-34zM332.1 128H256V51.9l76.1 76.1zM48 464V48h160v104c0 13.3 10.7 24 24 24h104v288H48z" class=""></path></svg>']
            let e = document.getElementById(a).children[0]
            let keys = Object.keys(b).reverse();
            for (let i = 0; i < keys.length; i++) {
                let tr = document.createElement("tr")
                let td = document.createElement("td")
                let td1 = document.createElement("td")
                let span = document.createElement("span")
                if(!Array.isArray(b[keys[i]])){
                    span.innerText = keys[i]
                    td1.appendChild(span)
                    td.innerHTML = icon[0]
                    td.classList.add("p-c0")
                }else{
                    span.innerText = keys[i]
                    td1.appendChild(span)
                    td.innerHTML = icon[1]
                }
                td1.classList.add("p-c1")
                td.classList.add("l-num")
                tr.classList.add("l-w")
                tr.appendChild(td)
                tr.appendChild(td1)
                tr.setAttribute("path",c+"/"+keys[i])
                tr.setAttribute("event","smepls")
                e.appendChild(tr)
            }
        }
    }
    this.jsonMake = function (a) {
        let path = {}
        for (let i = 0; i < a.length; i++) {
            if(a[i].path!=undefined){
                const element = a[i].path;
                let y = function(p) {
                    let u = p.split('/')
                    let m = []
                    let last = ""
                    for (let i = 0; i < u.length; i++) {
                        const element = u[i];
                        if(i!=u.length-1){
                            m.push(element)
                        }else{
                            last=u[i]
                        }
                    }
                    return m.reduce(function(o,name) {
                      return o[name] = o[name] || {};
                    },path)[last] = [{type:"file",data:a[i].value}]
                }
                y(element)
            }
        }
        return path
    }
    this.pathJSON = function(a){
        this.value = []
        this.result = null
        this.data = a
        let m = this;
        let Path = function(a){
            let x = a.split("/")
            let y = m.data
            for (let i = 0; i < x.length; i++) {
                const e = x[i];
                if(e=="") continue
                if(y[e]==undefined) return null;
                y = y[e]
            }
            return y
        }
        let makePath = function(a,b){
            if(!uu.stringNull(a) && !uu.stringNull(b)){
                return {key:a,path:b}
            }
            return null
        }
        this.put = function(a,b){
            if(makePath(a,b)==null) return
            m.value.push(makePath(a,b))
        }
        this.run = function(){
            let result = {}
            for (let i = 0; i < m.value.length; i++) {
                const e = m.value[i];
                result[e.key] = Path(e.path)
            }
            m.result = result
            return m.result
        }
    }
}