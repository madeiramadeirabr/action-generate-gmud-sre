import { Octokit } from "@octokit/core"
import Validate from "./validate.js"

export default class GithubService {

    constructor(authGithub, github){
        this.authGithub = authGithub.replace("Bearer ", "")
        this.github = github
        this.octokit = new Octokit({ auth: this.authGithub })
    }
    
    async deleteRunById(runId){
        try{
            await this.octokit.request('DELETE /repos/{owner}/{repo}/actions/runs/{run_id}', {
                owner: this.github.context.payload.repository.owner.login,
                repo: this.github.context.payload.repository.name,
                run_id: runId
            })

            console.log(`Run ${runId} deletado com sucesso!`)
        }catch(error){
            console.log("Erro ao deletar run")
            console.log(error.message)
        }
    }

    async getRunAll(runId){
        try {
        
            const validate = new Validate(this.github)
            
            const response =  await this.octokit.request('GET /repos/{owner}/{repo}/actions/runs', {
                owner: this.github.context.payload.repository.owner.login,
                repo: this.github.context.payload.repository.name,
            })

            let workflow_runs = response.data.workflow_runs
                for(let indice in workflow_runs){
                    if(validate.isRunDuplicate(runId, workflow_runs[indice])){
                        this.deleteRunById(workflow_runs[indice].id)
                        break
                    }
                }

        }catch(error){
            console.log("Erro ao buscar run: ", error)
        }
    }

}