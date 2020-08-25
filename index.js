import { createConfig } from './game/config.js';
import { LoaderWindow } from './game/scenes/loader.js';
import { PlatformWindow } from './game/scenes/platform.js';
import { QuizzWindow } from './game/scenes/quizz.js';
import { GameOverWindow } from './game/scenes/game-over.js';
import { ProWindow } from './game/scenes/pro.js';

const config = createConfig([LoaderWindow, PlatformWindow, QuizzWindow, GameOverWindow, ProWindow]);

var game = new Phaser.Game(config);
