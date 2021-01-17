var robot = require('robotjs');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const onTabPos = { x: 1452, y: 17 };
let rowPos = { x: 1451, y: 330 };

// Focus tab
robot.moveMouse(onTabPos.x, onTabPos.y);
robot.mouseClick();

const launchBot = async () => {

// const mouse = robot.getMousePos();
// let img = robot.screen.capture();
// console.log('mouse', mouse);
// await sleep(2000);

// Set pos on first row
robot.moveMouse(rowPos.x, rowPos.y);
// robot.moveMouse(rowPos.x, rowPos.y);

// robot.keyTap('down');
// robot.keyTap('down');
// robot.keyTap('down');

// robot.scrollMouse(-200, -200);

// await sleep(2000);
rowPos.y += 95;
robot.moveMouse(rowPos.x, rowPos.y);

//Get pixel color
// img = robot.screen.capture();
// const hex = img.colorAt(robot.getMousePos());
}

const startUp = async () => {
    for(let i = 0; i < 10; i++) {
        launchBot();
        await sleep(500);
    }
}

startUp();
