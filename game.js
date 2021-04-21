var game = {
    init: function(){
        //En bouclant sur model, on a accès à chaque ligne. On va pouvoir grâce à la fonction createGameGrid créer la grille de jeu.
        model.forEach(game.createGameGrid);

        //Avec un eventlistener, on écoute les touches de claviers utilisées afin de bouger notre burger.
        document.addEventListener('keydown', game.playGame);
    },

    cellWidth: 50,
    tableau: document.querySelector('.terrain_de_jeu'),
    types: {
        'x': 'classic',
        '*': 'wall',
        'o': 'burger',
        '-': 'goal'
    },

    createGameGrid: function(line){
        // On va maintenant avoir accès à chaque caractère des lignes grâce à une boucle for. On va pouvoir les intégrer au tableau de jeu et les styliser grâce à des classes CSS.
        
        for(let i=0; i<line.length; i++){
            // On déclare le caractère auquel on a accès avec la variable sign.
            let sign= line[i];

            //on insère le caractère dans un span.
            let square= document.createElement('span');

            //On ajoute les classes appropriées.
            square.classList.add('square');
            //Ici on va chercher la class qui correspond au caractère dans l'objet types.
            square.classList.add(game.types[sign]);
            //On ajoute une classe spécifique pour les premières cases de chaque ligne
            if(i === 0){
                square.classList.add('dead-end');
            }

            // On insère ce caractère dans le tableau de jeu.
            game.tableau.appendChild(square).innerHTML= sign;
        }
    },

    playGame: function(event){
        let keyPressed= event.key;
        let squareList= game.tableau.children;
        
        //On récupère l'index de la case avec le burger.
        let burgerIndex= game.getBurgerIndex(squareList);
       
        //En fonction de la flèche pressée, on va bouger le burger d'un certain nombre de cases.
        if(keyPressed == "ArrowUp"){
            game.moveBurgerUp(burgerIndex, squareList, 13);
        } else if(keyPressed == "ArrowDown"){
            game.moveBurgerDown(burgerIndex, squareList, 13);
        } else if(keyPressed == "ArrowLeft"){            
            game.moveBurgerLeft(burgerIndex, squareList, 1);
        } else if(keyPressed == "ArrowRight"){
            game.moveBurgerRight(burgerIndex, squareList, 1);
        }                
    },

    //Fonction qui boucle sur toutes les cases afin de retourner l'index de celle avec le burger.
    getBurgerIndex: function(squareList){
        for(let i=0; i<squareList.length; i++){
            if(squareList[i].classList.contains('burger')){
                return i;
            }
        }
    },

    //4 Fonctions qui font avancer le burger en retirant la classe 'burger' de l'endroit où il est pour l'ajouter vers l'endroit où il doit aller
    moveBurgerRight: function(burgerIndex, squareList, numberOfSquaresToMove){
        let nextBurgerSquare= squareList[burgerIndex + numberOfSquaresToMove];

        //On vérifie qu'on ne heurte pas un mur ou qu'on n'est pas à une des extrémités de la grille de jeu
        if(nextBurgerSquare.classList.contains('wall') || nextBurgerSquare.classList.contains('dead-end')){
            return;
        // Si ce n'est pas le cas, on retire la classe burger à la case burger actuelle et on l'ajoute à la suivante.
        }else{
            squareList[burgerIndex].classList.remove('burger');
            nextBurgerSquare.classList.add('burger');
        }
    },

    moveBurgerLeft: function(burgerIndex, squareList, numberOfSquaresToMove){
        let nextBurgerSquare= squareList[burgerIndex - numberOfSquaresToMove];
        let actualBurgerSquare= squareList[burgerIndex];
        
        if(nextBurgerSquare.classList.contains('wall') || actualBurgerSquare.classList.contains('dead-end')){
            return;
        }else{
            squareList[burgerIndex].classList.remove('burger');
            nextBurgerSquare.classList.add('burger');
        }
    },

    moveBurgerUp: function(burgerIndex, squareList, numberOfSquaresToMove){
        let nextBurgerSquare= squareList[burgerIndex - numberOfSquaresToMove];

        if(nextBurgerSquare.classList.contains('wall')){
            return;
        }else{
            squareList[burgerIndex].classList.remove('burger');
            nextBurgerSquare.classList.add('burger');
        }        
    },

    moveBurgerDown: function(burgerIndex, squareList, numberOfSquaresToMove){
        let nextBurgerSquare= squareList[burgerIndex + numberOfSquaresToMove];

        if(nextBurgerSquare.classList.contains('wall')){
            return;
        }else{
            squareList[burgerIndex].classList.remove('burger');
            nextBurgerSquare.classList.add('burger');
        }  
    }
};


document.addEventListener('DOMContentLoaded', game.init);

var model = [
    'xxxxxxxxx**xx',
    'x********xx-x',
    'xxxxxxxx*x**x',
    'xx*****xxx*x*',
    'xxxxxx*x***x*',
    '****xx*x*xxx*',
    'xxx*xx*x*xxxx',
    'x*o*xx**xx*xx',
    'x***xxxxxx*xx',
    'xxxxxx*****xx',
];