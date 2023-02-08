"use strict"
import Validate from "../src/services/validate.js"

test('Validates if github object has all required properties', ()=>{
    
    const github= {
        context: {
            payload:{
                repository: {
                    name:'teste',
                    owner:{
                        login: 'teste'
                    }
                }
            }
        }
    }

    let validate = new Validate(github)
    expect(validate.isGithubValid(github)).toBe(true)
})

test('Validates if github object has sender property', ()=>{
    
    const github= {
        context: {
            payload:{
                repository: {
                    name:'teste',
                    owner:{
                        login: 'teste'
                    }
                },
                sender: {
                    login: 'teste'
                }
            }
        }
    }

    let validate = new Validate(github)
    expect(validate.validateObjectLoginsender()).toBe(true)
})

test('Validates if runId is duplicated', ()=>{
    const workflow_runs = {
        actor:{
            login: 'teste[bot]'
        },
        id: 444444445,
        display_title:'teste',
        pull_requests: [
            {
                title: 'teste',
                number: 34
            }
        ]
    }

    let runId = 444444444

    const github= {
        context: {
            payload:{
                pull_request: {
                    title: 'teste',
                    head:{
                        repo:{
                            owner: 'teste'
                        }
                    }
                },
                repository: {
                    name:'teste',
                    owner:{
                        login: 'teste'
                    }
                },
                sender: {
                    login: 'teste'
                }, 
                number: 34
            }
        }
    }

    let validate = new Validate(github)
    expect(validate.isRunDuplicate(runId, workflow_runs)).toBe(true)
})
