"use strict"
const github = require('@actions/github');
import { setFailed } from '@actions/core';
import ActionController from './src/controllers/actionController.js';
import Validate from './src/services/validate.js';

async function run() {
    let validate = new Validate(github)
    if(validate.isBot()){       
        return
    }

    try {        
        const actionController = new ActionController(github)
        await actionController.createGMUD()
    } catch (e) {
        setFailed(`Essa ação só será executada em uma Pull Request.\nERRO: ${e}.`)
    }
}

run()