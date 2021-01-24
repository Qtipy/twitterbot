var robot = require('robotjs');

/**
 * ------------------------------------
 * ----------- Unfollow bot -----------
 * ------------------------------------
 */

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const tabPos = { x: 1451, y: 17 };
let rowPos = { x: 1451, y: 300 };
let unfollowPos = { x: 1347, y: 830 };
const twitterBlueColor = '1DA1F2';
let img = robot.screen.capture();

const isColorEqual = (colorToCompare, colorCompared) => {
    return colorToCompare.toLowerCase() === colorCompared.toLowerCase() ? true : false;
}

const handleUnfollowModal = () => {
    // Disable modal
    // robot.moveMouse(1270, 900);
    robot.moveMouse(unfollowPos.x, unfollowPos.y); 
    robot.mouseClick();
}

const searchColorPosByDescending = () => {
    for (let i = 0; i < 250; i++) {
        img = robot.screen.capture();
        // Stop bot if mouse x move
        const mPos = robot.getMousePos();
        // Weird shit, it isn't 1451 here but 1450
        if(mPos.x !== 1450) {
            console.log('End - mousepos:',robot.getMousePos());
            return;
        }

        // Move down to look for blue twitter pix
        rowPos.y += 5;
        robot.moveMouse(rowPos.x, rowPos.y);
        const currentColor = img.colorAt(rowPos.x, rowPos.y);

        if(isColorEqual(currentColor, twitterBlueColor)) {
            // Fix some bug where detecting right pixel but click on the follower instead of button
            rowPos.y += 3;
            robot.moveMouse(rowPos.x, rowPos.y);
            robot.mouseClick();

            handleUnfollowModal();

            rowPos.y += 30;
            robot.moveMouse(rowPos.x, rowPos.y);
            searchColorPosByDescending();
        } else {
            // Scroll down the page
            if(rowPos.y > 1350) {
                robot.keyTap('pagedown');
                rowPos.y = 300;
                robot.moveMouse(rowPos.x, rowPos.y);
                searchColorPosByDescending();
            }
        }
    }
}

const startUp = () => {
    robot.setMouseDelay(30);

    // Focus tab
    robot.moveMouse(tabPos.x, tabPos.y);
    robot.mouseClick();

    searchColorPosByDescending();
}

startUp();
