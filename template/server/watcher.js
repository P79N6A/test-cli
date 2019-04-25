'use strict';
/*global process */ 
const chokidar = require('chokidar');
const cp = require('child_process');
const watcher = chokidar.watch(['./server' , './common']);

let appIns = cp.fork('./server/index');

/**
 * [reload 重启]
 * @param  {[type]} app [description]
 * @return {[type]}     [description]
 */
function reload(app) {
    app.kill('SIGINT');
    return cp.fork('./server/index');
}

watcher.on('add', path => appIns = reload(appIns))
    .on('change', path => appIns = reload(appIns))
    .on('unlink', path => appIns = reload(appIns));

process.on('SIGINT', ()=>process.exit(0));