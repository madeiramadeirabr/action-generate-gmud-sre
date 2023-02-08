
import { setFailed } from "@actions/core";
export default class Validate {
    
    constructor(github){
        this.github = github
    }
    
    isPRDefault(titlePR) {
        let PRDefault = /[a-z]+\([A-Z|0-9]+-\d+\):.*/
        return PRDefault.test(titlePR)
    }

    isHotfix(titlePR) {
        let PRHotFix = /\(hotfix\)+\:.*/
        return PRHotFix.test(titlePR)
    }

    validateObjectLoginsender(){
        if (!this.github.hasOwnProperty('context'))
            return false
    
        if (!this.github.context.hasOwnProperty('payload'))
            return false
    
        if (!this.github.context.payload.hasOwnProperty('sender'))
            return false
            
        if (!this.github.context.payload.sender.hasOwnProperty('login'))
            return false
    
        return true
    }

    isBot(){
        if(!this.validateObjectLoginsender()){
            return false
        }
    
        const loginSender = this.github.context.payload.sender.login
    
        if (loginSender.includes("[bot]")){
            setFailed(`Essa ação foi executada pelo bot ${loginSender} e não irá gerar GMUD!`)
            return true
        }
        
    }

    isRunDuplicate(runId, workflow_runs){
        
        if(!workflow_runs.actor.login.includes("[bot]"))
            return false
        
        if(workflow_runs.id == runId)
            return false
        
        if(!workflow_runs.hasOwnProperty("pull_requests"))
            return false

        if(workflow_runs.pull_requests.length == 0)
            return false
        
        if(!workflow_runs.pull_requests[0].hasOwnProperty("number"))
            return false
        
        if(workflow_runs.display_title.trim() != this.github.context.payload.pull_request.title.trim())
            return false
        
        if(workflow_runs.pull_requests[0].number != this.github.context.payload.number) 
            return false
        
        return true
    }

    isGithubValid(github){
        if(!github.hasOwnProperty('context')){
            setFailed('A propriedade `context` não foi encontrada!')
            return false
        }
        
        if(!github.context.hasOwnProperty('payload')){
            setFailed('A propriedade `payload` não foi encontrada!')
            return false
        }
        
        if(!github.context.payload.hasOwnProperty('repository')){
            setFailed('A propriedade `repository` não foi encontrada!')
            return false
        }
        
        if(!github.context.payload.repository.hasOwnProperty('owner')){
            setFailed('A propriedade `owner` não foi encontrada!')
            return false
        }
        
        if(!github.context.payload.repository.hasOwnProperty('name')){
            setFailed('A propriedade `name` não foi encontrada!')
            return false
        }
        
        if(!github.context.payload.repository.owner.hasOwnProperty('login')){
            setFailed('A propriedade `login` não foi encontrada!')
            return false
        }

        if(!github.context.payload.repository.hasOwnProperty('head')){
            setFailed('A propriedade `head` não foi encontrada!')
            return false
        }
        
        if(!github.context.payload.repository.head.hasOwnProperty('repo')){
            setFailed('A propriedade `repo` não foi encontrada!')
            return false
        }
        
        if(!github.context.payload.repository.head.repo.hasOwnProperty('owner')){
            setFailed('A propriedade `owner` não foi encontrada!')
            return false
        }

        return true
    }
    
    

}