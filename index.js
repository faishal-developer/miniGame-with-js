//declaring two player 
const player1 = { health: 100, wins: 0, round: 1 };
const player2 = { health: 100, wins: 0, round: 1 };

//dynamic progress bar 
const progress_bars = document.querySelectorAll( '.progress' );

const reduceProgressBar = ( bar, per ) => {
    const percent = per < 0 ? 0 : per
    const { size } = bar.dataset;
    bar.style.width = `${percent}%`
    if ( percent > 70 ) bar.style.backgroundColor = 'green'
    else if ( percent > 30 ) bar.style.backgroundColor = 'orange'
    else if ( percent < 30 ) bar.style.backgroundColor = 'red'
}
reduceProgressBar( progress_bars[0], 100 )
reduceProgressBar( progress_bars[1], 100 )

let triggerBullet = true


const getById = ( id ) => document.getElementById( id );

const generateRandom = () => Math.ceil( Math.random() * 5 )

//health reducing function of players
const healthReduce = ( player, reduceHealth ) => {
    player.health = player.health - reduceHealth;
    if ( player1 === player ) {
        reduceProgressBar( progress_bars[0], player1.health )
    } else {
        reduceProgressBar( progress_bars[1], player2.health )
    }
}

//start next level in game
const roundChange = () => {
    const button = getById( 'start-game' );
    if ( !declareWinner() ) {
        player1.round += 1;
        button.innerText = `start round ${player1.round}`;
    } else {
        button.innerText = 'Game Finished'
        button.setAttribute( 'disabled', true )
        button.style.cursor = 'no-drop'
    }
}

//winner or dead player declared
const declareDeadPlayer = () => {
    const winner = getById( 'winner' )
    if ( player1.health <= 0 ) {
        const player2Win = getById( 'player2Winned' )
        player2.wins += 1
        declareWinner()
        alert( 'player 2 wins' )
        player2Win.innerText = `Win: ${player2.wins}`
        roundChange()
        return 'player 1 is dead'
    }
    else if ( player2.health <= 0 ) {
        const player1Win = getById( 'player1Winned' )
        player1.wins += 1
        declareWinner()
        alert( 'player 1 wins' )
        player1Win.innerText = `Win: ${player1.wins}`
        roundChange()
        return 'player2 is dead'
    }
}


const declareWinner = () => {
    const winner = getById( 'winner' );
    if ( player2.wins === 3 ) {
        winner.innerText = `FinalWinner : Player 2 `
        return true
    }
    else if ( player1.wins === 3 ) {
        winner.innerText = `FinalWinner: Player 1 `
        return true
    }
    return false
}

const restartGame = () => {
    player1.health = 100;
    player2.health = 100;
    reduceProgressBar( progress_bars[0], 100 )
    reduceProgressBar( progress_bars[1], 100 )
}

const checkUncheck = () => {
    if ( triggerBullet ) {
        triggerBullet = false
        getById( 'trigger4' ).checked = true
        getById( 'trigger2' ).checked = false
        getById( 'trigger3' ).checked = true
        getById( 'trigger1' ).checked = false
    } else {
        triggerBullet = true
        getById( 'trigger4' ).checked = false
        getById( 'trigger2' ).checked = true
        getById( 'trigger3' ).checked = false
        getById( 'trigger1' ).checked = true
    }
}


//start game with button click
let gameStarted = false;
getById( 'start-game' ).addEventListener( 'click', () => {
    if ( gameStarted ) {
        return
    }
    if ( declareWinner() ) {
        alert( 'final result found' )
        return
    }
    restartGame()
    let interval = setInterval( () => {
        if ( declareDeadPlayer() ) {
            clearInterval( interval )
            gameStarted = false
            return
        }
        gameStarted = true
        checkUncheck()
        healthReduce( player1, generateRandom() );
        healthReduce( player2, generateRandom() );
    }, 500 )
} )


