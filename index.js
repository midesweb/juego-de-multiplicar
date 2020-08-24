import { createConfig } from './game/config.js';
import { LoaderWindow } from './game/scenes/loader.js';
import { PlatformWindow } from './game/scenes/platform.js';
import { QuizzWindow } from './game/scenes/quizz.js';

const config = createConfig([LoaderWindow, PlatformWindow, QuizzWindow]);

var game = new Phaser.Game(config);
