
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
        let PRHotFix = /\(hotfix\)+:.*/
        return PRHotFix.test(titlePR)
    }

    validateObjectLoginsender(){
        if (!Object.hasOwnProperty.bind(this.github)('context')){
            return false
        }
    
        if (!Object.hasOwnProperty.bind(this.github.context)('payload')){
            return false
        }
    
        if (!Object.hasOwnProperty.bind(this.github.context.payload)('sender')){
            return false
        }
            
        if (!Object.hasOwnProperty.bind(this.github.context.payload.sender)('login')){
            return false
        }
    
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
        
        if(!workflow_runs.actor.login.includes("[bot]")){
            return false
        }
        
        if(workflow_runs.id == runId){
            return false
        }
        
        if(!Object.hasOwnProperty.bind(workflow_runs)("pull_requests")){
            return false
        }

        if(workflow_runs.pull_requests.length == 0){
            return false
        }
        
        if(!Object.hasOwnProperty.bind(workflow_runs.pull_requests[0])("number")){
            return false
        }
        
        if(workflow_runs.display_title.trim() != this.github.context.payload.pull_request.title.trim()){
            return false
        }
        
        if(workflow_runs.pull_requests[0].number != this.github.context.payload.number){
            return false
        }
        
        return true
    }

    isGithubValid(github){
        if(!Object.hasOwnProperty.bind(github)('context')){
            setFailed('A propriedade `context` não foi encontrada!')
            return false
        }
        
        if(!Object.hasOwnProperty.bind(github.context)('payload')){
            setFailed('A propriedade `payload` não foi encontrada!')
            return false
        }
        
        if(!Object.hasOwnProperty.bind(github.context.payload)('repository')){
            setFailed('A propriedade `repository` não foi encontrada!')
            return false
        }
        
        if(!Object.hasOwnProperty.bind(github.context.payload.repository)('owner')){
            setFailed('A propriedade `owner` não foi encontrada!')
            return false
        }
        
        if(!Object.hasOwnProperty.bind(github.context.payload.repository)('name')){
            setFailed('A propriedade `name` não foi encontrada!')
            return false
        }
        
        if(!Object.hasOwnProperty.bind(github.context.payload.repository.owner)('login')){
            setFailed('A propriedade `login` não foi encontrada!')
            return false
        }
        
        if(!Object.hasOwnProperty.bind(github.context.payload.pull_request)('head')){
            setFailed('A propriedade `head` não foi encontrada!')
            return false
        }
        
        if(!Object.hasOwnProperty.bind(github.context.payload.pull_request.head)('repo')){
            setFailed('A propriedade `repo` não foi encontrada!')
            return false
        }
        
        if(!Object.hasOwnProperty.bind(github.context.payload.pull_request.head.repo)('owner')){
            setFailed('A propriedade `owner` não foi encontrada!')
            return false
        }

        return true
    }
    
    

}