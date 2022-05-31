// Тоглоомын бүх газар ашиглагдах глобаль хувьсагчдыг энд зарлая
  
// Тоглогчийн ээлжийг хадгалах  хувьсагч
    // Нэгдүгээр тоглогчийг 0
    // Хоёрдугаар тоглогчийг 1
    var activePlayer;
// Тоглогчдийн цуглуулсан оноог хадгалах хувьсагч
    var scores = [0,0];
// Тоглогчийн ээлжиндээ цуглуулж байгаа оноог хадгалах хувьсагч 
    var roundScore;
// Шооны зургийг үзүүлэх элементийг DOM - оос хайж олоод энд хадгалсан
   var diceDom =  document.querySelector('.dice');

// Тоглоом дууссан эсэхийг хадгалах төлөвийн хувьсагч
    var isNewGame;
   
////////////////////////////////////////////////////////////////
    // Тоглоомыг эхлүүлнэ.
    initGame();

 // Тоглоомыг шинээр эхлэхэд бэлдэнэ
   function initGame() { 
       // Тоглоом эхэллээ гэдэг төлөвт оруулна. 
            isNewGame = true;

        activePlayer = 0;
        scores = [0, 0]; 
        roundScore = 0; 

            // ID - р элемент хайж олоход "getElementById" дуудаж ажиллуулна
    
        document.getElementById('score-0').textContent = "0";
        document.getElementById('score-1').textContent = "0";
        document.getElementById('current-0').innerHTML = "0";
        document.getElementById('current-1').innerHTML = "0";
            
        //Тоглогчдийн нэрийг буцааж гаргах
            document.getElementById('name-0').textContent = "Player 1";
            document.getElementById('name-1').textContent = "Player 2";

            document.querySelector('.player-0-panel').classList.remove("winner");
            document.querySelector('.player-1-panel').classList.remove("winner");

            document.querySelector('.player-0-panel').classList.remove("active");
            document.querySelector('.player-0-panel').classList.remove("active");

            document.querySelector('.player-0-panel').classList.add("active");

            diceDom.style.display = "none";
        }

//////////////////////////////////////////////////////////////////////////////////////
    // Шоог шидэх эвент листенер
    document.querySelector('.btn-roll').addEventListener('click', 
    function(){
           if (isNewGame){
                // Шооны аль талаараа буусныг хадгалах хувьсагч хэрэгтэй, 1-6 гэсэн утгыг энэ хувьсагчид 
        //санамсаргүйгээр үүсгэж өгнө. 1 - 6 доторх санамсаргүйгээр тоо гаргаж авна
            var diceNumber = Math.floor(Math.random() * 6) + 1;
            // Шооны зургийг вэб дээр гаргаж ирнэ
                diceDom.style.display = "block";
            // Буусан санамсаргүй тоонд харгалзах зургийг вэб дээр гаргана
                diceDom.src = 'dice-' + diceNumber + '.png';
    
            // Буусан тоо нь 1-ээс ялгаатай бол тоглогчийн ээлжийн оноо нэмэгдүүлнэ    
                if (diceNumber !== 1 ){
                    // 1-ээс ялгаатай тоо буулаа. Буусан тоог тоглогчид нэмж өгнө
                    roundScore = roundScore + diceNumber;
                    document.getElementById('current-' + activePlayer).textContent = roundScore;
                } else {
                    // 1 буусан тул тоглогчийн ээлжийг энэ хэсэгт сольж өгнө 
                    switchToNextPlayer();
                }
           } else {
               alert ("Тоглоом дууссан байна. NEW GAME товч дарж шинээр эхлэнэ үү");
           }
        });

/////////////////////////////////////////////////////////////////////////////////////

        // HOLD товчны эвент листенер
        document.querySelector('.btn-hold').addEventListener('click', function(){
            if (isNewGame) {
                // Уг тоглогчийн цуглуулсан ээлжний оноог глобаль оноон дээр нь нэмж өгнө
                // var score = [0, 0]

            scores[activePlayer] = scores[activePlayer] + roundScore;
            // Дэлгэц дээр оноог нь өөрчилнө 
            document.getElementById('score-' + activePlayer ).textContent =
                 scores[activePlayer];

           // уг тоглогч хожсон эсжхийг шалгах (оноо нь 100-с их эсэх)
               if (scores[activePlayer] >= 100){
                   // Тоглоомыг дууссан төлөвт оруулна 
                   isNewGame = false;

                   // Ялагч гэсэн текстийг нэрнийх нь оронд гаргана
                       document.getElementById('name-' + activePlayer).textContent = "WINNER!!!";
                       document.querySelector('.player-'+ activePlayer + '-panel').classList.add('winner');
                       document.querySelector('.player-' + activePlayer + '-panel').classList.remove("active");
               } else {
                   //Тоглогчийн ээлжийг солих
                   switchToNextPlayer();
               }
            } else {
                alert ("Тоглоом дууссан байна. NEW GAME товч дарж шинээр эхлэнэ үү");
            }
        } );

        // Энэ функц нь тоглох ээлжийг дараачийн тоглогч руу шилжүүлдэг 
        function switchToNextPlayer(){
            // Энэ тоглогчийг ээлжиндээ цуглуулсан оноог 0 болгоно.
            roundScore = 0;
            document.getElementById('current-' + activePlayer).textContent = 0;
            
            // тоглогчийн ээлжийг нөгөө тоглогч руу шилжүүлнэ.
            // Хэрэв тоглогч нь 0 байвал идэвхтэй тоглогчийг 1 болго
            // Үгүй бол идэвхтэй тоглогчийг 0 болго
            activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);  
        // Улаан цэгийг шилжүүлэх
            document.querySelector('.player-0-panel').classList.toggle("active");
            document.querySelector('.player-1-panel').classList.toggle("active");
        // Шоог түр алга болгох
            diceDom.style.display = "none";
        }

////////////////////////////////////////////////////////////////////////////////////////////////
// New Game буюу Шинэ тоглоом эхлүүлэх товчны эвент листенер
    document.querySelector(".btn-new").addEventListener("click", initGame);

// 
    
