"use strict"
import * as github from '@actions/github'
import { setFailed } from '@actions/core';
import ActionController from './src/controllers/actionController.js';

async function run() {
    try {       
        console.log('print: ' + github)
        const actionController = new ActionController(github)
        await actionController.createGMUD()
    } catch (e) {
        setFailed(`Essa ação só será executada em uma Pull Request.\nERRO: ${e}.`)
    }
}

run()