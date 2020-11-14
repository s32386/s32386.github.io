
let texture  = function(marker,url){
    this.url = url;
    this.marker = marker;
    this.buffer = null;
}
let load_texture = class{
    loader = null;
    constructor(render){
    //  (render instanceof ARboon.prototype._create_RUNNING_EVENT)
    console.log(render)
        this.render = render
        console.log(this.render)
        this.loader = this._create_loader();
    }
    _load_buffer (_texture_){
        if(_texture_ instanceof texture)
        return this.loader.load(_texture_.url,this.render.render())
        else throw Error("ERROR : {} is not a texture object".replace("{}",_texture_))
    }
    _create_loader(){
        THREE.TextureLoader()
        THREE.TextureLoader.prototype.crossOrigin = '';
        return new THREE.TextureLoader();
    }
}
/*let load_config = class{
    urls = null;
    constructor(yaml){
        if(!(yaml instanceof String))
        this.yaml = yaml;
    }
    load = function(){
        this._create_(YAML.load(this.yaml))
        return this.urls
    }
    _error_ (a,b){
        if(b!=null) throw Error("ERROR : " + a.replace("{}",b))
        else throw Error("ERROR : " + a)
    }
    _get_can (a,b){
        console.log(a,b)
        return !(a[b]==null) 
    }
    // ::error cause
    _get_cerr (a,b){
        console.log(a,b)
        if(!this._get_can(a,b)) this._error_("\"YAML\" :: {} not found in config")
        return this._get_can(a,b);
    }
    _get_OBJ (a,b){
        console.log(a,b)
        this._get_cerr(a,b)
        return a[b];
    }
    _create_ (a){
        let textures = this._get_OBJ(a,"texture")
        let ids = Object.keys(textures)
        let urls = []
        let i = 0
        ids.forEach(e => {
            if(e!=null)
            if(this._get_can(textures,e))
            urls.push(
                new texture(i,String(this._get_OBJ(textures,e)))
            )
            i++;
        });
        this.urls = urls;
    }
}*/
let ARboon = class{
    constructor(config){
        this.config = config;
    }
    _create_LIGHT (){
        return new THREE.AmbientLight( 0xcccccc, 0.5 );
    }
    _create_CAMAERA (){
        return new THREE.Camera();
    }
    _create_SCENE (){
        return new THREE.Scene();
    }
    _create_CLOCK = function(){
        this.clock =  new THREE.Clock();
        this.deltaTime = 0;
        this.totalTime = 0;
        this.add = function(){
            this.deltaTime = this.clock.getDelta();
            this.totalTime += this.deltaTime;
        }
    }
    _create_RUNNING_EVENT = function(ARcore,renderer,scene,camera,clock){
        this.renderer = renderer;
        this.arToolkitSource = ARcore.source;
        this.arToolkitContext = ARcore.context;

        let arToolkitSource  = this.arToolkitSource
        let arToolkitContext = this.arToolkitContext

        let update = function(){
            // update artoolkit on every frame
            if ( arToolkitSource.ready !== false )
            arToolkitContext.update( arToolkitSource.domElement );
        }
        this.render = function(){
            renderer.render( scene, camera );
        }
        let render = this.render
        let animate = function(){
            requestAnimationFrame(animate);
            //this.clock.add()
            update();
            render();
        }
        this.animate = animate
    }
    _create_RENDERER (){
        let renderer =  new THREE.WebGLRenderer({
            antialias : true,
            alpha: true
        });
        renderer.setClearColor(new THREE.Color('lightgrey'), 0)
        renderer.setSize( 640, 480 );
        renderer.domElement.style.position = 'absolute'
        renderer.domElement.style.top = '0px'
        renderer.domElement.style.left = '0px'
        document.body.appendChild( renderer.domElement );
        return renderer;
    }
    _create_ARTHREE_Toolkit (){
        return {
            source:new THREEx.ArToolkitSource({
                sourceType : 'webcam',
            }),
            context:new THREEx.ArToolkitContext({
                cameraParametersUrl: 'https://stemkoski.github.io/AR-Examples/data/camera_para.dat',
                detectionMode: 'mono'})
        }
    }
    _create_ARTHREE_Toolkit_EVENT = class{
        constructor(ARcore,camera,renderer){
            this.ARcore = ARcore;
            this.renderer = renderer;
            this.arToolkitSource = ARcore.source;
            this.arToolkitContext = ARcore.context;
            this.camera = camera;
        }
        _register_ (){
            let EVENT = this._create_EVENT_source()
            this.ARcore.source.init(EVENT.onReady);
            window.addEventListener('resize',EVENT.onResize);
            this.ARcore.context.init(this._create_EVENT_context().onCompleted)
        }
        _create_EVENT_source(){
            let arToolkitSource = this.arToolkitSource
            let arToolkitContext = this.arToolkitContext
            let renderer = this.renderer
            let onReady = function(){
                onResize()
            }
            let onResize = function(){
                arToolkitSource.onResize()
                arToolkitSource.copySizeTo(renderer.domElement)	
                if (arToolkitContext.arController !== null ){
                    arToolkitSource.copySizeTo(arToolkitContext.arController.canvas)
                }
            }
            return {onReady,onResize}
        }
        _create_EVENT_context(){
            let arToolkitContext = this.arToolkitContext
            let camera = this.camera
            let onCompleted = function(){
                camera.projectionMatrix.copy( arToolkitContext.getProjectionMatrix());
            }
            return {onCompleted}
        }
    }
    _init_ARTHREE_Toolkit (camera){
        let AR = this._create_ARTHREE_Toolkit()
        let EVENT = new this._create_ARTHREE_Toolkit_EVENT(AR,camera,this.renderer)
        // Register event AR_camera
        EVENT._register_()
        return AR
    }
    _MARKER_ = class{
        constructor(ARcore,scene){
        //  (render instanceof ARboon.prototype._create_RUNNING_EVENT)
        //  (config instanceof load_config)
        console.log(ARcore)
            this.ARcore = ARcore;
            this.scene = scene;
            this.loader = new load_texture(ARcore)
            this.loader._create_loader()
        }
        _create_MARKER (){
            return new THREE.Group();
        }
        _register_marker (list){
            list.forEach(e=>{
            //  (e instanceof texture)
                let marker = this._create_MARKER();
                this._create_MARKERCONTROL(marker,e.marker)
                let texture
                if(e.url.search(".mp4") == -1){
                    texture = this.loader._load_buffer(e)
                }else{
                    let video = document.createElement("video")
                    let source = document.createElement("source")
                    video.loop = true;
                    video.autoplay = true;
                    video.crossOrigin = "anonymous"
                    video.preload = 'auto'
                    video.setAttribute("webkit-playsinline","")
                    source.type = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
                    video.appendChild(source)
                    source.src = e.url;
                    video.src = e.url
                    video.muted = "muted"
                    video.load()
                    video.play()
                    texture = new THREE.VideoTexture( video );
                    texture.minFilter = THREE.LinearFilter;
                    texture.magFilter = THREE.LinearFilter;
                    texture.format = THREE.RGBFormat;
                    console.log(video)
                }
                let geometry = new THREE.PlaneBufferGeometry(1,1, 4,4);
                let material = new THREE.MeshBasicMaterial( { map: texture } );
                let mesh = new THREE.Mesh( geometry, material );
                mesh.scale.set(2,2,2);
                mesh.rotation.x = -Math.PI/2;
                marker.add(mesh)
                console.log(texture)
                this.scene.add(marker)
            })
        }
        _create_MARKERCONTROL (marker,markerNames){
            let arToolkitContext = this.ARcore.arToolkitContext
            let l = new THREEx.ArMarkerControls(arToolkitContext, marker, {
                type: 'pattern', patternUrl: "https://raw.githubusercontent.com/s32386/s32386.github.io/main/data/pattern-" + markerNames + ".patt",
            });
        }
    }
    init(){
        let light = this._create_LIGHT()
        let scene = this._create_SCENE()
        let camera = this._create_CAMAERA()
        this.renderer = this._create_RENDERER()
        let ARcore = this._init_ARTHREE_Toolkit(camera)
        let OO = new this._create_RUNNING_EVENT(ARcore,this.renderer,scene,camera)
        let marker = new this._MARKER_(OO,scene)
        console.log(this.renderer)
        scene.add(light)
        scene.add(camera)
        marker._register_marker(
            this.config
        )
        OO.animate()
    }
}