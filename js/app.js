(function() {

    var audio = (function() {

        var musicList = [
            {
                id: null,
                name: "E.S.Posthumus-Arise",
                src: "audio/E.S.Posthumus-Arise.mp3"
            },
            {
                id: null,
                name: "Adelitas Way-Sick",
                src: "audio/Adelitas Way-Sick.mp3"
            },
            {
                id: null,
                name: "Alien Ant Farm-Smooth Criminal",
                src: "audio/Alien Ant Farm-Smooth Criminal.mp3"
            },
            {
                id: null,
                name: "Avril Lavigne-Knocking  On  Heavens Door",
                src: "audio/Avril Lavigne-Knocking  On  Heavens Door.mp3"
            },
            {
                id: null,
                name: "Black Tiger Sex Machine & Apashe - Swing High [Premiere]",
                src: "audio/Black Tiger Sex Machine & Apashe - Swing High [Premiere].mp3"
            },{
                id: null,
                name: "Manafest-No Plan B feat. Koie from Crossfaith",
                src: "audio/Manafest-No Plan B feat. Koie from Crossfaith.mp3"
            },{
                id: null,
                name: "E.S.Posthumus-Arise",
                src: "audio/E.S.Posthumus-Arise.mp3"
            },
            {
                id: null,
                name: "Adelitas Way-Sick",
                src: "audio/Adelitas Way-Sick.mp3"
            },
            {
                id: null,
                name: "Alien Ant Farm-Smooth Criminal",
                src: "audio/Alien Ant Farm-Smooth Criminal.mp3"
            },
            {
                id: null,
                name: "Avril Lavigne-Knocking  On  Heavens Door",
                src: "audio/Avril Lavigne-Knocking  On  Heavens Door.mp3"
            },
            {
                id: null,
                name: "Black Tiger Sex Machine & Apashe - Swing High [Premiere]",
                src: "audio/Black Tiger Sex Machine & Apashe - Swing High [Premiere].mp3"
            },{
                id: null,
                name: "Manafest-No Plan B feat. Koie from Crossfaith",
                src: "audio/Manafest-No Plan B feat. Koie from Crossfaith.mp3"
            }
        ];

        function list() {
            return musicList;
        }

        return {
            list: list
        };
    })();




    var controls = (function() {

        var arrList = setId(audio.list());
        var currentPlay = arrList[0];
        var audioId = getId("audio");
        var elem = getId("play");
        var currStatus;
        var timer;
        var lastSelect;

        audioId.src = currentPlay.src;


        function setId(arr) {
            var i = 0;
            return arr.map(function(e) {
                e.id = i;
                i++;
                return e;
            });
        }
        
        function getId(data) {
            return document.getElementById(data);
        }

        function getElem(data) {
            return document.getElementsByClassName(data);
        }

        function next() {

            var id = currentPlay.id;
            var findElem = arrList[++id];
            (findElem) ? currentPlay = findElem : currentPlay = arrList[0];
            audioId.src = currentPlay.src;
            audioId.play();
            renderName();
            currentA();

        }

        function prev() {

            var id = currentPlay.id;
            var findElem = arrList[--id];
            (findElem) ? currentPlay = findElem : currentPlay = arrList[arrList.length-1];
            audioId.src = currentPlay.src;
            audioId.play();
            renderName();
            currentA();
        }

        function clickList() {

            var arr = getElem("items");
            for(var i = 0, leng = arr.length; i < leng; i++) {
                arr[i].addEventListener("click", function(e) {
                    var e = e.target;
                    var id = e.getAttribute("id") || e.parentElement.getAttribute("id");
                    changeSrc(audioId, id);
                    elem.firstChild.remove();
                    elem.insertAdjacentHTML("beforeend", "<i class='material-icons'>pause_circle_outline</i>");
                    currStatus = true;
                    audioId.play();
                    renderName();
                    currentA();
                })
            }
        }

        function renderList() {
            var listElem = getElem("items")[0];
            renderName();

            arrList.map(function(e) {
                listElem.insertAdjacentHTML("beforeend",
                    "<li class='item' id='"+e.id+"'>\n"+
                    "<span class='name'>"+e.name+"</span>\n"+
                    "</li>\n"
                );
            });
        }
        
        function changeSrc(elem, id) {

             var e = arrList.find(function(e) {
                 return e.id == id;
            });

            elem.src = e.src;
            currentPlay = e;
        }

        function changeVolume(data) {
            audioId.volume = data;
        }

        function changeSpeed(data) {
            audioId.playbackRate = data;
        }

        function reset() {
            audioId.currentTime = 0;
            audioId.pause();
            currStatus = false;
            elem.firstChild.remove();
            elem.insertAdjacentHTML("beforeend", "<i class='material-icons'>play_circle_outline</i>");
        }

        function repeat() {
            if(audioId.loop) {
                audioId.loop = false;
                getId("repeat").style.color = "#B2B2B2";
            }else{
                audioId.loop = true;
                getId("repeat").style.color = "#888888";
            };
        }

        function range() {
            var time = Math.round(audioId.duration);
            var timeNow = Math.round(audioId.currentTime);
            getId("range").value = (timeNow/time)*100;
        }

        function setRangeD() {
            console.log("D");
            clearInterval(timer);
            audioId.pause();
        }

        function setRangeU() {
            console.log("UP");
            var time = audioId.duration;
            var setTime = (time*getId("range").value)/100;
            audioId.currentTime = setTime;
            audioId.play();
            timer = setInterval(range, 1000);
        }
        
        function statusPlay() {
            
        }

        function renderName() {
            getId("name").textContent = currentPlay.name;
        }

        function currentA() {
            if(lastSelect) lastSelect.setAttribute("class", "item");
            var elem = getId(currentPlay.id.toString());
            elem.setAttribute("class", "select");
            lastSelect = elem;
        }
        
        function backgroundColor() {
            document.body.addEventListener("mousemove", function(e){
                var y, x;
                (e.clientY >= 255) ? y = 255 - (e.clientY - 255) : y = e.clientY;
                (e.clientX >= 255) ? x = 255 - (e.clientX - 255) : x = e.clientX;
                document.body.style = "background : rgba("+x+","+y+","+(x-y)+", 0.3)";
            });
        }



        function init() {

            renderList();
            clickList();
            backgroundColor();
            currentA()

            elem.addEventListener("click", function() {
                elem.firstChild.remove();
                if(currStatus){
                    elem.insertAdjacentHTML("beforeend", "<i class='material-icons'>play_circle_outline</i>");
                    currStatus = false;
                    audioId.pause();
                }else {
                    elem.insertAdjacentHTML("beforeend", "<i class='material-icons'>pause_circle_outline</i>");
                    currStatus = true;
                    audioId.play();
                }
            });

            getId("next").addEventListener("click", next);
            getId("prev").addEventListener("click", prev);
            getId("reset").addEventListener("click", reset);
            getId("repeat").addEventListener("click", repeat);
            getId("range").addEventListener("mousedown", setRangeD);
            getId("range").addEventListener("mouseup", setRangeU);

            getId("volume").addEventListener("mouseup", function(e) {
                changeVolume(e.target.value);
            });

            getId("speed").addEventListener("mouseup", function(e) {
                changeSpeed(e.target.value);
            });

            timer = setInterval(range, 1000);

            audioId.addEventListener("ended", next);

        }

        return {
            init:init
        }

    })();


    controls.init();

})();