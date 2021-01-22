var robot = require('robotjs');

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const onTabPos = { x: 1452, y: 17 };
let rowPos = { x: 1451, y: 300 };
const twitterBlue = '1DA1F2';

// Focus tab
// robot.moveMouse(onTabPos.x, onTabPos.y);
// robot.mouseClick();

const isColorEqual = (colorToCompare, colorCompared) => {
    return colorToCompare.toLowerCase() === colorCompared.toLowerCase() ? true : false;
}

const searchColorPos = async () => {
    await sleep(1000);
    let pos = rowPos;

    for (let i = 1; i < 30; i++) {
        pos.y = pos.y + 10;
        const img = robot.screen.capture();
        robot.moveMouse(pos.x, pos.y);
        const hex = img.colorAt(pos.x, pos.y);
        console.log('hex', hex);

        if(isColorEqual(hex, twitterBlue)) {
            return pos;
        }
    }


    return undefined;
}


// const launchBot = async () => {

// // Set pos on first row
// robot.moveMouse(rowPos.x, rowPos.y);
// // robot.moveMouse(rowPos.x, rowPos.y);
// // robot.keyTap('down');
// // robot.scrollMouse(-200, -200);
// // await sleep(2000);
// rowPos.y += 95;
// robot.moveMouse(rowPos.x, rowPos.y);

// //Get pixel color
// // img = robot.screen.capture();
// // const hex = img.colorAt(robot.getMousePos());
// }

const startUp = async () => {
    // for(let i = 0; i < 10; i++) {
    //     launchBot();
    //     await sleep(500);
    // }
    const val = await searchColorPos();
    console.log('searchColorPos()', val);
}

startUp();
